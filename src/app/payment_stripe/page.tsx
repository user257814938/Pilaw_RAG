import { PricingTable } from "@/components/dashboard/settings/pricing";

export default function SettingsPage() {
    return (
        <div className="flex flex-col gap-8 p-4">
            <div>
                <h1 className="text-2xl font-bold tracking-tight">Paramètres</h1>
                <p className="text-muted-foreground">
                    Gérez vos préférences et votre abonnement.
                </p>
            </div>

            <div className="space-y-4">
                <h2 className="text-xl font-semibold">Abonnement</h2>
                <PricingTable />
            </div>
        </div>
    );
}
