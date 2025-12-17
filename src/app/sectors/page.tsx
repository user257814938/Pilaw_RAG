import { PublicFooter } from "@/components/layout/PublicFooter";
import { ArrowRight, Building2, Scale, Stethoscope, Landmark, Cpu } from "lucide-react";
import Link from "next/link";

export default function SectorsPage() {
    const sectors = [
        {
            id: 1,
            title: "Legal & Compliance",
            description: "Automate contract review, analyze case law in seconds, and ensure regulatory compliance by chatting directly with your legal repositories.",
            icon: <Scale className="w-6 h-6 text-blue-600 dark:text-blue-400" />,
            color: "bg-blue-100 dark:bg-blue-900/30"
        },
        {
            id: 2,
            title: "Finance & Banking",
            description: "Instantly retrieve market insights from thousands of reports. Summarize earnings calls and risk assessments with enterprise-grade security.",
            icon: <Landmark className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />,
            color: "bg-emerald-100 dark:bg-emerald-900/30"
        },
        {
            id: 3,
            title: "Real Estate",
            description: "Abstract leases, query property documentation, and compare portfolio data effortlessy using our visual document intelligence.",
            icon: <Building2 className="w-6 h-6 text-amber-600 dark:text-amber-400" />,
            color: "bg-amber-100 dark:bg-amber-900/30"
        },
        {
            id: 4,
            title: "Healthcare",
            description: "Access patient records (HIPAA compliant) and medical research papers quickly to support clinical decision-making and administrative efficiency.",
            icon: <Stethoscope className="w-6 h-6 text-rose-600 dark:text-rose-400" />,
            color: "bg-rose-100 dark:bg-rose-900/30"
        },
        {
            id: 5,
            title: "Technology & SaaS",
            description: "Empower your support teams with instant access to technical documentation, API references, and internal knowledge bases.",
            icon: <Cpu className="w-6 h-6 text-purple-600 dark:text-purple-400" />,
            color: "bg-purple-100 dark:bg-purple-900/30"
        }
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-zinc-950 font-sans flex flex-col">
            <main className="flex-1 py-20">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <h1 className="text-4xl lg:text-5xl font-extrabold tracking-tight mb-6 bg-gradient-to-b from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                            Industries We Serve
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400 max-w-2xl mx-auto">
                            Tailored intelligence for every sector. Discover how Pilaw adapts to your specific vertical.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {sectors.map((sector) => (
                            <div key={sector.id} className="group flex flex-col items-center text-center p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 hover:border-blue-500/50 hover:shadow-xl transition-all duration-300">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform ${sector.color}`}>
                                    {sector.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3 text-zinc-900 dark:text-zinc-100">
                                    {sector.title}
                                </h3>
                                <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
                                    {sector.description}
                                </p>
                            </div>
                        ))}
                    </div>

                    <div className="mt-24 text-center">
                        <Link
                            href="/auth_supabase"
                            className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rounded-xl font-bold text-lg hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-all gap-2"
                        >
                            Transform Your Sector <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </main>
            <PublicFooter />
        </div>
    );
}
