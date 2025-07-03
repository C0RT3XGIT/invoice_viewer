"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface Item {
  name: string
  unit: string
  amount: number
  priceUnit: number
  tvaPercentage: string
  totalWithoutTVA: number
  totalTVA: number
  subTotal: number
  accounting: {
    code: string
    class: string
    description: string
    notes: string
  }
}

export function InvoiceTable({ items }: { items: Item[] }) {
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Item | "accounting.code" | "accounting.class"
    direction: "ascending" | "descending"
  } | null>(null)

  const sortedItems = [...items]

  if (sortConfig !== null) {
    sortedItems.sort((a, b) => {
      let aValue: any
      let bValue: any

      if (sortConfig.key === "accounting.code") {
        aValue = a.accounting.code
        bValue = b.accounting.code
      } else if (sortConfig.key === "accounting.class") {
        aValue = a.accounting.class
        bValue = b.accounting.class
      } else {
        aValue = a[sortConfig.key as keyof Item]
        bValue = b[sortConfig.key as keyof Item]
      }

      if (aValue < bValue) {
        return sortConfig.direction === "ascending" ? -1 : 1
      }
      if (aValue > bValue) {
        return sortConfig.direction === "ascending" ? 1 : -1
      }
      return 0
    })
  }

  const requestSort = (key: keyof Item | "accounting.code" | "accounting.class") => {
    let direction: "ascending" | "descending" = "ascending"
    if (sortConfig && sortConfig.key === key && sortConfig.direction === "ascending") {
      direction = "descending"
    }
    setSortConfig({ key, direction })
  }

  const getSortDirection = (key: keyof Item | "accounting.code" | "accounting.class") => {
    if (!sortConfig || sortConfig.key !== key) {
      return null
    }
    return sortConfig.direction === "ascending" ? "↑" : "↓"
  }

  return (
    <div className="rounded-md border overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="cursor-pointer" onClick={() => requestSort("name")}>
              Product {getSortDirection("name")}
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => requestSort("unit")}>
              Unit {getSortDirection("unit")}
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => requestSort("amount")}>
              Qty {getSortDirection("amount")}
            </TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => requestSort("priceUnit")}>
              Price {getSortDirection("priceUnit")}
            </TableHead>
            <TableHead className="text-right">TVA %</TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => requestSort("totalWithoutTVA")}>
              Subtotal {getSortDirection("totalWithoutTVA")}
            </TableHead>
            <TableHead className="text-right">TVA</TableHead>
            <TableHead className="cursor-pointer text-right" onClick={() => requestSort("subTotal")}>
              Total {getSortDirection("subTotal")}
            </TableHead>
            <TableHead className="cursor-pointer bg-blue-50" onClick={() => requestSort("accounting.code")}>
              Account Code {getSortDirection("accounting.code")}
            </TableHead>
            <TableHead className="cursor-pointer bg-blue-50" onClick={() => requestSort("accounting.class")}>
              Account Class {getSortDirection("accounting.class")}
            </TableHead>
            <TableHead className="bg-blue-50">Account Description</TableHead>
            <TableHead className="bg-blue-50">Account Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedItems.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{item.name}</TableCell>
              <TableCell className="text-right">{item.unit}</TableCell>
              <TableCell className="text-right">{item.amount}</TableCell>
              <TableCell className="text-right">{item.priceUnit.toFixed(2)}</TableCell>
              <TableCell className="text-right">{item.tvaPercentage}</TableCell>
              <TableCell className="text-right">{item.totalWithoutTVA.toFixed(2)}</TableCell>
              <TableCell className="text-right">{item.totalTVA.toFixed(2)}</TableCell>
              <TableCell className="text-right font-medium">{item.subTotal.toFixed(2)}</TableCell>
              <TableCell className="bg-blue-50 font-medium text-blue-800">{item.accounting.code}</TableCell>
              <TableCell className="bg-blue-50 text-blue-700">{item.accounting.class}</TableCell>
              <TableCell className="bg-blue-50 text-blue-700">{item.accounting.description}</TableCell>
              <TableCell className="bg-blue-50 text-blue-700">{item.accounting.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
