// This file serves as our "database" for the application
// In a real application, this would be replaced with actual database calls

import { create } from "zustand"
import { persist } from "zustand/middleware"

// Types
export interface Book {
  id: number
  title: {
    ar: string
    en: string
    es: string
  }
  author: {
    ar: string
    en: string
    es: string
  }
  price: number
  image: string
  category: string
  stock: number
  description?: {
    ar: string
    en: string
    es: string
  }
  details?: {
    publisher: {
      ar: string
      en: string
      es: string
    }
    language: {
      ar: string
      en: string
      es: string
    }
    pages: number
    isbn: string
    edition: {
      ar: string
      en: string
      es: string
    }
    year: number
  }
  inStock?: boolean
  previewImages?: string[]
  rating?: number
  reviews?: number
  isNew?: boolean
}

export interface Order {
  id: string
  customer: string
  email: string
  phone: string
  address: string
  date: string
  status: {
    ar: string
    en: string
    es: string
  }
  items: {
    id: number
    quantity: number
    price: number
  }[]
  total: number
}

// Initial data
const initialBooks: Book[] = [
  {
    id: 1,
    title: {
      ar: "تفسير القرآن الكريم",
      en: "Interpretation of the Holy Quran",
      es: "Interpretación del Sagrado Corán",
    },
    author: {
      ar: "الشيخ عبد الرحمن السعدي",
      en: "Sheikh Abdul Rahman Al-Saadi",
      es: "Sheikh Abdul Rahman Al-Saadi",
    },
    price: 29.99,
    image: "/placeholder.svg?height=600&width=400",
    category: "quran",
    stock: 45,
    description: {
      ar: "هذا الكتاب هو تفسير شامل للقرآن الكريم، يقدم شرحًا مفصلاً لآيات القرآن بأسلوب سهل وميسر. يتناول المؤلف المعاني اللغوية والبلاغية والأحكام الشرعية المستنبطة من الآيات.",
      en: "This book is a comprehensive interpretation of the Holy Quran, offering a detailed explanation of Quranic verses in a simple and accessible style. The author addresses the linguistic, rhetorical meanings and legal provisions derived from the verses.",
      es: "Este libro es una interpretación completa del Sagrado Corán, que ofrece una explicación detallada de los versículos coránicos en un estilo sencillo y accesible. El autor aborda los significados lingüísticos, retóricos y las disposiciones legales derivadas de los versículos.",
    },
    details: {
      publisher: {
        ar: "دار السلام للنشر",
        en: "Dar Al-Salam Publishing",
        es: "Editorial Dar Al-Salam",
      },
      language: {
        ar: "العربية",
        en: "Arabic",
        es: "Árabe",
      },
      pages: 1240,
      isbn: "978-9960-740-11-2",
      edition: {
        ar: "الطبعة الثالثة",
        en: "Third Edition",
        es: "Tercera Edición",
      },
      year: 2018,
    },
    inStock: true,
    previewImages: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    rating: 4.8,
    reviews: 124,
    isNew: true,
  },
  {
    id: 2,
    title: {
      ar: "صحيح البخاري",
      en: "Sahih Al-Bukhari",
      es: "Sahih Al-Bukhari",
    },
    author: {
      ar: "الإمام البخاري",
      en: "Imam Al-Bukhari",
      es: "Imam Al-Bukhari",
    },
    price: 34.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "hadith",
    stock: 32,
    description: {
      ar: "صحيح البخاري هو أحد أهم كتب الحديث في الإسلام، يحتوي على أحاديث النبي محمد صلى الله عليه وسلم التي جمعها وصنفها الإمام البخاري.",
      en: "Sahih Al-Bukhari is one of the most important hadith collections in Islam, containing the sayings of Prophet Muhammad (PBUH) compiled by Imam Al-Bukhari.",
      es: "Sahih Al-Bukhari es una de las colecciones de hadices más importantes del Islam, que contiene los dichos del Profeta Muhammad (PBUH) recopilados por el Imam Al-Bukhari.",
    },
    details: {
      publisher: {
        ar: "دار ابن كثير",
        en: "Dar Ibn Kathir",
        es: "Editorial Ibn Kathir",
      },
      language: {
        ar: "العربية",
        en: "Arabic",
        es: "Árabe",
      },
      pages: 1380,
      isbn: "978-9953-520-21-6",
      edition: {
        ar: "الطبعة الخامسة",
        en: "Fifth Edition",
        es: "Quinta Edición",
      },
      year: 2019,
    },
    inStock: true,
    previewImages: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    rating: 4.9,
    reviews: 215,
  },
  {
    id: 3,
    title: {
      ar: "فقه السنة",
      en: "Fiqh of the Sunnah",
      es: "Fiqh de la Sunnah",
    },
    author: {
      ar: "السيد سابق",
      en: "Sayyid Sabiq",
      es: "Sayyid Sabiq",
    },
    price: 24.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "fiqh",
    stock: 18,
    description: {
      ar: "كتاب فقه السنة هو مرجع شامل في الفقه الإسلامي، يتناول مختلف جوانب الشريعة الإسلامية بأسلوب سهل وميسر.",
      en: "Fiqh of the Sunnah is a comprehensive reference in Islamic jurisprudence, covering various aspects of Islamic law in a simple and accessible style.",
      es: "Fiqh de la Sunnah es una referencia completa en jurisprudencia islámica, que cubre varios aspectos de la ley islámica en un estilo simple y accesible.",
    },
    details: {
      publisher: {
        ar: "دار الفتح",
        en: "Dar Al-Fath",
        es: "Editorial Al-Fath",
      },
      language: {
        ar: "العربية",
        en: "Arabic",
        es: "Árabe",
      },
      pages: 840,
      isbn: "978-9776-425-33-8",
      edition: {
        ar: "الطبعة الرابعة",
        en: "Fourth Edition",
        es: "Cuarta Edición",
      },
      year: 2017,
    },
    inStock: true,
    previewImages: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    rating: 4.7,
    reviews: 98,
    isNew: true,
  },
  {
    id: 4,
    title: {
      ar: "الرحيق المختوم",
      en: "The Sealed Nectar",
      es: "El Néctar Sellado",
    },
    author: {
      ar: "صفي الرحمن المباركفوري",
      en: "Safi-ur-Rahman al-Mubarakpuri",
      es: "Safi-ur-Rahman al-Mubarakpuri",
    },
    price: 27.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "seerah",
    stock: 27,
    description: {
      ar: "الرحيق المختوم هو كتاب في السيرة النبوية، يتناول حياة النبي محمد صلى الله عليه وسلم بالتفصيل من ولادته حتى وفاته.",
      en: "The Sealed Nectar is a book on the biography of Prophet Muhammad (PBUH), detailing his life from birth to death.",
      es: "El Néctar Sellado es un libro sobre la biografía del Profeta Muhammad (PBUH), que detalla su vida desde el nacimiento hasta la muerte.",
    },
    details: {
      publisher: {
        ar: "دار السلام",
        en: "Dar Al-Salam",
        es: "Editorial Al-Salam",
      },
      language: {
        ar: "العربية",
        en: "Arabic",
        es: "Árabe",
      },
      pages: 620,
      isbn: "978-9960-897-55-8",
      edition: {
        ar: "الطبعة السادسة",
        en: "Sixth Edition",
        es: "Sexta Edición",
      },
      year: 2020,
    },
    inStock: true,
    previewImages: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    rating: 4.9,
    reviews: 156,
  },
  {
    id: 5,
    title: {
      ar: "رياض الصالحين",
      en: "Gardens of the Righteous",
      es: "Jardines de los Justos",
    },
    author: {
      ar: "الإمام النووي",
      en: "Imam Al-Nawawi",
      es: "Imam Al-Nawawi",
    },
    price: 22.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "hadith",
    stock: 0,
    description: {
      ar: "رياض الصالحين هو كتاب يجمع أحاديث النبي محمد صلى الله عليه وسلم في مختلف جوانب الحياة والأخلاق.",
      en: "Gardens of the Righteous is a collection of Prophet Muhammad's (PBUH) sayings on various aspects of life and ethics.",
      es: "Jardines de los Justos es una colección de dichos del Profeta Muhammad (PBUH) sobre varios aspectos de la vida y la ética.",
    },
    details: {
      publisher: {
        ar: "دار ابن الجوزي",
        en: "Dar Ibn Al-Jawzi",
        es: "Editorial Ibn Al-Jawzi",
      },
      language: {
        ar: "العربية",
        en: "Arabic",
        es: "Árabe",
      },
      pages: 760,
      isbn: "978-9960-969-44-2",
      edition: {
        ar: "الطبعة الثانية",
        en: "Second Edition",
        es: "Segunda Edición",
      },
      year: 2016,
    },
    inStock: false,
    previewImages: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    rating: 4.6,
    reviews: 87,
  },
  {
    id: 6,
    title: {
      ar: "تاريخ الخلفاء الراشدين",
      en: "History of the Rightly Guided Caliphs",
      es: "Historia de los Califas Ortodoxos",
    },
    author: {
      ar: "جلال الدين السيوطي",
      en: "Jalal al-Din al-Suyuti",
      es: "Jalal al-Din al-Suyuti",
    },
    price: 26.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "history",
    stock: 22,
    description: {
      ar: "يتناول هذا الكتاب تاريخ الخلفاء الراشدين الأربعة: أبو بكر، عمر، عثمان، وعلي رضي الله عنهم، ويسرد أهم أحداث خلافتهم وإنجازاتهم.",
      en: "This book covers the history of the four Rightly Guided Caliphs: Abu Bakr, Umar, Uthman, and Ali, narrating the key events of their caliphates and achievements.",
      es: "Este libro cubre la historia de los cuatro Califas Ortodoxos: Abu Bakr, Umar, Uthman y Ali, narrando los eventos clave de sus califatos y logros.",
    },
    details: {
      publisher: {
        ar: "دار المنهاج",
        en: "Dar Al-Minhaj",
        es: "Editorial Al-Minhaj",
      },
      language: {
        ar: "العربية",
        en: "Arabic",
        es: "Árabe",
      },
      pages: 480,
      isbn: "978-9953-498-82-5",
      edition: {
        ar: "الطبعة الثالثة",
        en: "Third Edition",
        es: "Tercera Edición",
      },
      year: 2018,
    },
    inStock: true,
    previewImages: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    rating: 4.5,
    reviews: 64,
    isNew: true,
  },
  {
    id: 7,
    title: {
      ar: "بلوغ المرام",
      en: "Bulugh al-Maram",
      es: "La Consecución del Objetivo",
    },
    author: {
      ar: "ابن حجر العسقلاني",
      en: "Ibn Hajar al-Asqalani",
      es: "Ibn Hajar al-Asqalani",
    },
    price: 19.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "hadith",
    stock: 15,
    description: {
      ar: "بلوغ المرام هو كتاب في الحديث النبوي، يجمع الأحاديث المتعلقة بالأحكام الفقهية.",
      en: "Bulugh al-Maram is a hadith collection focusing on legal rulings derived from the Prophet's sayings.",
      es: "Bulugh al-Maram es una colección de hadices que se centra en las normas legales derivadas de los dichos del Profeta.",
    },
    details: {
      publisher: {
        ar: "دار الفجر",
        en: "Dar Al-Fajr",
        es: "Editorial Al-Fajr",
      },
      language: {
        ar: "العربية",
        en: "Arabic",
        es: "Árabe",
      },
      pages: 520,
      isbn: "978-9776-153-66-9",
      edition: {
        ar: "الطبعة الرابعة",
        en: "Fourth Edition",
        es: "Cuarta Edición",
      },
      year: 2019,
    },
    inStock: true,
    previewImages: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    rating: 4.7,
    reviews: 92,
  },
  {
    id: 8,
    title: {
      ar: "زاد المعاد",
      en: "Provisions for the Hereafter",
      es: "Provisión para el Más Allá",
    },
    author: {
      ar: "ابن قيم الجوزية",
      en: "Ibn Qayyim al-Jawziyya",
      es: "Ibn Qayyim al-Jawziyya",
    },
    price: 32.99,
    image: "/placeholder.svg?height=400&width=300",
    category: "islamic",
    stock: 10,
    description: {
      ar: "زاد المعاد هو كتاب يتناول سيرة النبي محمد صلى الله عليه وسلم وهديه في مختلف جوانب الحياة.",
      en: "Provisions for the Hereafter discusses the biography of Prophet Muhammad (PBUH) and his guidance in various aspects of life.",
      es: "Provisión para el Más Allá discute la biografía del Profeta Muhammad (PBUH) y su guía en varios aspectos de la vida.",
    },
    details: {
      publisher: {
        ar: "مؤسسة الرسالة",
        en: "Al-Risalah Foundation",
        es: "Fundación Al-Risalah",
      },
      language: {
        ar: "العربية",
        en: "Arabic",
        es: "Árabe",
      },
      pages: 880,
      isbn: "978-9953-500-24-7",
      edition: {
        ar: "الطبعة الخامسة",
        en: "Fifth Edition",
        es: "Quinta Edición",
      },
      year: 2020,
    },
    inStock: true,
    previewImages: [
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
      "/placeholder.svg?height=800&width=600",
    ],
    rating: 4.8,
    reviews: 108,
  },
]

