import Image from "next/image"
import { getDictionary } from "../dictionaries"
import { Card, CardContent } from "@/components/ui/card"
import { Book, Users, Globe, ShieldCheck } from "lucide-react"
import { generateStaticParams } from "@/utils/generateStaticParams";

export { generateStaticParams };

interface AboutPageProps {
  params: { lang: string }
}



export default async function AboutPage({ params }: AboutPageProps) {
  const { lang } = params
  const dictionary = await getDictionary(lang)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-2">{dictionary.footer.about}</h1>
        <p className="text-muted-foreground mb-8">
          {lang === "ar"
            ? "تعرف على قصتنا ومهمتنا وفريقنا"
            : lang === "es"
              ? "Conoce nuestra historia, misión y equipo"
              : "Learn about our story, mission, and team"}
        </p>

        {/* About Us Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-4">
              {lang === "ar" ? "قصتنا" : lang === "es" ? "Nuestra Historia" : "Our Story"}
            </h2>
            <p className="text-muted-foreground mb-4">
              {lang === "ar"
                ? "تأسس متجر الكتب الإسلامية في عام 2010 بهدف توفير مصدر موثوق للكتب الإسلامية والعربية الأصيلة للقراء في جميع أنحاء العالم. بدأنا كمتجر صغير في القاهرة، مصر، وتوسعنا منذ ذلك الحين لنصبح مصدرًا عالميًا للمعرفة الإسلامية."
                : lang === "es"
                  ? "Islamic Books Store se fundó en 2010 con el objetivo de proporcionar una fuente confiable de libros islámicos y árabes auténticos para lectores de todo el mundo. Comenzamos como una pequeña tienda en El Cairo, Egipto, y desde entonces nos hemos expandido para convertirnos en una fuente global de conocimiento islámico."
                  : "Islamic Books Store was founded in 2010 with the goal of providing a reliable source of authentic Islamic and Arabic books for readers around the world. We started as a small store in Cairo, Egypt, and have since expanded to become a global source for Islamic knowledge."}
            </p>
            <p className="text-muted-foreground">
              {lang === "ar"
                ? "نحن نؤمن بقوة المعرفة والتعليم، ونسعى جاهدين لجعل الكتب الإسلامية متاحة للجميع، بغض النظر عن مكان وجودهم. مهمتنا هي نشر المعرفة الإسلامية الأصيلة وتعزيز فهم أعمق للإسلام وتعاليمه."
                : lang === "es"
                  ? "Creemos en el poder del conocimiento y la educación, y nos esforzamos por hacer que los libros islámicos estén disponibles para todos, independientemente de dónde se encuentren. Nuestra misión es difundir el conocimiento islámico auténtico y promover una comprensión más profunda del Islam y sus enseñanzas."
                  : "We believe in the power of knowledge and education, and we strive to make Islamic books available to everyone, regardless of where they are. Our mission is to spread authentic Islamic knowledge and promote a deeper understanding of Islam and its teachings."}
            </p>
          </div>
          <div className="relative h-[300px] md:h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=400&width=600" alt="Our bookstore" fill className="object-cover" />
          </div>
        </div>

        {/* Our Values Section */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {lang === "ar" ? "قيمنا" : lang === "es" ? "Nuestros Valores" : "Our Values"}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Book className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    {lang === "ar"
                      ? "المعرفة الأصيلة"
                      : lang === "es"
                        ? "Conocimiento Auténtico"
                        : "Authentic Knowledge"}
                  </h3>
                  <p className="text-muted-foreground">
                    {lang === "ar"
                      ? "نقدم فقط الكتب الموثوقة من مصادر معتمدة."
                      : lang === "es"
                        ? "Ofrecemos solo libros confiables de fuentes acreditadas."
                        : "We offer only reliable books from trusted sources."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Globe className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    {lang === "ar" ? "الوصول العالمي" : lang === "es" ? "Acceso Global" : "Global Access"}
                  </h3>
                  <p className="text-muted-foreground">
                    {lang === "ar"
                      ? "نجعل المعرفة الإسلامية متاحة للجميع حول العالم."
                      : lang === "es"
                        ? "Hacemos que el conocimiento islámico esté disponible para todos en todo el mundo."
                        : "We make Islamic knowledge available to everyone around the world."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Users className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    {lang === "ar" ? "خدمة العملاء" : lang === "es" ? "Servicio al Cliente" : "Customer Service"}
                  </h3>
                  <p className="text-muted-foreground">
                    {lang === "ar"
                      ? "نضع عملاءنا في المقام الأول ونقدم خدمة استثنائية."
                      : lang === "es"
                        ? "Ponemos a nuestros clientes en primer lugar y ofrecemos un servicio excepcional."
                        : "We put our customers first and provide exceptional service."}
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <ShieldCheck className="h-12 w-12 text-primary mb-4" />
                  <h3 className="font-semibold text-lg mb-2">
                    {lang === "ar"
                      ? "الجودة والموثوقية"
                      : lang === "es"
                        ? "Calidad y Fiabilidad"
                        : "Quality & Reliability"}
                  </h3>
                  <p className="text-muted-foreground">
                    {lang === "ar"
                      ? "نضمن جودة كل كتاب نبيعه وموثوقية خدماتنا."
                      : lang === "es"
                        ? "Garantizamos la calidad de cada libro que vendemos y la fiabilidad de nuestros servicios."
                        : "We ensure the quality of every book we sell and the reliability of our services."}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Our Team Section */}
        <div>
          <h2 className="text-2xl font-bold mb-6 text-center">
            {lang === "ar" ? "فريقنا" : lang === "es" ? "Nuestro Equipo" : "Our Team"}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden relative mb-4">
                <Image src="/placeholder.svg?height=128&width=128" alt="Team member" fill className="object-cover" />
              </div>
              <h3 className="font-semibold text-lg">
                {lang === "ar" ? "أحمد محمد" : lang === "es" ? "Ahmed Mohammed" : "Ahmed Mohammed"}
              </h3>
              <p className="text-muted-foreground mb-2">
                {lang === "ar" ? "المؤسس والرئيس التنفيذي" : lang === "es" ? "Fundador y CEO" : "Founder & CEO"}
              </p>
              <p className="text-sm text-muted-foreground">
                {lang === "ar"
                  ? "خبير في الأدب الإسلامي مع أكثر من 15 عامًا من الخبرة في مجال النشر."
                  : lang === "es"
                    ? "Experto en literatura islámica con más de 15 años de experiencia en el sector editorial."
                    : "Expert in Islamic literature with over 15 years of experience in the publishing industry."}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden relative mb-4">
                <Image src="/placeholder.svg?height=128&width=128" alt="Team member" fill className="object-cover" />
              </div>
              <h3 className="font-semibold text-lg">
                {lang === "ar" ? "فاطمة علي" : lang === "es" ? "Fatima Ali" : "Fatima Ali"}
              </h3>
              <p className="text-muted-foreground mb-2">
                {lang === "ar" ? "مديرة المحتوى" : lang === "es" ? "Directora de Contenido" : "Content Director"}
              </p>
              <p className="text-sm text-muted-foreground">
                {lang === "ar"
                  ? "متخصصة في الدراسات الإسلامية مع شغف بجعل المعرفة الإسلامية في متناول الجميع."
                  : lang === "es"
                    ? "Especialista en estudios islámicos con pasión por hacer que el conocimiento islámico sea accesible para todos."
                    : "Specialist in Islamic studies with a passion for making Islamic knowledge accessible to everyone."}
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <div className="h-32 w-32 rounded-full overflow-hidden relative mb-4">
                <Image src="/placeholder.svg?height=128&width=128" alt="Team member" fill className="object-cover" />
              </div>
              <h3 className="font-semibold text-lg">
                {lang === "ar" ? "محمد حسن" : lang === "es" ? "Mohammed Hassan" : "Mohammed Hassan"}
              </h3>
              <p className="text-muted-foreground mb-2">
                {lang === "ar"
                  ? "مدير خدمة العملاء"
                  : lang === "es"
                    ? "Director de Servicio al Cliente"
                    : "Customer Service Manager"}
              </p>
              <p className="text-sm text-muted-foreground">
                {lang === "ar"
                  ? "متخصص في تقديم تجربة عملاء استثنائية وضمان رضا العملاء."
                  : lang === "es"
                    ? "Especializado en proporcionar una experiencia excepcional al cliente y garantizar la satisfacción del cliente."
                    : "Specialized in providing an exceptional customer experience and ensuring customer satisfaction."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

