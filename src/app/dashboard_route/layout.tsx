export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="flex h-screen bg-gray-100 dark:bg-neutral-900">
            <aside className="w-64 border-r bg-white dark:bg-neutral-800 p-4">
                <h1 className="text-xl font-bold mb-6">template_next-js</h1>
                <nav className="space-y-2">
                    {/* TODO: Add Navigation Links (Sidebar Component) */}
                    <div className="text-sm text-gray-500">Navigation ici...</div>
                </nav>
            </aside>
            <main className="flex-1 p-8 overflow-y-auto">
                {children}
            </main>
        </div>
    )
}
