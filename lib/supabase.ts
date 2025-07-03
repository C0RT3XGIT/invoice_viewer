import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Create a mock client for development when env vars are missing
const createMockClient = () => ({
  from: () => ({
    select: () => ({
      order: () => ({
        data: null,
        error: new Error("Supabase not configured - using mock data"),
      }),
    }),
    eq: () => ({
      single: () => ({
        data: null,
        error: new Error("Supabase not configured - using mock data"),
      }),
    }),
  }),
})

export const supabase =
  supabaseUrl && supabaseAnonKey ? createClient(supabaseUrl, supabaseAnonKey) : (createMockClient() as any)

export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey)
