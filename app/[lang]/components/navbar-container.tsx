import { getDictionary } from "../dictionaries"
import Navbar from "./navbar"

interface NavbarContainerProps {
  lang: string
}

export default async function NavbarContainer({ lang }: NavbarContainerProps) {
  const dictionary = await getDictionary(lang)

  return <Navbar lang={lang} dictionary={dictionary} />
}

