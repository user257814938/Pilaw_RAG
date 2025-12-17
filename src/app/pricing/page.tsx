import { PublicFooter } from "@/components/layout/PublicFooter";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { subscriptionPlans } from "@/lib/payment_stripe/subscription_config";

export default function PricingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans flex flex-col">
            <main className="flex-1 py-20 bg-zinc-50/50 dark:bg-zinc-900/20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                            Simple, Transparent Pricing
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900 dark:text-white">
                            Choose Your Intelligence Plan
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            Start small and scale as your data needs grow. No hidden fees.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {subscriptionPlans.map((plan) => {
                            const isPro = plan.name === "Pro";
                            const isEnterprise = plan.name === "Scale" || plan.name === "Enterprise";

                            return (
                                <div
                                    key={plan.priceId}
                                    className={`
                                        rounded-3xl p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
                                        ${isPro
                                            ? "bg-zinc-900 dark:bg-white border border-zinc-900 dark:border-white shadow-xl relative overflow-hidden transform md:-translate-y-4 hover:-translate-y-6"
                                            : "bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-sm"
                                        }
                                    `}
                                >
                                    {isPro && (
                                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                    )}

                                    <h3 className={`text-2xl font-bold mb-2 ${isPro ? "text-white dark:text-zinc-900" : ""}`}>
                                        {plan.name}
                                    </h3>
                                    <p className={`mb-6 ${isPro ? "text-zinc-400 dark:text-zinc-600" : "text-zinc-500 dark:text-zinc-400"}`}>
                                        {plan.description}
                                    </p>

                                    <div className={`text-4xl font-extrabold mb-8 flex items-baseline ${isPro ? "text-white dark:text-zinc-900" : ""}`}>
                                        {plan.price}<span className="text-lg font-normal text-zinc-500 ml-1">/mo</span>
                                    </div>

                                    <ul className={`space-y-4 mb-8 flex-1 ${isPro ? "text-zinc-300 dark:text-zinc-700" : ""}`}>
                                        {plan.features.map((feature, i) => (
                                            <li key={i} className="flex items-center gap-3 text-sm">
                                                <Check className={`w-5 h-5 ${isPro ? "text-blue-400 dark:text-blue-600" : "text-blue-600"}`} />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>

                                    <Link
                                        href="/auth_supabase/signup"
                                        className={`
                                            block w-full text-center py-3 rounded-xl font-semibold transition-colors
                                            ${isPro
                                                ? "bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-900/20"
                                                : "border border-zinc-200 dark:border-zinc-700 hover:bg-zinc-50 dark:hover:bg-zinc-800"
                                            }
                                        `}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}
