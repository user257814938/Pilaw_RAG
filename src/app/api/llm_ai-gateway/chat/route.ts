import { streamText, convertToCoreMessages, convertToModelMessages, UIMessage } from 'ai';
import { gateway } from '@ai-sdk/gateway'; // Requires @ai-sdk/gateway
import { getRetriever } from '@/lib/framework_langchain/ingest_retrieve';
import { DEFAULT_MODEL_ID } from '@/lib/llm_ai-gateway/model_selection';
import { SYSTEM_PROMPT } from '@/lib/llm_ai-gateway/system_prompt';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages, model, webSearch }: { messages: UIMessage[], model?: string, webSearch?: boolean } = await req.json();

    // 0. Handle Web Search Mode (bypass RAG/Gateway if specifically requested for search)
    if (webSearch) {
        const result = streamText({
            model: 'perplexity/sonar', // Direct to Perplexity for web search
            messages: convertToModelMessages(messages),
            system: 'You are a helpful assistant with access to real-time web search.',
        });
        return result.toUIMessageStreamResponse({ sendSources: true, sendReasoning: true });
    }

    // 1. Dynamic Model Discovery ("Dynamico Modélix" logic)
    // Instead of hardcoding 'openai/gpt-4o', we ask the Gateway what's available.
    let selectedModelId = model || DEFAULT_MODEL_ID; // Use frontend model or intelligent fallback

    if (!model) {
        try {
            const { models } = await gateway.getAvailableModels();
            // Log available models for debugging
            console.log('🤖 Dynamic Model Discovery - Available Models:', models.map(m => m.id));
            // Find the first available language model
            const dynamicModel = models.find(m => m.modelType === 'language' || !m.modelType);
            if (dynamicModel) {
                selectedModelId = dynamicModel.id;
                console.log(`✅ Selected Dynamic Model: ${selectedModelId}`);
            }
        } catch (error) {
            console.warn('⚠️ Gateway Model Discovery failed, using fallback:', selectedModelId);
        }
    }

    // 2. RAG: Retrieve relevant documents from Supabase (only for normal chat)
    const lastMessage = messages[messages.length - 1];
    // Handle UIMessage which might use 'parts' instead of 'content' in newer SDKs
    const question = ((lastMessage as any).content ?? (lastMessage as any).parts?.filter((p: any) => p.type === 'text').map((p: any) => p.text).join('')) as string;

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
        console.error("RAG Retrieval check failed (likely no docs or db issue), proceeding without context.");
    }

    // 4. Call Vercel AI SDK
    const result = streamText({
        model: gateway(selectedModelId), // Uses the dynamically discovered parameters passed via gateway provider
        system: systemPrompt,
        messages: convertToCoreMessages(messages),
    });

    // 5. Return Stream compatible with AI Elements (UIMessageStreamResponse)
    return result.toUIMessageStreamResponse({
        sendSources: true,
        sendReasoning: true
    });
}
