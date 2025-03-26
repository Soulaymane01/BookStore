"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Search, Filter, Star, ShoppingCart } from "lucide-react"
import { type Book, type BookFilters, categories, getBookTitle, getBookAuthor } from "../lib/data"
import { useCart } from "../hooks/use-cart"
import { useToast } from "@/components/ui/use-toast"

interface BooksListProps {
  lang: string
  dictionary: any
  books: Book[]
  initialFilters: BookFilters
}

export default function BooksList({ lang, dictionary, books, initialFilters }: BooksListProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { toast } = useToast()
  const { addItem } = useCart()

  // State for filters
  const [filters, setFilters] = useState<BookFilters>(initialFilters)
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || "")
  const [selectedCategories, setSelectedCategories] = useState<string[]>(initialFilters.category || [])
  const [priceRange, setPriceRange] = useState<[number, number]>(initialFilters.priceRange || [0, 100])
  const [showInStock, setShowInStock] = useState<boolean>(initialFilters.inStock || false)
  const [minRating, setMinRating] = useState<number>(initialFilters.rating || 0)
  const [sortOption, setSortOption] = useState<string>("featured")

  // Apply filters
  const applyFilters = () => {
    const queryParams = new URLSearchParams()

    if (searchQuery) queryParams.set("search", searchQuery)

    selectedCategories.forEach((category) => {
      queryParams.append("category", category)
    })

    if (priceRange[0] > 0) queryParams.set("minPrice", priceRange[0].toString())
    if (priceRange[1] < 100) queryParams.set("maxPrice", priceRange[1].toString())

    if (showInStock) queryParams.set("inStock", "true")

    if (minRating > 0) queryParams.set("rating", minRating.toString())

    router.push(`${pathname}?${queryParams.toString()}`)
  }

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("")
    setSelectedCategories([])
    setPriceRange([0, 100])
    setShowInStock(false)
    setMinRating(0)
    setSortOption("featured")
    router.push(pathname)
  }

  // Handle category selection
  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories((prev) => [...prev, category])
    } else {
      setSelectedCategories((prev) => prev.filter((c) => c !== category))
    }
  }

  // Sort books
  const sortedBooks = [...books].sort((a, b) => {
    switch (sortOption) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return b.id - a.id
      default: // featured
        return (b.rating || 0) - (a.rating || 0)
    }
  })

  // Handle add to cart
  const handleAddToCart = (book: Book) => {
    addItem({
      id: book.id,
      title: getBookTitle(book, lang),
      author: getBookAuthor(book, lang),
      price: book.price,
      image: book.image,
      quantity: 1,
    })

    toast({
      title: lang === "ar" ? "تمت الإضافة إلى السلة" : lang === "es" ? "Añadido al carrito" : "Added to cart",
      description: getBookTitle(book, lang),
      duration: 3000,
    })
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12 animate-fadeIn">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold mb-2">{dictionary.navigation.books}</h1>
          <p className="text-muted-foreground">
            {lang === "ar"
              ? "استكشف مجموعتنا الواسعة من الكتب الإسلامية والعربية"
              : lang === "es"
                ? "Explora nuestra amplia colección de libros islámicos y árabes"
                : "Explore our extensive collection of Islamic and Arabic books"}
          </p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center">
          <Button variant="outline" size="sm" className="flex items-center gap-2 mr-2">
            <Filter className="h-4 w-4" />
            {dictionary.books.filter}
          </Button>

          <Select value={sortOption} onValueChange={setSortOption}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={dictionary.books.sort} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">
                {lang === "ar" ? "المميزة" : lang === "es" ? "Destacados" : "Featured"}
              </SelectItem>
              <SelectItem value="price-low">
                {lang === "ar"
                  ? "السعر: من الأقل إلى الأعلى"
                  : lang === "es"
                    ? "Precio: de menor a mayor"
                    : "Price: Low to High"}
              </SelectItem>
              <SelectItem value="price-high">
                {lang === "ar"
                  ? "السعر: من الأعلى إلى الأقل"
                  : lang === "es"
                    ? "Precio: de mayor a menor"
                    : "Price: High to Low"}
              </SelectItem>
              <SelectItem value="newest">
                {lang === "ar" ? "الأحدث" : lang === "es" ? "Más recientes" : "Newest"}
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-1/4">
          <div className="sticky top-24 space-y-6 bg-card p-4 rounded-lg border shadow-soft">
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={dictionary.books.search}
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <Accordion type="multiple" className="w-full" defaultValue={["category", "price", "stock", "rating"]}>
              <AccordionItem value="category" className="border-b">
                <AccordionTrigger className="text-base font-medium">{dictionary.books.category}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <div key={category.id} className="flex items-center space-x-2">
                        <Checkbox
                          id={`category-${category.id}`}
                          checked={selectedCategories.includes(category.id)}
                          onCheckedChange={(checked) => handleCategoryChange(category.id, checked as boolean)}
                        />
                        <Label htmlFor={`category-${category.id}`} className="text-sm cursor-pointer">
                          {dictionary.home.categories[category.nameKey]}
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="price" className="border-b">
                <AccordionTrigger className="text-base font-medium">{dictionary.books.price}</AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-6">
                    <div className="pt-4">
                      <Slider
                        value={priceRange}
                        min={0}
                        max={100}
                        step={1}
                        onValueChange={(value) => setPriceRange(value as [number, number])}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="stock" className="border-b">
                <AccordionTrigger className="text-base font-medium">
                  {lang === "ar" ? "المتوفر" : lang === "es" ? "Disponibilidad" : "Availability"}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="in-stock"
                      checked={showInStock}
                      onCheckedChange={(checked) => setShowInStock(checked as boolean)}
                    />
                    <Label htmlFor="in-stock" className="text-sm cursor-pointer">
                      {lang === "ar" ? "متوفر فقط" : lang === "es" ? "Solo en stock" : "In stock only"}
                    </Label>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="rating" className="border-b">
                <AccordionTrigger className="text-base font-medium">
                  {lang === "ar" ? "التقييم" : lang === "es" ? "Valoración" : "Rating"}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <Checkbox
                          id={`rating-${rating}`}
                          checked={minRating === rating}
                          onCheckedChange={(checked) => setMinRating(checked ? rating : 0)}
                        />
                        <Label htmlFor={`rating-${rating}`} className="text-sm cursor-pointer flex items-center">
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${i < rating ? "fill-amber-500 text-amber-500" : "text-muted-foreground"}`}
                              />
                            ))}
                          </div>
                          <span className="ml-1">& up</span>
                        </Label>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>

            <div className="pt-4 space-y-2">
              <Button className="w-full" onClick={applyFilters}>
                {lang === "ar" ? "تطبيق الفلاتر" : lang === "es" ? "Aplicar filtros" : "Apply Filters"}
              </Button>
              <Button variant="outline" className="w-full" onClick={resetFilters}>
                {lang === "ar" ? "إعادة تعيين" : lang === "es" ? "Restablecer" : "Reset"}
              </Button>
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="w-full md:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-muted-foreground">
              {sortedBooks.length} {lang === "ar" ? "كتاب" : lang === "es" ? "libros" : "books"}
            </p>
          </div>

          {sortedBooks.length === 0 ? (
            <div className="text-center py-16">
              <Search className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h2 className="text-2xl font-semibold mb-2">
                {lang === "ar" ? "لا توجد كتب" : lang === "es" ? "No se encontraron libros" : "No books found"}
              </h2>
              <p className="text-muted-foreground mb-6">
                {lang === "ar"
                  ? "حاول تغيير معايير البحث أو الفلاتر الخاصة بك."
                  : lang === "es"
                    ? "Intenta cambiar tus criterios de búsqueda o filtros."
                    : "Try changing your search criteria or filters."}
              </p>
              <Button onClick={resetFilters}>
                {lang === "ar" ? "إعادة تعيين الفلاتر" : lang === "es" ? "Restablecer filtros" : "Reset Filters"}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedBooks.map((book) => (
                <Card key={book.id} className="book-card overflow-hidden">
                  <Link href={`/${lang}/books/${book.id}`} className="block">
                    <div className="book-card-image">
                      <Image
                        src={book.image || "/placeholder.svg"}
                        alt={getBookTitle(book, lang)}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                      {book.isNew && (
                        <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                          {lang === "ar" ? "جديد" : lang === "es" ? "Nuevo" : "New"}
                        </div>
                      )}
                    </div>
                  </Link>
                  <CardContent className="book-card-content">
                    <Link href={`/${lang}/books/${book.id}`}>
                      <h3 className="book-card-title">{getBookTitle(book, lang)}</h3>
                    </Link>
                    <p className="book-card-author">{getBookAuthor(book, lang)}</p>
                    <div className="flex items-center mt-1 text-amber-500">
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < (book.rating || 0) ? "fill-current" : "text-muted-foreground"}`}
                          />
                        ))}
                      </div>
                      <span className="ml-1 text-sm">
                        {book.rating} ({book.reviews})
                      </span>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <span className="book-card-price">${book.price}</span>
                      <span className="book-card-category">{dictionary.home.categories[book.category]}</span>
                    </div>
                    <div className="mt-4">
                      <Button
                        className="w-full rounded-full"
                        onClick={() => handleAddToCart(book)}
                        disabled={book.stock === 0}
                      >
                        <ShoppingCart className="mr-2 h-4 w-4" />
                        {dictionary.books.addToCart}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Pagination */}
          {sortedBooks.length > 0 && (
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                <Button variant="outline" size="icon" disabled>
                  <span className="sr-only">Previous</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m15 18-6-6 6-6"></path>
                  </svg>
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                  1
                </Button>
                <Button variant="outline" size="icon">
                  <span className="sr-only">Next</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-4 w-4"
                  >
                    <path d="m9 18 6-6-6-6"></path>
                  </svg>
                </Button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

