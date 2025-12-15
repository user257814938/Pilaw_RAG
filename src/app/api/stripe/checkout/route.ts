import { NextResponse } from 'next/server';
import { stripe } from '@/lib/payment_stripe/client';
import { createClient } from '@/lib/database_supabase/server';

export async function POST(req: Request) {
    try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return new NextResponse('Unauthorized', { status: 401 });
        }

        const { priceId, quantity = 1, metadata = {} } = await req.json();

        if (!priceId) {
            return new NextResponse('Missing priceId', { status: 400 });
        }

        // Success and Cancel URLs
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
        const successUrl = `${appUrl}/dashboard/settings?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${appUrl}/dashboard/settings`;

        // Create Checkout Session
        const session = await stripe.checkout.sessions.create({
            mode: 'subscription', // or 'payment' for one-time
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: quantity,
                },
            ],
            customer_email: user.email, // Pre-fill email
            metadata: {
                userId: user.id,
                ...metadata,
            },
            success_url: successUrl,
            cancel_url: cancelUrl,
            allow_promotion_codes: true,
            subscription_data: {
                metadata: {
                    userId: user.id,
                },
            },
        });

        return NextResponse.json({ url: session.url });
    } catch (error: any) {
        console.error('[STRIPE_CHECKOUT_ERROR]', error);
        return new NextResponse('Internal Error', { status: 500 });
    }
}
