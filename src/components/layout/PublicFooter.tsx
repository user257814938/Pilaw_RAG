import Link from "next/link";

export function PublicFooter() {
    return (
        <footer className="py-12 bg-white dark:bg-zinc-950 border-t border-zinc-200 dark:border-zinc-800">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-zinc-900 dark:bg-white rounded flex items-center justify-center text-white dark:text-zinc-900 font-bold text-xs">P</div>
                    <span className="font-bold tracking-tight">Pilaw</span>
                </div>
                <p className="text-zinc-500 text-sm">
                    © 2026 Pilaw Inc. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm text-zinc-600 dark:text-zinc-400">
                    <a href="#" className="hover:text-blue-600">Privacy</a>
                    <a href="#" className="hover:text-blue-600">Terms</a>
                    <Link href="/contact" className="hover:text-blue-600">Contact</Link>
                </div>
            </div>
        </footer>
    );
}
