"use client";

import { useState } from "react";
import Nango from "@nangohq/frontend";
import { Button } from "@/components/ui/button"; // Assuming standard shadcn button
// If you don't have components/ui/button, use a standard <button> or provide path
// Checking imports later or assuming standard template

interface NangoConnectProps {
    integrationId: string; // e.g. "google-drive", "notion"
    userId: string; // The user ID in your app
    onSuccess?: () => void;
}

export default function NangoConnect({
    integrationId,
    userId,
    onSuccess,
}: NangoConnectProps) {
    const [loading, setLoading] = useState(false);

    const handleConnect = async () => {
        try {
            setLoading(true);

            // 1. Get Session Token from our API
            const response = await fetch("/api/connector_nango", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    userId,
                    allowed_integrations: [integrationId],
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to get session token");
            }

            const { session_token } = await response.json();

            // 2. Init Nango Frontend SDK
            const nango = new Nango({
                connectSessionToken: session_token,
            });

            // 3. Trigger Auth Flow
            // We assume OAuth flow here as per "Custom UI" docs default tab
            await nango.auth(integrationId);

            // 4. Success handling
            alert(`Connected to ${integrationId}!`);
            if (onSuccess) onSuccess();

        } catch (error) {
            console.error("Nango connection failed:", error);
            alert("Connection failed. Check console.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4 border rounded-lg max-w-sm">
            <h3 className="font-medium text-lg capitalize">
                Connect {integrationId.replace("-", " ")}
            </h3>
            <p className="text-sm text-gray-500">
                Authorize access to import your documents.
            </p>

            {/* Fallback to standard button if Button component doesn't exist */}
            <button
                onClick={handleConnect}
                disabled={loading}
                className="px-4 py-2 bg-black text-white rounded hover:bg-gray-800 disabled:opacity-50"
            >
                {loading ? "Connecting..." : "Connect Account"}
            </button>
        </div>
    );
}
