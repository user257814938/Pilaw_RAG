"use client";

import { usePathname } from "next/navigation";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { AnimatedCounter } from "@/components/ui/animated-counter";

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
    const isServicesPage = pathname === "/services";
    const isSectorsPage = pathname === "/sectors";
    const isContactPage = pathname === "/contact";
    const isPrivacyPage = pathname === "/privacy";
    const isTermsPage = pathname === "/terms";
    const isPricingPage = pathname === "/pricing";

    if (isChatPage) {
        return <>{children}</>;
    }



    // Home Page, Services, Sectors, Contact, Privacy, Terms & Pricing: Header ONLY (Footer handled manually or PublicFooter)
    if (isHomePage || isServicesPage || isSectorsPage || isContactPage || isPrivacyPage || isTermsPage || isPricingPage) {
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
