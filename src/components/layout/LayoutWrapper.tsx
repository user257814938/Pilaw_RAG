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

    // Home Page: Header ONLY (No Footer as per request)
    if (isHomePage) {
        return (
            <div className="relative flex min-h-screen flex-col bg-background">
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
