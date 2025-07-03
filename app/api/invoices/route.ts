import { NextResponse } from 'next/server'
import { supabase } from "@/lib/supabase"
import { isSupabaseConfigured } from "@/lib/supabase"
import { getMockInvoices } from "@/data/mock-invoices"

export async function GET() {
  if (!isSupabaseConfigured) {
    return NextResponse.json(getMockInvoices())
  }

  try {
    const { data, error } = await supabase
      .from("invoices_md")
      .select("*")
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(data || [])
  } catch (error) {
    console.error("Error fetching invoices:", error)
    return NextResponse.json(getMockInvoices())
  }
} 