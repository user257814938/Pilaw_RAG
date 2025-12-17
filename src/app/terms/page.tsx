import { PublicFooter } from "@/components/layout/PublicFooter";
import Link from "next/link";
import { Gavel, AlertCircle, FileText, Ban } from "lucide-react";

export default function TermsPage() {
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
                            Terms of Service
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 leading-relaxed">
                            Please read these terms carefully before using the Pilaw platform.
                        </p>
                    </div>

                    {/* Content */}
                    <div className="prose prose-zinc dark:prose-invert max-w-none space-y-12">

                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                                <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                1. Acceptance of Terms
                            </h2>
                            <p>
                                By accessing or using Pilaw ("the Service"), you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the Service.
                            </p>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                                <Gavel className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                                2. Use of Service
                            </h2>
                            <p>
                                You are responsible for maintaining the security of your account and password. The Service is provided for professional and enterprise use.
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                                <li>You must provide accurate and complete registration information.</li>
                                <li>You may not use the Service for any illegal or unauthorized purpose.</li>
                                <li>You must not violate any laws in your jurisdiction (including copyright laws).</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                                <Ban className="w-6 h-6 text-rose-600 dark:text-rose-400" />
                                3. Acceptable Use Policy
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                You agree not to misuse the Pilaw services. For example, you must not:
                            </p>
                            <ul className="list-disc pl-6 space-y-2 text-zinc-600 dark:text-zinc-400">
                                <li>Interfere with or disrupt the access of any user, host, or network.</li>
                                <li>Attempt to gain unauthorized access to the Service or related systems.</li>
                                <li>Upload material that is malicious, infringing, or libelous.</li>
                            </ul>
                        </section>

                        <section>
                            <h2 className="flex items-center gap-3 text-2xl font-bold mb-4">
                                <AlertCircle className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                4. Limitation of Liability
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400">
                                In no event shall Pilaw, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
                            </p>
                        </section>

                        <section>
                            <h2 className="text-2xl font-bold mb-4">
                                5. Termination
                            </h2>
                            <p className="text-zinc-600 dark:text-zinc-400 mb-4">
                                We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms.
                            </p>

                        </section>

                    </div>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}
