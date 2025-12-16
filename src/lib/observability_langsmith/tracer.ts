import { v4 as uuidv4 } from 'uuid';

const LANGCHAIN_ENDPOINT = process.env.LANGCHAIN_ENDPOINT || "https://api.smith.langchain.com";
const LANGCHAIN_API_KEY = process.env.LANGCHAIN_API_KEY || process.env.LANGSMITH_API_KEY;

if (!LANGCHAIN_API_KEY) {
    console.warn("⚠️ LANGCHAIN_API_KEY is missing. Tracing will be disabled.");
}

const headers = {
    "x-api-key": LANGCHAIN_API_KEY || "",
    "Content-Type": "application/json"
};

/**
 * Post a new run to LangSmith via REST API
 */
export async function postRun(
    name: string,
    runType: "chain" | "llm" | "tool" | "retriever",
    inputs: Record<string, any>,
    parentRunId?: string
) {
    if (!LANGCHAIN_API_KEY) return null;

    const runId = uuidv4();
    const startTime = new Date().toISOString();

    const data: any = {
        id: runId,
        name: name,
        run_type: runType,
        inputs: inputs,
        start_time: startTime,
        project_name: process.env.LANGCHAIN_PROJECT || "default"
    };

    if (parentRunId) {
        data.parent_run_id = parentRunId;
    }

    try {
        // Fire and forget - don't await to avoid blocking response
        fetch(`${LANGCHAIN_ENDPOINT}/runs`, {
            method: "POST",
            headers: headers,
            body: JSON.stringify(data)
        }).catch(err => console.error("Failed to post run to LangSmith:", err));

        return runId;
    } catch (e) {
        console.error("Error initiating run trace:", e);
        return null;
    }
}

/**
 * Patch an existing run with outputs and end time
 */
export async function patchRun(runId: string, outputs: Record<string, any>) {
    if (!LANGCHAIN_API_KEY || !runId) return;

    const endTime = new Date().toISOString();

    try {
        fetch(`${LANGCHAIN_ENDPOINT}/runs/${runId}`, {
            method: "PATCH",
            headers: headers,
            body: JSON.stringify({
                outputs: outputs,
                end_time: endTime
            })
        }).catch(err => console.error("Failed to patch run in LangSmith:", err));
    } catch (e) {
        console.error("Error patching run trace:", e);
    }
}
