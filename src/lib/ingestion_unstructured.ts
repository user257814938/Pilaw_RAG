import { UnstructuredClient } from "unstructured-client";

export const unstructuredClient = new UnstructuredClient({
    serverURL: process.env.UNSTRUCTURED_API_URL || "https://api.unstructured.io/general/v0/general",
    security: {
        apiKeyAuth: process.env.UNSTRUCTURED_API_KEY || "",
    },
});
