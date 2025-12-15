export default function SettingsPage() {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Paramètres</h1>
            <div className="max-w-xl space-y-6">
                <div className="p-4 border rounded bg-white dark:bg-neutral-800">
                    <h3 className="font-semibold mb-2">Abonnement</h3>
                    <p className="text-sm text-gray-500 mb-4">Gérez votre plan Stripe.</p>
                    {/* TODO: Stripe Customer Portal Link */}
                </div>
            </div>
        </div>
    )
}
