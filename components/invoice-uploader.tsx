"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Upload, FileText, ImageIcon } from "lucide-react"

interface InvoiceUploaderProps {
  onFileUpload: (file: File) => void
}

export function InvoiceUploader({ onFileUpload }: InvoiceUploaderProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    setIsDragging(false)

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const file = e.dataTransfer.files[0]
      processFile(file)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0]
      processFile(file)
    }
  }

  const processFile = (file: File) => {
    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file")
      return
    }

    setSelectedFile(file)

    // Create preview URL
    const reader = new FileReader()
    reader.onload = () => {
      setPreviewUrl(reader.result as string)
    }
    reader.readAsDataURL(file)
  }

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleProcessInvoice = () => {
    if (selectedFile) {
      onFileUpload(selectedFile)
    }
  }

  return (
    <div className="space-y-6">
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center ${
          isDragging ? "border-blue-500 bg-blue-50" : "border-gray-300"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {previewUrl ? (
          <div className="space-y-4">
            <div className="relative max-w-md mx-auto">
              <img
                src={previewUrl || "/placeholder.svg"}
                alt="Invoice preview"
                className="max-h-[300px] mx-auto rounded-md shadow-md"
              />
              <button
                onClick={() => {
                  setSelectedFile(null)
                  setPreviewUrl(null)
                }}
                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full"
              >
                ✕
              </button>
            </div>
            <p className="text-gray-700">{selectedFile?.name}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-gray-100 rounded-full">
                <Upload className="h-12 w-12 text-gray-500" />
              </div>
            </div>
            <div>
              <p className="text-lg font-medium">Drag and drop your invoice image here</p>
              <p className="text-gray-500">or</p>
              <button
                onClick={handleUploadClick}
                className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
              >
                Browse Files
              </button>
              <input type="file" ref={fileInputRef} className="hidden" accept="image/*" onChange={handleFileChange} />
            </div>
            <p className="text-sm text-gray-500">Supported formats: JPG, PNG, PDF</p>
          </div>
        )}
      </div>

      {selectedFile && (
        <div className="flex justify-center">
          <button
            onClick={handleProcessInvoice}
            className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors flex items-center gap-2"
          >
            <FileText className="h-5 w-5" />
            Process Invoice
          </button>
        </div>
      )}

      <div className="bg-gray-50 p-6 rounded-lg border">
        <h2 className="text-lg font-medium mb-4 flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          How to prepare your invoice image
        </h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Make sure the invoice is well-lit and the text is clearly visible</li>
          <li>Ensure the entire invoice is in the frame</li>
          <li>Avoid shadows or glare on the invoice</li>
          <li>For best results, place the invoice on a dark background</li>
        </ul>
      </div>
    </div>
  )
}
