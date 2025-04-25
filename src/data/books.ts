import rawBooks from './books.json';

export interface Manhaj {
  id: string;
  name: string;
  description: string;
  image_url: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  price: string;
  image_urls: string[];       // always an array, handled via JSON.parse in mapping
  product_url: string;
  manhaj: string;             // should match one of the `Manhaj.id` values
  fiae: string;               // field/subject (example: اللغة العربية)
  mostawa: string;            // level (example: Level 1)
  slug: string;               // used for routing/search
}

export const manahij: Manhaj[] = [
  {
    id: "curankareem",
    name: "Curan Kareem",
    description: "نوفر المصحف الشريف للبيع بمختلف الطبعات والأحجام.",
    image_url: "/curriculum/Curan-kareem.png"
  },
  {
    id: "tasismotakamil",
    name: "Ta'sis Motakamil",
    description: "منهج ميسر متكامل يأتي في سبعة كتب أعدَّت بعناية وفق منهجية فريدة تجمع بين تعليم اللغة العربية وتعليم القرآن الكريم بأسلوب تفاعلي عصري يناسب الصغار والكبار من الناطقين باللغة العربية أو بغيرها.",
    image_url: "/curriculum/جميع-كتب-سلسلة-التأسيس-المتكامل-.webp"
  },
  {
    id: "arabicforall",
    name: "Arabic for all",
    description: "أحدث السلاسل المتخصصة في تعليم اللغة العربية لغير الناطقين بها. ألفها نخبة من الأكاديميين المتخصصين، والموجهة للدارسين من عمر (5-18) عاما.تتألف من 12 كتاب للطالب مصحوبة بالمواد الصوتية و12 كتاب للمعلم.أُعدت للتدريس في المؤسسات التعليمية المختلفة، كما أنها اعتمدت اللغة العربية الفصحى منهجاً لها.",
    image_url: "/curriculum/arabic-for-all.png"
  },
  {
    id: "Sanabel",
    name: "Sanabel",
    description: "سنابل أوروبا هي دار نشر تهتم بتعليم اللغة العربية والدراسات الإسلامية في أوروبا وأمريكا الشمالية. تقدم مجموعة متنوعة من المواد التعليمية المصممة للأطفال والشباب والبالغين، بما في ذلك كتب دراسية للغة العربية من الحضانة حتى المرحلة الثانوية، ومواد في التربية الإسلامية، وأدوات لتعلم القرآن الكريم، بالإضافة إلى ألعاب تعليمية. كما توفر سنابل خدمات تدريب المعلمين والتحول الرقمي للمدارس التي تُدرّس اللغة العربية، بهدف تعزيز جودة التعليم وتسهيل الوصول إليه للجاليات المسلمة في المهجر.",
    image_url: "/curriculum/logo-sanabel.png"
  }
];

function safeParseImages(input: any): string[] {
  if (Array.isArray(input)) return input;
  if (typeof input === 'string') {
    try {
      return JSON.parse(input.replace(/'/g, '"')); // convert single to double quotes
    } catch {
      console.warn('Failed to parse image_urls:', input);
    }
  }
  return [];
}


export const books: Book[] = rawBooks.map(book => ({
  ...book,
  image_urls: safeParseImages(book.image_urls)
}));

/*
export const books: Book[] = [
  {
    id: "1",
    title: "تعلم أسماء وأشكال وألوان حروف الكتاب حروف الهجاء",
    description: "",
    price: "LE19.90",
    image_urls: ["https://tasismotakamil.com/wp-content/uploads/2023/01/IMG_٢٠٢٣٠١١٩_١٠٣٦٣٠-300x300.jpg"],
    product_url: "https://tasismotakamil.com/product/%d9%83%d8%aa%d8%a7%d8%a8-%d8%a7%d9%84%d8%ad%d8%b1%d9%88%d9%81/",
    manhaj: "tasismotakamil",
    fiae: "",
    mostawa: "Level 1",
    slug: ""
  },
  {
    id: "2",
    title: "الأرقام والعد",
    description: "تعلم الأرقام والعد بطريقة ممتعة",
    price: "LE15.90",
    image_urls: ["https://images.pexels.com/photos/3245169/pexels-photo-3245169.jpeg?auto=compress&cs=tinysrgb&w=300"],
    product_url: "https://tasismotakamil.com/product/sample-2/",
    manhaj: "tasismotakamil",
    fiae: "الحساب",
    mostawa: "Level 1",
    slug: "numbers-counting"
  },
  {
    id: "3",
    title: "قواعد اللغة العربية",
    description: "أساسيات النحو والصرف",
    price: "LE22.50",
    image_urls: ["https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=300"],
    product_url: "https://tasismotakamil.com/product/sample-3/",
    manhaj: "tasismotakamil",
    fiae: "اللغة العربية",
    mostawa: "Level 2",
    slug: "arabic-grammar"
  },
  {
    id: "4",
    title: "English Vocabulary Builder",
    description: "Essential words and phrases for beginners",
    price: "LE25.00",
    image_urls: ["https://images.pexels.com/photos/267669/pexels-photo-267669.jpeg?auto=compress&cs=tinysrgb&w=300"],
    product_url: "https://tasismotakamil.com/product/sample-4/",
    manhaj: "international",
    fiae: "English",
    mostawa: "Level 1",
    slug: "english-vocabulary"
  },
  {
    id: "5",
    title: "Science Experiments",
    description: "Fun and educational science activities",
    price: "LE30.00",
    image_urls: ["https://images.pexels.com/photos/2280551/pexels-photo-2280551.jpeg?auto=compress&cs=tinysrgb&w=300"],
    product_url: "https://tasismotakamil.com/product/sample-5/",
    manhaj: "international",
    fiae: "Science",
    mostawa: "Level 2",
    slug: "science-experiments"
  }
];*/

// Helper functions
export const getUniqueManahige = (): string[] => {
  return [...new Set(books.map(book => book.manhaj))].filter(Boolean);
};

export const getManhajById = (id: string): Manhaj | undefined => {
  return manahij.find(m => m.id === id);
};

export const getFiatByManhaj = (manhaj: string): string[] => {
  return [...new Set(books.filter(book => book.manhaj === manhaj).map(book => book.fiae))].filter(Boolean);
};

export const getMostawaByManhajAndFiat = (manhaj: string, fiat: string): string[] => {
  return [...new Set(books.filter(book => book.manhaj === manhaj && book.fiae === fiat).map(book => book.mostawa))].filter(Boolean);
};

export const getBooksByManhajFiatMostawa = (manhaj: string, fiat: string = "", mostawa: string = ""): Book[] => {
  return books.filter(book => {
    if (manhaj && fiat && mostawa) {
      return book.manhaj === manhaj && book.fiae === fiat && book.mostawa === mostawa;
    } else if (manhaj && fiat) {
      return book.manhaj === manhaj && book.fiae === fiat;
    } else if (manhaj) {
      return book.manhaj === manhaj;
    }
    return true;
  });
};

export const getBookBySlug = (slug: string): Book | undefined => {
  return books.find(book => book.slug === slug || book.id === slug);
};

export const searchBooks = (query: string): Book[] => {
  const searchTerm = query.toLowerCase();
  return books.filter(book => 
    book.title.toLowerCase().includes(searchTerm) ||
    book.description.toLowerCase().includes(searchTerm) ||
    book.manhaj.toLowerCase().includes(searchTerm) ||
    book.fiae.toLowerCase().includes(searchTerm) ||
    book.mostawa.toLowerCase().includes(searchTerm)
  );
};