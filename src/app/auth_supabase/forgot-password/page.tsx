import { ForgotPasswordForm } from '@/components/(auth_supabase)/forgot-password-form';

export default function ForgotPasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <ForgotPasswordForm />
            </div>
        </div>
    );
}
