import Link from 'next/link';

export function Footer() {
    return (
        <footer className="w-full px-4 pb-6 md:px-0">
            <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-6 rounded-full bg-blue-600 px-8 py-4 shadow-xl shadow-blue-900/10 md:flex-row">

                {/* Brand */}
                <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-blue-600 font-bold shadow-sm">
                        P
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white">
                        Pilaw
                    </span>
                </div>

                {/* Center Text */}
                <p className="text-center text-sm font-medium text-blue-50/90 md:text-left">
                    Created with <span className="animate-pulse">❤️</span> by the{" "}
                    <a
                        href="https://github.com/user257814938/Pilaw_RAG"
                        target="_blank"
                        rel="noreferrer"
                        className="font-bold text-white transition-all hover:text-blue-200 hover:underline underline-offset-4"
                    >
                        Pilot Team
                    </a>
                    .
                    <span className="mx-2 hidden opacity-50 md:inline">|</span>
                    <span className="block mt-1 md:inline md:mt-0">
                        © 2026 Pilaw Inc.
                    </span>
                </p>

                {/* Links */}
                <div className="flex items-center gap-6 text-sm font-medium text-blue-100">
                    <Link href="#" className="group relative transition-colors hover:text-white">
                        Privacy
                        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-white transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="#" className="group relative transition-colors hover:text-white">
                        Terms
                        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-white transition-all group-hover:w-full"></span>
                    </Link>
                    <Link href="#" className="group relative transition-colors hover:text-white">
                        Contact
                        <span className="absolute -bottom-1 left-0 h-[2px] w-0 bg-white transition-all group-hover:w-full"></span>
                    </Link>
                </div>
            </div>
        </footer>
    );
}
