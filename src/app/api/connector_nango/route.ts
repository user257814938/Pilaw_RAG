import { NextRequest, NextResponse } from "next/server";
import { nango } from "@/lib/connector_nango/connector_nango";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { userId, allowed_integrations } = body;

        if (!userId) {
            return NextResponse.json(
                { error: "userId is required" },
                { status: 400 }
            );
        }

        // Create a connect session for the specific user
        const res = await nango.createConnectSession({
            end_user: {
                id: userId,
            },
            allowed_integrations: allowed_integrations || [], // e.g. ["notion", "google-drive"]
        });

        return NextResponse.json({ session_token: res.data.token });
    } catch (error) {
        console.error("Nango session creation error:", error);
        return NextResponse.json(
            { error: "Failed to create Nango session" },
            { status: 500 }
        );
    }
}
