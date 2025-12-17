import { PublicFooter } from "@/components/layout/PublicFooter";
import { Mail, MessageSquare, ShieldCheck, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function ContactPage() {
    const faqs = [
        {
            question: "How secure is my data?",
            answer: "Security is our top priority. We use enterprise-grade encryption for all data at rest and in transit. Our infrastructure is SOC 2 Type II compliant."
        },
        {
            question: "Can I integrate with my existing tools?",
            answer: "Yes, Pilaw supports integrations with major platforms like Google Drive, Slack, Notion, and custom APIs via our Nango connectors."
        },
        {
            question: "Do you offer on-premise deployment?",
            answer: "For enterprise clients with strict data residency requirements, we offer dedicated instances and on-premise deployment options."
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans flex flex-col">
            <main className="flex-1 py-20 bg-zinc-50/50 dark:bg-zinc-900/20">
                <div className="max-w-7xl mx-auto px-6">
                    {/* Hero Section */}
                    <div className="text-center mb-20 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-6 border border-blue-100 dark:border-blue-800">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                            </span>
                            We are here to help
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8 bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            Have questions about our enterprise solutions or need a custom plan? Our team is ready to assist you.
                        </p>
                    </div>

                    {/* Contact Methods Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-24 max-w-5xl mx-auto">

                        {/* Sales / General Inquiries */}
                        <div className="lg:col-span-3 bg-white dark:bg-zinc-900/80 p-10 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl text-center group hover:border-blue-500/50 transition-all">
                            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 mx-auto mb-6 group-hover:scale-110 transition-transform">
                                <Mail className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Contact Sales & Support</h3>
                            <p className="text-zinc-500 dark:text-zinc-400 mb-6">
                                For all inquiries, please reach out to our centralized team.
                            </p>
                            <a
                                href="mailto:contact@amcapital.xyz"
                                className="text-3xl md:text-4xl font-bold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            >
                                contact@amcapital.xyz
                            </a>
                        </div>

                    </div>

                    {/* FAQ Section */}
                    <div className="max-w-3xl mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
                            <p className="text-zinc-500 dark:text-zinc-400">
                                Quick answers to common questions about our platform.
                            </p>
                        </div>

                        <div className="space-y-4">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white dark:bg-zinc-900 p-6 rounded-2xl border border-zinc-200 dark:border-zinc-800 hover:shadow-md transition-shadow">
                                    <h3 className="font-bold text-lg mb-2 flex items-start gap-3">
                                        <HelpCircle className="w-5 h-5 text-zinc-400 mt-1 flex-shrink-0" />
                                        {faq.question}
                                    </h3>
                                    <p className="text-zinc-600 dark:text-zinc-400 pl-8 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </main>
            <PublicFooter />
        </div>
    );
}
