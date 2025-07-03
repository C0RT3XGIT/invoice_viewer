"use client"

import { InvoiceSummary } from "@/components/invoice-summary"
import { InvoiceTable } from "@/components/invoice-table"
import { IssuesTable } from "@/components/issues-table"
import { InvoiceCharts } from "@/components/invoice-charts"
import type { InvoiceData } from "@/types/invoice"

export function InvoiceViewer({ data }: { data: InvoiceData }) {
  return (
    <div className="space-y-6">
      <InvoiceSummary totalWithoutTVA={data.totalWithoutTVA} totalTVA={data.totalTVA} total={data.total} />
      <InvoiceTable items={data.items} />
      {data.issues && data.issues.length > 0 && (
        <>
          <h2 className="text-xl font-semibold">Detected Issues</h2>
          <IssuesTable issues={data.issues} />
        </>
      )}
      <InvoiceCharts data={data} />
    </div>
  )
}
