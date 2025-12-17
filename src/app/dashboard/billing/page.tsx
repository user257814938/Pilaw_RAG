import { PricingTable } from "@/components/payment_stripe/pricing";
import { BillingSettings } from "@/components/payment_stripe/billing";
import { BadgeCheck, Zap, Shield } from "lucide-react";

export default function BillingPage() {
    return (
        <div className="min-h-screen bg-zinc-50/50 dark:bg-zinc-950/50 pb-20">
            {/* Hero Header */}
            <div className="bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 py-16 px-6 text-center">
                <div className="max-w-3xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-sm font-medium">
                        <Zap className="w-4 h-4" /> Enterprise Plans Available
                    </div>
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
                        Unleash the full potential of Pilaw
                    </h1>
                    <p className="text-lg text-zinc-600 dark:text-zinc-400">
                        Choose the plan that fits your legal needs. Upgrade or cancel at any time.
                    </p>
                </div>
            </div>

            <div className="max-w-6xl mx-auto px-6 mt-12 space-y-16">

                {/* Current Subscription (if active) */}
                <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm">
                    <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                        <BadgeCheck className="w-5 h-5 text-blue-600" /> Your Subscription
                    </h2>
                    <BillingSettings />
                </div>

                {/* Pricing Cards */}
                <div className="space-y-8">
                    <div className="text-center">
                        <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
                        <p className="text-zinc-500">No hidden fees. Simple billing.</p>
                    </div>
                    <PricingTable />
                </div>

                {/* FAQ / Trust Section */}
                <div className="grid md:grid-cols-3 gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto text-blue-600">
                            <Shield className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold">Secure Payment</h3>
                        <p className="text-sm text-zinc-500">Encrypted and secured transactions via Stripe.</p>
                    </div>
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto text-blue-600">
                            <Zap className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold">Instant Activation</h3>
                        <p className="text-sm text-zinc-500">Access Pro features immediately after validation.</p>
                    </div>
                    <div className="text-center space-y-3">
                        <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto text-blue-600">
                            <BadgeCheck className="w-6 h-6" />
                        </div>
                        <h3 className="font-semibold">Cancel Anytime</h3>
                        <p className="text-sm text-zinc-500">No long-term commitment required.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}