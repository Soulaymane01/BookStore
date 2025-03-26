import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans, Noto_Kufi_Arabic } from "next/font/google"
import { notFound } from "next/navigation"
import { ThemeProvider } from "@/components/theme-provider"
import NavbarContainer from "./components/navbar-container"
import Footer from "./components/footer"
import { CartProvider } from "./hooks/use-cart"
import { Toaster } from "@/components/toaster"
import "./globals.css"

// Font for Latin scripts
const notoSans = Noto_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
})

// Font for Arabic script
const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-arabic",
})

// List of supported locales
const locales = ["ar", "en", "es"]

export const metadata: Metadata = {
  title: "Islamic Books Store",
  description: "Your trusted source for Arabic and Islamic books",
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { lang: string }
}) {
  // Validate that the incoming `lang` parameter is valid
  const { lang } = params

  if (!locales.includes(lang)) {
    notFound()
  }

  return (
    <html
      lang={lang}
      dir={lang === "ar" ? "rtl" : "ltr"}
      suppressHydrationWarning
      className={`${notoSans.variable} ${notoKufiArabic.variable}`}
    >
      <body className={lang === "ar" ? "font-arabic" : "font-sans"}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
          <CartProvider lang={lang}>
            <div className="flex min-h-screen flex-col bg-background">
              <NavbarContainer lang={lang} />
              <main className="flex-1">{children}</main>
              <Footer lang={lang} />
            </div>
            <Toaster />
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

