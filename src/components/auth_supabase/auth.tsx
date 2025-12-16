'use client';

import { signin, signup } from '@/app/auth_supabase/actions';
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
import { useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthFormProps {
    view?: 'signin' | 'signup';
}

export function AuthForm({ view = 'signin' }: AuthFormProps) {
    const [isLogin, setIsLogin] = useState(view === 'signin');
    const [loading, setLoading] = useState(false);

    // Using server actions directly in form action is possible, 
    // but wrapping in a client handler allows for loading states if needed
    // For simplicity, we can use the action prop directly on the form for now, 
    // or use transition/useActionState in newer React.
    // Let's stick to simple form action usage for reliability.

    return (
        <div className="mx-auto max-w-sm space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{isLogin ? 'Connexion' : 'Inscription'}</CardTitle>
                    <CardDescription>
                        {isLogin
                            ? 'Entrez votre email pour vous connecter'
                            : 'Créez un compte pour commencer'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {/* We use specific actions based on mode */}
                        <form action={isLogin ? signin : signup} className="grid gap-4">
                            {!isLogin && (
                                <div className="grid gap-2">
                                    <Label htmlFor="full_name">Nom complet</Label>
                                    <Input id="full_name" name="full_name" placeholder="John Doe" required />
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Mot de passe</Label>
                                    {isLogin && <a href="#" className="ml-auto inline-block text-sm underline">Mot de passe oublié ?</a>}
                                </div>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                {isLogin ? 'Se connecter' : "S'inscrire"}
                            </Button>
                        </form>

                        <div className="mt-4 text-center text-sm">
                            {isLogin ? "Pas encore de compte ? " : "Déjà un compte ? "}
                            <button
                                type="button"
                                onClick={() => setIsLogin(!isLogin)}
                                className="underline text-blue-500 hover:text-blue-700 font-medium"
                            >
                                {isLogin ? "S'inscrire" : "Se connecter"}
                            </button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
