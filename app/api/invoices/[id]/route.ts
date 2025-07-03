import { NextResponse } from 'next/server'
import { supabase } from "@/lib/supabase"
import { isSupabaseConfigured } from "@/lib/supabase"
import { getMockInvoices } from "@/data/mock-invoices"

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  if (!isSupabaseConfigured) {
    const mockInvoices = getMockInvoices()
    const invoice = mockInvoices.find((inv: { id: string }) => inv.id === id)
    return NextResponse.json(invoice || null)
  }

  try {
    const { data, error } = await supabase
      .from("invoices_md")
      .select("*")
      .eq("id", id)
      .single()

    if (error) throw error

    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching invoice:", error)
    return NextResponse.json(null)
  }
} 