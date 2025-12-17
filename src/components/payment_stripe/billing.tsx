interface BillingSettingsProps {
    planName?: string;
}

export function BillingSettings({ planName = "Free" }: BillingSettingsProps) {
    return (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
                <div className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">{planName} Plan</div>
                <div className="text-sm text-zinc-500">You are currently on the {planName.toLowerCase()} tier.</div>
            </div>
            <div className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 text-sm font-medium border border-zinc-200 dark:border-zinc-700">
                Active
            </div>
        </div>
    )
}
