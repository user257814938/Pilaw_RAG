import { Redis } from "@upstash/redis";
import { UpstashRedisStore } from "@langchain/community/storage/upstash_redis";

/**
 * Initialize Upstash Redis Client
 * Requires UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN in environment variables.
 */
export const redisClient = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL!,
    token: process.env.UPSTASH_REDIS_REST_TOKEN!,
});

/**
 * Initialize LangChain BaseStore using Upstash Redis
 * Useful for chat history persistence or key-value storage in LangChain agents.
 */
export const redisStore = new UpstashRedisStore({
    client: redisClient,
});

/**
 * Helper to get or throw if env vars missing (debugging)
 */
export const getRedisClient = () => {
    if (
        !process.env.UPSTASH_REDIS_REST_URL ||
        !process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
        throw new Error(
            "UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN must be set in the environment"
        );
    }
    return redisClient;
}
