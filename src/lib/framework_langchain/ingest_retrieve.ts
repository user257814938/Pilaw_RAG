import { Embeddings, EmbeddingsParams } from '@langchain/core/embeddings';
import { embed, embedMany } from 'ai';
import { gateway } from '@ai-sdk/gateway';
import { SupabaseVectorStore } from '@langchain/community/vectorstores/supabase';
import { supabaseAdmin } from '../database_supabase/admin';
import { createClient } from '../database_supabase/client';
import { DEFAULT_EMBEDDING_MODEL_ID } from '../llm_ai-gateway/model_selection';
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
            model: gateway.textEmbeddingModel(this.model),
            values: documents,
        });
        return embeddings;
    }

    async embedQuery(document: string): Promise<number[]> {
        const { embedding } = await embed({
            model: gateway.textEmbeddingModel(this.model),
            value: document,
        });
        return embedding;
    }
}


// Instantiate the custom embeddings class
export const embeddings = new VercelAIEmbeddings({
    model: DEFAULT_EMBEDDING_MODEL_ID,
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
 * Manually implemented to avoid dependency on ContextualCompressionRetriever
 */
export const getRetriever = () => {
    const client = createClient();

    // 1. Initial Hybrid Search Retrieval
    const store = new SupabaseVectorStore(embeddings, {
        client,
        tableName: "documents",
        queryName: "match_documents",
    });

    // Use hybrid search options
    const baseRetriever = store.asRetriever({
        searchType: "hybrid",
        k: 10,
        // @ts-ignore
        searchKwargs: {
            keywordCount: 5,
            vectorCount: 10
        }
    });

    // 2. Wrap in a Runnable/Function for Reranking
    // We return an object that mimics the Retriever interface (has an invoke method)
    return {
        invoke: async (query: string) => {
            // A. Fetch initial candidates
            const docs = await baseRetriever.invoke(query);

            if (docs.length === 0) return [];

            // B. Rerank with Cohere
            // The rerank method expects documents as objects with pageContent
            console.log(`[RAG] Reranking ${docs.length} documents with Cohere...`);

            try {
                const reranked = await cohereReranker.compressDocuments(docs, query);
                console.log(`[RAG] Reranked to top ${reranked.length} results.`);
                return reranked;
            } catch (error) {
                console.error("[RAG] Reranking failed, falling back to basic hybrid results:", error);
                return docs.slice(0, 5); // Fallback to top 5 original docs
            }
        },
        // Helpers for compatibility if needed
        getRelevantDocuments: async (query: string) => {
            // Same logic as invoke
            const docs = await baseRetriever.invoke(query);
            if (!docs.length) return [];
            try {
                return await cohereReranker.compressDocuments(docs, query);
            } catch (e) { return docs.slice(0, 5); }
        }
    };
};
