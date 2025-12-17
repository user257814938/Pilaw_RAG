import { PublicFooter } from "@/components/layout/PublicFooter";
import { ArrowRight, Building2, Scale, Stethoscope, Landmark, Cpu } from "lucide-react";
import Link from "next/link";

export default function SectorsPage() {
    const sectors = [
        {
            id: 1,
            title: "Legal & Compliance",
            description: "Automate contract review, analyze case law in seconds, and ensure regulatory compliance by chatting directly with your legal repositories.",
            icon: <Scale className="w-12 h-12 text-blue-600 dark:text-blue-400" />,
            gradient: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
            border: "border-blue-200 dark:border-blue-800",
            buttonColor: "bg-blue-600 hover:bg-blue-700"
        },
        {
            id: 2,
            title: "Finance & Banking",
            description: "Instantly retrieve market insights from thousands of reports. Summarize earnings calls and risk assessments with enterprise-grade security.",
            icon: <Landmark className="w-12 h-12 text-emerald-600 dark:text-emerald-400" />,
            gradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
            border: "border-emerald-200 dark:border-emerald-800",
            buttonColor: "bg-emerald-600 hover:bg-emerald-700"
        },
        {
            id: 3,
            title: "Real Estate",
            description: "Abstract leases, query property documentation, and compare portfolio data effortlessly using our visual document intelligence.",
            icon: <Building2 className="w-12 h-12 text-amber-600 dark:text-amber-400" />,
            gradient: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
            border: "border-amber-200 dark:border-amber-800",
            buttonColor: "bg-amber-600 hover:bg-amber-700"
        },
        {
            id: 4,
            title: "Healthcare",
            description: "Access patient records (HIPAA compliant) and medical research papers quickly to support clinical decision-making and administrative efficiency.",
            icon: <Stethoscope className="w-12 h-12 text-rose-600 dark:text-rose-400" />,
            gradient: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30",
            border: "border-rose-200 dark:border-rose-800",
            buttonColor: "bg-rose-600 hover:bg-rose-700"
        },
        {
            id: 5,
            title: "Technology & SaaS",
            description: "Empower your support teams with instant access to technical documentation, API references, and internal knowledge bases.",
            icon: <Cpu className="w-12 h-12 text-purple-600 dark:text-purple-400" />,
            gradient: "from-purple-50 to-violet-50 dark:from-purple-950/30 dark:to-violet-950/30",
            border: "border-purple-200 dark:border-purple-800",
            buttonColor: "bg-purple-600 hover:bg-purple-700"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans flex flex-col">
            <main className="flex-1 py-20 bg-zinc-50/50 dark:bg-zinc-900/20">
                <div className="max-w-5xl mx-auto px-6">
                    <div className="text-center mb-24">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-6">
                            Industry Solutions
                        </div>
                        <h1 className="text-4xl lg:text-6xl font-extrabold tracking-tight mb-8 bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                            Specialized Intelligence.<br />
                            For Your Sector.
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto leading-relaxed">
                            Pilaw isn't just a generic tool. It's tuned to understand the nuances, jargon, and document types specific to your industry.
                        </p>
                    </div>

                    <div className="space-y-12 pb-24">
                        {sectors.map((sector, index) => (
                            <div
                                key={sector.id}
                                className="sticky top-28"
                                style={{
                                    zIndex: index + 1,
                                    // Slight rotation scaling for card stack effect could be added here if desired
                                }}
                            >
                                <div className={`
                                    relative overflow-hidden rounded-[2.5rem] p-8 md:p-12 
                                    bg-gradient-to-br ${sector.gradient} 
                                    border ${sector.border} 
                                    shadow-2xl shadow-zinc-200/50 dark:shadow-black/50 
                                    backdrop-blur-xl transition-all duration-500
                                    flex flex-col md:flex-row gap-8 md:gap-16 items-center
                                `}>
                                    {/* Icon / Visual Side */}
                                    <div className="flex-shrink-0">
                                        <div className="w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-zinc-950 rounded-3xl flex items-center justify-center shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                                            {sector.icon}
                                        </div>
                                    </div>

                                    {/* Content Side */}
                                    <div className="flex-1 text-center md:text-left">
                                        <h2 className="text-3xl font-bold mb-4 text-zinc-900 dark:text-white">
                                            {sector.title}
                                        </h2>
                                        <p className="text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed mb-8">
                                            {sector.description}
                                        </p>

                                        <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                                            <Link
                                                href="/auth_supabase"
                                                className={`inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold text-white shadow-lg transition-transform hover:scale-105 ${sector.buttonColor}`}
                                            >
                                                Start {sector.title.split(' ')[0]} Trial
                                            </Link>
                                            <Link
                                                href="/contact"
                                                className="inline-flex items-center justify-center px-6 py-3 rounded-xl font-semibold bg-white/50 dark:bg-black/20 text-zinc-900 dark:text-white hover:bg-white/80 dark:hover:bg-black/30 transition-colors"
                                            >
                                                Learn More
                                            </Link>
                                        </div>
                                    </div>

                                    {/* Background Decor Number */}
                                    <div className="absolute -right-6 -bottom-12 text-[12rem] font-bold opacity-5 pointer-events-none select-none">
                                        {sector.id}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}
