import { Client } from "@upstash/workflow";

export const workflowClient = new Client({
    baseUrl: process.env.UPSTASH_WORKFLOW_URL,
    token: process.env.QSTASH_TOKEN, // Workflow often uses QStash token
});
