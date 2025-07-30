"use client"

import { AuthTest } from "@/components/auth-test"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function TestPage() {
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="flex items-center gap-4 mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">API Authentication Test</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Authentication Test */}
        <AuthTest />

        {/* Environment Info */}
        <Card>
          <CardHeader>
            <CardTitle>Environment Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-medium">Required Environment Variables:</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>API_KEY:</span>
                  <span className={process.env.API_KEY ? "text-green-600" : "text-red-600"}>
                    {process.env.API_KEY ? "✅ Set" : "❌ Missing"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>NEXT_PUBLIC_API_KEY:</span>
                  <span className={process.env.NEXT_PUBLIC_API_KEY ? "text-green-600" : "text-red-600"}>
                    {process.env.NEXT_PUBLIC_API_KEY ? "✅ Set" : "❌ Missing"}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>JWT_SECRET:</span>
                  <span className={process.env.JWT_SECRET ? "text-green-600" : "text-red-600"}>
                    {process.env.JWT_SECRET ? "✅ Set" : "❌ Missing"}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-medium">API Endpoints:</h4>
              <div className="text-sm space-y-1">
                <div className="flex justify-between">
                  <span>Health Check:</span>
                  <span className="text-blue-600">Public</span>
                </div>
                <div className="flex justify-between">
                  <span>Invoices:</span>
                  <span className="text-orange-600">Protected</span>
                </div>
                <div className="flex justify-between">
                  <span>Process Invoice:</span>
                  <span className="text-orange-600">Protected</span>
                </div>
              </div>
            </div>

            <div className="text-xs text-gray-500">
              <p>• Public routes don't require authentication</p>
              <p>• Protected routes require API key or JWT token</p>
              <p>• Use the test buttons above to verify authentication</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Setup Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">1. Set Environment Variables</h4>
              <p className="text-sm text-gray-600 mb-2">
                Create a <code className="bg-gray-100 px-1 py-0.5 rounded">.env.local</code> file in your frontend directory:
              </p>
              <pre className="bg-gray-100 p-3 rounded text-xs overflow-x-auto">
{`# API Key for server-side authentication
API_KEY=your-secret-api-key-here

# API Key for frontend API client
NEXT_PUBLIC_API_KEY=your-secret-api-key-here

# JWT Secret for token-based auth
JWT_SECRET=your-jwt-secret-here`}
              </pre>
            </div>

            <div>
              <h4 className="font-medium mb-2">2. Test Authentication</h4>
              <p className="text-sm text-gray-600">
                Use the "Test Protected Route" button above to verify that your API key is working correctly.
                If successful, you should see a message showing the number of invoices found.
              </p>
            </div>

            <div>
              <h4 className="font-medium mb-2">3. Troubleshooting</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Make sure your environment variables are set correctly</li>
                <li>• Restart your development server after changing environment variables</li>
                <li>• Check the browser console for any error messages</li>
                <li>• Verify that your API routes are running and accessible</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
} 