const initialOrders: Order[] = [
  {
    id: "ORD-001",
    customer: "Ahmed Ali",
    email: "ahmed.ali@example.com",
    phone: "+34 612 345 678",
    address: "Calle Mayor 123, Madrid, Spain",
    date: "2024-03-15",
    status: {
      ar: "مكتمل",
      en: "Completed",
      es: "Completado",
    },
    items: [
      { id: 1, quantity: 1, price: 29.99 },
      { id: 3, quantity: 1, price: 24.99 },
    ],
    total: 54.98,
  },
  {
    id: "ORD-002",
    customer: "Maria Garcia",
    email: "maria.garcia@example.com",
    phone: "+34 623 456 789",
    address: "Avenida Diagonal 456, Barcelona, Spain",
    date: "2024-03-14",
    status: {
      ar: "قيد المعالجة",
      en: "Processing",
      es: "En proceso",
    },
    items: [{ id: 1, quantity: 1, price: 29.99 }],
    total: 29.99,
  },
  {
    id: "ORD-003",
    customer: "John Smith",
    email: "john.smith@example.com",
    phone: "+34 634 567 890",
    address: "Calle San Francisco 789, Seville, Spain",
    date: "2024-03-12",
    status: {
      ar: "مكتمل",
      en: "Completed",
      es: "Completado",
    },
    items: [
      { id: 2, quantity: 1, price: 34.99 },
      { id: 4, quantity: 1, price: 27.99 },
      { id: 6, quantity: 1, price: 19.99 },
    ],
    total: 82.97,
  },
  {
    id: "ORD-004",
    customer: "Fatima Hassan",
    email: "fatima.hassan@example.com",
    phone: "+34 645 678 901",
    address: "Calle Gran Vía 321, Madrid, Spain",
    date: "2024-03-10",
    status: {
      ar: "تم الشحن",
      en: "Shipped",
      es: "Enviado",
    },
    items: [{ id: 2, quantity: 1, price: 34.99 }],
    total: 34.99,
  },
  {
    id: "ORD-005",
    customer: "Carlos Rodriguez",
    email: "carlos.rodriguez@example.com",
    phone: "+34 656 789 012",
    address: "Avenida de la Constitución 654, Valencia, Spain",
    date: "2024-03-08",
    status: {
      ar: "مكتمل",
      en: "Completed",
      es: "Completado",
    },
    items: [
      { id: 5, quantity: 1, price: 22.99 },
      { id: 7, quantity: 1, price: 24.99 },
    ],
    total: 47.98,
  },
]

