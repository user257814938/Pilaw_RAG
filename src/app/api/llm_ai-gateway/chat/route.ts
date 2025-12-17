import { streamText, convertToCoreMessages, convertToModelMessages, UIMessage } from 'ai';
import { gateway } from '@ai-sdk/gateway'; // Requires @ai-sdk/gateway
import { getRetriever } from '@/lib/framework_langchain/ingest_retrieve';
import { DEFAULT_MODEL_ID } from '@/lib/llm_ai-gateway/model_selection';
import { SYSTEM_PROMPT } from '@/lib/llm_ai-gateway/system_prompt';

export const maxDuration = 30;

export async function POST(req: Request) {
    // MINIMAL DEBUG MODE
    try {
        console.log("📥 API Request received");

        // Check 1: Can we parse body?
        const { messages, model, webSearch } = await req.json();

        // 1. Model Selection
        let selectedModelId = model || DEFAULT_MODEL_ID;
        let gatewayModelsCount = 0;

        if (!model) { // Only try gateway lookup if no specific model requested (or test it anyway)
            // Force test gateway
            try {
                console.log("➡️ calling gateway.getAvailableModels()...");
                const { models } = await gateway.getAvailableModels();
                console.log("✅ Gateway returned models:", models.length);
                gatewayModelsCount = models.length;

                // Logic to select model...
                const dynamicModel = models.find(m => m.modelType === 'language' || !m.modelType);
                if (dynamicModel) {
                    // selectedModelId = dynamicModel.id; // Keep explicit for now
                }
            } catch (error: any) {
                console.warn('⚠️ Gateway Model Discovery failed:', error);
                // We don't crash, just log property
            }
        }

        // 2. Redis Caching Strategy (Read)
        let cacheKey: string | null = null;
        let cacheHit = false;
        let cachedContentLength = 0;

        try {
            // Generate Key
            const { createHash } = await import('crypto');
            // Mock question for test since we parse manual JSON
            const lastMessage = messages?.[messages.length - 1];
            const question = (lastMessage as any)?.content || "test_question";

            const hash = createHash('sha256').update(`${selectedModelId}:${question}`).digest('hex');
            cacheKey = `chat_cache:${hash}`;

            // READ CACHE
            const { getRedisClient } = await import('@/lib/cache_queue_vector_upstash/cache_upstash_redis');
            const redis = getRedisClient();
            const cachedResponse = await redis.get(cacheKey);

            /* DISABLE CACHE FOR RAG ACCURACY
            if (cachedResponse && typeof cachedResponse === 'string') {
                console.log(`⚡ CACHE HIT for key: ${cacheKey}`);
                cacheHit = true;
                // cachedContentLength = cachedResponse.length; 
                return new Response(cachedResponse);
            }
            */
        } catch (e: any) {
            console.error("Redis Cache Read Failed:", e);
        }

        // 2. RAG: Retrieve relevant documents from Supabase (only for normal chat)
        const lastMessage = messages?.[messages.length - 1];
        // Handle UIMessage which might use 'parts' instead of 'content' in newer SDKs
        const question = ((lastMessage as any)?.content ?? (lastMessage as any)?.parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')) as string || "test";

        let systemPrompt = SYSTEM_PROMPT;

        try {
            const retriever = getRetriever();
            const docs = await retriever.invoke(question);

            if (docs.length > 0) {
                // Manual formatting
                const context = docs.map((doc: any) => doc.pageContent).join('\n\n');
                systemPrompt += `\n\nUse the following context to answer the user's question:\nContext:\n${context}`;
            }
        } catch (e) {
            console.warn("RAG Retrieval check failed (likely no docs or db issue), proceeding without context.", e);
        }

        console.log("➡️ Starting streamText with model:", selectedModelId);

        // 3. Call Vercel AI SDK
        const result = streamText({
            model: gateway(selectedModelId),
            system: systemPrompt,
            messages: messages.map((m: any) => ({ role: m.role, content: m.content })),
            onFinish: async ({ text }) => {
                // WRITE CACHE
                if (cacheKey && text) {
                    try {
                        const { getRedisClient } = await import('@/lib/cache_queue_vector_upstash/cache_upstash_redis');
                        const redis = getRedisClient();
                        // Cache for 1 hour
                        await redis.set(cacheKey, text, { ex: 3600 });
                        console.log(`💾 CACHE SAVED for key: ${cacheKey}`);
                    } catch (e) {
                        console.error("Redis Cache Write Failed:", e);
                    }
                }
            }
        });

        // 4. Return Stream
        // 4. Return Raw Text Stream (Simpler for manual fetch)
        return result.toTextStreamResponse();

    } catch (error: any) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
}
