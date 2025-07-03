export function InvoiceSummary({
  totalWithoutTVA,
  totalTVA,
  total,
}: {
  totalWithoutTVA: number
  totalTVA: number
  total: number
}) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border">
      <h2 className="text-xl font-semibold mb-4">Invoice Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">Subtotal (without TVA)</p>
          <p className="text-2xl font-bold">{totalWithoutTVA.toFixed(2)} MDL</p>
        </div>
        <div className="p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">TVA (20%)</p>
          <p className="text-2xl font-bold">{totalTVA.toFixed(2)} MDL</p>
        </div>
        <div className="p-4 bg-green-50 rounded-md">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-2xl font-bold text-green-600">{total.toFixed(2)} MDL</p>
        </div>
      </div>
    </div>
  )
}
