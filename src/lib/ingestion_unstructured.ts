import { UnstructuredLoader } from "@langchain/community/document_loaders/fs/unstructured";
import { UnstructuredDirectoryLoader } from "@langchain/community/document_loaders/fs/unstructured";

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
        apiUrl: process.env.UNSTRUCTURED_API_URL, // Defaults to SaaS URL if undefined
        strategy: "hi_res",
        chunkingStrategy: "by_title", // Optimal for legal docs to respect structure
        // coordinates: true, // Enable if UI needs bounding boxes later
    });

    const docs = await loader.load();
    return docs;
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
    return docs;
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
