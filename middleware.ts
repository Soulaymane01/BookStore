import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { match } from "@formatjs/intl-localematcher"
import Negotiator from "negotiator"

// List of supported locales
const locales = ["ar", "en", "es"]
const defaultLocale = "ar"

// Get the preferred locale from the request
function getLocale(request: NextRequest) {
  const negotiatorHeaders: Record<string, string> = {}
  request.headers.forEach((value, key) => (negotiatorHeaders[key] = value))

  // Use negotiator and intl-localematcher to get the best locale
  const languages = new Negotiator({ headers: negotiatorHeaders }).languages()
  return match(languages, locales, defaultLocale)
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname

  // Check if the pathname is missing a locale
  const pathnameHasLocale = locales.some((locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`)

  // Special case for root path
  if (pathname === "/") {
    const locale = getLocale(request)
    return NextResponse.redirect(new URL(`/${locale}`, request.url))
  }

  if (!pathnameHasLocale) {
    // Redirect if there is no locale in the pathname
    const locale = getLocale(request)
    return NextResponse.redirect(
      new URL(`/${locale}${pathname.startsWith("/") ? pathname : `/${pathname}`}`, request.url),
    )
  }

  return NextResponse.next()
}

export const config = {
  // Match all pathnames except for:
  // - API routes
  // - Static files (e.g. images)
  // - Favicon
  // - _next (Next.js internals)
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}

