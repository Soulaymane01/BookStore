import { getDictionary } from "../../dictionaries"

interface ReturnPolicyPageProps {
  params: { lang: string }
}

export default async function ReturnPolicyPage({ params }: ReturnPolicyPageProps) {
  const { lang } = params
  const dictionary = await getDictionary(lang)

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">
          {lang === "ar"
            ? "سياسة الإرجاع والاستبدال"
            : lang === "es"
              ? "Política de Devoluciones y Cambios"
              : "Return and Exchange Policy"}
        </h1>

        <div className="prose prose-green max-w-none">
          <p className="text-muted-foreground mb-6">
            {lang === "ar"
              ? "نحن نسعى جاهدين لضمان رضاك عن مشترياتك. فيما يلي سياستنا المتعلقة بالإرجاع والاستبدال."
              : lang === "es"
                ? "Nos esforzamos por garantizar su satisfacción con sus compras. A continuación se detalla nuestra política de devoluciones y cambios."
                : "We strive to ensure your satisfaction with your purchases. Below is our policy regarding returns and exchanges."}
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            {lang === "ar" ? "سياسة الإرجاع" : lang === "es" ? "Política de Devoluciones" : "Return Policy"}
          </h2>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              {lang === "ar"
                ? "يمكن إرجاع المنتجات في غضون 14 يومًا من تاريخ الاستلام."
                : lang === "es"
                  ? "Los productos pueden ser devueltos dentro de los 14 días posteriores a la fecha de recepción."
                  : "Products can be returned within 14 days from the date of receipt."}
            </li>
            <li>
              {lang === "ar"
                ? "يجب أن تكون المنتجات المرتجعة في حالتها الأصلية، غير مستخدمة وبجميع الملصقات والتغليف الأصلي."
                : lang === "es"
                  ? "Los productos devueltos deben estar en su condición original, sin usar y con todas las etiquetas y embalajes originales."
                  : "Returned products must be in their original condition, unused, and with all original tags and packaging."}
            </li>
            <li>
              {lang === "ar"
                ? "سيتم رد المبلغ المدفوع للمنتجات المرتجعة بنفس طريقة الدفع الأصلية في غضون 7-14 يوم عمل من استلام المرتجعات."
                : lang === "es"
                  ? "El reembolso de los productos devueltos se realizará mediante el mismo método de pago original dentro de los 7-14 días hábiles posteriores a la recepción de las devoluciones."
                  : "Refunds for returned products will be issued via the original payment method within 7-14 business days of receiving the returns."}
            </li>
            <li>
              {lang === "ar"
                ? "تكاليف الشحن للإرجاع هي مسؤولية العميل، ما لم يكن المنتج معيبًا أو تم شحنه بشكل غير صحيح."
                : lang === "es"
                  ? "Los costos de envío para la devolución son responsabilidad del cliente, a menos que el producto sea defectuoso o se haya enviado incorrectamente."
                  : "Shipping costs for returns are the responsibility of the customer unless the product is defective or was shipped incorrectly."}
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            {lang === "ar" ? "سياسة الاستبدال" : lang === "es" ? "Política de Cambios" : "Exchange Policy"}
          </h2>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              {lang === "ar"
                ? "يمكن استبدال المنتجات في غضون 30 يومًا من تاريخ الاستلام."
                : lang === "es"
                  ? "Los productos pueden ser cambiados dentro de los 30 días posteriores a la fecha de recepción."
                  : "Products can be exchanged within 30 days from the date of receipt."}
            </li>
            <li>
              {lang === "ar"
                ? "يجب أن تكون المنتجات المراد استبدالها في حالتها الأصلية، غير مستخدمة وبجميع الملصقات والتغليف الأصلي."
                : lang === "es"
                  ? "Los productos a cambiar deben estar en su condición original, sin usar y con todas las etiquetas y embalajes originales."
                  : "Products for exchange must be in their original condition, unused, and with all original tags and packaging."}
            </li>
            <li>
              {lang === "ar"
                ? "إذا كان المنتج البديل أغلى ثمناً، يجب على العميل دفع الفرق."
                : lang === "es"
                  ? "Si el producto de reemplazo es más caro, el cliente debe pagar la diferencia."
                  : "If the replacement product is more expensive, the customer must pay the difference."}
            </li>
            <li>
              {lang === "ar"
                ? "إذا كان المنتج البديل أقل سعراً، سيتم رد الفرق إلى العميل."
                : lang === "es"
                  ? "Si el producto de reemplazo es menos costoso, se reembolsará la diferencia al cliente."
                  : "If the replacement product is less expensive, the difference will be refunded to the customer."}
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            {lang === "ar" ? "المنتجات المعيبة" : lang === "es" ? "Productos Defectuosos" : "Defective Products"}
          </h2>

          <ul className="list-disc pl-6 space-y-2 mb-6">
            <li>
              {lang === "ar"
                ? "إذا تلقيت منتجًا معيبًا، يرجى الاتصال بنا في غضون 48 ساعة من الاستلام."
                : lang === "es"
                  ? "Si recibe un producto defectuoso, contáctenos dentro de las 48 horas posteriores a la recepción."
                  : "If you receive a defective product, please contact us within 48 hours of receipt."}
            </li>
            <li>
              {lang === "ar"
                ? "سنقوم بترتيب استبدال المنتج أو استرداد المبلغ المدفوع بالكامل، بما في ذلك تكاليف الشحن."
                : lang === "es"
                  ? "Organizaremos un reemplazo del producto o un reembolso completo, incluidos los gastos de envío."
                  : "We will arrange for a replacement of the product or a full refund, including shipping costs."}
            </li>
            <li>
              {lang === "ar"
                ? "قد نطلب صورًا للمنتج المعيب للتحقق من الحالة."
                : lang === "es"
                  ? "Podemos solicitar fotos del producto defectuoso para verificar la condición."
                  : "We may request photos of the defective product to verify the condition."}
            </li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4">
            {lang === "ar"
              ? "كيفية طلب الإرجاع أو الاستبدال"
              : lang === "es"
                ? "Cómo Solicitar una Devolución o Cambio"
                : "How to Request a Return or Exchange"}
          </h2>

          <ol className="list-decimal pl-6 space-y-2 mb-6">
            <li>
              {lang === "ar"
                ? "اتصل بنا عبر البريد الإلكتروني أو الهاتف لإبلاغنا برغبتك في الإرجاع أو الاستبدال."
                : lang === "es"
                  ? "Contáctenos por correo electrónico o teléfono para informarnos de su deseo de devolver o cambiar."
                  : "Contact us via email or phone to inform us of your desire to return or exchange."}
            </li>
            <li>
              {lang === "ar"
                ? "سنزودك بتعليمات حول كيفية إرسال المنتج إلينا."
                : lang === "es"
                  ? "Le proporcionaremos instrucciones sobre cómo enviarnos el producto."
                  : "We will provide you with instructions on how to send the product to us."}
            </li>
            <li>
              {lang === "ar"
                ? "بمجرد استلام المنتج، سنقوم بمعالجة الإرجاع أو الاستبدال في أقرب وقت ممكن."
                : lang === "es"
                  ? "Una vez que recibamos el producto, procesaremos la devolución o el cambio lo antes posible."
                  : "Once we receive the product, we will process the return or exchange as soon as possible."}
            </li>
          </ol>

          <p className="text-muted-foreground mt-8">
            {lang === "ar"
              ? "إذا كانت لديك أي أسئلة حول سياسة الإرجاع والاستبدال الخاصة بنا، فلا تتردد في الاتصال بنا."
              : lang === "es"
                ? "Si tiene alguna pregunta sobre nuestra política de devoluciones y cambios, no dude en contactarnos."
                : "If you have any questions about our return and exchange policy, please don't hesitate to contact us."}
          </p>
        </div>
      </div>
    </div>
  )
}

