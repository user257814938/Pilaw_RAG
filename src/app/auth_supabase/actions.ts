'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/database_supabase/server';
import { cookies } from 'next/headers';

export async function signin(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        return redirect('/auth_supabase/signin?error=Could not authenticate user');
    }

    revalidatePath('/', 'layout');
    redirect('/auth_supabase');
}

export async function signup(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const fullName = formData.get('full_name') as string;

    const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
            },
            emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth_supabase/callback`,
        }
    });

    if (error) {
        return redirect('/auth_supabase/signup?error=Could not register user');
    }

    revalidatePath('/', 'layout');
    redirect('/auth_supabase');
}

export async function signout() {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error signing out:', error);
    }

    revalidatePath('/', 'layout');
    redirect('/auth_supabase/signin');
}

export async function forgotPassword(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const email = formData.get('email') as string;

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/auth_supabase/callback?next=/auth_supabase/update-password`,
    });

    if (error) {
        return redirect('/auth_supabase/forgot-password?error=Could not send reset email');
    }

    return redirect('/auth_supabase/forgot-password?message=Check your email for the reset link');
}

export async function updatePassword(formData: FormData) {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const password = formData.get('password') as string;

    const { error } = await supabase.auth.updateUser({
        password: password,
    });

    if (error) {
        return redirect('/auth_supabase/update-password?error=Could not update password');
    }

    revalidatePath('/', 'layout');
    redirect('/auth_supabase');
}
