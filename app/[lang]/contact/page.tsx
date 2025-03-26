import { getDictionary } from "../dictionaries"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, MessageSquare, Phone, MapPin } from "lucide-react"

interface ContactPageProps {
  params: { lang: string }
}

export default async function ContactPage({ params }: ContactPageProps) {
  const { lang } = params
  const dictionary = await getDictionary(lang)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{dictionary.navigation.contact}</h1>
        <p className="text-muted-foreground mb-8">
          {lang === "ar"
            ? "نحن هنا للإجابة على أسئلتك ومساعدتك في العثور على الكتب التي تبحث عنها."
            : lang === "es"
              ? "Estamos aquí para responder a tus preguntas y ayudarte a encontrar los libros que buscas."
              : "We're here to answer your questions and help you find the books you're looking for."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Phone className="h-5 w-5 mr-2" />
                {lang === "ar" ? "اتصل بنا" : lang === "es" ? "Llámanos" : "Call Us"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">+123 456 7890</p>
              <p className="text-sm text-muted-foreground mt-1">
                {lang === "ar"
                  ? "من الاثنين إلى الجمعة: 9 صباحًا - 5 مساءً"
                  : lang === "es"
                    ? "Lunes a Viernes: 9am - 5pm"
                    : "Monday to Friday: 9am - 5pm"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Mail className="h-5 w-5 mr-2" />
                {lang === "ar" ? "راسلنا" : lang === "es" ? "Escríbenos" : "Email Us"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">info@islamicbooks.com</p>
              <p className="text-sm text-muted-foreground mt-1">
                {lang === "ar"
                  ? "نرد عادة خلال 24 ساعة"
                  : lang === "es"
                    ? "Normalmente respondemos en 24 horas"
                    : "We usually respond within 24 hours"}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <MessageSquare className="h-5 w-5 mr-2" />
                {lang === "ar" ? "واتساب" : lang === "es" ? "WhatsApp" : "WhatsApp"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">+123 456 7890</p>
              <p className="text-sm text-muted-foreground mt-1">
                {lang === "ar"
                  ? "متاح للدردشة المباشرة"
                  : lang === "es"
                    ? "Disponible para chat en vivo"
                    : "Available for live chat"}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>
                {lang === "ar" ? "أرسل لنا رسالة" : lang === "es" ? "Envíanos un mensaje" : "Send Us a Message"}
              </CardTitle>
              <CardDescription>
                {lang === "ar"
                  ? "املأ النموذج أدناه وسنرد عليك في أقرب وقت ممكن."
                  : lang === "es"
                    ? "Completa el formulario a continuación y te responderemos lo antes posible."
                    : "Fill out the form below and we'll get back to you as soon as possible."}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">{lang === "ar" ? "الاسم" : lang === "es" ? "Nombre" : "Name"}</Label>
                    <Input
                      id="name"
                      placeholder={
                        lang === "ar" ? "أدخل اسمك" : lang === "es" ? "Introduce tu nombre" : "Enter your name"
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">
                      {lang === "ar" ? "البريد الإلكتروني" : lang === "es" ? "Correo electrónico" : "Email"}
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder={
                        lang === "ar"
                          ? "أدخل بريدك الإلكتروني"
                          : lang === "es"
                            ? "Introduce tu correo electrónico"
                            : "Enter your email"
                      }
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">{lang === "ar" ? "الموضوع" : lang === "es" ? "Asunto" : "Subject"}</Label>
                  <Input
                    id="subject"
                    placeholder={
                      lang === "ar"
                        ? "أدخل موضوع رسالتك"
                        : lang === "es"
                          ? "Introduce el asunto de tu mensaje"
                          : "Enter the subject of your message"
                    }
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">{lang === "ar" ? "الرسالة" : lang === "es" ? "Mensaje" : "Message"}</Label>
                  <Textarea
                    id="message"
                    rows={5}
                    placeholder={
                      lang === "ar"
                        ? "اكتب رسالتك هنا..."
                        : lang === "es"
                          ? "Escribe tu mensaje aquí..."
                          : "Write your message here..."
                    }
                  />
                </div>
                <Button type="submit" className="w-full">
                  {lang === "ar" ? "إرسال الرسالة" : lang === "es" ? "Enviar mensaje" : "Send Message"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>{lang === "ar" ? "موقعنا" : lang === "es" ? "Nuestra ubicación" : "Our Location"}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start space-x-4">
                  <MapPin className="h-5 w-5 flex-shrink-0 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Islamic Books Store</p>
                    <p className="text-muted-foreground">
                      {lang === "ar"
                        ? "123 شارع الأزهر، القاهرة، مصر"
                        : lang === "es"
                          ? "123 Calle Al-Azhar, El Cairo, Egipto"
                          : "123 Al-Azhar Street, Cairo, Egypt"}
                    </p>
                  </div>
                </div>

                <div className="mt-4 aspect-video relative rounded-md overflow-hidden border">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3453.6730221120435!2d31.259894!3d30.044436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQwLjAiTiAzMcKwMTUnMzUuNiJF!5e0!3m2!1sen!2sus!4v1616000000000!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>
                  {lang === "ar" ? "ساعات العمل" : lang === "es" ? "Horario de apertura" : "Opening Hours"}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>
                      {lang === "ar" ? "الاثنين - الجمعة" : lang === "es" ? "Lunes - Viernes" : "Monday - Friday"}
                    </span>
                    <span>9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === "ar" ? "السبت" : lang === "es" ? "Sábado" : "Saturday"}</span>
                    <span>10:00 AM - 4:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{lang === "ar" ? "الأحد" : lang === "es" ? "Domingo" : "Sunday"}</span>
                    <span>{lang === "ar" ? "مغلق" : lang === "es" ? "Cerrado" : "Closed"}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

