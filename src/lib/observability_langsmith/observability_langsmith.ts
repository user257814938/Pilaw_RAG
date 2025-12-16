import { Client, Run } from "langsmith";

// Initialize the LangSmith Client
// Requires LANGCHAIN_API_KEY environment variable to be set
export const langsmithClient = new Client();

/**
 * Fetch all runs for a specific project
 */
export async function getProjectRuns(projectName: string): Promise<Run[]> {
    const projectRuns: Run[] = [];
    for await (const run of langsmithClient.listRuns({
        projectName: projectName,
    })) {
        projectRuns.push(run);
    }
    return projectRuns;
}

/**
 * Fetch LLM and Chat runs from the last 24 hours
 */
export async function getRecentLLMRuns(projectName: string): Promise<Run[]> {
    const todaysLlmRuns: Run[] = [];
    for await (const run of langsmithClient.listRuns({
        projectName: projectName,
        startTime: new Date(Date.now() - 1000 * 60 * 60 * 24), // Last 24h
        runType: "llm",
    })) {
        todaysLlmRuns.push(run);
    }
    return todaysLlmRuns;
}

/**
 * Fetch specific runs by their IDs
 */
export async function getRunsById(runIds: string[]): Promise<Run[]> {
    const selectedRuns: Run[] = [];
    for await (const run of langsmithClient.listRuns({
        id: runIds,
    })) {
        selectedRuns.push(run);
    }
    return selectedRuns;
}

/**
 * Fetch runs that successfully completed (no error)
 */
export async function getSuccessfulRuns(projectName: string): Promise<Run[]> {
    const correctRuns: Run[] = [];
    for await (const run of langsmithClient.listRuns({
        projectName: projectName,
        error: false,
    })) {
        correctRuns.push(run);
    }
    return correctRuns;
}

/**
 * Advanced: List runs filtered by custom criteria
 * wrapper for client.listRuns
 */
export async function queryRuns(params: Parameters<Client['listRuns']>[0]): Promise<Run[]> {
    const runs: Run[] = [];
    for await (const run of langsmithClient.listRuns(params)) {
        runs.push(run);
    }
    return runs;
}
