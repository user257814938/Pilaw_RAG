"use client";

import { Check } from "lucide-react";
import { useState } from "react";
import { subscriptionPlans } from "@/lib/payment_stripe/subscription_config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PricingTable() {
    const [loading, setLoading] = useState<string | null>(null);

    const handleCheckout = async (priceId: string) => {
        if (!priceId) return; // Free plan or custom logic

        setLoading(priceId);
        try {
            const response = await fetch("/api/stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error("Checkout error:", error);
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            {subscriptionPlans.map((plan) => (
                <Card
                    key={plan.name}
                    className={cn(
                        "flex flex-col",
                        plan.popular ? "border-primary shadow-lg scale-105" : ""
                    )}
                >
                    <CardHeader>
                        <CardTitle className="text-2xl">{plan.name}</CardTitle>
                        <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="mb-6">
                            <span className="text-4xl font-bold">{plan.price}</span>
                            <span className="text-muted-foreground">/month</span>
                        </div>
                        <ul className="space-y-3">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-center gap-2">
                                    <Check className="h-4 w-4 text-primary" />
                                    <span className="text-sm text-muted-foreground">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className="w-full"
                            variant={plan.popular ? "default" : "outline"}
                            onClick={() => handleCheckout(plan.priceId)}
                            disabled={loading === plan.priceId}
                        >
                            {loading === plan.priceId ? "Processing..." : "Subscribe"}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
