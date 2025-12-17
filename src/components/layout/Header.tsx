"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Header() {
    const pathname = usePathname();
    const isDashboard = pathname?.startsWith("/dashboard");

    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background">
            <div className="container flex h-14 max-w-screen-2xl items-center justify-between px-4 md:px-8">
                <div className="flex items-center gap-2">
                    {isDashboard && (
                        <Link href="/dashboard" className="flex items-center space-x-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-bold">
                                P
                            </div>
                            <span className="hidden font-bold sm:inline-block">Pilaw</span>
                        </Link>
                    )}
                </div>

                <nav className="flex items-center gap-4">
                    {isDashboard ? (
                        <>
                            <Link
                                href="/dashboard"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Dashboard
                            </Link>
                            <Link
                                href="/dashboard/chat"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Chat
                            </Link>
                            <Link
                                href="/dashboard/billing"
                                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                            >
                                Billing
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link
                                href="/auth_supabase/signin"
                                className="hidden lg:inline-flex h-9 items-center justify-center rounded-md bg-secondary px-4 py-2 text-sm font-medium text-secondary-foreground shadow-sm transition-colors hover:bg-secondary/80 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                            >
                                Log in
                            </Link>
                        </>
                    )}
                </nav>
            </div>
        </header >
    );
}
