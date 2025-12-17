import { UnstructuredLoader } from "@langchain/community/document_loaders/fs/unstructured";
import { UnstructuredDirectoryLoader } from "@langchain/community/document_loaders/fs/unstructured";

// --- OCR CLEANING UTILITY ---
function isNoise(text: string): boolean {
    const trimmed = text.trim();
    if (trimmed.length < 3) return false; // Keep short meaningful words like "AI"

    // Calculate ratio based on NON-SPACE characters only
    // This prevents "spaced garbage" (e.g. "= B | I %") from passing the test
    const contentWithoutSpaces = trimmed.replace(/\s/g, "");
    if (contentWithoutSpaces.length === 0) return true;

    const alphaNumeric = contentWithoutSpaces.replace(/[^a-zA-Z0-9]/g, "").length;
    const total = contentWithoutSpaces.length;

    // If more than 30% of the actual content is non-alphanumeric, it's noise.
    // (Stricter threshold: 0.4 -> 0.3)
    const noiseRatio = 1 - (alphaNumeric / total);
    return noiseRatio > 0.3;
}

function cleanDocuments(docs: any[]): any[] {
    return docs.map((doc) => {
        const cleanContent = doc.pageContent
            .split('\n')
            .filter((line: string) => !isNoise(line))
            .join('\n');

        doc.pageContent = cleanContent;
        return doc;
    });
}

/**
 * Loads a file using Unstructured and LangChain.
 * Returns a list of LangChain Documents.
 */
export async function ingestFile(filePath: string) {
    if (!process.env.UNSTRUCTURED_API_KEY) {
        console.warn("Missing UNSTRUCTURED_API_KEY env var");
    }

    const loader = new UnstructuredLoader(filePath, {
        apiKey: process.env.UNSTRUCTURED_API_KEY,
        apiUrl: process.env.UNSTRUCTURED_API_URL,
        strategy: "hi_res",
        chunkingStrategy: "by_title",
        // @ts-ignore - LangChain types might lag behind, but API accepts it
        // languages: ["eng"], // Force English OCR to reduce noise (REVERTED: Suspected cause of failure)
    });

    const docs = await loader.load();
    return cleanDocuments(docs);
}

/**
 * Loads all files in a directory using Unstructured and LangChain.
 * useful for batch processing.
 */
export async function ingestDirectory(directoryPath: string) {
    if (!process.env.UNSTRUCTURED_API_KEY) {
        console.warn("Missing UNSTRUCTURED_API_KEY env var");
    }

    const loader = new UnstructuredDirectoryLoader(directoryPath, {
        apiKey: process.env.UNSTRUCTURED_API_KEY,
        apiUrl: process.env.UNSTRUCTURED_API_URL,
        strategy: "hi_res",
        recursive: true,
    });

    const docs = await loader.load();
    return cleanDocuments(docs);
}

/**
 * Extracts analytics from a list of documents (File types, Languages, etc.)
 * Usage: const { fileTypeStats, languageStats } = getDocumentAnalytics(docs);
 */
export function getDocumentAnalytics(docs: any[]) {
    const fileTypeStats = docs.reduce((acc, doc) => {
        const type = doc.metadata.filetype || "unknown";
        acc[type] = (acc[type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const languageStats = docs.reduce((acc, doc) => {
        const lang = doc.metadata.languages?.[0] || "unknown";
        acc[lang] = (acc[lang] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    return { fileTypeStats, languageStats };
}
