"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Calendar, DollarSign, FileText, Search, Filter, LayoutGrid, TableIcon } from "lucide-react"
import { InvoiceModal } from "./invoice-modal"
import { InvoicesTableView } from "./invoices-table-view"
import type { Invoice } from "@/types/invoice"

interface InvoicesListProps {
  invoices: Invoice[]
}

export function InvoicesList({ invoices = [] }: InvoicesListProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [sortBy, setSortBy] = useState<"date" | "total">("date")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [viewMode, setViewMode] = useState<"cards" | "table">("cards")

  // Filter and sort invoices
  const filteredAndSortedInvoices = invoices
    .filter((invoice) => {
      const matchesSearch =
        invoice.id.toString().includes(searchTerm) ||
        invoice.openai_response.items.some((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      const matchesStatus = statusFilter === "all" || invoice.status.toLowerCase() === statusFilter.toLowerCase()
      return matchesSearch && matchesStatus
    })
    .sort((a, b) => {
      let comparison = 0
      if (sortBy === "date") {
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
      } else if (sortBy === "total") {
        comparison = a.openai_response.total - b.openai_response.total
      }
      return sortOrder === "asc" ? comparison : -comparison
    })

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

  const handleViewDetails = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === "cards" ? "table" : "cards")
  }

  return (
    <div className="space-y-6">
      {/* Filters, Search, and View Toggle */}
      <div className="flex flex-col md:flex-row gap-4">
        {/* <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder="Search by invoice ID or item name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div> */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-full md:w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="success">Success</SelectItem>
            <SelectItem value="error">Error</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
        <Select
          value={`${sortBy}-${sortOrder}`}
          onValueChange={(value) => {
            const [field, order] = value.split("-")
            setSortBy(field as "date" | "total")
            setSortOrder(order as "asc" | "desc")
          }}
        >
          <SelectTrigger className="w-full md:w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date-desc">Newest First</SelectItem>
            <SelectItem value="date-asc">Oldest First</SelectItem>
            <SelectItem value="total-desc">Highest Amount</SelectItem>
            <SelectItem value="total-asc">Lowest Amount</SelectItem>
          </SelectContent>
        </Select>
        <Button variant="outline" onClick={toggleViewMode} className="w-full md:w-auto">
          {viewMode === "cards" ? (
            <>
              <TableIcon className="h-4 w-4 mr-2" />
              Table View
            </>
          ) : (
            <>
              <LayoutGrid className="h-4 w-4 mr-2" />
              Card View
            </>
          )}
        </Button>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-blue-500" />
              <div>
                <p className="text-sm text-gray-500">Total Invoices</p>
                <p className="text-2xl font-bold">{invoices.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-green-500" />
              <div>
                <p className="text-sm text-gray-500">Total Value</p>
                <p className="text-2xl font-bold">
                  {invoices.reduce((sum, inv) => sum + (inv.openai_response?.total || 0), 0).toFixed(2)} MDL
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Badge variant="default" className="h-4 w-4 p-0"></Badge>
              <div>
                <p className="text-sm text-gray-500">Successful</p>
                <p className="text-2xl font-bold">
                  {invoices.filter((inv) => inv.status.toLowerCase() === "success").length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-500" />
              <div>
                <p className="text-sm text-gray-500">This Month</p>
                <p className="text-2xl font-bold">
                  {invoices.filter((inv) => new Date(inv.created_at).getMonth() === new Date().getMonth()).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Conditional Rendering based on viewMode */}
      {viewMode === "cards" ? (
        /* Invoices Grid (Card View) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedInvoices.length > 0 ? (
            filteredAndSortedInvoices.map((invoice) => (
              <Card key={invoice.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg">Invoice #{invoice.id}</CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(new Date(invoice.created_at), "MMM dd, yyyy")}
                      </CardDescription>
                    </div>
                    <Badge variant={getStatusColor(invoice.status)}>{invoice.status}</Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Items:</span>
                    <span className="font-medium">{invoice.openai_response?.items?.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">Total:</span>
                    <span className="font-bold text-green-600">{invoice.openai_response?.total?.toFixed(2)} MDL</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-500">TVA:</span>
                    <span>{invoice.openai_response?.totalTVA?.toFixed(2)} MDL</span>
                  </div>
                  {invoice.openai_response?.issues && invoice.openai_response?.issues?.length > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Issues:</span>
                      <Badge variant="secondary" className="text-xs">
                        {invoice.openai_response?.issues?.length}
                      </Badge>
                    </div>
                  )}
                  <Button onClick={() => handleViewDetails(invoice)} className="w-full mt-4" variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-3 text-center py-12">
              <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
              <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
            </div>
          )}
        </div>
      ) : (
        /* Table View */
        <InvoicesTableView invoices={filteredAndSortedInvoices} onViewDetails={handleViewDetails} />
      )}

      {filteredAndSortedInvoices.length === 0 && (
        <div className="text-center py-12">
          <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No invoices found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria.</p>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedInvoice && (
        <InvoiceModal invoice={selectedInvoice} isOpen={!!selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      )}
    </div>
  )
}