// Store for books
interface BookStore {
  books: Book[]
  addBook: (book: Omit<Book, "id">) => void
  updateBook: (id: number, book: Partial<Book>) => void
  deleteBook: (id: number) => void
  getBook: (id: number) => Book | undefined
  searchBooks: (query: string, lang: string) => Book[]
  filterBooks: (filters: BookFilters, lang: string) => Book[]
}

export interface BookFilters {
  category?: string[]
  priceRange?: [number, number]
  inStock?: boolean
  rating?: number
  search?: string
}

export const useBookStore = create<BookStore>()(
  persist(
    (set, get) => ({
      books: initialBooks,
      addBook: (book) => {
        set((state) => ({
          books: [...state.books, { ...book, id: Math.max(0, ...state.books.map((b) => b.id)) + 1 }],
        }))
      },
      updateBook: (id, updatedBook) => {
        set((state) => ({
          books: state.books.map((book) => (book.id === id ? { ...book, ...updatedBook } : book)),
        }))
      },
      deleteBook: (id) => {
        set((state) => ({
          books: state.books.filter((book) => book.id !== id),
        }))
      },
      getBook: (id) => {
        return get().books.find((book) => book.id === id)
      },
      searchBooks: (query, lang) => {
        const books = get().books
        if (!query) return books

        const lowerQuery = query.toLowerCase()
        return books.filter(
          (book) =>
            book.title[lang as keyof typeof book.title].toLowerCase().includes(lowerQuery) ||
            book.author[lang as keyof typeof book.author].toLowerCase().includes(lowerQuery),
        )
      },
      filterBooks: (filters, lang) => {
        let filteredBooks = get().books

        // Apply search filter
        if (filters.search) {
          const lowerQuery = filters.search.toLowerCase()
          filteredBooks = filteredBooks.filter(
            (book) =>
              book.title[lang as keyof typeof book.title].toLowerCase().includes(lowerQuery) ||
              book.author[lang as keyof typeof book.author].toLowerCase().includes(lowerQuery),
          )
        }

        // Apply category filter
        if (filters.category && filters.category.length > 0) {
          filteredBooks = filteredBooks.filter((book) => filters.category?.includes(book.category))
        }

        // Apply price range filter
        if (filters.priceRange) {
          const [min, max] = filters.priceRange
          filteredBooks = filteredBooks.filter((book) => book.price >= min && book.price <= max)
        }

        // Apply in stock filter
        if (filters.inStock !== undefined) {
          filteredBooks = filteredBooks.filter((book) => (filters.inStock ? book.stock > 0 : true))
        }

        // Apply rating filter
        if (filters.rating) {
          filteredBooks = filteredBooks.filter((book) => (book.rating ? book.rating >= filters.rating! : false))
        }

        return filteredBooks
      },
    }),
    {
      name: "book-store",
    },
  ),
)

