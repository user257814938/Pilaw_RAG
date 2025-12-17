import { PublicFooter } from "@/components/layout/PublicFooter";
import { Check, X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

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
                        {/* Starter */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <h3 className="text-2xl font-bold mb-2">Starter</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Perfect for individuals and small teams.</p>
                            <div className="text-4xl font-extrabold mb-8 flex items-baseline">
                                $29<span className="text-lg font-normal text-zinc-500 ml-1">/mo</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-600" /> 1,000 Documents
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-600" /> Basic RAG Search
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-600" /> 5 Team Members
                                </li>
                                <li className="flex items-center gap-3 text-sm text-zinc-400">
                                    <X className="w-5 h-5" /> No API Access
                                </li>
                            </ul>
                            <Link href="/auth_supabase/signup" className="block w-full text-center py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                Get Started
                            </Link>
                        </div>

                        {/* Pro */}
                        <div className="bg-zinc-900 dark:bg-white rounded-3xl p-8 border border-zinc-900 dark:border-white shadow-xl flex flex-col relative overflow-hidden transform md:-translate-y-4 transition-all duration-300 hover:-translate-y-6 hover:shadow-2xl">
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                            <h3 className="text-2xl font-bold mb-2 text-white dark:text-zinc-900">Pro</h3>
                            <p className="text-zinc-400 dark:text-zinc-600 mb-6">For growing businesses needing power.</p>
                            <div className="text-4xl font-extrabold mb-8 flex items-baseline text-white dark:text-zinc-900">
                                $99<span className="text-lg font-normal text-zinc-500 ml-1">/mo</span>
                            </div>
                            <ul className="space-y-4 mb-8 flex-1 text-zinc-300 dark:text-zinc-700">
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-400 dark:text-blue-600" /> Unlimited Documents
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-400 dark:text-blue-600" /> Advanced RAG + Re-ranking
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-400 dark:text-blue-600" /> 20 Team Members
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-400 dark:text-blue-600" /> Full API Access
                                </li>
                            </ul>
                            <Link href="/auth_supabase/signup" className="block w-full text-center py-3 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-900/20">
                                Try Pro Free
                            </Link>
                        </div>

                        {/* Enterprise */}
                        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-8 border border-zinc-200 dark:border-zinc-800 shadow-sm flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                            <h3 className="text-2xl font-bold mb-2">Enterprise</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-6">Custom solutions for large organizations.</p>
                            <div className="text-4xl font-extrabold mb-8 flex items-baseline">
                                Custom
                            </div>
                            <ul className="space-y-4 mb-8 flex-1">
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-600" /> On-premise Deployment
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-600" /> Dedicated Success Manager
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-600" /> SSO & Audit Logs
                                </li>
                                <li className="flex items-center gap-3 text-sm">
                                    <Check className="w-5 h-5 text-blue-600" /> Custom AI Model Tuning
                                </li>
                            </ul>
                            <Link href="/contact" className="block w-full text-center py-3 rounded-xl border border-zinc-200 dark:border-zinc-700 font-semibold hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">
                                Contact Sales
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}
