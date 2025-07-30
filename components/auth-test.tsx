"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { apiClient } from "@/lib/api-client"

export function AuthTest() {
  const [testResult, setTestResult] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)

  const testAuth = async () => {
    setIsLoading(true)
    setTestResult("")

    try {
      // Test the invoices endpoint (protected)
      const invoices = await apiClient.get('/invoices')
      setTestResult(`✅ Authentication successful! Found ${invoices.length} invoices.`)
    } catch (error) {
      setTestResult(`❌ Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  const testHealth = async () => {
    setIsLoading(true)
    setTestResult("")

    try {
      // Test the health endpoint (public)
      const health = await fetch('/api/health').then(res => res.json())
      setTestResult(`✅ Health check successful: ${JSON.stringify(health)}`)
    } catch (error) {
      setTestResult(`❌ Health check failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>API Authentication Test</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={testAuth} disabled={isLoading}>
            Test Protected Route
          </Button>
          <Button onClick={testHealth} disabled={isLoading} variant="outline">
            Test Public Route
          </Button>
        </div>
        
        {testResult && (
          <div className="p-3 bg-gray-100 rounded-md">
            <p className="text-sm">{testResult}</p>
          </div>
        )}
        
        <div className="text-xs text-gray-500">
          <p>Protected routes require API key authentication.</p>
          <p>Make sure you have set NEXT_PUBLIC_API_KEY in your environment.</p>
        </div>
      </CardContent>
    </Card>
  )
} 