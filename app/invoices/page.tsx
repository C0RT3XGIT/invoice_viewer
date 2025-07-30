"use client"

import { useState, useEffect } from "react"
import { InvoicesList } from "@/components/invoices-list"
import { getAllInvoices } from "@/services/invoice-service"
import { LoadingAnimation } from "@/components/loading-animation"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle, File, TestTube } from "lucide-react"
import type { Invoice } from "@/types/invoice"
import { Button } from "@/components/ui/button"
import Link from "next/link"
export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setIsLoading(true)
        const data = await getAllInvoices()
        setInvoices(data)
      } catch (err) {
        console.error("Error fetching invoices:", err)
        setError(
          err instanceof Error ? err.message : "Failed to fetch invoices. Please check your Supabase connection.",
        )
      } finally {
        setIsLoading(false)
      }
    }

    fetchInvoices()
  }, [])

  if (isLoading) {
    return (
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">All Invoices</h1>
        <LoadingAnimation />
      </main>
    )
  }

  if (error) {
    return (
      <main className="container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">All Invoices</h1>
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </main>
    )
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Invoice Processor</h1>
        <div className="flex gap-2">
          <Link href="/test">
            <Button variant="outline" size="sm">
              <TestTube className="h-4 w-4 mr-2" />
              Test Auth
            </Button>
          </Link>
          <Link href="/">
            <Button variant="outline">
              <File className="h-4 w-4 mr-2" />
              Process Invoice
            </Button>
          </Link>
        </div>
      </div>
      <InvoicesList invoices={invoices} />
    </main>
  )
}
