'use client';

import { updatePassword } from '@/app/auth_supabase/actions';
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

export function UpdatePasswordForm() {
    return (
        <div className="mx-auto max-w-sm space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Nouveau mot de passe</CardTitle>
                    <CardDescription>
                        Entrez votre nouveau mot de passe.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <form action={updatePassword} className="grid gap-4">
                            <div className="grid gap-2">
                                <Label htmlFor="password">Nouveau mot de passe</Label>
                                <Input id="password" name="password" type="password" required />
                            </div>
                            <Button type="submit" className="w-full">
                                Mettre à jour
                            </Button>
                        </form>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
