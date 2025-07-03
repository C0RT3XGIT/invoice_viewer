"use client"

import { useMemo } from "react"
import { Bar, BarChart, Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import type { InvoiceData } from "@/types/invoice"

export function InvoiceCharts({ data }: { data: InvoiceData }) {
  // Sort items by subtotal for the bar chart
  const sortedItems = useMemo(() => {
    return [...data.items]
      .sort((a, b) => b.subTotal - a.subTotal)
      .slice(0, 10) // Only show top 10 items
      .map((item) => ({
        name: item.name.length > 20 ? item.name.substring(0, 20) + "..." : item.name,
        value: item.subTotal,
      }))
  }, [data.items])

  // Group items by unit for the pie chart
  const itemsByUnit = useMemo(() => {
    const unitGroups: Record<string, number> = {}

    data.items.forEach((item) => {
      if (!unitGroups[item.unit]) {
        unitGroups[item.unit] = 0
      }
      unitGroups[item.unit] += item.subTotal
    })

    return Object.entries(unitGroups).map(([unit, value]) => ({
      name: unit,
      value,
    }))
  }, [data.items])

  // Summary data for the pie chart
  const summaryData = [
    { name: "TVA", value: data.totalTVA },
    { name: "Net Amount", value: data.totalWithoutTVA },
  ]

  // Colors for the pie charts
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"]

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Items by Value */}
        <Card>
          <CardHeader>
            <CardTitle>Top Items by Value</CardTitle>
            <CardDescription>The most expensive items on the invoice</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={sortedItems} layout="vertical" margin={{ left: 120 }}>
                  <XAxis type="number" />
                  <YAxis type="category" dataKey="name" width={120} />
                  <Tooltip formatter={(value) => `${Number(value).toFixed(2)} MDL`} />
                  <Bar dataKey="value" fill="#0088FE" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Items by Unit */}
        <Card>
          <CardHeader>
            <CardTitle>Items by Unit</CardTitle>
            <CardDescription>Distribution of items by unit type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={itemsByUnit}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {itemsByUnit.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toFixed(2)} MDL`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Invoice Summary Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Invoice Summary</CardTitle>
          <CardDescription>Breakdown of total amount</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={summaryData}
                    cx="50%"
                    cy="50%"
                    labelLine={true}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    <Cell fill="#0088FE" />
                    <Cell fill="#00C49F" />
                  </Pie>
                  <Tooltip formatter={(value) => `${Number(value).toFixed(2)} MDL`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-md">
                <span className="font-medium">Net Amount:</span>
                <span className="font-bold">{data.totalWithoutTVA.toFixed(2)} MDL</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-md">
                <span className="font-medium">TVA (20%):</span>
                <span className="font-bold">{data.totalTVA.toFixed(2)} MDL</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-purple-50 rounded-md">
                <span className="font-medium">Total:</span>
                <span className="font-bold">{data.total.toFixed(2)} MDL</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
