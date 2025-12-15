import { NextRequest, NextResponse } from "next/server";
import { ingestFile } from "@/lib/ingestion_unstructured";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";
import { uploadFileToStorage } from "@/lib/database_supabase/storage";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // 1. Upload to Supabase Storage (Backup/Source of Truth)
        const filename = file.name; // Keep original name for logic, sanitization happens in storage.ts

        // Retrieve User ID for folder organization
        const cookieStore = await cookies();
        const supabase = await createClient(cookieStore);
        const { data: { user } } = await supabase.auth.getUser();

        if (user) {
            try {
                await uploadFileToStorage(file, filename, user.id);
            } catch (err) {
                console.error("Supabase Storage Upload Error:", err);
            }
        }

        // 2. Process locally for Unstructured/LangChain
        // const filename = `${uuidv4()}-${file.name}`;
        // We use a local filename logic for temp processing
        const tempFilename = `${uuidv4()}-${filename}`;
        const buffer = Buffer.from(bytes);

        // Create temp directory if it doesn't exist
        const tempDir = join(process.cwd(), "tmp");
        if (!existsSync(tempDir)) {
            await mkdir(tempDir, { recursive: true });
        }

        // Save to temp file
        const tempFilePath = join(tempDir, tempFilename);
        await writeFile(tempFilePath, buffer);

        try {
            // Process with Unstructured via LangChain Loader
            // Note: We might want to pass the storage URL as metadata later
            const docs = await ingestFile(tempFilePath);

            // Return structured data
            return NextResponse.json({
                success: true,
                documents: docs.map((doc) => ({
                    pageContent: doc.pageContent,
                    metadata: doc.metadata,
                })),
                count: docs.length,
            });
        } finally {
            // Clean up temp file
            await unlink(tempFilePath).catch((err) =>
                console.error("Failed to delete temp file:", err)
            );
        }
    } catch (error) {
        console.error("Ingestion error:", error);
        return NextResponse.json(
            { error: "Internal server error during ingestion" },
            { status: 500 }
        );
    }
}
