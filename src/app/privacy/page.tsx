import { PublicFooter } from "@/components/layout/PublicFooter";
import Link from "next/link";
import { ShieldCheck, Lock, Eye, Server } from "lucide-react";

export default function PrivacyPolicyPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans flex flex-col">
            <main className="flex-1 py-20">
                <div className="max-w-4xl mx-auto px-6">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6">
                            Last Updated: December 17, 2025
                        </div>
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900 dark:text-white">
                            Privacy Policy
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            We take your data security seriously. This document outlines how Pilaw collects, processes, and protects your information.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">

                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                                <Eye className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                1. Information We Collect
                            </h2>
                            <p>
                                To provide our RAG and intelligence services, we strictly collect only what is necessary:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                                <li><strong>Account Information:</strong> Name, email address, and authentication credentials via Supabase.</li>
                                <li><strong>Uploaded Data:</strong> Documents (PDF, DOCX), images, and audio files you explicitly upload to the platform for indexing.</li>
                                <li><strong>Usage Data:</strong> Anonymized interaction logs to improve search relevance and system performance.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                                <Server className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                2. How We Use Data
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                Your data powers the intelligence engine. We use it solely to:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                                <li>Index and store content in our secure vector databases.</li>
                                <li>Retrieve relevant context to answer your specific queries.</li>
                                <li>Process billing and subscription management via Stripe.</li>
                            </ul>
                            <p className="mt-4 font-semibold text-zinc-900 dark:text-zinc-100">
                                We DO NOT train our foundational models on your private data without explicit enterprise consent.
                            </p>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                                <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                3. Data Sharing & Disclosure
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                We do not sell your personal data. We only share data with trusted third-party sub-processors required to run the service:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                                <li><strong>Supabase:</strong> For database and authentication.</li>
                                <li><strong>Stripe:</strong> For payment processing.</li>
                                <li><strong>OpenAI / Anthropic:</strong> For LLM inference (data is sent transiently and not used for training).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                                <Lock className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                                4. Security Measures
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                We employ industry-standard security practices, including:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                                <li>Encryption at rest (AES-256) and in transit (TLS 1.3).</li>
                                <li>Strict Row Level Security (RLS) in our databases to ensure tenant isolation.</li>
                                <li>Regular security audits and vulnerability scanning.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">
                                5. Your Rights (GDPR & CCPA)
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                You have the right to access, rectify, or delete your data at any time. You can export your workspace data directly from the dashboard or contact support for full deletion.
                            </p>
                            <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800">
                                <h3 className="font-bold mb-2">Contact DPO</h3>
                                <p className="text-sm text-zinc-500 mb-4">
                                    For any privacy-related concerns, please reach out to our Data Protection Officer.
                                </p>
                                <a href="mailto:privacy@amcapital.xyz" className="text-blue-600 font-medium hover:underline">
                                    privacy@amcapital.xyz
                                </a>
                            </div>
                        </section>

                    </div>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}
