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
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface AuthFormProps {
    view?: 'signin' | 'signup';
}

export function AuthForm({ view = 'signin' }: AuthFormProps) {
    const [isLogin, setIsLogin] = useState(view === 'signin');
    const [loading, setLoading] = useState(false);

    // Sync state with prop if view changes
    useEffect(() => {
        setIsLogin(view === 'signin');
    }, [view]);

    // Using server actions directly in form action is possible, 
    // but wrapping in a client handler allows for loading states if needed
    // For simplicity, we can use the action prop directly on the form for now, 
    // or use transition/useActionState in newer React.
    // Let's stick to simple form action usage for reliability.

    return (
        <div className="mx-auto max-w-sm space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">{isLogin ? 'Sign In' : 'Sign Up'}</CardTitle>
                    <CardDescription>
                        {isLogin
                            ? 'Enter your email to sign in'
                            : 'Create an account to get started'}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        {/* We use specific actions based on mode */}
                        <form action={isLogin ? signin : signup} className="grid gap-4">
                            {!isLogin && (
                                <div className="grid gap-2">
                                    <Label htmlFor="full_name">Full Name</Label>
                                    <Input id="full_name" name="full_name" placeholder="John Doe" required />
                                </div>
                            )}
                            <div className="grid gap-2">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="m@example.com" required />
                            </div>
                            <div className="grid gap-2">
                                <div className="flex items-center">
                                    <Label htmlFor="password">Password</Label>
                                    {isLogin && <a href="/auth_supabase/forgot-password" className="ml-auto inline-block text-sm underline">Forgot your password?</a>}
                                </div>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                {isLogin ? 'Sign In' : "Sign Up"}
                            </Button>
                        </form>

                        <div className="mt-4 text-center text-sm">
                            {isLogin ? "Don't have an account? " : "Already have an account? "}
                            <Link
                                href={isLogin ? "/auth_supabase/signup" : "/auth_supabase/signin"}
                                className="underline text-blue-500 hover:text-blue-700 font-medium"
                            >
                                {isLogin ? "Sign Up" : "Sign In"}
                            </Link>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
