"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Menu, ShoppingCart, Globe, Search, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../hooks/use-cart"

interface NavbarProps {
  lang: string
  dictionary: any
}

export default function Navbar({ lang, dictionary }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const { itemCount } = useCart()

  // Remove the language prefix from the pathname to get the route
  const route = pathname.replace(`/${lang}`, "") || "/"

  // Function to change language while preserving the current route
  const changeLanguage = (newLang: string) => {
    window.location.href = `/${newLang}${route}`
  }

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/${lang}/books?search=${encodeURIComponent(searchQuery.trim())}`)
    }
  }

  // Initialize search query from URL on component mount
  useEffect(() => {
    const query = searchParams.get("search")
    if (query) {
      setSearchQuery(query)
    }
  }, [searchParams])

  // Add scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-background/60"
          : "bg-background"
      }`}
    >
      <div className="container flex h-16 md:h-20 items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-2">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side={lang === "ar" ? "right" : "left"} className="w-[300px] sm:w-[400px]">
                <div className="flex items-center mb-8">
                  <Link href={`/${lang}`} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
                    <BookOpen className="h-6 w-6 text-primary" />
                    <span className="font-bold text-xl">Islamic Books</span>
                  </Link>
                </div>
                <nav className="flex flex-col gap-4">
                  <Link
                    href={`/${lang}`}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {dictionary.navigation.home}
                  </Link>
                  <Link
                    href={`/${lang}/books`}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {dictionary.navigation.books}
                  </Link>
                  <Link
                    href={`/${lang}/about`}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {dictionary.navigation.about}
                  </Link>
                  <Link
                    href={`/${lang}/contact`}
                    className="text-lg font-medium hover:text-primary transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    {dictionary.navigation.contact}
                  </Link>
                  <div className="border-t my-4 pt-4">
                    <Link
                      href={`/${lang}/admin`}
                      className="text-lg font-medium hover:text-primary transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {dictionary.navigation.dashboard}
                    </Link>
                  </div>
                </nav>
              </SheetContent>
            </Sheet>

            <Link href={`/${lang}`} className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 text-primary hidden sm:block" />
              <span className="font-bold text-xl">Islamic Books</span>
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-8 mx-6">
            <Link
              href={`/${lang}`}
              className={`text-sm font-medium transition-colors ${route === "/" ? "text-primary" : "text-foreground hover:text-primary"}`}
            >
              {dictionary.navigation.home}
            </Link>
            <Link
              href={`/${lang}/books`}
              className={`text-sm font-medium transition-colors ${route.startsWith("/books") ? "text-primary" : "text-foreground hover:text-primary"}`}
            >
              {dictionary.navigation.books}
            </Link>
            <Link
              href={`/${lang}/about`}
              className={`text-sm font-medium transition-colors ${route.startsWith("/about") ? "text-primary" : "text-foreground hover:text-primary"}`}
            >
              {dictionary.navigation.about}
            </Link>
            <Link
              href={`/${lang}/contact`}
              className={`text-sm font-medium transition-colors ${route.startsWith("/contact") ? "text-primary" : "text-foreground hover:text-primary"}`}
            >
              {dictionary.navigation.contact}
            </Link>
          </nav>

          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden md:flex relative w-40 lg:w-64 transition-all">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={dictionary.books.search}
                className="pl-10 h-9 focus-visible:ring-primary"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button type="submit" size="sm" variant="ghost" className="absolute right-0 top-0 h-full">
                <span className="sr-only">Search</span>
              </Button>
            </form>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Globe className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={lang === "ar" ? "start" : "end"}>
                <DropdownMenuItem onClick={() => changeLanguage("ar")}>العربية</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("es")}>Español</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link href={`/${lang}/cart`} className="relative">
              <Button variant="ghost" size="icon" className="rounded-full">
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">
                    {itemCount}
                  </Badge>
                )}
              </Button>
            </Link>

            <Link href={`/${lang}/admin`} className="hidden sm:block">
              <Button variant="outline" size="sm" className="rounded-full">
                {dictionary.navigation.dashboard}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

