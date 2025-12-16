import { UpdatePasswordForm } from '@/components/auth_supabase/update-password-form';

export default function UpdatePasswordPage() {
    return (
        <div className="flex min-h-screen items-center justify-center p-6 md:p-10">
            <div className="w-full max-w-sm md:max-w-3xl">
                <UpdatePasswordForm />
            </div>
        </div>
    );
}
