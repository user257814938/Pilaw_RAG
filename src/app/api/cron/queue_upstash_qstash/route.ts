import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    // Cette fonction est appelée quand QStash tape sur l'URL
    // Elle s'exécute sur le serveur (comme un script)

    console.log('QStash trigger received');

    // TODO: Appeler le pipeline d'ingestion ici
    // await ingestPipeline.run();

    return NextResponse.json({ success: true });
}
