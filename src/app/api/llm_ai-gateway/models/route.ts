import { gateway } from '@ai-sdk/gateway';
import { NextResponse } from 'next/server';
import { getDynamicModels } from '@/lib/llm_ai-gateway/model_selection';

export const dynamic = 'force-dynamic';

export async function GET() {
    try {
        const { languageModels, embeddingModels, all } = await getDynamicModels();

        // Logging to server console as requested
        console.log('Language models:', languageModels.map((m) => m.id));
        console.log('Embedding models:', embeddingModels.map((m) => m.id));

        return NextResponse.json({
            languageModels,
            embeddingModels,
            all
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
