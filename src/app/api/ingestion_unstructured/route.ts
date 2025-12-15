import { NextRequest, NextResponse } from "next/server";
import { ingestFile } from "@/lib/ingestion_unstructured";
import { writeFile, unlink, mkdir } from "fs/promises";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Validate file type (optional but recommended)
        // const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        // if (!allowedTypes.includes(file.type)) { ... }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create temp directory if it doesn't exist
        const tempDir = join(process.cwd(), "tmp");
        if (!existsSync(tempDir)) {
            await mkdir(tempDir, { recursive: true });
        }

        // Save to temp file with unique name to avoid collisions
        const tempFilePath = join(tempDir, `${uuidv4()}-${file.name}`);
        await writeFile(tempFilePath, buffer);

        try {
            // Process with Unstructured via LangChain Loader
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
