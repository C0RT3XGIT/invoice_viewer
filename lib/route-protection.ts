import { NextRequest, NextResponse } from 'next/server'
import { isAuthenticated } from './auth'

// Higher-order function to protect API routes
export function withAuth(handler: (request: NextRequest) => Promise<NextResponse>) {
  return async (request: NextRequest) => {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { 
          error: 'Unauthorized',
          message: 'API key or JWT token required'
        },
        { status: 401 }
      )
    }

    // If authenticated, call the original handler
    return handler(request)
  }
}

