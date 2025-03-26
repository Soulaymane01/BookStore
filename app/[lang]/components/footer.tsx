import Link from "next/link"
import { getDictionary } from "../dictionaries"

interface FooterProps {
  lang: string
}

export default async function Footer({ lang }: FooterProps) {
  const dictionary = await getDictionary(lang)

  return (
    <footer className="w-full border-t bg-background">
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Islamic Books</h3>
            <p className="text-muted-foreground">
              {lang === "ar"
                ? "مصدرك الموثوق للكتب الإسلامية والعربية الأصيلة"
                : lang === "es"
                  ? "Su fuente confiable para libros islámicos y árabes auténticos"
                  : "Your trusted source for authentic Islamic and Arabic books"}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.navigation.books}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/books/category/quran`} className="text-muted-foreground hover:text-primary">
                  {dictionary.home.categories.quran}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/books/category/hadith`} className="text-muted-foreground hover:text-primary">
                  {dictionary.home.categories.hadith}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/books/category/fiqh`} className="text-muted-foreground hover:text-primary">
                  {dictionary.home.categories.fiqh}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/books/category/seerah`} className="text-muted-foreground hover:text-primary">
                  {dictionary.home.categories.seerah}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer.about}</h3>
            <ul className="space-y-2">
              <li>
                <Link href={`/${lang}/about`} className="text-muted-foreground hover:text-primary">
                  {dictionary.footer.about}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/contact`} className="text-muted-foreground hover:text-primary">
                  {dictionary.footer.contact}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/terms`} className="text-muted-foreground hover:text-primary">
                  {dictionary.footer.terms}
                </Link>
              </li>
              <li>
                <Link href={`/${lang}/privacy`} className="text-muted-foreground hover:text-primary">
                  {dictionary.footer.privacy}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">{dictionary.footer.contact}</h3>
            <ul className="space-y-2">
              <li className="text-muted-foreground">
                {lang === "ar"
                  ? "البريد الإلكتروني: info@islamicbooks.com"
                  : lang === "es"
                    ? "Email: info@islamicbooks.com"
                    : "Email: info@islamicbooks.com"}
              </li>
              <li className="text-muted-foreground">
                {lang === "ar"
                  ? "الهاتف: +123 456 7890"
                  : lang === "es"
                    ? "Teléfono: +123 456 7890"
                    : "Phone: +123 456 7890"}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t text-center text-muted-foreground">
          <p>{dictionary.footer.copyright}</p>
        </div>
      </div>
    </footer>
  )
}

