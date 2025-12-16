import { gateway } from '@ai-sdk/gateway';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { models } = await gateway.getAvailableModels();

        const textModels = models.filter((m) => m.modelType === 'language');
        const embeddingModels = models.filter((m) => m.modelType === 'embedding');

        // Logging to server console as requested
        console.log('Language models:', textModels.map((m) => m.id));
        console.log('Embedding models:', embeddingModels.map((m) => m.id));

        return NextResponse.json({
            languageModels: textModels,
            embeddingModels: embeddingModels,
            all: models
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
