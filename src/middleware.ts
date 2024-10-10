import { NextRequest, NextResponse } from 'next/server'

const corsOptions = {
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Allow-Origin': '*', // Allow all origins
}

export function middleware(request: NextRequest) {
  // Handle preflight requests (OPTIONS method)
  if (request.method === 'OPTIONS') {
    // Return preflight response with appropriate CORS headers
    return NextResponse.json(
      {},
      { headers: corsOptions }
    )
  }

  // For non-preflight requests
  const response = NextResponse.next()

  // Add CORS headers to the response
  Object.entries(corsOptions).forEach(([key, value]) => {
    response.headers.set(key, value)
  })

  return response
}

export const config = {
  matcher: '/api/mobile/:path*', // Apply to all routes
}
