import rawBooks from './books.json';
import scrapedAafBooks from './arabicforall_data.json';

export interface Manhaj {
  id: string;
  image_url: string;
  translations: {
    ar: {
      name: string;
      description: string;
    };
    en: {
      name: string;
      description: string;
    };
    es: {
      name: string;
      description: string;
    };
    it: {
      name: string;
      description: string;
    };
    pt: {
      name: string;
      description: string;
    };
  };
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
  subfiat?: string;           // sub-category (example: الابتدائي)
  mostawa: string;            // level (example: Level 1)
  slug: string;               // used for routing/search
  [key: string]: any;         // allows dynamic translation fields like title_en
}

export const manahij: Manhaj[] = [
    {
      id: "curankareem",
      image_url: "/curriculum/Curan-kareem.jpeg",
      translations: {
        ar: {
          name: "القرآن الكريم",
          description: "نوفر المصحف الشريف للبيع بمختلف الطبعات والأحجام."
        },
        en: {
          name: "The Holy Quran",
          description: "We offer the Holy Quran for sale in various editions and sizes."
        },
        es: {
          name: "El Sagrado Corán",
          description: "Ofrecemos el Sagrado Corán a la venta en diversas ediciones y tamaños."
        },
        it: {
          name: "Il Sacro Corano",
          description: "Offriamo il Sacro Corano in vendita in varie edizioni e formati."
        },
        pt: {
          name: "O Sagrado Alcorão",
          description: "Oferecemos o Sagrado Alcorão à venda em várias edições e tamanhos."
        }
      }
    },
    {
      id: "tasismotakamil",
      image_url: "/curriculum/جميع-كتب-سلسلة-التأسيس-المتكامل-.jpeg",
      translations: {
        ar: {
          name: "تأسيس متكامل",
          description: "منهج ميسر متكامل يأتي في سبعة كتب أعدَّت بعناية وفق منهجية فريدة تجمع بين تعليم اللغة العربية وتعليم القرآن الكريم بأسلوب تفاعلي عصري يناسب الصغار والكبار من الناطقين باللغة العربية أو بغيرها."
        },
        en: {
          name: "Tasis Motakamil",
          description: "A comprehensive and simplified curriculum in seven carefully prepared books combining Arabic and Quran learning in a modern interactive style for both native and non-native speakers."
        },
        es: {
          name: "Tasis Motakamil",
          description: "Un plan de estudios integral y simplificado en siete libros cuidadosamente elaborados que combinan la enseñanza del árabe y del Corán con un estilo interactivo moderno, adecuado tanto para hablantes nativos como no nativos."
        },
        it: {
          name: "Tasis Motakamil",
          description: "Un programma completo e semplificato in sette libri preparati con cura che combinano l'insegnamento dell'arabo e del Corano in uno stile moderno e interattivo, adatto a parlanti nativi e non."
        },
        pt: {
          name: "Tasis Motakamil",
          description: "Um currículo completo e simplificado em sete livros cuidadosamente preparados que combinam o ensino do árabe e do Alcorão de forma interativa e moderna, adequado para falantes nativos e não nativos."
        }
      }
    }
,
    {
      id: "arabicforall",
      image_url: "/curriculum/arabic-for-all.jpeg",
      translations: {
        ar: {
          name: "العربية للجميع",
          description: "أحدث السلاسل المتخصصة في تعليم اللغة العربية لغير الناطقين بها..."
        },
        en: {
          name: "Arabic for All",
          description: "A modern series for teaching Arabic to non-native speakers, written by academic experts and targeting learners aged 5–18. It includes 12 student books with audio and 12 teacher books, designed for formal education in Modern Standard Arabic."
        },
        es: {
          name: "Árabe para Todos",
          description: "Una serie moderna para enseñar árabe a no hablantes nativos, escrita por expertos académicos, destinada a estudiantes de entre 5 y 18 años. Incluye 12 libros para el estudiante con audio y 12 libros para el maestro, diseñada para la enseñanza formal del árabe estándar moderno."
        },
        it: {
          name: "Arabo per Tutti",
          description: "Una serie moderna per insegnare l'arabo ai non madrelingua, scritta da esperti accademici, rivolta a studenti dai 5 ai 18 anni. Include 12 libri per studenti con audio e 12 per insegnanti, progettata per l'insegnamento dell'arabo standard moderno."
        },
        pt: {
          name: "Árabe para Todos",
          description: "Uma série moderna para ensinar árabe a falantes não nativos, escrita por especialistas acadêmicos e destinada a alunos de 5 a 18 anos. Inclui 12 livros para alunos com áudio e 12 livros para professores, projetada para o ensino formal do árabe padrão moderno."
        }
      }
    },
    {
      id: "Sanabel",
      image_url: "/curriculum/logo-sanabel.jpeg",
      translations: {
        ar: {
          name: "سنابل",
          description: "سنابل أوروبا هي دار نشر تهتم بتعليم اللغة العربية والدراسات الإسلامية في أوروبا وأمريكا الشمالية..."
        },
        en: {
          name: "Sanabel",
          description: "Sanabel Europe is a publishing house focused on teaching Arabic and Islamic studies in Europe and North America. It offers educational materials for all ages, teacher training, and digital transformation services to Arabic-teaching schools."
        },
        es: {
          name: "Sanabel",
          description: "Sanabel Europa es una editorial centrada en la enseñanza del árabe y los estudios islámicos en Europa y América del Norte. Ofrece materiales educativos para todas las edades, capacitación docente y servicios de transformación digital para escuelas que enseñan árabe."
        },
        it: {
          name: "Sanabel",
          description: "Sanabel Europa è una casa editrice dedicata all'insegnamento dell'arabo e degli studi islamici in Europa e Nord America. Offre materiali didattici per tutte le età, formazione per insegnanti e servizi di trasformazione digitale per scuole di arabo."
        },
        pt: {
          name: "Sanabel",
          description: "Sanabel Europa é uma editora focada no ensino da língua árabe e estudos islâmicos na Europa e América do Norte. Oferece materiais educativos para todas as idades, formação de professores e serviços de transformação digital para escolas de árabe."
        }
      }
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


const parsedBooks: Book[] = (rawBooks as unknown as Book[]).map(book => {
  let subfiat = book.subfiat;
  let fiae = book.fiae;
  
  if (book.manhaj === "Sanabel" && fiae === "تعليم اللغة العربية") {
    if (book.title.match(/ثانوي|إعدادي|اعدادي/)) subfiat = "الاعدادي";
    else if (book.title.match(/محو|كبار|الكبار|الوحدة/)) subfiat = "محو الامية";
    else if (book.title.includes("خطوتي")) subfiat = "مستويات الحضانة";
    else subfiat = "الابتدائي";
  }

  if (book.manhaj === "arabicforall") {
    if (book.title.includes("بين يديك")) fiae = "العربية بين يديك";
    else fiae = "العربية بين أيدي أولادنا";
  }

  return { ...book, subfiat, fiae, image_urls: safeParseImages(book.image_urls) };
}).filter(b => b.manhaj !== "arabicforall"); // clear old ones to inject pristine

export const books: Book[] = [...parsedBooks, ...scrapedAafBooks as unknown as Book[]];


// Helper functions
export const getUniqueManahige = (): string[] => {
  return [...new Set(books.map(book => book.manhaj))].filter(Boolean);
};

export const getManhajById = (id: string): Manhaj | undefined => {
  return manahij.find(m => m.id === id);
};

export const getFiatByManhaj = (manhaj: string): string[] => {
  console.log([...new Set(books.filter(book => book.manhaj === manhaj).map(book => book.fiae))].filter(Boolean))
  return [...new Set(books.filter(book => book.manhaj === manhaj).map(book => book.fiae))].filter(Boolean);
};

export const getSubfiatsByManhajAndFiat = (manhaj: string, fiat: string): string[] => {
  return [...new Set(books.filter(book => book.manhaj === manhaj && book.fiae === fiat && book.subfiat).map(book => book.subfiat as string))].filter(Boolean);
};

export const getMostawaByManhajAndFiat = (manhaj: string, fiat: string): string[] => {
  return [...new Set(books.filter(book => book.manhaj === manhaj && book.fiae === fiat).map(book => book.mostawa))].filter(Boolean);
};

export const getBooksByManhajFiatSubfiatMostawa = (manhaj: string, fiat: string = "", subfiat: string = "", mostawa: string = ""): Book[] => {
  return books.filter(book => {
    if (manhaj && fiat && subfiat && mostawa) {
      return book.manhaj === manhaj && book.fiae === fiat && book.subfiat === subfiat && book.mostawa === mostawa;
    } else if (manhaj && fiat && subfiat) {
      return book.manhaj === manhaj && book.fiae === fiat && book.subfiat === subfiat;
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

/**
 * Normalizes Arabic text by removing Tashkeel and normalizing variations of Alif, Yeh, and Teh Marbuta.
 */
const normalizeText = (text: string): string => {
  if (!text) return "";
  return text
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "") // Remove accents/diacritics
    // Arabic specific normalization
    .replace(/[\u064B-\u0652]/g, "") // Remove Tashkeel (Fatha, Damma, etc.)
    .replace(/[أإآ]/g, "ا")
    .replace(/[ة]/g, "ه")
    .replace(/[ى]/g, "ي")
    .replace(/[ؤ]/g, "و")
    .replace(/[ئ]/g, "ي");
};

export const searchBooks = (query: string): Book[] => {
  if (!query) return [];
  
  const normalizedQuery = normalizeText(query);
  if (!normalizedQuery) return [];

  return books.filter(book => {
    // Fields to search in
    const searchFields = [
      book.title,
      (book as any).title_en,
      (book as any).title_ar,
      book.description,
      (book as any).description_en,
      (book as any).description_ar,
      book.manhaj,
      book.fiae,
      book.mostawa,
      book.slug,
      book.id
    ];

    return searchFields.some(field => {
      if (!field) return false;
      const normalizedField = normalizeText(String(field));
      return normalizedField.includes(normalizedQuery);
    });
  });
};



