import { AuthForm } from '@/components/auth_supabase/auth';

export default function LoginPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <AuthForm view="signin" />
            </div>
        </div>
    );
}
