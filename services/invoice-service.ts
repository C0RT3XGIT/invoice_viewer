import axios from 'axios'
import type { Invoice } from "@/types/invoice"

const api = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

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
}

export async function processInvoiceImage(file: File): Promise<InvoiceResponse> {
  const formData = new FormData()
  formData.append("data", file)

  const response = await api.post('/api/process-invoice', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })

  return response.data
}

export async function getAllInvoices(): Promise<Invoice[]> {
  try {
    const response = await api.get('/api/invoices')
    return response.data
  } catch (error) {
    console.error("Error in getAllInvoices:", error)
    throw error
  }
}

export async function getInvoiceById(id: string): Promise<Invoice | null> {
  try {
    const response = await api.get(`/api/invoices/${id}`)
    return response.data
  } catch (error) {
    console.error("Error in getInvoiceById:", error)
    return null
  }
}
