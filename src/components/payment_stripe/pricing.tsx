"use client";

import { Check, Loader2 } from "lucide-react";
import { useState } from "react";
import { subscriptionPlans } from "@/lib/payment_stripe/subscription_config";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function PricingTable({ currentPlan }: { currentPlan?: string }) {
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
        <div className="grid md:grid-cols-3 gap-8">
            {subscriptionPlans.map((plan) => {
                const isPro = plan.name === "Pro";
                // For billing dashboard, we likely don't want "Enterprise" to capture "Scale" logic unless specified.
                // But mimicking public page logic:
                const isEnterprise = plan.name === "Enterprise";

                // Check if this is the active plan (case-insensitive for safety)
                const isActive = currentPlan?.toLowerCase() === plan.name.toLowerCase();

                return (
                    <div
                        key={plan.priceId}
                        className={`
                            rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                            ${isPro
                                ? "bg-zinc-900 dark:bg-white border border-zinc-900 dark:border-white shadow-xl relative overflow-hidden transform md:-translate-y-4 hover:-translate-y-6"
                                : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                            }
                            ${isActive ? "ring-2 ring-blue-500 ring-offset-2 dark:ring-offset-zinc-950 px-8" : ""}
                        `}
                    >
                        {isPro && (
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                        )}

                        <div className="flex justify-between items-start mb-2">
                            <h3 className={`text-2xl font-bold ${isPro ? "text-white dark:text-zinc-900" : ""}`}>
                                {plan.name}
                            </h3>
                            {isActive && (
                                <span className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                                    Current
                                </span>
                            )}
                        </div>

                        <p className={`mb-6 ${isPro ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"}`}>
                            {plan.description}
                        </p>

                        <div className={`text-4xl font-extrabold mb-8 flex items-baseline ${isPro ? "text-white dark:text-zinc-900" : ""}`}>
                            {plan.price}<span className="text-lg font-normal text-zinc-500 ml-1">/mo</span>
                        </div>

                        <ul className={`space-y-4 mb-8 flex-1 ${isPro ? "text-zinc-300 dark:text-zinc-700" : ""}`}>
                            {plan.features.map((feature, i) => (
                                <li key={i} className="flex items-center gap-3 text-sm">
                                    <div className={`mt-0.5 h-5 w-5 rounded-full flex items-center justify-center shrink-0 ${isPro ? "bg-white/10 dark:bg-black/5" : "bg-blue-100 dark:bg-blue-900/30"}`}>
                                        <Check className={`h-3 w-3 ${isPro ? "text-blue-400 dark:text-blue-600" : "text-blue-600"}`} />
                                    </div>
                                    {feature}
                                </li>
                            ))}
                        </ul>

                        <Button
                            className={cn(
                                "w-full py-6 text-lg font-semibold rounded-xl transition-all shadow-md hover:shadow-lg",
                                isPro
                                    ? "bg-blue-600 hover:bg-blue-700 text-white"
                                    : "bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-700",
                                isActive && "opacity-50 cursor-not-allowed"
                            )}
                            onClick={() => !isActive && !isEnterprise && handleCheckout(plan.priceId)}
                            disabled={loading === plan.priceId || isActive || isEnterprise}
                        >
                            {loading === plan.priceId ? (
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            ) : null}
                            {isActive
                                ? "Current Plan"
                                : isEnterprise
                                    ? "Contact Sales"
                                    : loading === plan.priceId
                                        ? "Processing..."
                                        : `Choose ${plan.name}`
                            }
                        </Button>
                    </div>
                );
            })}
        </div>
    );
}
