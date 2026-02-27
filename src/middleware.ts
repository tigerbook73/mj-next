import { NextRequest, NextResponse } from "next/server";

const protectedPaths = ["/lobby", "/game"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasAuthToken = request.cookies.has("auth_token");

  if (protectedPaths.some((p) => pathname.startsWith(p)) && !hasAuthToken) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/signup", "/lobby/:path*", "/game/:path*"],
};
