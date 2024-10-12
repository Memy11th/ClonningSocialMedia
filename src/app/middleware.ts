// middleware.js
import { NextResponse } from 'next/server';

export function middleware(req) {
  // Access token from cookies
  const token = req.cookies.get('AuthenticationToken');

  const url = req.nextUrl.clone();

  // Redirect to login if no token is found
  if (!token && url.pathname !== '/login') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }

  // If authenticated, proceed
  return NextResponse.next();
}

// Apply middleware to all routes
export const config = {
  matcher: ['/:path*'], // Protect all routes
};
