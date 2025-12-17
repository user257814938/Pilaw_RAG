"use client";

import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { subscriptionPlans } from "@/lib/payment_stripe/subscription_config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PricingTable() {
    const [loading, setLoading] = useState<string | null>(null);

    const handleCheckout = async (priceId: string) => {
        if (!priceId) return;

        setLoading(priceId);
        try {
            const response = await fetch("/api/payment_stripe/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ priceId }),
            });

            const data = await response.json();

            if (data.url) {
                window.location.href = data.url;
            } else if (data.error) {
                console.error("Checkout error:", data.error);
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Connection error to payment service.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="grid gap-8 lg:grid-cols-3">
            {subscriptionPlans.map((plan) => (
                <Card
                    key={plan.name}
                    className={cn(
                        "relative flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl",
                        plan.popular
                            ? "border-blue-500 shadow-blue-500/20 scale-105 z-10 bg-white dark:bg-zinc-900"
                            : "border-zinc-200 dark:border-zinc-800 hover:border-blue-300 dark:hover:border-blue-700 bg-white dark:bg-zinc-900/50"
                    )}
                >
                    {plan.popular && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs font-bold uppercase tracking-wider rounded-full shadow-lg">
                            Recommended
                        </div>
                    )}

                    <CardHeader>
                        <CardTitle className="text-2xl font-bold flex items-center justify-between">
                            {plan.name}
                        </CardTitle>
                        <CardDescription className="text-zinc-500 h-10">{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1">
                        <div className="mb-8">
                            <span className="text-5xl font-extrabold tracking-tight text-zinc-900 dark:text-white">{plan.price}</span>
                            <span className="text-zinc-500 font-medium ml-1">/month</span>
                        </div>
                        <ul className="space-y-4">
                            {plan.features.map((feature) => (
                                <li key={feature} className="flex items-start gap-3">
                                    <div className="mt-1 h-5 w-5 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center shrink-0">
                                        <Check className="h-3 w-3 text-blue-600 dark:text-blue-400" />
                                    </div>
                                    <span className="text-sm text-zinc-600 dark:text-zinc-300">{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </CardContent>
                    <CardFooter>
                        <Button
                            className={cn(
                                "w-full py-6 text-lg font-semibold rounded-xl transition-all shadow-md hover:shadow-lg",
                                plan.popular
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700"
                            )}
                            onClick={() => handleCheckout(plan.priceId)}
                            disabled={loading === plan.priceId}
                        >
                            {loading === plan.priceId ? (
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            ) : null}
                            {loading === plan.priceId ? "Processing..." : `Choose ${plan.name}`}
                        </Button>
                    </CardFooter>
                </Card>
            ))}
        </div>
    );
}
