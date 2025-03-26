import { getDictionary } from "../dictionaries"
import DashboardContent from "./dashboard-content"

interface DashboardPageProps {
  params: { lang: string }
}

export default async function DashboardPage({ params }: DashboardPageProps) {
  const { lang } = params
  const dictionary = await getDictionary(lang)

  // Mock products data
  const products = [
    {
      id: 1,
      title:
        lang === "ar"
          ? "تفسير القرآن الكريم"
          : lang === "es"
            ? "Interpretación del Sagrado Corán"
            : "Interpretation of the Holy Quran",
      price: 29.99,
      image: "/placeholder.svg?height=400&width=300",
      category: dictionary.home.categories.quran,
      stock: 45,
    },
    {
      id: 2,
      title: lang === "ar" ? "صحيح البخاري" : lang === "es" ? "Sahih Al-Bukhari" : "Sahih Al-Bukhari",
      price: 34.99,
      image: "/placeholder.svg?height=400&width=300",
      category: dictionary.home.categories.hadith,
      stock: 32,
    },
    {
      id: 3,
      title: lang === "ar" ? "فقه السنة" : lang === "es" ? "Fiqh de la Sunnah" : "Fiqh of the Sunnah",
      price: 24.99,
      image: "/placeholder.svg?height=400&width=300",
      category: dictionary.home.categories.fiqh,
      stock: 18,
    },
    {
      id: 4,
      title: lang === "ar" ? "الرحيق المختوم" : lang === "es" ? "El Néctar Sellado" : "The Sealed Nectar",
      price: 27.99,
      image: "/placeholder.svg?height=400&width=300",
      category: dictionary.home.categories.seerah,
      stock: 27,
    },
    {
      id: 5,
      title: lang === "ar" ? "رياض الصالحين" : lang === "es" ? "Jardines de los Justos" : "Gardens of the Righteous",
      price: 22.99,
      image: "/placeholder.svg?height=400&width=300",
      category: dictionary.home.categories.hadith,
      stock: 0,
    },
  ]

  // Mock orders data
  const orders = [
    {
      id: "ORD-001",
      customer: "Ahmed Ali",
      date: "2024-03-15",
      status: lang === "ar" ? "مكتمل" : lang === "es" ? "Completado" : "Completed",
      total: 54.98,
    },
    {
      id: "ORD-002",
      customer: "Maria Garcia",
      date: "2024-03-14",
      status: lang === "ar" ? "قيد المعالجة" : lang === "es" ? "En proceso" : "Processing",
      total: 29.99,
    },
    {
      id: "ORD-003",
      customer: "John Smith",
      date: "2024-03-12",
      status: lang === "ar" ? "مكتمل" : lang === "es" ? "Completado" : "Completed",
      total: 82.97,
    },
    {
      id: "ORD-004",
      customer: "Fatima Hassan",
      date: "2024-03-10",
      status: lang === "ar" ? "تم الشحن" : lang === "es" ? "Enviado" : "Shipped",
      total: 34.99,
    },
    {
      id: "ORD-005",
      customer: "Carlos Rodriguez",
      date: "2024-03-08",
      status: lang === "ar" ? "مكتمل" : lang === "es" ? "Completado" : "Completed",
      total: 47.98,
    },
  ]

  return <DashboardContent lang={lang} dictionary={dictionary} products={products} orders={orders} />
}

