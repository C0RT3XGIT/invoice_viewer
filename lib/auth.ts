import { NextRequest } from 'next/server'

// Simple API key validation
export function validateApiKey(request: NextRequest): boolean {
  const apiKey = request.headers.get('x-api-key') || 
                 request.nextUrl.searchParams.get('api_key')
  
  const validApiKey = process.env.API_KEY || 'your-secret-api-key'
  
  return apiKey === validApiKey
}

// Simple JWT token validation (basic implementation)
export function validateJWT(request: NextRequest): boolean {
  const authHeader = request.headers.get('authorization')
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return false
  }
  
  const token = authHeader.substring(7)
  
  // For a simple implementation, you can use a fixed token
  // In production, you should verify against your auth service
  const validToken = process.env.JWT_SECRET || 'your-jwt-secret'
  
  // This is a basic check - in production, use proper JWT verification
  return token === validToken
}

// Combined authentication check
export function isAuthenticated(request: NextRequest): boolean {
  return validateApiKey(request) || validateJWT(request)
}

// Get user info from request (basic implementation)
export function getUserFromRequest(request: NextRequest): { userId?: string } {
  // Extract user info from headers or token
  const userId = request.headers.get('x-user-id')
  
  return {
    userId: userId || undefined
  }
} 