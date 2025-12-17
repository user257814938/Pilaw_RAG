import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import { stripe } from '@/lib/payment_stripe/client';
import Stripe from 'stripe';

export async function POST(req: Request) {
    const body = await req.text();
    const signature = (await headers()).get('Stripe-Signature') as string;

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!webhookSecret) {
        return new NextResponse('Missing STRIPE_WEBHOOK_SECRET', { status: 500 });
    }

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            webhookSecret
        );
    } catch (error: any) {
        return new NextResponse(`Webhook Error: ${error.message}`, { status: 400 });
    }

    const session = event.data.object as Stripe.Checkout.Session;

    try {
        switch (event.type) {
            case 'checkout.session.completed':
                // Handle successful subscription/payment
                const userId = session.metadata?.userId;
                const subscriptionId = session.subscription as string;

                console.log(`💰 Payment success for user ${userId}, sub: ${subscriptionId}`);

                // TODO: Update user's subscription status in Supabase
                // await updateUserSubscription(userId, subscriptionId, ...);
                break;

            case 'invoice.payment_succeeded':
                // Handle recurring payment success
                break;

            case 'customer.subscription.updated':
                // Handle plan change or cancellation
                break;

            case 'customer.subscription.deleted':
                // Handle subscription ending
                break;

            default:
                console.log(`Unhandled event type ${event.type}`);
        }
    } catch (error) {
        console.error('[STRIPE_WEBHOOK_HANDLER_ERROR]', error);
        return new NextResponse('Webhook handler failed', { status: 500 });
    }

    return new NextResponse(null, { status: 200 });
}
