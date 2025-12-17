import { PublicFooter } from "@/components/layout/PublicFooter";
import { ArrowRight, Brain, Database, FileText, Layers, Zap } from "lucide-react";
import Link from "next/link";

export default function ServicesPage() {
    const steps = [
        {
            id: 1,
            title: "Unstructured Embedding",
            description: "We ingest your raw data—PDFs, audio, images. Our engine breaks down complex unstructured files into manageable chunks ready for processing.",
            icon: <FileText className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            color: "bg-blue-100 dark:bg-blue-900/30"
        },
        {
            id: 2,
            title: "Vectorization",
            description: "Data is converted into high-dimensional vectors. This semantic representation allows the AI to understand the 'meaning' behind your content, not just keywords.",
            icon: <Database className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
            color: "bg-purple-100 dark:bg-purple-900/30"
        },
        {
            id: 3,
            title: "Re-ranking",
            description: "We don't just find matches; we rank them. Advanced algorithms re-evaluate the retrieved results to ensure the most contextually relevant information hits the top.",
            icon: <Layers className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
            color: "bg-emerald-100 dark:bg-emerald-900/30"
        },
        {
            id: 4,
            title: "Caching (Redis/Upstash)",
            description: "Speed matters. Frequent queries are cached at the edge using Redis, delivering instant responses and reducing computation costs.",
            icon: <Zap className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
            color: "bg-amber-100 dark:bg-amber-900/30"
        },
        {
            id: 5,
            title: "LLM Generation",
            description: "Finally, the curated context is fed into a powerful Large Language Model (GPT-4, Claude) to generate a precise, human-like answer tailored to your query.",
            icon: <Brain className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
            color: "bg-rose-100 dark:bg-rose-900/30"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans flex flex-col">
            <main className="flex-1 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                            Our Technology Pipeline
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                            From raw data to intelligent insight. Here is how Pilaw turns your documents into answers.
                        </p>
                    </div>

                    <div className="relative max-w-4xl mx-auto">
                        {/* Connecting Line */}
                        <div className="absolute left-8 lg:left-1/2 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2 hidden lg:block"></div>
                        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-zinc-200 dark:bg-zinc-800 -translate-x-1/2 lg:hidden"></div>

                        <div className="space-y-12 lg:space-y-24 relative">
                            {steps.map((step, index) => (
                                <div key={step.id} className={`flex flex-col lg:flex-row gap-8 items-start lg:items-center ${index % 2 === 0 ? 'lg:flex-row-reverse' : ''}`}>

                                    {/* Content Card */}
                                    <div className="flex-1 pl-16 lg:pl-0 w-full">
                                        <div className="bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-xl hover:border-blue-500/30 transition-all duration-300">
                                            <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                                                <span className="lg:hidden inline-flex p-2 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-sm">{step.id}</span>
                                                {step.title}
                                            </h3>
                                            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Center Node/Icon */}
                                    <div className="absolute left-8 lg:left-1/2 -translate-x-1/2 flex items-center justify-center">
                                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center border-4 border-white dark:border-zinc-950 shadow-lg ${step.color} relative z-10`}>
                                            {step.icon}
                                        </div>
                                    </div>

                                    {/* Spacer for alternating layout */}
                                    <div className="flex-1 hidden lg:block"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-24 text-center">
                        <Link
                            href="/auth_supabase"
                            className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all gap-2"
                        >
                            Experience the Power <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}
