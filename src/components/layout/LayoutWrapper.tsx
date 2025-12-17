"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";

export default function LayoutWrapper({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Define routes where Header/Footer should be hidden
    // Specifically: /dashboard/chat (and potentially sub-routes of chat if any)
    const isChatPage = pathname?.startsWith("/dashboard/chat");
    const isHomePage = pathname === "/";

    if (isChatPage) {
        return <>{children}</>;
    }

    import { AnimatedCounter } from "@/components/ui/animated-counter";

    // ... inside LayoutWrapper ...

    // Home Page: Header ONLY (No Footer as per request)
    if (isHomePage) {
        return (
            <div className="relative flex min-h-screen flex-col bg-background">
                <div className="flex justify-center pt-4 mb-2">
                    <div className="animate-in fade-in slide-in-from-top-4 duration-700 flex items-center gap-2 rounded-full border border-indigo-100 bg-indigo-50/50 px-4 py-1.5 text-xs font-medium text-indigo-700 backdrop-blur-sm dark:border-indigo-900/50 dark:bg-indigo-900/20 dark:text-indigo-300">
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </span>
                        <span>Trusted by <AnimatedCounter value={10000} />+ Clients</span>
                        <span className="text-indigo-300 dark:text-indigo-700">|</span>
                        <span>Raised $<AnimatedCounter value={5} />M</span>
                    </div>
                </div>
                <Header />
                <main className="flex-1">{children}</main>
            </div>
        );
    }

    // Default: Header + Footer (Dashboard, Billing, etc.)
    return (
        <div className="relative flex min-h-screen flex-col bg-background">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
        </div>
    );
}
