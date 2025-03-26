import { getDictionary } from "../dictionaries"
import CartContent from "./cart-content"

interface CartPageProps {
  params: { lang: string }
}

export default async function CartPage({ params }: CartPageProps) {
  const { lang } = params
  const dictionary = await getDictionary(lang)

  return <CartContent lang={lang} dictionary={dictionary} />
}

