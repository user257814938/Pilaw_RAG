import { CohereRerank } from "@langchain/cohere";

/**
 * Initialize Cohere Reranker
 * Requires COHERE_API_KEY in environment variables.
 */
export const cohereReranker = new CohereRerank({
    model: "rerank-v4.0-pro",
    topN: 5, // Keep top 5 most relevant documents
});
