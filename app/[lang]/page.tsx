import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { getDictionary } from "./dictionaries"
import { BookOpen, BookText, History, Bookmark, ChevronRight, Star } from "lucide-react"
import { generateStaticParams } from "@/utils/generateStaticParams";

export { generateStaticParams };

interface HomePageProps {
  params: { lang: string }
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await  params
  const dictionary = await getDictionary(lang)

  // Mock featured books data
  const featuredBooks = [
    {
      id: 1,
      title:
        lang === "ar"
          ? "تفسير القرآن الكريم"
          : lang === "es"
            ? "Interpretación del Sagrado Corán"
            : "Interpretation of the Holy Quran",
      author:
        lang === "ar"
          ? "الشيخ عبد الرحمن السعدي"
          : lang === "es"
            ? "Sheikh Abdul Rahman Al-Saadi"
            : "Sheikh Abdul Rahman Al-Saadi",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=300",
      category: dictionary.home.categories.quran,
      rating: 4.8,
      reviews: 124,
    },
    {
      id: 2,
      title: lang === "ar" ? "صحيح البخاري" : lang === "es" ? "Sahih Al-Bukhari" : "Sahih Al-Bukhari",
      author: lang === "ar" ? "الإمام البخاري" : lang === "es" ? "Imam Al-Bukhari" : "Imam Al-Bukhari",
      price: 34.99,
      image: "/placeholder.svg?height=400&width=300",
      category: dictionary.home.categories.hadith,
      rating: 4.9,
      reviews: 215,
    },
    {
      id: 3,
      title: lang === "ar" ? "فقه السنة" : lang === "es" ? "Fiqh de la Sunnah" : "Fiqh of the Sunnah",
      author: lang === "ar" ? "السيد سابق" : lang === "es" ? "Sayyid Sabiq" : "Sayyid Sabiq",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=300",
      category: dictionary.home.categories.fiqh,
      rating: 4.7,
      reviews: 98,
    },
    {
      id: 4,
      title: lang === "ar" ? "الرحيق المختوم" : lang === "es" ? "El Néctar Sellado" : "The Sealed Nectar",
      author:
        lang === "ar"
          ? "صفي الرحمن المباركفوري"
          : lang === "es"
            ? "Safi-ur-Rahman al-Mubarakpuri"
            : "Safi-ur-Rahman al-Mubarakpuri",
      price: 27.99,
      image: "/placeholder.svg?height=400&width=300",
      category: dictionary.home.categories.seerah,
      rating: 4.9,
      reviews: 156,
    },
  ]

  // Mock categories with icons
  const categories = [
    {
      name: dictionary.home.categories.islamic,
      icon: <BookText className="h-10 w-10" />,
      slug: "islamic-studies",
    },
    {
      name: dictionary.home.categories.quran,
      icon: <BookOpen className="h-10 w-10" />,
      slug: "quran-tafsir",
    },
    {
      name: dictionary.home.categories.hadith,
      icon: <Bookmark className="h-10 w-10" />,
      slug: "hadith",
    },
    {
      name: dictionary.home.categories.fiqh,
      icon: <BookText className="h-10 w-10" />,
      slug: "fiqh",
    },
    {
      name: dictionary.home.categories.seerah,
      icon: <BookOpen className="h-10 w-10" />,
      slug: "seerah-biography",
    },
    {
      name: dictionary.home.categories.history,
      icon: <History className="h-10 w-10" />,
      slug: "islamic-history",
    },
  ]

