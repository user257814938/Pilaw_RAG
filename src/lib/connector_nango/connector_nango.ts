import { Nango } from "@nangohq/node";

if (!process.env.NANGO_SECRET_KEY) {
    // Warn but don't crash dev if missing, but it will fail on usage
    console.warn("Missing NANGO_SECRET_KEY env var");
}

export const nango = new Nango({
    secretKey: process.env.NANGO_SECRET_KEY || "dummy",
});

// Exemple : Récupérer une connexion
export async function getNangoConnection(
    integrationId: string,
    connectionId: string
) {
    return await nango.getConnection(integrationId, connectionId);
}

// Exemple : Proxy d'une requête API
export async function makeProxiedRequest(
    integrationId: string,
    connectionId: string,
    endpoint: string
) {
    return await nango.proxy({
        providerConfigKey: integrationId,
        connectionId,
        endpoint,
        method: "GET",
    });
}
