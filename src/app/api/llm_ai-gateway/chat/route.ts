import { streamText, convertToCoreMessages } from 'ai';
import { gateway } from '@ai-sdk/gateway'; // Requires @ai-sdk/gateway
import { getRetriever } from '@/lib/framework_langchain/ingest_retrieve';

export const maxDuration = 30;

export async function POST(req: Request) {
    const { messages } = await req.json();

    // 1. Dynamic Model Discovery ("Dynamico Modélix" logic)
    // Instead of hardcoding 'openai/gpt-4o', we ask the Gateway what's available.
    let selectedModelId = 'openai/gpt-4o'; // Intelligent fallback

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

    // 2. RAG: Retrieve relevant documents from Supabase
    const lastMessage = messages[messages.length - 1];
    const question = lastMessage.content;

    const retriever = getRetriever();
    const docs = await retriever.invoke(question);

    // Manual formatting
    const context = docs.map(doc => doc.pageContent).join('\n\n');

    // 3. Prepare System Prompt with Context
    const systemPrompt = `You are an expert legal assistant.
  Use the following context to answer the user's question. Do not invent information.
  
  Context:
  ${context}`;

    // 4. Call Vercel AI SDK
    const result = await streamText({
        model: selectedModelId, // Uses the dynamically discovered model ID
        system: systemPrompt,
        messages: convertToCoreMessages(messages),
    });

    // 5. Return Stream
    return result.toDataStreamResponse();
}
