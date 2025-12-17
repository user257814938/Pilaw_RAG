import Link from 'next/link';

export function Footer() {
    return (
        <footer className="border-t">
            <div className="container flex flex-col items-center justify-between gap-6 py-8 md:h-24 md:flex-row md:py-0">
                <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white dark:bg-zinc-50 dark:text-zinc-900 font-bold">
                        P
                    </div>
                    <span className="text-lg font-bold tracking-tight">Pilaw</span>
                </div>
                <p className="text-center text-sm leading-relaxed text-muted-foreground md:text-left">
                    Created with ❤️ by the{" "}
                    <a
                        href="https://github.com/user257814938/Pilaw_RAG"
                        target="_blank"
                        rel="noreferrer"
                        className="font-medium underline underline-offset-4 hover:text-primary"
                    >
                        Pilot Team
                    </a>
                    . <br className="hidden md:inline" />© 2026 Pilaw Inc. All rights reserved.
                </p>
                <div className="flex gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="#" className="transition-colors hover:text-primary">Privacy</Link>
                    <Link href="#" className="transition-colors hover:text-primary">Terms</Link>
                    <Link href="#" className="transition-colors hover:text-primary">Contact</Link>
                </div>
            </div>
        </footer>
    );
}
