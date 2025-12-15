import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { nango } from "@/lib/connector_nango/connector_nango";

export async function POST(request: NextRequest) {
    try {
        // 1. Verify Signature
        const signature = request.headers.get("x-nango-hmac-sha256");
        if (!signature) {
            return NextResponse.json({ error: "Missing signature" }, { status: 401 });
        }

        const rawBody = await request.text();
        const secretKey = process.env.NANGO_SECRET_KEY;

        if (!secretKey) {
            console.error("Missing NANGO_SECRET_KEY");
            return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
        }

        const hash = crypto
            .createHmac("sha256", secretKey)
            .update(rawBody)
            .digest("hex");

        if (hash !== signature) {
            return NextResponse.json({ error: "Invalid signature" }, { status: 401 });
        }

        // 2. Process Event
        const body = JSON.parse(rawBody);
        console.log(`Nango webhook received [${body.type}]:`, body);

        switch (body.type) {
            case "auth":
                // Handle new connection (save connectionId to user profile in DB)
                if (body.operation === "creation") {
                    console.log(
                        `👉 New connection! Provider: ${body.provider}, User: ${body.endUser?.endUserId}`
                    );
                    // TODO: await db.users.update({ ... })
                }
                break;

            case "sync":
                // Handle sync completion
                if (body.success) {
                    console.log(
                        `👉 Sync success! Model: ${body.model}, Added: ${body.responseResults?.added}`
                    );
                    // TODO: Trigger internal processing (e.g. RAG ingestion)
                } else {
                    console.error("Sync failed:", body.error);
                }
                break;

            default:
                console.log("Unhandled webhook type:", body.type);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("Webhook processing error:", error);
        return NextResponse.json(
            { error: "Webhook processing failed" },
            { status: 500 }
        );
    }
}
