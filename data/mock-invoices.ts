import type { Invoice, InvoiceData } from "@/types/invoice"
import { invoiceData } from "@/data/invoice-data"

export function getMockInvoices(): Invoice[] {
  return [
    {
      id: "1",
      created_at: new Date().toISOString(),
      image_url: "https://storage.googleapis.com/invoices_bucket_md/Invoice_1748451363",
      ocr_data: "Sample OCR data...",
      status: "success",
      user_id: null,
      openai_response: invoiceData as InvoiceData,
    },
    {
      id: "2",
      created_at: new Date(Date.now() - 86400000).toISOString(),
      image_url: "https://storage.googleapis.com/invoices_bucket_md/Invoice_1748451364",
      ocr_data: "Sample OCR data...",
      status: "pending",
      user_id: null,
      openai_response: {
        ...invoiceData,
        total: 5230.5,
        totalTVA: 871.75,
        totalWithoutTVA: 4358.75,
      } as InvoiceData,
    },
  ]
} 