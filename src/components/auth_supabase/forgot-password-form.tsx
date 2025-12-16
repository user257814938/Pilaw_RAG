'use client';

import { forgotPassword } from '@/app/auth_supabase/actions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';

export function ForgotPasswordForm() {
    return (
        <div className="mx-auto max-w-sm space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Mot de passe oublié</CardTitle>
                    <CardDescription>
                        Entrez votre email pour recevoir un lien de réinitialisation.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <form action={forgotPassword} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Envoyer le lien
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm">
                            <Link href="/auth_supabase/signin" className="underline text-blue-500 hover:text-blue-700 font-medium">
                                Retour à la connexion
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
