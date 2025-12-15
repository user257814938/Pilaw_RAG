import { Embeddings, EmbeddingsParams } from '@langchain/core/embeddings';
import { embed, embedMany } from 'ai';
import { openai } from '@ai-sdk/openai';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { SupabaseHybridSearch } from '@langchain/community/retrievers/supabase';
import { supabaseAdmin } from '../database_supabase/admin';
import { createClient } from '../database_supabase/client';
import { ContextualCompressionRetriever } from "langchain/retrievers/contextual_compression";
import { cohereReranker } from '@/lib/rerank_cohere';

/**
 * Custom Embeddings Wrapper for Vercel AI SDK Gateway
 */
class VercelAIEmbeddings extends Embeddings {
    model: string;

    constructor(params?: { model?: string } & EmbeddingsParams) {
        super(params ?? {});
        this.model = params?.model ?? 'openai/text-embedding-3-large';
    }

    async embedDocuments(documents: string[]): Promise<number[][]> {
        const { embeddings } = await embedMany({
            model: openai.textEmbeddingModel(this.model),
            values: documents,
        });
        return embeddings;
    }

    async embedQuery(document: string): Promise<number[]> {
        const { embedding } = await embed({
            model: openai.textEmbeddingModel(this.model),
            value: document,
        });
        return embedding;
    }
}

// Instantiate the custom embeddings class
export const embeddings = new VercelAIEmbeddings({
    model: 'text-embedding-3-large',
});

/**
 * Helper to upload LangChain documents to Supabase Vector Store
 */
export async function indexDocuments(docs: any[]) {
    // We use SupabaseVectorStore (not Hybrid) for ingestion, with Admin client to bypass RLS/Auth checks during ingestion
    const store = new SupabaseVectorStore(embeddings, {
        client: supabaseAdmin,
        tableName: "documents",
        queryName: "match_documents",
    });

    await store.addDocuments(docs);
    console.log(`Successfully indexed ${docs.length} documents.`);
}

/**
 * Returns a Hybrid Retriever enhanced with Cohere Rerank
 * Usage:
 * const retriever = getRetriever();
 * const results = await retriever.invoke("search query");
 */
export const getRetriever = () => {
    const client = createClient();

    // 1. Base Retriever (Hybrid Search: Vector + Keyword)
    // We fetch more documents initially (e.g. 10) to let the Reranker filter them down
    const baseRetriever = new SupabaseHybridSearch(embeddings, {
        client,
        tableName: "documents",
        similarityQueryName: "match_documents",
        keywordQueryName: "kw_match_documents",
        similarityK: 10,
        keywordK: 4,
    });

    // 2. Compression Retriever (Hubrid + Cohere Rerank)
    return new ContextualCompressionRetriever({
        baseCompressor: cohereReranker,
        baseRetriever: baseRetriever,
    });
};
