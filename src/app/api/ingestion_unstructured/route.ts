import { NextRequest, NextResponse } from "next/server";
import { ingestFile } from "@/lib/ingestion_unstructured";
import { writeFile, unlink, mkdir } from "fs/promises";
import { createReadStream } from "fs";
import { join } from "path";
import { v4 as uuidv4 } from "uuid";
import { existsSync } from "fs";
import { uploadFileToStorage } from "@/lib/database_supabase/storage";
import { cookies } from "next/headers";
import { createClient } from "@/lib/database_supabase/server";
import { indexDocuments } from "@/lib/framework_langchain/ingest_retrieve";
import OpenAI from "openai";
import { Document } from "@langchain/core/documents";

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

        // 2. Process locally
        // We use a local filename logic for temp processing
        const tempFilename = `${uuidv4()}-${filename}`;
        const buffer = Buffer.from(await file.arrayBuffer());

        // Create temp directory if it doesn't exist
        const tempDir = join(process.cwd(), "tmp");
        if (!existsSync(tempDir)) {
            await mkdir(tempDir, { recursive: true });
        }

        // Save to temp file
        const tempFilePath = join(tempDir, tempFilename);
        await writeFile(tempFilePath, buffer);

        try {
            let docs: Document[] = [];
            const isAudio = file.type.startsWith("audio/") || /\.(mp3|wav|m4a|mp4|webm|ogg)$/i.test(file.name);

            if (isAudio) {
                console.log("Audio detected, starting Whisper transcription...");
                const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

                // Transcribe using Whisper
                const transcription = await openai.audio.transcriptions.create({
                    file: createReadStream(tempFilePath),
                    model: "whisper-1",
                });

                docs = [
                    new Document({
                        pageContent: transcription.text,
                        metadata: {
                            source: filename,
                            type: "audio",
                            storagePath: user ? `${user.id}/${filename}` : filename
                        },
                    }),
                ];
                console.log("Transcription complete:", transcription.text.substring(0, 50) + "...");
            } else {
                // Process with Unstructured via LangChain Loader
                // Note: We might want to pass the storage URL as metadata later
                docs = await ingestFile(tempFilePath);
            }

            // 3. Index Documents into Supabase Vector Store (Critical Step!)
            if (docs.length > 0) {
                // Filter out empty documents to avoid embedding errors
                const validDocs = docs.filter(doc => doc.pageContent && doc.pageContent.trim().length > 0);

                if (validDocs.length > 0) {
                    await indexDocuments(validDocs);
                    console.log(`[Ingest] Indexed ${validDocs.length} documents.`);
                } else {
                    console.warn("[Ingest] Documents were processed but contained no valid text after cleaning.");
                }
            }

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
