import { apiClient } from '@/lib/api-client'
import type { Invoice } from "@/types/invoice"

export type InvoiceResponse = {
  items: Array<{
    name: string
    unit: string
    amount: number
    priceUnit: number
    tvaPercentage: string
    totalWithoutTVA: number
    totalTVA: number
    subTotal: number
  }>
  totalWithoutTVA: number
  totalTVA: number
  total: number
  issues?: Array<{
    type: string
    field: string
    original: string
    corrected: number
    reason: string
  }>
  busunessContext: string
}

export async function processInvoiceImage(file: File): Promise<InvoiceResponse> {
  const formData = new FormData()
  formData.append("data", file)

  // Use the authenticated API client for FormData
  const response = await apiClient.post('/process-invoice', formData, {
    headers: {} // Don't set Content-Type for FormData
  })

  return response
}

export async function getAllInvoices(): Promise<Invoice[]> {
  try {
    // Use the authenticated API client
    const response = await apiClient.get('/invoices')
    return response
  } catch (error) {
    console.error("Error in getAllInvoices:", error)
    throw error
  }
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  try {
    // Use the authenticated API client
    const response = await apiClient.get(`/invoices/${id}`)
    return response
  } catch (error) {
    console.error("Error in getInvoiceById:", error)
    return null
  }
}
