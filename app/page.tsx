"use client"

import { useState } from "react"
import Link from "next/link"
import { InvoiceUploader } from "@/components/invoice-uploader"
import { InvoiceViewer } from "@/components/invoice-viewer"
import { LoadingAnimation } from "@/components/loading-animation"
import { processInvoiceImage, type InvoiceResponse } from "@/services/invoice-service"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { AlertCircle, RefreshCw, List } from "lucide-react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [processedData, setProcessedData] = useState<InvoiceResponse | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (file: File) => {
    setIsLoading(true)
    setError(null)

    try {
      // Make the real API call to your n8n service
      const data = await processInvoiceImage(file)
      setProcessedData(data)
    } catch (err) {
      console.error("Error processing invoice:", err)
      setError(
        err instanceof Error
          ? err.message
          : "Failed to process the invoice. Please try again or check if your backend server is running.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  const handleReset = () => {
    setProcessedData(null)
    setError(null)
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Invoice Processor</h1>
        <Link href="/invoices">
          <Button variant="outline">
            <List className="h-4 w-4 mr-2" />
            View All Invoices
          </Button>
        </Link>
      </div>

      {isLoading ? (
        <LoadingAnimation />
      ) : error ? (
        <div className="space-y-4">
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
          <div className="flex justify-center">
            <button
              onClick={handleReset}
              className="flex items-center gap-2 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
            >
              <RefreshCw className="h-4 w-4" />
              Try Again
            </button>
          </div>
        </div>
      ) : processedData ? (
        <>
          <button
            onClick={handleReset}
            className="mb-6 px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-colors"
          >
            Upload Another Invoice
          </button>
          <InvoiceViewer data={processedData} />
        </>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 border border-blue-200 rounded-md">
            <p className="text-blue-800">
              <strong>Backend Connection:</strong> Make sure your local backend is running at{" "}
              <code className="bg-blue-100 px-1 py-0.5 rounded">{process.env.NEXT_PUBLIC_API_URL}</code>
            </p>
          </div>
          <InvoiceUploader onFileUpload={handleFileUpload} />
        </div>
      )}
    </main>
  )
}
