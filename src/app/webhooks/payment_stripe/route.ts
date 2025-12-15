import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
    console.log('Stripe webhook received');

    // TODO: Verify signature and handle event
    // const sig = req.headers.get('stripe-signature');
    // const body = await req.text();

    return NextResponse.json({ received: true });
}
