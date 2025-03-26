// utils/generateStaticParams.ts
export function generateStaticParams() {
    const languages = ["en", "fr", "es"]; // List all supported languages
    return languages.map((lang) => ({ lang }));
  }
  