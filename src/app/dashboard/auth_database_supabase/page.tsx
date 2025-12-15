import { createClient } from "@/lib/database_supabase/server";
import { cookies } from "next/headers";
import { Suspense } from "react";

async function ProfileData() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return <div>Non connecté</div>;

    const { data: profile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

    return (
        <div className="bg-white dark:bg-zinc-900 p-6 rounded-lg border shadow-sm mt-4">
            <h3 className="text-lg font-medium mb-2">Données Profil (Supabase Server Component)</h3>
            <pre className="text-sm bg-gray-100 dark:bg-zinc-950 p-4 rounded overflow-auto">
                {JSON.stringify(profile, null, 2)}
            </pre>
        </div>
    );
}

export default function OverviewPage() {
    return (
        <div className="p-6 space-y-6">
            <h1 className="text-3xl font-bold tracking-tight">Vue d'ensemble</h1>
            <p className="text-muted-foreground">Bienvenue sur votre tableau de bord Pilaw.</p>

            <Suspense fallback={<div className="p-4 bg-gray-50 rounded border animate-pulse h-32">Chargement du profil...</div>}>
                <ProfileData />
            </Suspense>
        </div>
    );
}
