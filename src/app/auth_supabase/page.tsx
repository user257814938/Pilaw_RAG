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

    // If user is already logged in, redirect to the main dashboard portal
    if (user) {
        redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-zinc-50 dark:bg-zinc-950 p-4">
            <div className="w-full max-w-md space-y-6">
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl text-zinc-900 dark:text-zinc-100">Pilaw</h1>
                    <p className="text-zinc-500 dark:text-zinc-400">The intelligent platform for your legal services.</p>
                </div>

                <Card className="border-zinc-200 dark:border-zinc-800 shadow-xl bg-white dark:bg-zinc-900">
                    <CardHeader className="text-center">
                        <CardTitle className="text-xl">Welcome</CardTitle>
                        <CardDescription>Sign in to access your dashboard.</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        <Link href="/auth_supabase/signin" className="w-full">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white" size="lg">
                                Sign In
                            </Button>
                        </Link>

                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-zinc-200 dark:border-zinc-800" />
                            </div>
                            <div className="relative flex justify-center text-xs uppercase">
                                <span className="bg-white dark:bg-zinc-900 px-2 text-zinc-500">Or</span>
                            </div>
                        </div>

                        <Link href="/auth_supabase/signup" className="w-full">
                            <Button variant="outline" className="w-full border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-800" size="lg">
                                Create Account
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
