import { getDictionary } from "../dictionaries"
import BooksList from "./books-list"
import { useBookStore, type BookFilters } from "../lib/data"
import { Suspense } from "react"
import { Skeleton } from "@/components/ui/skeleton"

interface BooksPageProps {
  params: { lang: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default async function BooksPage({ params, searchParams }: BooksPageProps) {
  const { lang } = params
  const dictionary = await getDictionary(lang)

  // Parse search params
  const search = typeof searchParams.search === "string" ? searchParams.search : undefined
  const categoryParam = searchParams.category
  const categories = categoryParam ? (Array.isArray(categoryParam) ? categoryParam : [categoryParam]) : undefined

  const minPrice = typeof searchParams.minPrice === "string" ? Number.parseFloat(searchParams.minPrice) : undefined
  const maxPrice = typeof searchParams.maxPrice === "string" ? Number.parseFloat(searchParams.maxPrice) : undefined
  const priceRange =
    minPrice !== undefined && maxPrice !== undefined ? ([minPrice, maxPrice] as [number, number]) : undefined

  const inStock = searchParams.inStock === "true" ? true : undefined
  const rating = typeof searchParams.rating === "string" ? Number.parseFloat(searchParams.rating) : undefined

  // Create filters object
  const filters: BookFilters = {
    search,
    category: categories,
    priceRange,
    inStock,
    rating,
  }

  // Get books from store
  const books = useBookStore.getState().filterBooks(filters, lang)

  return (
    <Suspense fallback={<BooksPageSkeleton />}>
      <BooksList lang={lang} dictionary={dictionary} books={books} initialFilters={filters} />
    </Suspense>
  )
}

function BooksPageSkeleton() {
  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <Skeleton className="h-8 w-48 mb-2" />
          <Skeleton className="h-4 w-64" />
        </div>
        <div className="mt-4 md:mt-0 flex items-center">
          <Skeleton className="h-9 w-32 mr-2" />
          <Skeleton className="h-9 w-40" />
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar Skeleton */}
        <div className="w-full md:w-1/4">
          <div className="space-y-6 bg-card p-4 rounded-lg border">
            <Skeleton className="h-9 w-full" />
            <div className="space-y-4">
              <Skeleton className="h-6 w-32" />
              <div className="space-y-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <Skeleton className="h-4 w-4" />
                    <Skeleton className="h-4 w-24" />
                  </div>
                ))}
              </div>
            </div>
            <Skeleton className="h-9 w-full" />
          </div>
        </div>

        {/* Books Grid Skeleton */}
        <div className="w-full md:w-3/4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="border rounded-lg overflow-hidden">
                <Skeleton className="aspect-[3/4] w-full" />
                <div className="p-4 space-y-2">
                  <Skeleton className="h-6 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                  <div className="flex justify-between mt-2">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-4 w-20" />
                  </div>
                  <Skeleton className="h-9 w-full mt-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

