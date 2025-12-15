import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log('Nango webhook received');

    // TODO: Handle sync event
    // const body = await req.json();

    return NextResponse.json({ received: true });
}
