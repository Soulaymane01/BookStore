import { getDictionary } from "../dictionaries"
import LoginForm from "./login-form"

interface LoginPageProps {
  params: { lang: string }
}

export default async function LoginPage({ params }: LoginPageProps) {
  const { lang } = params
  const dictionary = await getDictionary(lang)

  return <LoginForm lang={lang} dictionary={dictionary} />
}

