export function LoadingAnimation() {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="relative">
        <div className="h-24 w-24 rounded-full border-t-4 border-b-4 border-blue-500 animate-spin"></div>
        <div
          className="absolute top-0 left-0 h-24 w-24 rounded-full border-t-4 border-b-4 border-green-500 animate-spin"
          style={{ animationDuration: "1.5s" }}
        ></div>
      </div>

      <div className="mt-8 text-center">
        <h2 className="text-xl font-semibold mb-2">Processing Your Invoice</h2>
        <div className="space-y-2 max-w-md mx-auto">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div className="h-full bg-blue-500 rounded-full animate-progress"></div>
          </div>
          <p className="text-gray-500">Sending to API at {process.env.NEXT_PUBLIC_API_URL}...</p>
        </div>

        <div className="mt-6 space-y-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></div>
            <p className="text-sm text-gray-600">Uploading invoice image</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-yellow-500 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
            <p className="text-sm text-gray-600">Processing with OCR</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 bg-blue-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
            <p className="text-sm text-gray-600">Extracting invoice data</p>
          </div>
        </div>
      </div>
    </div>
  )
}
