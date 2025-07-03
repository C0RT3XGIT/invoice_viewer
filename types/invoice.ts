export interface InvoiceItem {
  name: string
  unit: string
  amount: number
  priceUnit: number
  tvaPercentage: string
  totalWithoutTVA: number
  totalTVA: number
  subTotal: number
  accounting: InvoiceAccounting
}

export interface InvoiceAccounting {
  code: string
  class: string
  description: string
  notes: string
}

export interface InvoiceIssue {
  type: string
  field: string
  original: string
  corrected: number
  reason: string
}

export interface InvoiceData {
  businessContext: string
  items: InvoiceItem[]
  totalWithoutTVA: number
  totalTVA: number
  total: number
  issues?: InvoiceIssue[]
}

export interface Invoice {
  id: string
  created_at: string
  image_url: string | null
  ocr_data: string | null
  status: "pending" | "success" | "error"
  openai_response: InvoiceData
  user_id: string | null
}
