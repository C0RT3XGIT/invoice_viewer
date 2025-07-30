# API Route Protection Guide

This guide explains how to protect your Next.js API routes using the implemented authentication system.

## 🔐 Protection Methods

### 1. Middleware Protection (Recommended)

The `middleware.ts` file automatically protects all routes listed in `protectedRoutes`. This is the simplest approach.

**Protected Routes:**

- `/api/process-invoice`
- `/api/invoices`

**Public Routes:**

- `/api/health`

### 2. Route-Level Protection

Use the `withAuth` wrapper for individual route protection:

```typescript
import { withAuth } from "@/lib/route-protection";

async function myHandler(request: Request) {
  // Your API logic here
  return NextResponse.json({ data: "success" });
}

export const GET = withAuth(myHandler);
export const POST = withAuth(myHandler);
```

### 3. Custom Authentication

Use `withCustomAuth` for custom authentication logic:

```typescript
import { withCustomAuth } from "@/lib/route-protection";

function customAuthCheck(request: NextRequest) {
  // Your custom authentication logic
  return request.headers.get("x-custom-token") === "valid-token";
}

export const GET = withCustomAuth(customAuthCheck, myHandler);
```

## 🔑 Authentication Methods

### API Key Authentication

Send requests with an API key in headers or query parameters:

```bash
# Header method (recommended)
curl -H "x-api-key: your-secret-api-key" http://localhost:3000/api/invoices

# Query parameter method
curl http://localhost:3000/api/invoices?api_key=your-secret-api-key
```

### JWT Token Authentication

Send requests with a Bearer token:

```bash
curl -H "Authorization: Bearer your-jwt-secret" http://localhost:3000/api/invoices
```

## 🌍 Environment Variables

Create a `.env.local` file in your `frontend` directory with these variables:

```bash
# API Key for server-side authentication (keep this secret)
API_KEY=your-secret-api-key-here

# JWT Secret for token-based authentication (keep this secret)
JWT_SECRET=your-jwt-secret-here

# API Key for frontend API client (this will be exposed to the browser)
NEXT_PUBLIC_API_KEY=your-secret-api-key-here

# Your existing environment variables
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
NEXT_PUBLIC_API_URL=your-n8n-api-url
```

## 📱 Frontend Usage

### Using the API Client

```typescript
import { invoiceApi } from "@/lib/api-client";

// Get all invoices (authenticated)
const invoices = await invoiceApi.getAll();

// Process an invoice (authenticated)
const formData = new FormData();
formData.append("data", file);
const result = await invoiceApi.process(formData);

// Health check (no auth required)
const health = await invoiceApi.health();
```

### Using Services with Authentication

Your services should use the API client instead of direct fetch calls:

```typescript
// ✅ Correct: Use the authenticated API client
import { apiClient } from "@/lib/api-client";

export async function getAllInvoices() {
  const response = await apiClient.get("/invoices");
  return response;
}

// ❌ Incorrect: Direct fetch calls will fail with 401
export async function getAllInvoices() {
  const response = await fetch("/api/invoices"); // This will fail!
  return response.json();
}
```

### Manual Requests

```typescript
// With API key
const response = await fetch("/api/invoices", {
  headers: {
    "x-api-key": "your-secret-api-key",
  },
});

// With JWT token
const response = await fetch("/api/invoices", {
  headers: {
    Authorization: "Bearer your-jwt-secret",
  },
});
```

## 🛡️ Security Best Practices

### 1. Use Strong API Keys

- Generate random, long API keys (32+ characters)
- Use different keys for different environments
- Rotate keys regularly

### 2. Environment Variables

- Never hardcode secrets in your code
- Use different keys for development and production
- Keep `.env` files out of version control

### 3. HTTPS in Production

- Always use HTTPS in production
- Configure proper CORS headers
- Validate all inputs

### 4. Rate Limiting

Use the built-in rate limiting for sensitive endpoints:

```typescript
import { withRateLimit } from "@/lib/route-protection";

export const POST = withRateLimit(withAuth(myHandler), 10, 60000); // 10 requests per minute
```

## 🔧 Configuration

### Adding New Protected Routes

Edit `middleware.ts`:

```typescript
const protectedRoutes = [
  "/api/process-invoice",
  "/api/invoices",
  "/api/new-protected-route", // Add new routes here
];
```

### Adding New Public Routes

```typescript
const publicRoutes = [
  "/api/health",
  "/api/public-endpoint", // Add new public routes here
];
```

### Custom Authentication Logic

Create custom authentication in `lib/auth.ts`:

```typescript
export function validateCustomAuth(request: NextRequest): boolean {
  // Your custom authentication logic
  const customHeader = request.headers.get("x-custom-auth");
  return customHeader === "valid-value";
}
```

## 🚨 Error Responses

When authentication fails, the API returns:

```json
{
  "error": "Unauthorized",
  "message": "API key or JWT token required"
}
```

Status code: `401 Unauthorized`

## 📝 Example Implementation

Here's a complete example of a protected API route:

```typescript
// app/api/protected-example/route.ts
import { NextResponse } from "next/server";
import { withAuth } from "@/lib/route-protection";

async function protectedHandler(request: Request) {
  try {
    // Your protected API logic here
    const data = { message: "This is protected data" };
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export const GET = withAuth(protectedHandler);
export const POST = withAuth(protectedHandler);
```

## 🔄 Testing

### Test with curl

```bash
# Should fail (no auth)
curl http://localhost:3000/api/invoices

# Should succeed (with API key)
curl -H "x-api-key: your-secret-api-key" http://localhost:3000/api/invoices

# Should succeed (with JWT)
curl -H "Authorization: Bearer your-jwt-secret" http://localhost:3000/api/invoices
```

### Test with Postman

1. Add header: `x-api-key: your-secret-api-key`
2. Or add header: `Authorization: Bearer your-jwt-secret`

### Test with the AuthTest Component

Use the `AuthTest` component to verify authentication is working:

```typescript
import { AuthTest } from "@/components/auth-test";

// Add this to any page to test authentication
<AuthTest />;
```

## 🔧 Troubleshooting

### Common Issues

1. **401 Unauthorized errors**: Make sure you've set the environment variables correctly
2. **Internal API calls failing**: Use the `apiClient` instead of direct fetch calls
3. **FormData issues**: The API client handles FormData automatically

### Quick Setup Checklist

- [ ] Create `.env.local` file with required variables
- [ ] Set `NEXT_PUBLIC_API_KEY` for frontend authentication
- [ ] Set `API_KEY` for server-side authentication
- [ ] Update services to use `apiClient` instead of direct fetch
- [ ] Test with the `AuthTest` component

This protection system provides a simple but effective way to secure your API routes while maintaining flexibility for different authentication methods.
