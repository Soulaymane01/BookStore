"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

interface LoginFormProps {
  lang: string
  dictionary: any
}

export default function LoginForm({ lang, dictionary }: LoginFormProps) {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            {lang === "ar" ? "مرحبًا بعودتك" : lang === "es" ? "Bienvenido de nuevo" : "Welcome back"}
          </h1>
          <p className="text-sm text-muted-foreground">
            {lang === "ar"
              ? "أدخل بريدك الإلكتروني وكلمة المرور لتسجيل الدخول إلى حسابك"
              : lang === "es"
                ? "Introduce tu correo electrónico y contraseña para acceder a tu cuenta"
                : "Enter your email and password to access your account"}
          </p>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">
              {lang === "ar" ? "تسجيل الدخول" : lang === "es" ? "Iniciar sesión" : "Login"}
            </TabsTrigger>
            <TabsTrigger value="register">
              {lang === "ar" ? "التسجيل" : lang === "es" ? "Registrarse" : "Register"}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">
                  {lang === "ar" ? "تسجيل الدخول" : lang === "es" ? "Iniciar sesión" : "Login"}
                </CardTitle>
                <CardDescription>
                  {lang === "ar"
                    ? "أدخل بريدك الإلكتروني وكلمة المرور أدناه للدخول إلى حسابك"
                    : lang === "es"
                      ? "Introduce tu correo electrónico y contraseña a continuación para acceder a tu cuenta"
                      : "Enter your email and password below to access your account"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    {lang === "ar" ? "البريد الإلكتروني" : lang === "es" ? "Correo electrónico" : "Email"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={
                      lang === "ar" ? "name@example.com" : lang === "es" ? "nombre@ejemplo.com" : "name@example.com"
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password">
                      {lang === "ar" ? "كلمة المرور" : lang === "es" ? "Contraseña" : "Password"}
                    </Label>
                    <Link
                      href={`/${lang}/forgot-password`}
                      className="text-sm text-muted-foreground hover:text-primary"
                    >
                      {lang === "ar"
                        ? "نسيت كلمة المرور؟"
                        : lang === "es"
                          ? "¿Olvidaste tu contraseña?"
                          : "Forgot password?"}
                    </Link>
                  </div>
                  <Input id="password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {lang === "ar" ? "تسجيل الدخول" : lang === "es" ? "Iniciar sesión" : "Login"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">
                  {lang === "ar" ? "إنشاء حساب" : lang === "es" ? "Crear una cuenta" : "Create an account"}
                </CardTitle>
                <CardDescription>
                  {lang === "ar"
                    ? "أدخل بريدك الإلكتروني وكلمة المرور أدناه لإنشاء حسابك"
                    : lang === "es"
                      ? "Introduce tu correo electrónico y contraseña a continuación para crear tu cuenta"
                      : "Enter your email and password below to create your account"}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="first-name">
                      {lang === "ar" ? "الاسم الأول" : lang === "es" ? "Nombre" : "First name"}
                    </Label>
                    <Input id="first-name" />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="last-name">
                      {lang === "ar" ? "اسم العائلة" : lang === "es" ? "Apellido" : "Last name"}
                    </Label>
                    <Input id="last-name" />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">
                    {lang === "ar" ? "البريد الإلكتروني" : lang === "es" ? "Correo electrónico" : "Email"}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={
                      lang === "ar" ? "name@example.com" : lang === "es" ? "nombre@ejemplo.com" : "name@example.com"
                    }
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">
                    {lang === "ar" ? "كلمة المرور" : lang === "es" ? "Contraseña" : "Password"}
                  </Label>
                  <Input id="password" type="password" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="confirm-password">
                    {lang === "ar" ? "تأكيد كلمة المرور" : lang === "es" ? "Confirmar contraseña" : "Confirm password"}
                  </Label>
                  <Input id="confirm-password" type="password" />
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full">
                  {lang === "ar" ? "إنشاء حساب" : lang === "es" ? "Crear cuenta" : "Create account"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>

        <p className="px-8 text-center text-sm text-muted-foreground">
          {lang === "ar"
            ? "بالتسجيل، فإنك توافق على"
            : lang === "es"
              ? "Al registrarte, aceptas nuestros"
              : "By registering, you agree to our"}{" "}
          <Link href={`/${lang}/terms`} className="underline underline-offset-4 hover:text-primary">
            {lang === "ar" ? "شروط الخدمة" : lang === "es" ? "Términos de servicio" : "Terms of Service"}
          </Link>{" "}
          {lang === "ar" ? "و" : lang === "es" ? "y" : "and"}{" "}
          <Link href={`/${lang}/privacy`} className="underline underline-offset-4 hover:text-primary">
            {lang === "ar" ? "سياسة الخصوصية" : lang === "es" ? "Política de privacidad" : "Privacy Policy"}
          </Link>
          .
        </p>
      </div>
    </div>
  )
}

