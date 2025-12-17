"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { signout } from '@/app/auth_supabase/actions';

export function Header() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");

    return (
        <header className="sticky top-6 z-50 w-full px-4 md:px-0">
            <div className="mx-auto flex h-14 max-w-5xl items-center justify-between rounded-full border border-border/50 bg-background/80 px-6 shadow-md backdrop-blur-md ring-1 ring-white/10 supports-[backdrop-filter]:bg-background/60">
                <div className="flex items-center gap-2 transition-transform hover:scale-105">
                    <Link href={isDashboard ? "/dashboard" : "/"} className="flex items-center space-x-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-blue-600 text-white font-bold shadow-sm">
                            P
                        </div>
                        <span className="hidden font-bold tracking-tight sm:inline-block">Pilaw</span>
                    </Link>
                </div>

                <nav className="flex items-center gap-6">
                    {isDashboard ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Dashboard
                                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-indigo-600 transition-all group-hover:w-full"></span>
                            </Link>
                            <Link
                                href="/dashboard/chat"
                                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Chat
                                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-indigo-600 transition-all group-hover:w-full"></span>
                            </Link>
                            <Link
                                href="/dashboard/billing"
                                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Billing
                                <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-indigo-600 transition-all group-hover:w-full"></span>
                            </Link>
                            <form action={signout}>
                                <button
                                    type="submit"
                                    className="text-sm font-medium text-red-600 transition-colors hover:text-red-700 hover:bg-red-50 px-3 py-1.5 rounded-md"
                                >
                                    Sign out
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            {/* Public Links - Centered (Visual trick via flex order or just grouping) */}
                            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center gap-6">
                                <Link
                                    href="/services"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Services
                                </Link>
                                <Link
                                    href="/sectors"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Sectors
                                </Link>
                                <Link
                                    href="/pricing"
                                    className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                                >
                                    Pricing
                                </Link>
                            </div>

                            {/* Right Side Auth Buttons */}
                            <Link
                                href="/auth_supabase/signin"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                            >
                                Log in
                            </Link>
                            <Link
                                href="/auth_supabase/signup"
                                className="group relative inline-flex h-9 items-center justify-center overflow-hidden rounded-md bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:ring-2 hover:ring-zinc-900 hover:ring-offset-2 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200"
                            >
                                <span className="relative z-10">Get Started</span>
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header >
    );
}