// Store for orders
interface OrderStore {
  orders: Order[]
  addOrder: (order: Omit<Order, "id" | "date">) => string
  updateOrderStatus: (id: string, status: { ar: string; en: string; es: string }) => void
  getOrder: (id: string) => Order | undefined
  getOrdersByCustomer: (email: string) => Order[]
  getTotalSales: () => number
  getRecentOrders: (count: number) => Order[]
  getOrderStats: () => {
    totalOrders: number
    totalSales: number
    averageOrderValue: number
    completedOrders: number
  }
}

export const useOrderStore = create<OrderStore>()(
  persist(
    (set, get) => ({
      orders: initialOrders,
      addOrder: (order) => {
        const id = `ORD-${String(get().orders.length + 1).padStart(3, "0")}`
        const date = new Date().toISOString().split("T")[0]

        set((state) => ({
          orders: [...state.orders, { ...order, id, date }],
        }))

        return id
      },
      updateOrderStatus: (id, status) => {
        set((state) => ({
          orders: state.orders.map((order) => (order.id === id ? { ...order, status } : order)),
        }))
      },
      getOrder: (id) => {
        return get().orders.find((order) => order.id === id)
      },
      getOrdersByCustomer: (email) => {
        return get().orders.filter((order) => order.email === email)
      },
      getTotalSales: () => {
        return get().orders.reduce((total, order) => total + order.total, 0)
      },
      getRecentOrders: (count) => {
        return [...get().orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, count)
      },
      getOrderStats: () => {
        const orders = get().orders
        const totalOrders = orders.length
        const totalSales = orders.reduce((total, order) => total + order.total, 0)
        const averageOrderValue = totalSales / totalOrders
        const completedOrders = orders.filter((order) => order.status.en === "Completed").length

        return {
          totalOrders,
          totalSales,
          averageOrderValue,
          completedOrders,
        }
      },
    }),
    {
      name: "order-store",
    },
  ),
)

