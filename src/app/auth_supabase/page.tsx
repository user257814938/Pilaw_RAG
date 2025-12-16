import { createClient } from "@/lib/database_supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default async function AuthHomePage() {
    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);

    const { data: { user } } = await supabase.auth.getUser();

    // If user is already logged in, redirect to the main dashboard
    if (user) {
        redirect("/dashboard/overview");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-zinc-950 p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-foreground">Pilaw</h1>
                    <p className="text-muted-foreground">La plateforme intelligente pour vos services juridiques.</p>
                </div>

                <Card className="border-border/50 shadow-lg">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Bienvenue</CardTitle>
                        <CardDescription>Connectez-vous pour accéder à votre espace.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Link href="/auth_supabase/signin" className="w-full">
                            <Button className="w-full" size="lg">
                                Se connecter
                            </Button>
                        </Link>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-card px-2 text-muted-foreground">Ou</span>
                            </div>
                        </div>

                        <Link href="/auth_supabase/signup" className="w-full">
                            <Button variant="outline" className="w-full" size="lg">
                                Créer un compte
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
