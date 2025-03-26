"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ShoppingCart, Heart, Share2, Book, MessageCircle, Mail, Star } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "../../hooks/use-cart"
import { type Book as BookType, getBookTitle, getBookAuthor, getBookDescription } from "../../lib/data"
import { generateStaticParams } from "@/utils/generateStaticParams";

export { generateStaticParams };

interface BookDetailProps {
  lang: string
  book: BookType
  relatedBooks: BookType[]
  dictionary: any
}

export default function BookDetail({ lang, book, relatedBooks, dictionary }: BookDetailProps) {
  const [quantity, setQuantity] = useState(1)
  const { toast } = useToast()
  const { addItem } = useCart()
  const [isFavorite, setIsFavorite] = useState(false)

  const incrementQuantity = () => setQuantity((prev) => prev + 1)
  const decrementQuantity = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1))

  const handleAddToCart = () => {
    addItem({
      id: book.id,
      title: getBookTitle(book, lang),
      author: getBookAuthor(book, lang),
      price: book.price,
      image: book.image,
      quantity: quantity,
    })

    toast({
      title: lang === "ar" ? "تمت الإضافة إلى السلة" : lang === "es" ? "Añadido al carrito" : "Added to cart",
      description: getBookTitle(book, lang),
      duration: 3000,
    })
  }

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: getBookTitle(book, lang),
          text: getBookDescription(book, lang),
          url: window.location.href,
        })
      } catch (error) {
        console.error("Error sharing:", error)
      }
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: lang === "ar" ? "تم النسخ" : lang === "es" ? "Copiado" : "Copied",
        description:
          lang === "ar"
            ? "تم نسخ الرابط إلى الحافظة"
            : lang === "es"
              ? "Enlace copiado al portapapeles"
              : "Link copied to clipboard",
        duration: 3000,
      })
    }
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite)
    toast({
      title: !isFavorite
        ? lang === "ar"
          ? "تمت الإضافة إلى المفضلة"
          : lang === "es"
            ? "Añadido a favoritos"
            : "Added to favorites"
        : lang === "ar"
          ? "تمت الإزالة من المفضلة"
          : lang === "es"
            ? "Eliminado de favoritos"
            : "Removed from favorites",
      description: getBookTitle(book, lang),
      duration: 3000,
    })
  }

  const inStock = book.stock > 0

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Book Image */}
        <div className="space-y-4">
          <div className="aspect-[3/4] relative rounded-lg overflow-hidden border">
            <Image
              src={book.image || "/placeholder.svg"}
              alt={getBookTitle(book, lang)}
              fill
              className="object-cover"
            />
          </div>

          <div className="grid grid-cols-3 gap-2">
            {book.previewImages?.map((img: string, index: number) => (
              <div key={index} className="aspect-[3/4] relative rounded-lg overflow-hidden border">
                <Image
                  src={img || "/placeholder.svg"}
                  alt={`${getBookTitle(book, lang)} preview ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Book Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{getBookTitle(book, lang)}</h1>
            <p className="text-lg text-muted-foreground">{getBookAuthor(book, lang)}</p>

            {book.rating && (
              <div className="flex items-center mt-2 text-amber-500">
                <div className="flex">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < book.rating! ? "fill-current" : "text-muted-foreground"}`}
                    />
                  ))}
                </div>
                <span className="ml-1 text-sm">
                  {book.rating} ({book.reviews} {lang === "ar" ? "تقييم" : lang === "es" ? "reseñas" : "reviews"})
                </span>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold">${book.price}</span>
            {inStock ? (
              <span className="text-sm text-green-600 bg-green-100 px-2 py-1 rounded">
                {dictionary.product.inStock}
              </span>
            ) : (
              <span className="text-sm text-red-600 bg-red-100 px-2 py-1 rounded">{dictionary.product.outOfStock}</span>
            )}
          </div>

          <div className="flex items-center space-x-4">
            <div className="flex items-center border rounded-md">
              <Button variant="ghost" size="icon" onClick={decrementQuantity} disabled={quantity <= 1}>
                -
              </Button>
              <span className="w-10 text-center">{quantity}</span>
              <Button variant="ghost" size="icon" onClick={incrementQuantity}>
                +
              </Button>
            </div>

            <Button className="flex-1" disabled={!inStock} onClick={handleAddToCart}>
              <ShoppingCart className="mr-2 h-4 w-4" />
              {dictionary.product.addToCart}
            </Button>

            <Button
              variant="outline"
              size="icon"
              onClick={toggleFavorite}
              className={isFavorite ? "text-red-500 hover:text-red-600" : ""}
            >
              <Heart className={`h-4 w-4 ${isFavorite ? "fill-current" : ""}`} />
            </Button>

            <Button variant="outline" size="icon" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>

          <Tabs defaultValue="description" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="description">{dictionary.product.description}</TabsTrigger>
              <TabsTrigger value="details">{dictionary.product.details}</TabsTrigger>
              <TabsTrigger value="reviews">{dictionary.product.reviews}</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="mt-4">
              <p className="text-muted-foreground">{getBookDescription(book, lang)}</p>
            </TabsContent>
            <TabsContent value="details" className="mt-4">
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2 py-1 border-b">
                  <span className="font-medium">
                    {lang === "ar" ? "الناشر" : lang === "es" ? "Editorial" : "Publisher"}
                  </span>
                  <span>{book.details?.publisher[lang as keyof typeof book.details.publisher]}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 py-1 border-b">
                  <span className="font-medium">{lang === "ar" ? "اللغة" : lang === "es" ? "Idioma" : "Language"}</span>
                  <span>{book.details?.language[lang as keyof typeof book.details.language]}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 py-1 border-b">
                  <span className="font-medium">
                    {lang === "ar" ? "عدد الصفحات" : lang === "es" ? "Páginas" : "Pages"}
                  </span>
                  <span>{book.details?.pages}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 py-1 border-b">
                  <span className="font-medium">ISBN</span>
                  <span>{book.details?.isbn}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 py-1 border-b">
                  <span className="font-medium">
                    {lang === "ar" ? "الطبعة" : lang === "es" ? "Edición" : "Edition"}
                  </span>
                  <span>{book.details?.edition[lang as keyof typeof book.details.edition]}</span>
                </div>
                <div className="grid grid-cols-2 gap-2 py-1 border-b">
                  <span className="font-medium">
                    {lang === "ar" ? "سنة النشر" : lang === "es" ? "Año de publicación" : "Publication Year"}
                  </span>
                  <span>{book.details?.year}</span>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="mt-4">
              <p className="text-muted-foreground">
                {lang === "ar"
                  ? "لا توجد مراجعات حتى الآن. كن أول من يراجع هذا الكتاب."
                  : lang === "es"
                    ? "No hay reseñas todavía. Sé el primero en dejar una reseña para este libro."
                    : "No reviews yet. Be the first to review this book."}
              </p>
            </TabsContent>
          </Tabs>

          {/* Book Preview */}
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="w-full">
                <Book className="mr-2 h-4 w-4" />
                {dictionary.product.preview}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl">
              <DialogHeader>
                <DialogTitle>{getBookTitle(book, lang)}</DialogTitle>
                <DialogDescription>
                  {lang === "ar"
                    ? "معاينة صفحات من الكتاب"
                    : lang === "es"
                      ? "Vista previa de páginas del libro"
                      : "Preview pages from the book"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {book.previewImages?.map((img: string, index: number) => (
                  <div key={index} className="aspect-[3/4] relative rounded-lg overflow-hidden border">
                    <Image
                      src={img || "/placeholder.svg"}
                      alt={`${getBookTitle(book, lang)} preview ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </DialogContent>
          </Dialog>

          {/* Contact Options */}
          <div className="pt-4 border-t">
            <h3 className="font-medium mb-2">{dictionary.product.contactUs}</h3>
            <div className="flex space-x-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  window.open(
                    `https://wa.me/+34612345678?text=${encodeURIComponent(
                      `${
                        lang === "ar"
                          ? `استفسار حول كتاب: ${getBookTitle(book, lang)}`
                          : lang === "es"
                            ? `Consulta sobre el libro: ${getBookTitle(book, lang)}`
                            : `Inquiry about book: ${getBookTitle(book, lang)}`
                      }`,
                    )}`,
                    "_blank",
                  )
                }}
              >
                <MessageCircle className="mr-2 h-4 w-4" />
                {dictionary.product.whatsapp}
              </Button>
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => {
                  window.location.href = `mailto:info@islamicbooks.com?subject=${encodeURIComponent(
                    `${
                      lang === "ar"
                        ? `استفسار حول كتاب: ${getBookTitle(book, lang)}`
                        : lang === "es"
                          ? `Consulta sobre el libro: ${getBookTitle(book, lang)}`
                          : `Inquiry about book: ${getBookTitle(book, lang)}`
                    }`,
                  )}`
                }}
              >
                <Mail className="mr-2 h-4 w-4" />
                {dictionary.product.email}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Books */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-6">{dictionary.product.relatedBooks}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {relatedBooks.map((relatedBook) => (
            <Card key={relatedBook.id} className="overflow-hidden h-full transition-all hover:shadow-lg">
              <Link href={`/${lang}/books/${relatedBook.id}`}>
                <div className="aspect-[3/4] relative">
                  <Image
                    src={relatedBook.image || "/placeholder.svg"}
                    alt={getBookTitle(relatedBook, lang)}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <Link href={`/${lang}/books/${relatedBook.id}`}>
                  <h3 className="font-semibold text-lg line-clamp-1">{getBookTitle(relatedBook, lang)}</h3>
                </Link>
                <p className="text-sm text-muted-foreground">{getBookAuthor(relatedBook, lang)}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="font-medium">${relatedBook.price}</span>
                </div>
                <div className="mt-4">
                  <Button
                    className="w-full"
                    onClick={() => {
                      addItem({
                        id: relatedBook.id,
                        title: getBookTitle(relatedBook, lang),
                        author: getBookAuthor(relatedBook, lang),
                        price: relatedBook.price,
                        image: relatedBook.image,
                        quantity: 1,
                      })

                      toast({
                        title:
                          lang === "ar"
                            ? "تمت الإضافة إلى السلة"
                            : lang === "es"
                              ? "Añadido al carrito"
                              : "Added to cart",
                        description: getBookTitle(relatedBook, lang),
                        duration: 3000,
                      })
                    }}
                    disabled={relatedBook.stock === 0}
                  >
                    {dictionary.books.addToCart}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

