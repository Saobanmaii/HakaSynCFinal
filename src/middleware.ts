import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED_ROUTES = ["/feed", "/workspace", "/dashboard", "/archive"];
const PUBLIC_AUTH_ROUTES = ["/login", "/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuthed = request.cookies.get("mock-auth")?.value === "true";

  const isProtected = PROTECTED_ROUTES.some((r) => pathname.startsWith(r));
  const isAuthPage = PUBLIC_AUTH_ROUTES.some((r) => pathname.startsWith(r));

  if (isProtected && !isAuthed) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (isAuthPage && isAuthed) {
    return NextResponse.redirect(new URL("/feed", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/).*)"],
};
