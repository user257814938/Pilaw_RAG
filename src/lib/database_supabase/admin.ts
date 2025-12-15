import { createClient } from '@supabase/supabase-js'
import { Database } from './database.types'

// 1. Récupération des variables d'environnement
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error("Les variables NEXT_PUBLIC_SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY manquent.")
}

/*
 * =============================================================================
 * SUPABASE ADMIN CLIENT (Server-Side Only)
 * =============================================================================
 * Ce client utilise la CLE DE SERVICE (Service Role Key).
 * ⚠️ DANGER : Il contourne la RLS (Row Level Security).
 * À utiliser UNIQUEMENT dans :
 * - Les routes API (/api/...)
 * - Les Server Actions (src/actions.ts)
 * - Les scripts d'ingestion (LangChain)
 * Ne JAMAIS l'utiliser côté client (Browser).
 */
export const supabaseAdmin = createClient<Database>(
    SUPABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
)