  return (
    <div className="flex flex-col min-h-screen animate-fadeIn">
      {/* Hero Section */}
      <section className="hero-section">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=1600&q=80')] bg-cover bg-center opacity-20" />
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center space-y-6 text-center">
            <div className="space-y-3 max-w-3xl">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                {dictionary.home.hero.title}
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">{dictionary.home.hero.subtitle}</p>
            </div>
            <div className="space-x-4">
              <Link href={`/${lang}/books`}>
                <Button size="lg" className="rounded-full px-8">
                  {dictionary.home.hero.cta}
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div
          className="absolute -bottom-10 left-0 w-full h-20 bg-background"
          style={{
            clipPath: "polygon(0 0, 100% 100%, 100% 100%, 0% 100%)",
          }}
        ></div>
      </section>

      {/* Featured Books Section */}
      <section className="w-full py-16 md:py-24">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row mb-10">
            <div className="space-y-2">
              <h2 className="section-title">{dictionary.home.featured.title}</h2>
              <p className="text-muted-foreground">
                {lang === "ar"
                  ? "اكتشف أفضل الكتب الإسلامية المختارة بعناية"
                  : lang === "es"
                    ? "Descubre los mejores libros islámicos cuidadosamente seleccionados"
                    : "Discover our carefully curated selection of the best Islamic books"}
              </p>
            </div>
            <div>
              <Link href={`/${lang}/books`}>
                <Button variant="outline" className="group">
                  {dictionary.home.featured.viewAll}
                  <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <Link key={book.id} href={`/${lang}/books/${book.id}`} className="book-card">
                <div className="book-card-image">
                  <Image
                    src={book.image || "/placeholder.svg"}
                    alt={book.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-white text-xs font-bold px-2 py-1 rounded-full">
                    {lang === "ar" ? "مميز" : lang === "es" ? "Destacado" : "Featured"}
                  </div>
                </div>
                <div className="book-card-content">
                  <h3 className="book-card-title">{book.title}</h3>
                  <p className="book-card-author">{book.author}</p>
                  <div className="flex items-center mt-1 text-amber-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="ml-1 text-sm">
                      {book.rating} ({book.reviews})
                    </span>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="book-card-price">${book.price}</span>
                    <span className="book-card-category">{book.category}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="w-full py-16 md:py-24 bg-accent">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-center text-center mb-12">
            <h2 className="section-title">{dictionary.home.categories.title}</h2>
            <p className="section-description">
              {lang === "ar"
                ? "استكشف مجموعتنا الواسعة من الكتب الإسلامية المصنفة حسب الموضوع"
                : lang === "es"
                  ? "Explora nuestra amplia colección de libros islámicos clasificados por tema"
                  : "Explore our extensive collection of Islamic books categorized by subject"}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-4xl mx-auto">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/${lang}/books/category/${category.slug}`}
                className="flex flex-col items-center p-6 bg-background rounded-lg shadow-soft hover:shadow-hover transition-all duration-300 hover:-translate-y-1"
              >
                <div className="mb-4 text-primary">{category.icon}</div>
                <h3 className="font-medium text-center">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Admin Access Section */}
      <section className="w-full py-12 md:py-16 bg-primary/5 border-t border-b">
        <div className="container px-4 md:px-6">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">
              {lang === "ar"
                ? "الوصول إلى لوحة الإدارة"
                : lang === "es"
                  ? "Acceso al Panel de Administración"
                  : "Admin Dashboard Access"}
            </h2>
            <p className="text-muted-foreground mb-6">
              {lang === "ar"
                ? "يمكن للمسؤولين الوصول إلى لوحة التحكم لإدارة المنتجات والطلبات والعملاء. استخدم الرابط أدناه للوصول إلى لوحة التحكم."
                : lang === "es"
                  ? "Los administradores pueden acceder al panel de control para gestionar productos, pedidos y clientes. Utilice el enlace a continuación para acceder al panel de administración."
                  : "Administrators can access the dashboard to manage products, orders, and customers. Use the link below to access the admin dashboard."}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${lang}/dashboard`}>
                <Button variant="default" size="lg">
                  {dictionary.navigation.dashboard}
                </Button>
              </Link>
              <Link href={`/${lang}/login`}>
                <Button variant="outline" size="lg">
                  {dictionary.navigation.login}
                </Button>
              </Link>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              {lang === "ar"
                ? "ملاحظة: يتطلب الوصول إلى لوحة الإدارة تسجيل الدخول بحساب مسؤول."
                : lang === "es"
                  ? "Nota: El acceso al panel de administración requiere iniciar sesión con una cuenta de administrador."
                  : "Note: Accessing the admin dashboard requires logging in with an administrator account."}
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

