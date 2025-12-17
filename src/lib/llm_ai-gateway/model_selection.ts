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
        name: 'GPT 4o',
        value: 'openai/gpt-4o',
    },
    {
        name: 'GPT 4-Turbo',
        value: 'openai/gpt-4-turbo',
    },
    {
        name: 'Claude 3.5 Sonnet',
        value: 'anthropic/claude-3-5-sonnet-20240620',
    },
    {
        name: 'Claude 3 Opus',
        value: 'anthropic/claude-3-opus-20240229',
    },
];

export const DEFAULT_MODEL_ID = AI_MODELS[0].value;
export const DEFAULT_EMBEDDING_MODEL_ID = 'openai/text-embedding-3-large';
