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
        return redirect('/auth/signin?error=Could not authenticate user');
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard/auth_database_supabase');
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
            }
        }
    });

    if (error) {
        return redirect('/auth/signup?error=Could not register user');
    }

    revalidatePath('/', 'layout');
    redirect('/dashboard/auth_database_supabase');
}

export async function signout() {
    const cookieStore = await cookies();
    const supabase = await createClient(cookieStore);

    const { error } = await supabase.auth.signOut();

    if (error) {
        console.error('Error signing out:', error);
    }

    revalidatePath('/', 'layout');
    redirect('/auth/signin');
}
