import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { isAuthenticated } from './lib/auth'

// Define which routes need protection
const protectedRoutes = [
  '/api/process-invoice',
  '/api/invoices',
  // Add more protected routes here
]

// Define which routes are public (no protection needed)
const publicRoutes = [
  '/api/health',
  // Add more public routes here
]

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip middleware for public routes
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next()
  }

  // Check if the route needs protection
  const needsProtection = protectedRoutes.some(route => pathname.startsWith(route))

  if (needsProtection) {
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
  }

  return NextResponse.next()
}

// Configure which routes this middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
} 