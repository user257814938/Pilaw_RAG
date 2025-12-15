import { nango } from "./connector_nango";

/**
 * Executes an AI Agent logic that uses Nango tools.
 * This is an example function demonstrating how to integrate Nango with an LLM.
 *
 * @param modelClient The LLM client (e.g., OpenAI instance)
 * @param userId The ID of the user in your application
 * @param integrationId The integration ID (e.g., "hubspot", "google-drive")
 */
export async function runLLMAgent(
    modelClient: any,
    userId: string,
    integrationId: string
) {
    console.log(`🔒 Checking ${integrationId} authorization...`);

    // Step 1: Ensure the user is authorized
    let connectionId: string | undefined;

    try {
        const connections = await nango.listConnections({
            integrationId: integrationId,
            connectionId: userId
        });
        connectionId = connections.connections[0]?.connection_id;
    } catch (err) {
        console.warn("Failed to list connections", err);
    }

    // Step 2: If the user is not authorized, redirect to the auth flow.
    if (!connectionId) {
        console.log(`User not authorized, starting ${integrationId} auth flow...`);

        const session = await nango.createConnectSession({
            allowed_integrations: [integrationId],
            end_user: { id: userId },
        });

        // In a real app, you would send this link to the frontend or user
        console.log(
            `Please authorize ${integrationId} here: ${session.data.connect_link}` // Note: connect_link might depend on specific Nango config, usually usage involves frontend SDK with token
        );

        // Polling for connection (for demo purposes)
        // In production, use Webhooks
        /* 
        const connection = await nango.waitForConnection(integrationId, userId); 
        connectionId = connection?.connection_id; 
        */

        throw new Error("Auth flow required. Please connect via frontend.");
    }

    // Step 3: Send a prompt to your model.
    console.log("🤖 Agent running...");

    // Example using OpenAI format
    const response = await modelClient.chat.completions.create({
        model: "gpt-4-turbo", // or your preferred model
        messages: [
            { role: "user", content: `Get the current ${integrationId} user info using the who_am_i tool.` }
        ],
        tools: [
            {
                type: "function",
                function: {
                    name: "who_am_i",
                    description: `Fetch the current ${integrationId} user profile.`,
                    parameters: { type: "object", properties: {} },
                },
            },
        ],
    });

    const toolCall = response.choices[0]?.message?.tool_calls?.[0];

    if (toolCall?.function?.name === "who_am_i") {
        // Step 4: Execute the requested tool with Nango.
        // triggerAction calls a Nango Sync or Action defined in Nango config
        try {
            const userInfo = await nango.triggerAction(
                integrationId,
                connectionId,
                "whoami"
            );
            console.log(`✅ Retrieved ${integrationId} user info:`, userInfo);
            return userInfo;
        } catch (error) {
            console.error("Action execution failed", error);
            throw error;
        }
    } else {
        const textOutput = response.choices[0]?.message?.content;
        console.log("🗣️ Model response:", textOutput);
        return textOutput;
    }
}
