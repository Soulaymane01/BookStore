import { getDictionary } from "../../dictionaries"
import BookDetail from "./book-detail"
import { useBookStore, getRelatedBooks } from "../../lib/data"
import { notFound } from "next/navigation"
import { generateStaticParams } from "@/utils/generateStaticParams";

export { generateStaticParams };

interface BookPageProps {
  params: { lang: string; id: string }
}

export default async function BookPage({ params }: BookPageProps) {
  const { lang, id } = params
  const dictionary = await getDictionary(lang)

  // Get book from store
  const bookId = Number.parseInt(id)
  const book = useBookStore.getState().getBook(bookId)

  if (!book) {
    notFound()
  }

  // Get related books
  const relatedBooks = getRelatedBooks(bookId, 4, lang)

  return <BookDetail lang={lang} book={book} relatedBooks={relatedBooks} dictionary={dictionary} />
}