// Helper functions
export function getBookTitle(book: Book, lang: string): string {
  return book.title[lang as keyof typeof book.title]
}

export function getBookAuthor(book: Book, lang: string): string {
  return book.author[lang as keyof typeof book.author]
}

export function getBookDescription(book: Book, lang: string): string {
  return book.description ? book.description[lang as keyof typeof book.description] : ""
}

export function getOrderStatus(order: Order, lang: string): string {
  return order.status[lang as keyof typeof order.status]
}

export function getRelatedBooks(bookId: number, count = 4, lang: string): Book[] {
  const book = useBookStore.getState().getBook(bookId)
  if (!book) return []

  // Get books in the same category
  const sameCategory = useBookStore.getState().books.filter((b) => b.id !== bookId && b.category === book.category)

  // If we don't have enough books in the same category, get other books
  let related = [...sameCategory]
  if (related.length < count) {
    const others = useBookStore
      .getState()
      .books.filter((b) => b.id !== bookId && b.category !== book.category)
      .slice(0, count - related.length)

    related = [...related, ...others]
  }

  return related.slice(0, count)
}

export function generateOrderId(): string {
  return `ORD-${String(Math.floor(Math.random() * 1000)).padStart(3, "0")}`
}

// Categories data
export const categories = [
  { id: "islamic", nameKey: "islamic" },
  { id: "quran", nameKey: "quran" },
  { id: "hadith", nameKey: "hadith" },
  { id: "fiqh", nameKey: "fiqh" },
  { id: "seerah", nameKey: "seerah" },
  { id: "history", nameKey: "history" },
]

// Price ranges
export const priceRanges = [
  { id: "under-20", min: 0, max: 20 },
  { id: "20-30", min: 20, max: 30 },
  { id: "over-30", min: 30, max: 1000 },
]

// Languages
export const languages = [
  { id: "arabic", nameKey: "arabic" },
  { id: "english", nameKey: "english" },
  { id: "spanish", nameKey: "spanish" },
]

