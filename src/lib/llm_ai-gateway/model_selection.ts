import { gateway } from '@ai-sdk/gateway';

// ==========================================
// BLOCK 1: SERVER SIDE (Model Retrieval)
// ==========================================
// This logic connects to the API to fetch all available models.

export async function getDynamicModels() {
    try {
        // ---------------------------------------------------------
        // PHASE 1: RETRIEVE ALL MODELS
        // Fetch the raw list of all available models from the Gateway.
        // ---------------------------------------------------------
        const { models } = await gateway.getAvailableModels();

        // ---------------------------------------------------------
        // PHASE 2: SELECT & CATEGORIZE MODELS
        // Organize the raw list into specific categories.
        // ---------------------------------------------------------

        // Category A: Language Models (Text Generation)
        const languageModels = models.filter((m) => m.modelType === 'language' || !m.modelType);

        // Category B: Embedding Models (Vectorization)
        const embeddingModels = models.filter((m) => m.modelType === 'embedding');

        // Return the structured data
        return {
            languageModels,
            embeddingModels,
            all: models
        };

    } catch (error) {
        console.error("Failed to fetch models from Gateway:", error);
        return { languageModels: [], embeddingModels: [], all: [] };
    }
}


// ==========================================
// BLOCK 2: MANUAL CHOICE (Configuration)
// ==========================================
// "Mother Variables" - Static defaults used by the app.

export const AI_MODELS = [
    {
        name: 'GPT 5 Nano',
        value: 'openai/gpt-5-nano',
    },
    {
        name: 'GPT 5.2',
        value: 'openai/gpt-5.2',
    },
    {
        name: 'Claude Opus 4.5',
        value: 'anthropic/claude-opus-4.5',
    },
    {
        name: 'Claude Haiku 4.5',
        value: 'anthropic/claude-haiku-4.5',
    },
    {
        name: 'Deepseek v3.2',
        value: 'deepseek/deepseek-v3.2',
    },
];

export const DEFAULT_MODEL_ID = AI_MODELS[1].value;
export const DEFAULT_EMBEDDING_MODEL_ID = 'openai/text-embedding-3-large';
