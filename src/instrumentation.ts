import { openai } from '@ai-sdk/openai';

export async function register() {
    if (process.env.NEXT_RUNTIME === 'nodejs') {
        // This allows the AI SDK to use the OpenAI provider by default
        // which effectively routes through the AI Gateway if AI_GATEWAY_API_KEY is allowed
        // or facilitates specific provider configurations.
        globalThis.AI_SDK_DEFAULT_PROVIDER = openai;
    }
}
