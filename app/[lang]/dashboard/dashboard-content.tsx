"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Package,
  ShoppingCart,
  Users,
  DollarSign,
  Plus,
  Pencil,
  Trash2,
  MoreHorizontal,
  BookOpen,
  LayoutDashboard,
  Settings,
  LogOut,
  Bell,
  Search,
  Menu,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface DashboardContentProps {
  lang: string
  dictionary: any
  products: any[]
  orders: any[]
}

export default function DashboardContent({ lang, dictionary, products, orders }: DashboardContentProps) {
  const [showSidebar, setShowSidebar] = useState(true)

  return (
    <div className="flex min-h-screen bg-muted/30 animate-fadeIn">
      {/* Dashboard Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-10 w-64 bg-background border-r transform transition-transform duration-300 ease-in-out ${showSidebar ? "translate-x-0" : "-translate-x-full"} lg:relative lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center gap-2 px-6 py-4 border-b">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold text-xl">Admin Panel</span>
          </div>

          <div className="flex-1 py-6 px-4 space-y-1">
            <div className="px-2 mb-6">
              <div className="flex items-center gap-3 mb-4">
                <Avatar>
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="Admin" />
                  <AvatarFallback>AD</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-sm">Admin User</p>
                  <p className="text-xs text-muted-foreground">admin@example.com</p>
                </div>
              </div>
            </div>

            <Link
              href={`/${lang}/dashboard`}
              className="flex items-center gap-3 px-3 py-2 rounded-md bg-primary/10 text-primary font-medium"
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>{dictionary.navigation.dashboard}</span>
            </Link>

            <Link
              href={`/${lang}/dashboard`}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <Package className="h-5 w-5" />
              <span>{dictionary.dashboard.products}</span>
            </Link>

            <Link
              href={`/${lang}/dashboard`}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{dictionary.dashboard.orders}</span>
            </Link>

            <Link
              href={`/${lang}/dashboard`}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <Users className="h-5 w-5" />
              <span>{dictionary.dashboard.customers}</span>
            </Link>

            <Link
              href={`/${lang}/dashboard`}
              className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-muted transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span>{dictionary.dashboard.settings}</span>
            </Link>
          </div>

          <div className="border-t p-4">
            <Button variant="outline" className="w-full justify-start text-muted-foreground">
              <LogOut className="h-4 w-4 mr-2" />
              {lang === "ar" ? "تسجيل الخروج" : lang === "es" ? "Cerrar sesión" : "Logout"}
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 lg:ml-64">
        {/* Top Navigation */}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-6">
          <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setShowSidebar(!showSidebar)}>
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle menu</span>
          </Button>

          <div className="flex-1 flex items-center justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={lang === "ar" ? "البحث..." : lang === "es" ? "Buscar..." : "Search..."}
                className="w-full pl-9 rounded-full bg-muted/50 focus-visible:ring-primary"
              />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-white">
                  3
                </span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold">{dictionary.navigation.dashboard}</h1>
              <p className="text-muted-foreground">
                {lang === "ar"
                  ? "إدارة المنتجات والطلبات والعملاء"
                  : lang === "es"
                    ? "Gestiona productos, pedidos y clientes"
                    : "Manage products, orders, and customers"}
              </p>
            </div>

            <Dialog>
              <DialogTrigger asChild>
                <Button className="mt-4 md:mt-0 rounded-full">
                  <Plus className="mr-2 h-4 w-4" />
                  {dictionary.dashboard.addProduct}
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>{dictionary.dashboard.addProduct}</DialogTitle>
                  <DialogDescription>
                    {lang === "ar"
                      ? "أضف منتجًا جديدًا إلى المتجر. اضغط على حفظ عند الانتهاء."
                      : lang === "es"
                        ? "Añade un nuevo producto a la tienda. Haz clic en guardar cuando hayas terminado."
                        : "Add a new product to the store. Click save when you're done."}
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="title" className="text-right">
                      {lang === "ar" ? "العنوان" : lang === "es" ? "Título" : "Title"}
                    </Label>
                    <Input id="title" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="author" className="text-right">
                      {lang === "ar" ? "المؤلف" : lang === "es" ? "Autor" : "Author"}
                    </Label>
                    <Input id="author" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="price" className="text-right">
                      {lang === "ar" ? "السعر" : lang === "es" ? "Precio" : "Price"}
                    </Label>
                    <Input id="price" type="number" step="0.01" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="category" className="text-right">
                      {lang === "ar" ? "الفئة" : lang === "es" ? "Categoría" : "Category"}
                    </Label>
                    <Select>
                      <SelectTrigger id="category" className="col-span-3">
                        <SelectValue
                          placeholder={
                            lang === "ar" ? "اختر فئة" : lang === "es" ? "Seleccionar categoría" : "Select category"
                          }
                        />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quran">{dictionary.home.categories.quran}</SelectItem>
                        <SelectItem value="hadith">{dictionary.home.categories.hadith}</SelectItem>
                        <SelectItem value="fiqh">{dictionary.home.categories.fiqh}</SelectItem>
                        <SelectItem value="seerah">{dictionary.home.categories.seerah}</SelectItem>
                        <SelectItem value="history">{dictionary.home.categories.history}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="stock" className="text-right">
                      {lang === "ar" ? "المخزون" : lang === "es" ? "Inventario" : "Stock"}
                    </Label>
                    <Input id="stock" type="number" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="image" className="text-right">
                      {lang === "ar" ? "الصورة" : lang === "es" ? "Imagen" : "Image"}
                    </Label>
                    <Input id="image" type="file" className="col-span-3" />
                  </div>
                  <div className="grid grid-cols-4 items-start gap-4">
                    <Label htmlFor="description" className="text-right">
                      {lang === "ar" ? "الوصف" : lang === "es" ? "Descripción" : "Description"}
                    </Label>
                    <Textarea id="description" className="col-span-3" />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit" className="rounded-full">
                    {lang === "ar" ? "حفظ" : lang === "es" ? "Guardar" : "Save"}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          {/* Dashboard Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {lang === "ar" ? "إجمالي المبيعات" : lang === "es" ? "Ventas Totales" : "Total Sales"}
                </CardTitle>
                <DollarSign className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$1,248.56</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">+18%</span>{" "}
                  {lang === "ar" ? "من الشهر الماضي" : lang === "es" ? "desde el mes pasado" : "from last month"}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {lang === "ar" ? "الطلبات" : lang === "es" ? "Pedidos" : "Orders"}
                </CardTitle>
                <ShoppingCart className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">24</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">+12%</span>{" "}
                  {lang === "ar" ? "من الشهر الماضي" : lang === "es" ? "desde el mes pasado" : "from last month"}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {lang === "ar" ? "المنتجات" : lang === "es" ? "Productos" : "Products"}
                </CardTitle>
                <Package className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{products.length}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">+2</span>{" "}
                  {lang === "ar" ? "هذا الشهر" : lang === "es" ? "este mes" : "this month"}
                </p>
              </CardContent>
            </Card>
            <Card className="shadow-soft">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {lang === "ar" ? "العملاء" : lang === "es" ? "Clientes" : "Customers"}
                </CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">18</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-500 font-medium">+5</span>{" "}
                  {lang === "ar" ? "هذا الشهر" : lang === "es" ? "este mes" : "this month"}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Dashboard Tabs */}
          <Tabs defaultValue="products" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="products">{dictionary.dashboard.products}</TabsTrigger>
              <TabsTrigger value="orders">{dictionary.dashboard.orders}</TabsTrigger>
              <TabsTrigger value="customers">{dictionary.dashboard.customers}</TabsTrigger>
            </TabsList>

            {/* Products Tab */}
            <TabsContent value="products">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>{dictionary.dashboard.products}</CardTitle>
                  <CardDescription>
                    {lang === "ar"
                      ? "إدارة منتجاتك وتحديث المخزون والأسعار."
                      : lang === "es"
                        ? "Gestiona tus productos y actualiza el inventario y los precios."
                        : "Manage your products and update inventory and prices."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[80px]">
                          {lang === "ar" ? "الصورة" : lang === "es" ? "Imagen" : "Image"}
                        </TableHead>
                        <TableHead>{lang === "ar" ? "العنوان" : lang === "es" ? "Título" : "Title"}</TableHead>
                        <TableHead>{lang === "ar" ? "الفئة" : lang === "es" ? "Categoría" : "Category"}</TableHead>
                        <TableHead className="text-right">
                          {lang === "ar" ? "السعر" : lang === "es" ? "Precio" : "Price"}
                        </TableHead>
                        <TableHead className="text-right">
                          {lang === "ar" ? "المخزون" : lang === "es" ? "Inventario" : "Stock"}
                        </TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow key={product.id}>
                          <TableCell>
                            <div className="h-12 w-12 relative rounded overflow-hidden">
                              <Image
                                src={product.image || "/placeholder.svg"}
                                alt={product.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">{product.title}</TableCell>
                          <TableCell>{product.category}</TableCell>
                          <TableCell className="text-right">${product.price}</TableCell>
                          <TableCell className="text-right">
                            <span
                              className={
                                product.stock === 0
                                  ? "text-red-500"
                                  : product.stock < 20
                                    ? "text-amber-500"
                                    : "text-green-500"
                              }
                            >
                              {product.stock}
                            </span>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                  {lang === "ar" ? "الإجراءات" : lang === "es" ? "Acciones" : "Actions"}
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>
                                  <Pencil className="h-4 w-4 mr-2" />
                                  {dictionary.dashboard.editProduct}
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-500">
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  {dictionary.dashboard.deleteProduct}
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    {lang === "ar" ? "السابق" : lang === "es" ? "Anterior" : "Previous"}
                  </Button>
                  <Button variant="outline">{lang === "ar" ? "التالي" : lang === "es" ? "Siguiente" : "Next"}</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Orders Tab */}
            <TabsContent value="orders">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>{dictionary.dashboard.orders}</CardTitle>
                  <CardDescription>
                    {lang === "ar"
                      ? "عرض وإدارة طلبات العملاء."
                      : lang === "es"
                        ? "Ver y gestionar los pedidos de los clientes."
                        : "View and manage customer orders."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          {lang === "ar" ? "رقم الطلب" : lang === "es" ? "ID del Pedido" : "Order ID"}
                        </TableHead>
                        <TableHead>{lang === "ar" ? "العميل" : lang === "es" ? "Cliente" : "Customer"}</TableHead>
                        <TableHead>{lang === "ar" ? "التاريخ" : lang === "es" ? "Fecha" : "Date"}</TableHead>
                        <TableHead>{lang === "ar" ? "الحالة" : lang === "es" ? "Estado" : "Status"}</TableHead>
                        <TableHead className="text-right">
                          {lang === "ar" ? "المجموع" : lang === "es" ? "Total" : "Total"}
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {orders.map((order) => (
                        <TableRow key={order.id}>
                          <TableCell className="font-medium">{order.id}</TableCell>
                          <TableCell>{order.customer}</TableCell>
                          <TableCell>{order.date}</TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                order.status === (lang === "ar" ? "مكتمل" : lang === "es" ? "Completado" : "Completed")
                                  ? "default"
                                  : order.status ===
                                      (lang === "ar" ? "تم الشحن" : lang === "es" ? "Enviado" : "Shipped")
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {order.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    {lang === "ar" ? "السابق" : lang === "es" ? "Anterior" : "Previous"}
                  </Button>
                  <Button variant="outline">{lang === "ar" ? "التالي" : lang === "es" ? "Siguiente" : "Next"}</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            {/* Customers Tab */}
            <TabsContent value="customers">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>{dictionary.dashboard.customers}</CardTitle>
                  <CardDescription>
                    {lang === "ar"
                      ? "عرض وإدارة حسابات العملاء."
                      : lang === "es"
                        ? "Ver y gestionar las cuentas de los clientes."
                        : "View and manage customer accounts."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-10">
                    <Users className="mx-auto h-12 w-12 text-primary mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      {lang === "ar" ? "قائمة العملاء" : lang === "es" ? "Lista de Clientes" : "Customer List"}
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {lang === "ar"
                        ? "سيتم عرض العملاء المسجلين هنا."
                        : lang === "es"
                          ? "Los clientes registrados se mostrarán aquí."
                          : "Registered customers will be displayed here."}
                    </p>
                    <Button>{lang === "ar" ? "إضافة عميل" : lang === "es" ? "Añadir Cliente" : "Add Customer"}</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

