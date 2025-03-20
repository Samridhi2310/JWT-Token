import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("jwtToken");
  const pathname = request.nextUrl.pathname;

  // ✅ Define public routes (accessible without authentication)
  const publicRoutes = ["/", "/login"]; // Add more if needed

  // ✅ Allow requests for public pages and API/static files
if (
      publicRoutes.includes(pathname) || // Allow public pages
    pathname.startsWith("/api") || // Allow API requests
    pathname.startsWith("/_next") || // Allow Next.js assets
    pathname.startsWith("/static") // Allow static files
  ) {
    return NextResponse.next();
  }

  // ✅ If token is missing, redirect to login page
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url)); // Redirect to login
  }

  return NextResponse.next();
}

// ✅ Apply middleware to all routes except explicitly public ones
export const config = {
  matcher: ["/:path*"], // Protect all routes dynamically except defined public routes
};
