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
        name: 'Starter Plan',
        description: 'Perfect for individuals and small teams getting started with RAG technology',
        priceId: 'price_1SfJeMCKgEFZ6loOMXX67HC1',
        price: '25,00$',
        features: [
            'Unlimited messages',
            '100 documents',
            'Basic AI models',
        ],
    },
    {
        name: 'Pro Plan',
        description: 'Ideal for growing teams and businesses with advanced RAG requirements',
        priceId: 'price_1SfJfWCKgEFZ6loO3O24YFm2',
        price: '50,00$',
        features: [
            'Unlimited messages',
            'Advanced AI models',
            'Priority support',
            'Hybrid search',
        ],
        popular: true,
    },
    {
        name: 'Scale Plan',
        description: 'Enterprise-grade solution for large organizations with maximum performance and scalability',
        priceId: 'price_1SfJgqCKgEFZ6loOAbgtwNdm',
        price: '100,00$',
        features: [
            'Unlimited messages',
            'Advanced AI models',
            'Priority support',
            'Hybrid search',
        ],
    },
];
