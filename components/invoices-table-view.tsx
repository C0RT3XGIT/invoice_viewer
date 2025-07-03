"use client"

import { format } from "date-fns"
import { Eye } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Invoice } from "@/types/invoice"

interface InvoicesTableViewProps {
  invoices: Invoice[]
  onViewDetails: (invoice: Invoice) => void
}

export function InvoicesTableView({ invoices, onViewDetails }: InvoicesTableViewProps) {
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
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-right">TVA</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell className="font-medium">#{invoice.id}</TableCell>
              <TableCell>{format(new Date(invoice.created_at), "MMM dd, yyyy")}</TableCell>
              <TableCell>
                <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
              </TableCell>
              <TableCell>{invoice.openai_response?.items?.length || 0}</TableCell>
              <TableCell className="text-right font-medium">
                {invoice.openai_response?.total?.toFixed(2) || "0.00"} MDL
              </TableCell>
              <TableCell className="text-right">
                {invoice.openai_response?.totalTVA?.toFixed(2) || "0.00"} MDL
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="sm" onClick={() => onViewDetails(invoice)}>
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
