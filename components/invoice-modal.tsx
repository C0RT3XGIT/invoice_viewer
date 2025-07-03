"use client"

import { format } from "date-fns"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { InvoiceViewer } from "./invoice-viewer"
import { Calendar, ExternalLink, FileText, ImageIcon } from "lucide-react"
import type { Invoice } from "@/types/invoice"

interface InvoiceModalProps {
  invoice: Invoice
  isOpen: boolean
  onClose: () => void
}

export function InvoiceModal({ invoice, isOpen, onClose }: InvoiceModalProps) {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "success":
        return "default"
      case "error":
        return "destructive"
      case "pending":
        return "secondary"
      default:
        return "outline"
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="text-2xl">Invoice #{invoice.id}</DialogTitle>
              <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {format(new Date(invoice.created_at), "MMMM dd, yyyy 'at' HH:mm")}
                </div>
                <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
              </div>
            </div>
            {invoice.image_url && (
              <Button variant="outline" size="sm" onClick={() => window.open(invoice.image_url!, "_blank")}>
                <ExternalLink className="h-4 w-4 mr-2" />
                View Original
              </Button>
            )}
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="mt-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details">Invoice Details</TabsTrigger>
            <TabsTrigger value="image">Original Image</TabsTrigger>
            <TabsTrigger value="ocr">OCR Data</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="mt-6">
            <InvoiceViewer data={invoice.openai_response} />
          </TabsContent>

          <TabsContent value="image" className="mt-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <ImageIcon className="h-5 w-5" />
                <span>Original Invoice Image</span>
              </div>
              <div className="border rounded-lg overflow-hidden max-w-full">
                <img
                  src={invoice.image_url || "/placeholder.svg?height=600&width=400"}
                  alt={`Invoice #${invoice.id}`}
                  className="max-w-full h-auto"
                  style={{ maxHeight: "70vh" }}
                />
              </div>
              {invoice.image_url && (
                <Button variant="outline" onClick={() => window.open(invoice.image_url!, "_blank")}>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Open in New Tab
                </Button>
              )}
            </div>
          </TabsContent>

          <TabsContent value="ocr" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-gray-600">
                <FileText className="h-5 w-5" />
                <span>Raw OCR Text Data</span>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg border">
                <pre className="whitespace-pre-wrap text-sm text-gray-700 max-h-96 overflow-y-auto">
                  {invoice.ocr_data || "No OCR data available"}
                </pre>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
