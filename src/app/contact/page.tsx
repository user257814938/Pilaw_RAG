import { Mail } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
    return (
        <div className="flex min-h-screen flex-col bg-zinc-50 dark:bg-zinc-950">
            <main className="flex-1 flex flex-col items-center justify-center p-6 text-center">
                <div className="max-w-2xl w-full space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="space-y-4">
                        <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl bg-gradient-to-br from-zinc-900 to-zinc-600 dark:from-white dark:to-zinc-400 bg-clip-text text-transparent">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-zinc-500 dark:text-zinc-400">
                            We'd love to hear from you.
                        </p>
                    </div>

                    <div className="p-8 bg-white dark:bg-zinc-900/50 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-xl backdrop-blur-sm">
                        <div className="flex flex-col items-center gap-6">
                            <div className="h-16 w-16 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                                <Mail className="w-8 h-8" />
                            </div>

                            <div className="space-y-2">
                                <p className="font-medium text-zinc-500 text-sm uppercase tracking-wider">Email Us</p>
                                <a
                                    href="mailto:contact@amcapital.xyz"
                                    className="text-2xl md:text-3xl font-bold text-zinc-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors break-all"
                                >
                                    contact@amcapital.xyz
                                </a>
                            </div>

                            <Button asChild className="mt-4 rounded-full px-8 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-100">
                                <a href="mailto:contact@amcapital.xyz">
                                    Send Message
                                </a>
                            </Button>
                        </div>
                    </div>

                    <div className="text-sm text-zinc-500">
                        <Link href="/" className="hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors underline underline-offset-4">
                            Back to Home
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    );
}
