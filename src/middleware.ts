import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const proto = request.headers.get("x-forwarded-proto");
  const host = request.headers.get("host") || "";

  // HTTP → HTTPS redirect
  if (proto === "http") {
    const cleanHost = host.replace(/^www\./, "");
    return NextResponse.redirect(
      `https://${cleanHost}${pathname}${request.nextUrl.search}`,
      301
    );
  }

  // www → non-www redirect
  if (host.startsWith("www.")) {
    return NextResponse.redirect(
      `https://${host.replace(/^www\./, "")}${pathname}${request.nextUrl.search}`,
      301
    );
  }

  // Protect admin routes (except login)
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const adminSession = request.cookies.get("admin_auth");
    if (!adminSession || adminSession.value !== process.env.ADMIN_PASSWORD) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|images|pagefind).*)"],
};
