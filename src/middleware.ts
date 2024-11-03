import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Add your middleware logic here
  // For now, just let all requests through
  return NextResponse.next()
}

// Configure which routes use this middleware
export const config = {
  matcher: '/api/:path*',
} 