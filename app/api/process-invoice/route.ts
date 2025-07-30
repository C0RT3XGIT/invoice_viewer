import { NextResponse } from 'next/server'
import { withAuth } from '@/lib/route-protection'

async function processInvoiceHandler(request: Request) {
  try {
    const formData = await request.formData()
    const file = formData.get('data')

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    const requestURL = `${process.env.NEXT_PUBLIC_API_URL}${'/e4b76d30-ca8e-4d67-a440-4e518dec67c7'}`
    
    // Server-side logging that will be visible in production
    if (process.env.NODE_ENV === 'production') {
      // This will appear in your production logs (Railway, Docker, etc.)
      console.error('[PRODUCTION] Processing invoice request to:', requestURL)
    } else {
      console.log('[DEV] Processing invoice request to:', requestURL)
    }

    // Forward the request to the external webhook
    const externalResponse = await fetch(requestURL, {
      method: 'POST',
      body: formData,
    })

    if (!externalResponse.ok) {
      throw new Error(`External API error: ${externalResponse.status}`)
    }

    const data = await externalResponse.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error processing invoice:', error)
    return NextResponse.json(
      { error: 'Failed to process invoice' },
      { status: 500 }
    )
  }
}

// Export the protected handler
export const POST = withAuth(processInvoiceHandler) 