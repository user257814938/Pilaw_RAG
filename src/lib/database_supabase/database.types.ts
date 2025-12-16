export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            documents: {
                Row: {
                    content: string | null
                    embedding: string | null
                    fts: unknown
                    id: number
                    metadata: Json | null
                }
                Insert: {
                    content?: string | null
                    embedding?: string | null
                    fts?: unknown
                    id?: number
                    metadata?: Json | null
                }
                Update: {
                    content?: string | null
                    embedding?: string | null
                    fts?: unknown
                    id?: number
                    metadata?: Json | null
                }
                Relationships: []
            }
            profiles: {
                Row: {
                    avatar_url: string | null
                    billing_plan: string | null
                    created_at: string
                    email: string | null
                    full_name: string | null
                    id: string
                    stripe_customer_id: string | null
                    stripe_subscription_id: string | null
                    updated_at: string
                }
                Insert: {
                    avatar_url?: string | null
                    billing_plan?: string | null
                    created_at?: string
                    email?: string | null
                    full_name?: string | null
                    id: string
                    stripe_customer_id?: string | null
                    stripe_subscription_id?: string | null
                    updated_at?: string
                }
                Update: {
                    avatar_url?: string | null
                    billing_plan?: string | null
                    created_at?: string
                    email?: string | null
                    full_name?: string | null
                    id?: string
                    stripe_customer_id?: string | null
                    stripe_subscription_id?: string | null
                    updated_at?: string
                }
                Relationships: [
                    {
                        foreignKeyName: "profiles_id_fkey"
                        columns: ["id"]
                        isOneToOne: true
                        referencedRelation: "users"
                        referencedColumns: ["id"]
                    }
                ]
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            kw_match_documents: {
                Args: {
                    query_text: string
                    match_count: number
                }
                Returns: {
                    id: number
                    content: string
                    metadata: Json
                    similarity: number
                }[]
            }
            match_documents: {
                Args: {
                    query_embedding: string
                    match_count?: number
                    filter?: Json
                }
                Returns: {
                    id: number
                    content: string
                    metadata: Json
                    similarity: number
                }[]
            }
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}
