import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    // Logic to exchange code for session (Supabase)
    return NextResponse.redirect(new URL('/dashboard_routing', request.url))
}
