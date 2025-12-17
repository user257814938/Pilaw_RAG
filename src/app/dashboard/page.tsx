import Link from "next/link";
import { MessageSquare, CreditCard, ArrowRight, ShieldCheck, Zap } from "lucide-react";

export default function DashboardPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center p-6">
            <div className="max-w-4xl w-full space-y-12">

                {/* Header Section */}
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-gradient-to-r from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                        Welcome to Pilaw
                    </h1>
                    <p className="text-xl text-zinc-600 dark:text-zinc-400 max-w-2xl mx-auto">
                        Your intelligent legal assistant. Select an action to start.
                    </p>
                </div>

                {/* Cards Grid */}
                <div className="grid md:grid-cols-2 gap-8">

                    {/* Chat Card */}
                    <Link
                        href="/dashboard/chat"
                        className="group relative p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-blue-500/30 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-2xl text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                <MessageSquare className="w-8 h-8" />
                            </div>
                            <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-semibold text-zinc-500">
                                Main
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            Legal Assistant
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                            Ask questions, analyze documents, and get precise answers using multimodal AI.
                        </p>

                        <div className="flex items-center text-blue-600 font-semibold group-hover:translate-x-2 transition-transform">
                            Access Chat <ArrowRight className="w-5 h-5 ml-2" />
                        </div>
                    </Link>

                    {/* Billing Card */}
                    <Link
                        href="/dashboard/billing"
                        className="group relative p-8 bg-white dark:bg-zinc-900 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-sm hover:shadow-2xl hover:border-purple-500/30 transition-all duration-300 overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600 transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></div>

                        <div className="flex items-start justify-between mb-8">
                            <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-2xl text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform duration-300">
                                <CreditCard className="w-8 h-8" />
                            </div>
                            <div className="px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-xs font-semibold text-zinc-500">
                                Account
                            </div>
                        </div>

                        <h2 className="text-2xl font-bold mb-3 text-zinc-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                            Subscription & Billing
                        </h2>
                        <p className="text-zinc-500 dark:text-zinc-400 mb-8 leading-relaxed">
                            Manage your plan, view invoices, and upgrade your capabilities for more power.
                        </p>

                        <div className="flex items-center text-purple-600 font-semibold group-hover:translate-x-2 transition-transform">
                            View Subscription <ArrowRight className="w-5 h-5 ml-2" />
                        </div>
                    </Link>

                </div>

                {/* Footer Info */}
                <div className="flex justify-center gap-8 pt-8 border-t border-zinc-200 dark:border-zinc-800">
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <ShieldCheck className="w-4 h-4" /> Your data is secure
                    </div>
                    <div className="flex items-center gap-2 text-sm text-zinc-500">
                        <Zap className="w-4 h-4" /> Powered by Pilaw
                    </div>
                </div>
            </div>
        </div>
    );
}
