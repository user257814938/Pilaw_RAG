import { NextResponse } from 'next/server';
import { stripe } from '@/lib/payment_stripe/client';
import { createClient } from '@/lib/database_supabase/server';

import { cookies } from 'next/headers';

export async function POST(req: Request) {
    try {
        const cookieStore = await cookies();
        console.log('[STRIPE_CHECKOUT] Cookies received:', cookieStore.getAll().map(c => c.name));

        const supabase = createClient(cookieStore);

        // 1. Check Auth
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        if (authError) {
            console.error('[STRIPE_CHECKOUT] Auth Error:', authError.message);
        }

        // 2. Connectivity Check (Optional Debug)
        try {
            const { error: dbError } = await supabase.from('documents').select('id').limit(1);
            if (dbError) console.error('[STRIPE_CHECKOUT] DB Connectivity Check Failed:', dbError.message);
            else console.log('[STRIPE_CHECKOUT] DB Connectivity Check: OK');
        } catch (e) {
            console.error('[STRIPE_CHECKOUT] DB Check Threw:', e);
        }

        if (!user) {
            console.error('[STRIPE_CHECKOUT] User is NULL. Auth failed.');
            return NextResponse.json({ error: 'Unauthorized: No active session' }, { status: 401 });
        }

        const { priceId, quantity = 1, metadata = {} } = await req.json();

        if (!priceId) {
            return NextResponse.json({ error: 'Missing priceId' }, { status: 400 });
        }

        // Success and Cancel URLs
        // Priority: Defined Site URL -> Vercel URL -> Localhost
        const appUrl = process.env.NEXT_PUBLIC_SITE_URL
            || process.env.NEXT_PUBLIC_APP_URL
            || (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '');
        const successUrl = `${appUrl}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}`;
        const cancelUrl = `${appUrl}/dashboard/billing`;

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
        return NextResponse.json(
            { error: error.message || 'Internal Error' },
            { status: 500 }
        );
    }
}
