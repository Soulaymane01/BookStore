"use client"

import type React from "react"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react"
import { useCart } from "../hooks/use-cart"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useOrderStore } from "../lib/data"

interface CartContentProps {
  lang: string
  dictionary: any
}

export default function CartContent({ lang, dictionary }: CartContentProps) {
  const { items, removeItem, updateQuantity, subtotal, clearCart } = useCart()
  const { toast } = useToast()
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [checkoutStep, setCheckoutStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    notes: "",
  })
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const addOrder = useOrderStore((state) => state.addOrder)

  const shipping = 5.99
  const tax = subtotal * 0.05
  const total = subtotal + shipping + tax

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const validateForm = () => {
    const errors: Record<string, string> = {}

    if (!formData.name.trim()) {
      errors.name = lang === "ar" ? "الاسم مطلوب" : lang === "es" ? "El nombre es obligatorio" : "Name is required"
    }

    if (!formData.email.trim()) {
      errors.email =
        lang === "ar"
          ? "البريد الإلكتروني مطلوب"
          : lang === "es"
            ? "El correo electrónico es obligatorio"
            : "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email =
        lang === "ar"
          ? "البريد الإلكتروني غير صالح"
          : lang === "es"
            ? "El correo electrónico no es válido"
            : "Email is invalid"
    }

    if (!formData.phone.trim()) {
      errors.phone =
        lang === "ar"
          ? "رقم الهاتف مطلوب"
          : lang === "es"
            ? "El número de teléfono es obligatorio"
            : "Phone number is required"
    }

    if (!formData.address.trim()) {
      errors.address =
        lang === "ar" ? "العنوان مطلوب" : lang === "es" ? "La dirección es obligatoria" : "Address is required"
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleCheckout = () => {
    if (checkoutStep === 1) {
      setCheckoutStep(2)
      return
    }

    if (!validateForm()) {
      return
    }

    setIsCheckingOut(true)

    // Create order
    const orderItems = items.map((item) => ({
      id: item.id,
      quantity: item.quantity,
      price: item.price,
    }))

    const orderData = {
      customer: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      status: {
        ar: "قيد المعالجة",
        en: "Processing",
        es: "En proceso",
      },
      items: orderItems,
      total,
    }

    // Add order to store
    const orderId = addOrder(orderData)

    // Simulate checkout process
    setTimeout(() => {
      toast({
        title:
          lang === "ar"
            ? "تم إرسال طلبك بنجاح"
            : lang === "es"
              ? "Pedido enviado con éxito"
              : "Order submitted successfully",
        description:
          lang === "ar"
            ? `رقم الطلب: ${orderId}. سنتواصل معك قريبًا لتأكيد طلبك`
            : lang === "es"
              ? `Número de pedido: ${orderId}. Nos pondremos en contacto contigo pronto para confirmar tu pedido`
              : `Order #${orderId}. We'll contact you soon to confirm your order`,
        duration: 5000,
      })
      clearCart()
      setIsCheckingOut(false)
      setCheckoutStep(1)
      setFormData({
        name: "",
        email: "",
        phone: "",
        address: "",
        notes: "",
      })
    }, 2000)
  }

  return (
    <div className="container px-4 py-8 md:px-6 md:py-12">
      <h1 className="text-3xl font-bold mb-8">{dictionary.cart.title}</h1>

      {items.length === 0 ? (
        <div className="text-center py-16">
          <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
          <h2 className="text-2xl font-semibold mb-2">{dictionary.cart.empty}</h2>
          <p className="text-muted-foreground mb-6">
            {lang === "ar"
              ? "لم تضف أي كتب إلى سلة التسوق الخاصة بك بعد."
              : lang === "es"
                ? "Aún no has añadido ningún libro a tu carrito."
                : "You haven't added any books to your cart yet."}
          </p>
          <Link href={`/${lang}/books`}>
            <Button>{dictionary.cart.continueShopping}</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 border rounded-lg p-4">
                  <div className="h-24 w-16 relative flex-shrink-0">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <Link href={`/${lang}/books/${item.id}`} className="font-medium hover:underline line-clamp-1">
                      {item.title}
                    </Link>
                    <p className="text-sm text-muted-foreground">{item.author}</p>
                    <p className="font-medium mt-1">${item.price}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="icon" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      +
                    </Button>
                  </div>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeItem(item.id)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href={`/${lang}/books`}>
                <Button variant="outline">{dictionary.cart.continueShopping}</Button>
              </Link>
            </div>
          </div>

          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-xl font-semibold mb-4">{dictionary.cart.summary}</h2>

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{dictionary.cart.subtotal}</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{dictionary.cart.shipping}</span>
                    <span>${shipping.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">{dictionary.cart.tax}</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>{dictionary.cart.total}</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="w-full">
                      {dictionary.cart.checkout}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle>
                        {lang === "ar" ? "إتمام الطلب" : lang === "es" ? "Finalizar compra" : "Checkout"}
                      </DialogTitle>
                      <DialogDescription>
                        {checkoutStep === 1
                          ? lang === "ar"
                            ? "مراجعة طلبك قبل المتابعة"
                            : lang === "es"
                              ? "Revisa tu pedido antes de continuar"
                              : "Review your order before proceeding"
                          : lang === "ar"
                            ? "أدخل معلومات الشحن الخاصة بك"
                            : lang === "es"
                              ? "Introduce tus datos de envío"
                              : "Enter your shipping information"}
                      </DialogDescription>
                    </DialogHeader>

                    {checkoutStep === 1 ? (
                      <div className="py-4">
                        <div className="max-h-[300px] overflow-y-auto space-y-3 mb-4">
                          {items.map((item) => (
                            <div key={item.id} className="flex items-center space-x-3 border-b pb-3">
                              <div className="h-12 w-8 relative flex-shrink-0">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.title}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm line-clamp-1">{item.title}</p>
                                <div className="flex justify-between text-sm text-muted-foreground">
                                  <span>
                                    {item.quantity} × ${item.price}
                                  </span>
                                  <span>${(item.quantity * item.price).toFixed(2)}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="space-y-2 border-t pt-3">
                          <div className="flex justify-between text-sm">
                            <span>{dictionary.cart.subtotal}</span>
                            <span>${subtotal.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>{dictionary.cart.shipping}</span>
                            <span>${shipping.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span>{dictionary.cart.tax}</span>
                            <span>${tax.toFixed(2)}</span>
                          </div>
                          <div className="flex justify-between font-semibold pt-2">
                            <span>{dictionary.cart.total}</span>
                            <span>${total.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="py-4 space-y-4">
                        <div className="space-y-2">
                          <Label htmlFor="name">
                            {lang === "ar" ? "الاسم" : lang === "es" ? "Nombre" : "Name"}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className={formErrors.name ? "border-red-500" : ""}
                          />
                          {formErrors.name && <p className="text-red-500 text-sm">{formErrors.name}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="email">
                            {lang === "ar" ? "البريد الإلكتروني" : lang === "es" ? "Correo electrónico" : "Email"}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={formErrors.email ? "border-red-500" : ""}
                          />
                          {formErrors.email && <p className="text-red-500 text-sm">{formErrors.email}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="phone">
                            {lang === "ar" ? "رقم الهاتف" : lang === "es" ? "Teléfono" : "Phone"}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="phone"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className={formErrors.phone ? "border-red-500" : ""}
                          />
                          {formErrors.phone && <p className="text-red-500 text-sm">{formErrors.phone}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="address">
                            {lang === "ar" ? "العنوان" : lang === "es" ? "Dirección" : "Address"}
                            <span className="text-red-500">*</span>
                          </Label>
                          <Textarea
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                            className={formErrors.address ? "border-red-500" : ""}
                          />
                          {formErrors.address && <p className="text-red-500 text-sm">{formErrors.address}</p>}
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="notes">{lang === "ar" ? "ملاحظات" : lang === "es" ? "Notas" : "Notes"}</Label>
                          <Textarea id="notes" name="notes" value={formData.notes} onChange={handleInputChange} />
                        </div>
                      </div>
                    )}

                    <DialogFooter>
                      {checkoutStep === 2 && (
                        <Button variant="outline" onClick={() => setCheckoutStep(1)} className="mr-auto">
                          {lang === "ar" ? "العودة" : lang === "es" ? "Volver" : "Back"}
                        </Button>
                      )}
                      <Button onClick={handleCheckout} disabled={isCheckingOut}>
                        {isCheckingOut ? (
                          <span>
                            {lang === "ar" ? "جاري المعالجة..." : lang === "es" ? "Procesando..." : "Processing..."}
                          </span>
                        ) : checkoutStep === 1 ? (
                          lang === "ar" ? (
                            "متابعة"
                          ) : lang === "es" ? (
                            "Continuar"
                          ) : (
                            "Continue"
                          )
                        ) : lang === "ar" ? (
                          "تأكيد الطلب"
                        ) : lang === "es" ? (
                          "Confirmar pedido"
                        ) : (
                          "Place Order"
                        )}
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  )
}

