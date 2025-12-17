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
        name: 'Starter',
        description: 'Perfect for individuals and small teams getting started with RAG technology',
        priceId: 'price_1SfO4lCBrsPCUxy5brM6v1Ne',
        price: '25,00$',
        features: [
            'Unlimited messages',
            '100 documents',
            'Basic AI models',
        ],
    },
    {
        name: 'Pro',
        description: 'Ideal for growing teams and businesses with advanced RAG requirements',
        priceId: 'price_1SfO4jCBrsPCUxy5vGZ0Z5zT',
        price: '50,00$',
        features: [
            'Unlimited messages',
            '1,000 documents',
            'Advanced AI models',
            'Hybrid search',
        ],
        popular: true,
    },
    {
        name: 'Scale',
        description: 'Enterprise-grade solution for large organizations with maximum performance and scalability',
        priceId: 'price_1SfO4gCBrsPCUxy5FdrPMGoB',
        price: '500,00$',
        features: [
            'Unlimited messages',
            '30,000 documents',
            'Advanced AI models',
            'Hybrid search',
            'Priority support',
        ],
    },
];
