import "server-only"

interface Dictionary {
  navigation: {
    home: string
    books: string
    about: string
    contact: string
    cart: string
    login: string
    dashboard: string
  }
  home: {
    hero: {
      title: string
      subtitle: string
      cta: string
    }
    featured: {
      title: string
      viewAll: string
    }
    categories: {
      title: string
      islamic: string
      quran: string
      hadith: string
      fiqh: string
      seerah: string
      history: string
    }
  }
  books: {
    search: string
    filter: string
    sort: string
    price: string
    category: string
    language: string
    author: string
    addToCart: string
    viewDetails: string
  }
  product: {
    addToCart: string
    buyNow: string
    preview: string
    description: string
    details: string
    reviews: string
    relatedBooks: string
    inStock: string
    outOfStock: string
    contactUs: string
    whatsapp: string
    email: string
  }
  cart: {
    title: string
    empty: string
    continueShopping: string
    checkout: string
    total: string
    remove: string
    quantity: string
    summary: string
    subtotal: string
    shipping: string
    tax: string
  }
  dashboard: {
    products: string
    orders: string
    customers: string
    settings: string
    addProduct: string
    editProduct: string
    deleteProduct: string
  }
  footer: {
    about: string
    contact: string
    terms: string
    privacy: string
    copyright: string
  }
}

const dictionaries: Record<string, () => Promise<Dictionary>> = {
  ar: () => import("./dictionaries/ar.json").then((module) => module.default),
  en: () => import("./dictionaries/en.json").then((module) => module.default),
  es: () => import("./dictionaries/es.json").then((module) => module.default),
}

export const getDictionary = async (locale: string): Promise<Dictionary> => {
  return dictionaries[locale]()
}

