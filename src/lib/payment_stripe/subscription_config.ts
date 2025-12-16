export type SubscriptionPlan = {
    name: string;
    description: string;
    priceId: string; // Stripe Price ID
    price: string;
    features: string[];
    popular?: boolean;
};

export const subscriptionPlans: SubscriptionPlan[] = [
    {
        name: 'Free',
        description: 'Perfect for getting started',
        priceId: '', // Free plan has no price ID or use a product ID if needed for tracking
        price: '$0',
        features: [
            'Access to basic AI models',
            '50 messages per day',
            'Community support',
            'Basic RAG context',
        ],
    },
    {
        name: 'Pro',
        description: 'For power users and professionals',
        priceId: 'price_1Q...', // REPLACE WITH REAL STRIPE PRICE ID
        price: '$29',
        features: [
            'Unlimited AI messages',
            'Access to Premium Models (GPT-4o)',
            'Priority support',
            'Advanced Reranking (Cohere)',
            'Larger Context Window',
        ],
        popular: true,
    },
];
