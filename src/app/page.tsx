"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle, FileText, Image as ImageIcon, Mic } from "lucide-react";

export default function LandingPage() {
    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 font-sans selection:bg-blue-100 dark:selection:bg-blue-900">

            {/* Navigation handled by LayoutWrapper */}

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8 border border-blue-100 dark:border-blue-800">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                        </span>
                        New: Audio Transcription & OCR Enabled
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight mb-8 bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent pb-2">
                        Enterprise Intelligence.<br />
                        <span className="text-blue-600 dark:text-blue-500">Multimodal RAG.</span>
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Securely chat with your company's data. Upload documents, images, and audio recordings to unlock instant insights using advanced AI.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/auth_supabase"
                            className="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
                        >
                            Start Free Trial <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/auth_supabase"
                            className="w-full sm:w-auto px-8 py-4 bg-zinc-100 dark:bg-zinc-900 text-zinc-900 dark:text-white rounded-xl font-semibold text-lg hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
                        >
                            View Demo
                        </Link>
                    </div>
                </div>

                {/* Background Decor */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full -z-10 opacity-30 pointer-events-none">
                    <div className="absolute top-20 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
                    <div className="absolute top-40 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-zinc-50 dark:bg-zinc-900/50">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold mb-4">Unify Your Data Experience</h2>
                        <p className="text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                            Pilaw handles every format your business relies on. From legal contracts to design mockups and meeting recordings.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Feature 1 */}
                        <div className="group p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300">
                            <div className="w-14 h-14 bg-blue-100 dark:bg-blue-900/30 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                                <FileText className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Document Intelligence</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Upload PDF, DOCX, and TXT files. Our RAG engine indexes every paragraph, making your knowledge base instantly searchable and chat-ready.
                            </p>
                        </div>

                        {/* Feature 2 */}
                        <div className="group p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300">
                            <div className="w-14 h-14 bg-purple-100 dark:bg-purple-900/30 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 mb-6 group-hover:scale-110 transition-transform">
                                <ImageLinkIcon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Visual Understanding</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Don't just read text. Pilaw 'sees' your images, charts, and diagrams using advanced OCR, making visual data accessible to the AI.
                            </p>
                        </div>

                        {/* Feature 3 */}
                        <div className="group p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-emerald-500/50 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300">
                            <div className="w-14 h-14 bg-emerald-100 dark:bg-emerald-900/30 rounded-2xl flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                                <Mic className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Audio Transcription</h3>
                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                Record meetings or upload audio files. We use Whisper to transcribe speech to text, adding a new dimension to your knowledge retrieval.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Trusted By / Social Proof (Mock) */}
            <section className="py-20 border-y border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <p className="text-sm font-semibold uppercase tracking-wider text-zinc-500 mb-8">Trusted by industry leaders</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all">
                        {/* Simple Text Logos for demo */}
                        <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">Acme Corp</span>
                        <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">GlobalBank</span>
                        <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">TechStart</span>
                        <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">LegalEase</span>
                        <span className="text-2xl font-bold text-zinc-800 dark:text-zinc-200">MediCare</span>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-32 relative overflow-hidden">
                <div className="absolute inset-0 bg-blue-600 -skew-y-3 origin-bottom-right transform"></div>
                <div className="max-w-4xl mx-auto px-6 relative z-10 text-center text-white">
                    <h2 className="text-4xl font-bold mb-6">Ready to transform your workflow?</h2>
                    <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
                        Join hundreds of enterprises utilizing Pilaw to secure and query their proprietary data.
                    </p>
                    <Link
                        href="/auth_supabase"
                        className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-zinc-100 transition-colors shadow-xl"
                    >
                        Get Started Now
                    </Link>
                    <div className="mt-8 flex items-center justify-center gap-6 text-blue-200 text-sm">
                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> No credit card required</span>
                        <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Enterprise security</span>
                    </div>
                </div>
            </section>
            {/* Footer */}
            <footer className="py-12 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
                <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-zinc-900 dark:bg-white rounded flex items-center justify-center text-white dark:text-zinc-900 font-bold text-xs">P</div>
                        <span className="font-bold tracking-tight">Pilaw</span>
                    </div>
                    <p className="text-zinc-500 text-sm">
                        © 2026 Pilaw Inc. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                        <a href="#" className="hover:text-blue-600">Privacy</a>
                        <a href="#" className="hover:text-blue-600">Terms</a>
                        <a href="#" className="hover:text-blue-600">Contact</a>
                    </div>
                </div>
            </footer>
        </div>

    );
}

// Icon Helper
function ImageLinkIcon({ className }: { className?: string }) {
    return <ImageIcon className={className} />;
}
