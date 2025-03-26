"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Package,
  ShoppingCart,
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
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  Truck,
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
import { useToast } from "@/components/ui/use-toast"
import {
  type Book,
  useBookStore,
  useOrderStore,
  categories,
  getBookTitle,
  getBookAuthor,
  getOrderStatus,
} from "../lib/data"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts"

interface AdminDashboardProps {
  lang: string
  dictionary: any
}

export default function AdminDashboard({ lang, dictionary }: AdminDashboardProps) {
  const [showSidebar, setShowSidebar] = useState(true)
  const [activeTab, setActiveTab] = useState("dashboard")
  const [searchQuery, setSearchQuery] = useState("")
  const [editingProduct, setEditingProduct] = useState<Book | null>(null)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<number | null>(null)
  const [isAddProductDialogOpen, setIsAddProductDialogOpen] = useState(false)
  const [newProduct, setNewProduct] = useState<Partial<Book>>({
    title: { ar: "", en: "", es: "" },
    author: { ar: "", en: "", es: "" },
    price: 0,
    category: "islamic",
    stock: 0,
    image: "/placeholder.svg?height=400&width=300",
    description: { ar: "", en: "", es: "" },
  })
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null)
  const [orderStatusUpdate, setOrderStatusUpdate] = useState<{
    ar: string
    en: string
    es: string
  } | null>(null)

  const { toast } = useToast()
  const router = useRouter()

  // Get data from stores
  const books = useBookStore((state) => state.books)
  const addBook = useBookStore((state) => state.addBook)
  const updateBook = useBookStore((state) => state.updateBook)
  const deleteBook = useBookStore((state) => state.deleteBook)
  const orders = useOrderStore((state) => state.orders)
  const updateOrderStatus = useOrderStore((state) => state.updateOrderStatus)
  const orderStats = useOrderStore((state) => state.getOrderStats)

  // Filter books based on search query
  const filteredBooks = searchQuery
    ? books.filter(
        (book) =>
          getBookTitle(book, lang).toLowerCase().includes(searchQuery.toLowerCase()) ||
          getBookAuthor(book, lang).toLowerCase().includes(searchQuery.toLowerCase()) ||
          book.category.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : books

  // Filter orders based on search query
  const filteredOrders = searchQuery
    ? orders.filter(
        (order) =>
          order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
          order.email.toLowerCase().includes(searchQuery.toLowerCase()),
      )
    : orders

  // Get stats
  const stats = orderStats()

  // Handle add product
  const handleAddProduct = () => {
    if (!newProduct.title?.en || !newProduct.author?.en || !newProduct.price) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      })
      return
    }

    // Add book to store
    addBook(newProduct as Omit<Book, "id">)

    // Show success message
    toast({
      title: lang === "ar" ? "تمت إضافة المنتج" : lang === "es" ? "Producto añadido" : "Product added",
      description: newProduct.title[lang as keyof typeof newProduct.title],
    })

    // Reset form and close dialog
    setNewProduct({
      title: { ar: "", en: "", es: "" },
      author: { ar: "", en: "", es: "" },
      price: 0,
      category: "islamic",
      stock: 0,
      image: "/placeholder.svg?height=400&width=300",
      description: { ar: "", en: "", es: "" },
    })
    setIsAddProductDialogOpen(false)
  }

  // Handle update product
  const handleUpdateProduct = () => {
    if (!editingProduct) return

    // Update book in store
    updateBook(editingProduct.id, editingProduct)

    // Show success message
    toast({
      title: lang === "ar" ? "تم تحديث المنتج" : lang === "es" ? "Producto actualizado" : "Product updated",
      description: getBookTitle(editingProduct, lang),
    })

    // Reset form and close dialog
    setEditingProduct(null)
  }

  // Handle delete product
  const handleDeleteProduct = () => {
    if (productToDelete === null) return

    // Get product details before deletion
    const product = books.find((b) => b.id === productToDelete)

    // Delete book from store
    deleteBook(productToDelete)

    // Show success message
    toast({
      title: lang === "ar" ? "تم حذف المنتج" : lang === "es" ? "Producto eliminado" : "Product deleted",
      description: product ? getBookTitle(product, lang) : "",
    })

    // Reset state and close dialog
    setProductToDelete(null)
    setIsDeleteDialogOpen(false)
  }

  // Handle order status update
  const handleUpdateOrderStatus = () => {
    if (!selectedOrderId || !orderStatusUpdate) return

    // Update order status
    updateOrderStatus(selectedOrderId, orderStatusUpdate)

    // Show success message
    toast({
      title:
        lang === "ar"
          ? "تم تحديث حالة الطلب"
          : lang === "es"
            ? "Estado del pedido actualizado"
            : "Order status updated",
      description: `Order #${selectedOrderId}`,
    })

    // Reset state
    setSelectedOrderId(null)
    setOrderStatusUpdate(null)
  }

  // Prepare data for charts
  const salesData = orders
    .map((order) => ({
      date: order.date,
      amount: order.total,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const categoryData = categories.map((category) => {
    const count = books.filter((book) => book.category === category.id).length
    return {
      name: dictionary.home.categories[category.nameKey],
      value: count,
    }
  })

  const orderStatusData = [
    {
      name: lang === "ar" ? "مكتمل" : lang === "es" ? "Completado" : "Completed",
      value: orders.filter((order) => order.status.en === "Completed").length,
    },
    {
      name: lang === "ar" ? "قيد المعالجة" : lang === "es" ? "En proceso" : "Processing",
      value: orders.filter((order) => order.status.en === "Processing").length,
    },
    {
      name: lang === "ar" ? "تم الشحن" : lang === "es" ? "Enviado" : "Shipped",
      value: orders.filter((order) => order.status.en === "Shipped").length,
    },
  ]

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#FF6B6B"]

  // Get recent orders
  const recentOrders = [...orders].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5)

  // Get low stock products
  const lowStockProducts = books.filter((book) => book.stock < 10 && book.stock > 0).slice(0, 5)

  // Get out of stock products
  const outOfStockProducts = books.filter((book) => book.stock === 0).slice(0, 5)

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

            <button
              onClick={() => setActiveTab("dashboard")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                activeTab === "dashboard"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted transition-colors"
              }`}
            >
              <LayoutDashboard className="h-5 w-5" />
              <span>{dictionary.navigation.dashboard}</span>
            </button>

            <button
              onClick={() => setActiveTab("products")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                activeTab === "products" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted transition-colors"
              }`}
            >
              <Package className="h-5 w-5" />
              <span>{dictionary.dashboard.products}</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                activeTab === "orders" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted transition-colors"
              }`}
            >
              <ShoppingCart className="h-5 w-5" />
              <span>{dictionary.dashboard.orders}</span>
            </button>

            <button
              onClick={() => setActiveTab("analytics")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                activeTab === "analytics"
                  ? "bg-primary/10 text-primary font-medium"
                  : "hover:bg-muted transition-colors"
              }`}
            >
              <TrendingUp className="h-5 w-5" />
              <span>{lang === "ar" ? "التحليلات" : lang === "es" ? "Análisis" : "Analytics"}</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-3 px-3 py-2 rounded-md w-full text-left ${
                activeTab === "settings" ? "bg-primary/10 text-primary font-medium" : "hover:bg-muted transition-colors"
              }`}
            >
              <Settings className="h-5 w-5" />
              <span>{dictionary.dashboard.settings}</span>
            </button>
          </div>

          <div className="border-t p-4">
            <Link href={`/${lang}`}>
              <Button variant="outline" className="w-full justify-start text-muted-foreground">
                <LogOut className="h-4 w-4 mr-2" />
                {lang === "ar" ? "العودة إلى الموقع" : lang === "es" ? "Volver al sitio" : "Back to Site"}
              </Button>
            </Link>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-bold flex items-center justify-center text-white">
                  3
                </span>
              </Button>

              <Link href={`/${lang}`}>
                <Button variant="outline" size="sm" className="rounded-full">
                  {lang === "ar" ? "العودة إلى الموقع" : lang === "es" ? "Volver al sitio" : "Back to Site"}
                </Button>
              </Link>
            </div>
          </div>
        </header>

        <main className="p-6">
          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">{dictionary.navigation.dashboard}</h1>
                  <p className="text-muted-foreground">
                    {lang === "ar"
                      ? "نظرة عامة على متجرك"
                      : lang === "es"
                        ? "Visión general de tu tienda"
                        : "Overview of your store"}
                  </p>
                </div>

                <div className="mt-4 md:mt-0">
                  <Button onClick={() => setIsAddProductDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    {dictionary.dashboard.addProduct}
                  </Button>
                </div>
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
                    <div className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</div>
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
                    <div className="text-2xl font-bold">{stats.totalOrders}</div>
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
                    <div className="text-2xl font-bold">{books.length}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 font-medium">+2</span>{" "}
                      {lang === "ar" ? "هذا الشهر" : lang === "es" ? "este mes" : "this month"}
                    </p>
                  </CardContent>
                </Card>
                <Card className="shadow-soft">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">
                      {lang === "ar"
                        ? "متوسط قيمة الطلب"
                        : lang === "es"
                          ? "Valor Promedio del Pedido"
                          : "Avg. Order Value"}
                    </CardTitle>
                    <DollarSign className="h-4 w-4 text-primary" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</div>
                    <p className="text-xs text-muted-foreground">
                      <span className="text-green-500 font-medium">+5%</span>{" "}
                      {lang === "ar" ? "من الشهر الماضي" : lang === "es" ? "desde el mes pasado" : "from last month"}
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Orders */}
              <div className="grid gap-4 grid-cols-1 lg:grid-cols-2">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>
                      {lang === "ar" ? "الطلبات الأخيرة" : lang === "es" ? "Pedidos Recientes" : "Recent Orders"}
                    </CardTitle>
                    <CardDescription>
                      {lang === "ar"
                        ? "أحدث 5 طلبات تم استلامها"
                        : lang === "es"
                          ? "Los 5 pedidos más recientes recibidos"
                          : "The 5 most recent orders received"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentOrders.map((order) => (
                        <div key={order.id} className="flex items-center justify-between border-b pb-4">
                          <div>
                            <p className="font-medium">{order.customer}</p>
                            <div className="flex items-center text-sm text-muted-foreground">
                              <Calendar className="mr-1 h-3 w-3" />
                              <span>{order.date}</span>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${order.total.toFixed(2)}</p>
                            <Badge
                              variant={
                                order.status.en === "Completed"
                                  ? "default"
                                  : order.status.en === "Shipped"
                                    ? "secondary"
                                    : "outline"
                              }
                            >
                              {getOrderStatus(order, lang)}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("orders")}>
                        {lang === "ar"
                          ? "عرض جميع الطلبات"
                          : lang === "es"
                            ? "Ver todos los pedidos"
                            : "View all orders"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Low Stock Alert */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>
                      {lang === "ar" ? "تنبيهات المخزون" : lang === "es" ? "Alertas de Inventario" : "Inventory Alerts"}
                    </CardTitle>
                    <CardDescription>
                      {lang === "ar"
                        ? "المنتجات التي تحتاج إلى إعادة التخزين"
                        : lang === "es"
                          ? "Productos que necesitan reabastecimiento"
                          : "Products that need restocking"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {lowStockProducts.length > 0 ? (
                        lowStockProducts.map((product) => (
                          <div key={product.id} className="flex items-center justify-between border-b pb-4">
                            <div className="flex items-center">
                              <div className="h-10 w-10 relative mr-3">
                                <Image
                                  src={product.image || "/placeholder.svg"}
                                  alt={getBookTitle(product, lang)}
                                  fill
                                  className="object-cover rounded"
                                />
                              </div>
                              <div>
                                <p className="font-medium line-clamp-1">{getBookTitle(product, lang)}</p>
                                <p className="text-sm text-muted-foreground">{getBookAuthor(product, lang)}</p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant="outline" className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                {lang === "ar" ? "المخزون منخفض" : lang === "es" ? "Stock bajo" : "Low Stock"}
                              </Badge>
                              <p className="text-sm font-medium mt-1">
                                {product.stock} {lang === "ar" ? "متبقي" : lang === "es" ? "restantes" : "left"}
                              </p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-6">
                          <CheckCircle2 className="mx-auto h-12 w-12 text-green-500 mb-3" />
                          <p className="font-medium">
                            {lang === "ar"
                              ? "لا توجد منتجات منخفضة المخزون"
                              : lang === "es"
                                ? "No hay productos con stock bajo"
                                : "No low stock products"}
                          </p>
                        </div>
                      )}

                      {outOfStockProducts.length > 0 && (
                        <div className="pt-4">
                          <h3 className="font-medium text-red-500 mb-3">
                            {lang === "ar"
                              ? "منتجات نفدت من المخزون"
                              : lang === "es"
                                ? "Productos agotados"
                                : "Out of Stock Products"}
                          </h3>
                          {outOfStockProducts.map((product) => (
                            <div key={product.id} className="flex items-center justify-between border-b pb-4 mb-4">
                              <div className="flex items-center">
                                <div className="h-10 w-10 relative mr-3">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={getBookTitle(product, lang)}
                                    fill
                                    className="object-cover rounded"
                                  />
                                </div>
                                <div>
                                  <p className="font-medium line-clamp-1">{getBookTitle(product, lang)}</p>
                                  <p className="text-sm text-muted-foreground">{getBookAuthor(product, lang)}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <Badge variant="outline" className="bg-red-100 text-red-800 hover:bg-red-100">
                                  {lang === "ar" ? "نفذ من المخزون" : lang === "es" ? "Agotado" : "Out of Stock"}
                                </Badge>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="mt-4 text-center">
                      <Button variant="outline" size="sm" onClick={() => setActiveTab("products")}>
                        {lang === "ar" ? "إدارة المخزون" : lang === "es" ? "Gestionar inventario" : "Manage inventory"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Products Tab */}
          {activeTab === "products" && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">{dictionary.dashboard.products}</h1>
                  <p className="text-muted-foreground">
                    {lang === "ar"
                      ? "إدارة منتجاتك وتحديث المخزون والأسعار."
                      : lang === "es"
                        ? "Gestiona tus productos y actualiza el inventario y los precios."
                        : "Manage your products and update inventory and prices."}
                  </p>
                </div>

                <div className="mt-4 md:mt-0">
                  <Button onClick={() => setIsAddProductDialogOpen(true)}>
                    <Plus className="mr-2 h-4 w-4" />
                    {dictionary.dashboard.addProduct}
                  </Button>
                </div>
              </div>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>{dictionary.dashboard.products}</CardTitle>
                  <CardDescription>
                    {filteredBooks.length} {lang === "ar" ? "منتج" : lang === "es" ? "productos" : "products"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
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
                        {filteredBooks.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                              <p className="text-lg font-medium">
                                {lang === "ar"
                                  ? "لا توجد منتجات"
                                  : lang === "es"
                                    ? "No se encontraron productos"
                                    : "No products found"}
                              </p>
                              <p className="text-muted-foreground">
                                {lang === "ar"
                                  ? "حاول تغيير معايير البحث أو إضافة منتجات جديدة."
                                  : lang === "es"
                                    ? "Intenta cambiar tus criterios de búsqueda o añadir nuevos productos."
                                    : "Try changing your search criteria or adding new products."}
                              </p>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredBooks.map((product) => (
                            <TableRow key={product.id}>
                              <TableCell>
                                <div className="h-12 w-12 relative rounded overflow-hidden">
                                  <Image
                                    src={product.image || "/placeholder.svg"}
                                    alt={getBookTitle(product, lang)}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </TableCell>
                              <TableCell className="font-medium">{getBookTitle(product, lang)}</TableCell>
                              <TableCell>{dictionary.home.categories[product.category]}</TableCell>
                              <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                              <TableCell className="text-right">
                                <span
                                  className={
                                    product.stock === 0
                                      ? "text-red-500"
                                      : product.stock < 10
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
                                    <DropdownMenuItem onClick={() => setEditingProduct(product)}>
                                      <Pencil className="h-4 w-4 mr-2" />
                                      {dictionary.dashboard.editProduct}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      className="text-red-500"
                                      onClick={() => {
                                        setProductToDelete(product.id)
                                        setIsDeleteDialogOpen(true)
                                      }}
                                    >
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      {dictionary.dashboard.deleteProduct}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === "orders" && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">{dictionary.dashboard.orders}</h1>
                  <p className="text-muted-foreground">
                    {lang === "ar"
                      ? "عرض وإدارة طلبات العملاء."
                      : lang === "es"
                        ? "Ver y gestionar los pedidos de los clientes."
                        : "View and manage customer orders."}
                  </p>
                </div>
              </div>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>{dictionary.dashboard.orders}</CardTitle>
                  <CardDescription>
                    {filteredOrders.length} {lang === "ar" ? "طلب" : lang === "es" ? "pedidos" : "orders"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
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
                          <TableHead className="w-[100px]"></TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {filteredOrders.length === 0 ? (
                          <TableRow>
                            <TableCell colSpan={6} className="text-center py-8">
                              <Search className="mx-auto h-12 w-12 text-muted-foreground mb-2" />
                              <p className="text-lg font-medium">
                                {lang === "ar"
                                  ? "لا توجد طلبات"
                                  : lang === "es"
                                    ? "No se encontraron pedidos"
                                    : "No orders found"}
                              </p>
                              <p className="text-muted-foreground">
                                {lang === "ar"
                                  ? "حاول تغيير معايير البحث."
                                  : lang === "es"
                                    ? "Intenta cambiar tus criterios de búsqueda."
                                    : "Try changing your search criteria."}
                              </p>
                            </TableCell>
                          </TableRow>
                        ) : (
                          filteredOrders.map((order) => (
                            <TableRow key={order.id}>
                              <TableCell className="font-medium">{order.id}</TableCell>
                              <TableCell>
                                <div>
                                  <p>{order.customer}</p>
                                  <p className="text-sm text-muted-foreground">{order.email}</p>
                                </div>
                              </TableCell>
                              <TableCell>{order.date}</TableCell>
                              <TableCell>
                                <Badge
                                  variant={
                                    order.status.en === "Completed"
                                      ? "default"
                                      : order.status.en === "Shipped"
                                        ? "secondary"
                                        : "outline"
                                  }
                                >
                                  {getOrderStatus(order, lang)}
                                </Badge>
                              </TableCell>
                              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
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
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedOrderId(order.id)
                                        setOrderStatusUpdate({
                                          ar: "مكتمل",
                                          en: "Completed",
                                          es: "Completado",
                                        })
                                      }}
                                    >
                                      <CheckCircle2 className="h-4 w-4 mr-2" />
                                      {lang === "ar"
                                        ? "تعيين كمكتمل"
                                        : lang === "es"
                                          ? "Marcar como completado"
                                          : "Mark as Completed"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedOrderId(order.id)
                                        setOrderStatusUpdate({
                                          ar: "تم الشحن",
                                          en: "Shipped",
                                          es: "Enviado",
                                        })
                                      }}
                                    >
                                      <Truck className="h-4 w-4 mr-2" />
                                      {lang === "ar"
                                        ? "تعيين كمشحون"
                                        : lang === "es"
                                          ? "Marcar como enviado"
                                          : "Mark as Shipped"}
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                      onClick={() => {
                                        setSelectedOrderId(order.id)
                                        setOrderStatusUpdate({
                                          ar: "قيد المعالجة",
                                          en: "Processing",
                                          es: "En proceso",
                                        })
                                      }}
                                    >
                                      <Clock className="h-4 w-4 mr-2" />
                                      {lang === "ar"
                                        ? "تعيين قيد المعالجة"
                                        : lang === "es"
                                          ? "Marcar como en proceso"
                                          : "Mark as Processing"}
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </TableCell>
                            </TableRow>
                          ))
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === "analytics" && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">
                    {lang === "ar" ? "التحليلات" : lang === "es" ? "Análisis" : "Analytics"}
                  </h1>
                  <p className="text-muted-foreground">
                    {lang === "ar"
                      ? "تحليل أداء متجرك"
                      : lang === "es"
                        ? "Analiza el rendimiento de tu tienda"
                        : "Analyze your store's performance"}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {/* Sales Chart */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>
                      {lang === "ar"
                        ? "المبيعات بمرور الوقت"
                        : lang === "es"
                          ? "Ventas a lo largo del tiempo"
                          : "Sales Over Time"}
                    </CardTitle>
                    <CardDescription>
                      {lang === "ar"
                        ? "إجمالي المبيعات حسب التاريخ"
                        : lang === "es"
                          ? "Ventas totales por fecha"
                          : "Total sales by date"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={salesData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="date" />
                          <YAxis />
                          <Tooltip formatter={(value) => `$${value}`} />
                          <Line type="monotone" dataKey="amount" stroke="#10b981" activeDot={{ r: 8 }} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Category Distribution */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>
                      {lang === "ar"
                        ? "توزيع الفئات"
                        : lang === "es"
                          ? "Distribución por categoría"
                          : "Category Distribution"}
                    </CardTitle>
                    <CardDescription>
                      {lang === "ar"
                        ? "عدد المنتجات حسب الفئة"
                        : lang === "es"
                          ? "Número de productos por categoría"
                          : "Number of products by category"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={categoryData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={100}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                          >
                            {categoryData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => value} />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Order Status */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>
                      {lang === "ar" ? "حالة الطلبات" : lang === "es" ? "Estado de los pedidos" : "Order Status"}
                    </CardTitle>
                    <CardDescription>
                      {lang === "ar"
                        ? "توزيع الطلبات حسب الحالة"
                        : lang === "es"
                          ? "Distribución de pedidos por estado"
                          : "Distribution of orders by status"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={orderStatusData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="value" fill="#10b981">
                            {orderStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Sales Summary */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>
                      {lang === "ar" ? "ملخص المبيعات" : lang === "es" ? "Resumen de ventas" : "Sales Summary"}
                    </CardTitle>
                    <CardDescription>
                      {lang === "ar"
                        ? "نظرة عامة على أداء المبيعات"
                        : lang === "es"
                          ? "Visión general del rendimiento de ventas"
                          : "Overview of sales performance"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {lang === "ar" ? "إجمالي المبيعات" : lang === "es" ? "Ventas totales" : "Total Sales"}
                          </p>
                          <p className="text-2xl font-bold">${stats.totalSales.toFixed(2)}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {lang === "ar" ? "عدد الطلبات" : lang === "es" ? "Número de pedidos" : "Number of Orders"}
                          </p>
                          <p className="text-2xl font-bold">{stats.totalOrders}</p>
                        </div>
                        <ShoppingCart className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {lang === "ar"
                              ? "متوسط قيمة الطلب"
                              : lang === "es"
                                ? "Valor promedio del pedido"
                                : "Average Order Value"}
                          </p>
                          <p className="text-2xl font-bold">${stats.averageOrderValue.toFixed(2)}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-primary" />
                      </div>
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {lang === "ar"
                              ? "معدل إكمال الطلب"
                              : lang === "es"
                                ? "Tasa de finalización de pedidos"
                                : "Order Completion Rate"}
                          </p>
                          <p className="text-2xl font-bold">
                            {stats.totalOrders > 0
                              ? `${((stats.completedOrders / stats.totalOrders) * 100).toFixed(0)}%`
                              : "0%"}
                          </p>
                        </div>
                        <CheckCircle2 className="h-8 w-8 text-primary" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold">{dictionary.dashboard.settings}</h1>
                  <p className="text-muted-foreground">
                    {lang === "ar"
                      ? "إدارة إعدادات المتجر"
                      : lang === "es"
                        ? "Gestionar la configuración de la tienda"
                        : "Manage store settings"}
                  </p>
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>
                      {lang === "ar"
                        ? "معلومات المتجر"
                        : lang === "es"
                          ? "Información de la tienda"
                          : "Store Information"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="store-name">
                          {lang === "ar" ? "اسم المتجر" : lang === "es" ? "Nombre de la tienda" : "Store Name"}
                        </Label>
                        <Input id="store-name" defaultValue="Islamic Books Store" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-email">
                          {lang === "ar" ? "البريد الإلكتروني" : lang === "es" ? "Correo electrónico" : "Email"}
                        </Label>
                        <Input id="store-email" defaultValue="info@islamicbooks.com" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-phone">
                          {lang === "ar" ? "رقم الهاتف" : lang === "es" ? "Teléfono" : "Phone"}
                        </Label>
                        <Input id="store-phone" defaultValue="+123 456 7890" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="store-address">
                          {lang === "ar" ? "العنوان" : lang === "es" ? "Dirección" : "Address"}
                        </Label>
                        <Textarea id="store-address" defaultValue="123 Al-Azhar Street, Cairo, Egypt" />
                      </div>
                      <Button>
                        {lang === "ar" ? "حفظ التغييرات" : lang === "es" ? "Guardar cambios" : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>
                      {lang === "ar" ? "إعدادات الشحن" : lang === "es" ? "Configuración de envío" : "Shipping Settings"}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="shipping-fee">
                          {lang === "ar" ? "رسوم الشحن" : lang === "es" ? "Tarifa de envío" : "Shipping Fee"}
                        </Label>
                        <Input id="shipping-fee" type="number" defaultValue="5.99" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tax-rate">
                          {lang === "ar" ? "معدل الضريبة (%)" : lang === "es" ? "Tasa de impuesto (%)" : "Tax Rate (%)"}
                        </Label>
                        <Input id="tax-rate" type="number" defaultValue="5" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="free-shipping-threshold">
                          {lang === "ar"
                            ? "حد الشحن المجاني"
                            : lang === "es"
                              ? "Umbral de envío gratuito"
                              : "Free Shipping Threshold"}
                        </Label>
                        <Input id="free-shipping-threshold" type="number" defaultValue="100" />
                      </div>
                      <Button>
                        {lang === "ar" ? "حفظ التغييرات" : lang === "es" ? "Guardar cambios" : "Save Changes"}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Product Dialog */}
      <Dialog open={isAddProductDialogOpen} onOpenChange={setIsAddProductDialogOpen}>
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
              <Label htmlFor="title-en" className="text-right">
                {lang === "ar" ? "العنوان (الإنجليزية)" : lang === "es" ? "Título (Inglés)" : "Title (English)"}
              </Label>
              <Input
                id="title-en"
                value={newProduct.title?.en || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    title: { ...newProduct.title, en: e.target.value },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title-ar" className="text-right">
                {lang === "ar" ? "العنوان (العربية)" : lang === "es" ? "Título (Árabe)" : "Title (Arabic)"}
              </Label>
              <Input
                id="title-ar"
                value={newProduct.title?.ar || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    title: { ...newProduct.title, ar: e.target.value },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="title-es" className="text-right">
                {lang === "ar" ? "العنوان (الإسبانية)" : lang === "es" ? "Título (Español)" : "Title (Spanish)"}
              </Label>
              <Input
                id="title-es"
                value={newProduct.title?.es || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    title: { ...newProduct.title, es: e.target.value },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author-en" className="text-right">
                {lang === "ar" ? "المؤلف (الإنجليزية)" : lang === "es" ? "Autor (Inglés)" : "Author (English)"}
              </Label>
              <Input
                id="author-en"
                value={newProduct.author?.en || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    author: { ...newProduct.author, en: e.target.value },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author-ar" className="text-right">
                {lang === "ar" ? "المؤلف (العربية)" : lang === "es" ? "Autor (Árabe)" : "Author (Arabic)"}
              </Label>
              <Input
                id="author-ar"
                value={newProduct.author?.ar || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    author: { ...newProduct.author, ar: e.target.value },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="author-es" className="text-right">
                {lang === "ar" ? "المؤلف (الإسبانية)" : lang === "es" ? "Autor (Español)" : "Author (Spanish)"}
              </Label>
              <Input
                id="author-es"
                value={newProduct.author?.es || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    author: { ...newProduct.author, es: e.target.value },
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="price" className="text-right">
                {lang === "ar" ? "السعر" : lang === "es" ? "Precio" : "Price"}
              </Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={newProduct.price || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: Number.parseFloat(e.target.value),
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="category" className="text-right">
                {lang === "ar" ? "الفئة" : lang === "es" ? "Categoría" : "Category"}
              </Label>
              <Select
                value={newProduct.category}
                onValueChange={(value) =>
                  setNewProduct({
                    ...newProduct,
                    category: value,
                  })
                }
              >
                <SelectTrigger id="category" className="col-span-3">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {dictionary.home.categories[category.nameKey]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="stock" className="text-right">
                {lang === "ar" ? "المخزون" : lang === "es" ? "Inventario" : "Stock"}
              </Label>
              <Input
                id="stock"
                type="number"
                value={newProduct.stock || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    stock: Number.parseInt(e.target.value),
                  })
                }
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-start gap-4">
              <Label htmlFor="description-en" className="text-right">
                {lang === "ar"
                  ? "الوصف (الإنجليزية)"
                  : lang === "es"
                    ? "Descripción (Inglés)"
                    : "Description (English)"}
              </Label>
              <Textarea
                id="description-en"
                value={newProduct.description?.en || ""}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    description: { ...newProduct.description, en: e.target.value },
                  })
                }
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setIsAddProductDialogOpen(false)}>
              {lang === "ar" ? "إلغاء" : lang === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button type="button" onClick={handleAddProduct}>
              {lang === "ar" ? "حفظ" : lang === "es" ? "Guardar" : "Save"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      {editingProduct && (
        <Dialog open={!!editingProduct} onOpenChange={(open) => !open && setEditingProduct(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>{dictionary.dashboard.editProduct}</DialogTitle>
              <DialogDescription>
                {lang === "ar"
                  ? "تعديل المنتج. اضغط على حفظ عند الانتهاء."
                  : lang === "es"
                    ? "Edita el producto. Haz clic en guardar cuando hayas terminado."
                    : "Edit the product. Click save when you're done."}
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title-en" className="text-right">
                  {lang === "ar" ? "العنوان (الإنجليزية)" : lang === "es" ? "Título (Inglés)" : "Title (English)"}
                </Label>
                <Input
                  id="edit-title-en"
                  value={editingProduct.title.en}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      title: { ...editingProduct.title, en: e.target.value },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-title-ar" className="text-right">
                  {lang === "ar" ? "العنوان (العربية)" : lang === "es" ? "Título (Árabe)" : "Title (Arabic)"}
                </Label>
                <Input
                  id="edit-title-ar"
                  value={editingProduct.title.ar}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      title: { ...editingProduct.title, ar: e.target.value },
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-price" className="text-right">
                  {lang === "ar" ? "السعر" : lang === "es" ? "Precio" : "Price"}
                </Label>
                <Input
                  id="edit-price"
                  type="number"
                  step="0.01"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      price: Number.parseFloat(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-category" className="text-right">
                  {lang === "ar" ? "الفئة" : lang === "es" ? "Categoría" : "Category"}
                </Label>
                <Select
                  value={editingProduct.category}
                  onValueChange={(value) =>
                    setEditingProduct({
                      ...editingProduct,
                      category: value,
                    })
                  }
                >
                  <SelectTrigger id="edit-category" className="col-span-3">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {dictionary.home.categories[category.nameKey]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-stock" className="text-right">
                  {lang === "ar" ? "المخزون" : lang === "es" ? "Inventario" : "Stock"}
                </Label>
                <Input
                  id="edit-stock"
                  type="number"
                  value={editingProduct.stock}
                  onChange={(e) =>
                    setEditingProduct({
                      ...editingProduct,
                      stock: Number.parseInt(e.target.value),
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setEditingProduct(null)}>
                {lang === "ar" ? "إلغاء" : lang === "es" ? "Cancelar" : "Cancel"}
              </Button>
              <Button type="button" onClick={handleUpdateProduct}>
                {lang === "ar" ? "حفظ" : lang === "es" ? "Guardar" : "Save"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Product Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {lang === "ar" ? "تأكيد الحذف" : lang === "es" ? "Confirmar eliminación" : "Confirm Deletion"}
            </DialogTitle>
            <DialogDescription>
              {lang === "ar"
                ? "هل أنت متأكد أنك تريد حذف هذا المنتج؟ لا يمكن التراجع عن هذا الإجراء."
                : lang === "es"
                  ? "¿Estás seguro de que quieres eliminar este producto? Esta acción no se puede deshacer."
                  : "Are you sure you want to delete this product? This action cannot be undone."}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              {lang === "ar" ? "إلغاء" : lang === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button variant="destructive" onClick={handleDeleteProduct}>
              {lang === "ar" ? "حذف" : lang === "es" ? "Eliminar" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Update Order Status Dialog */}
      <Dialog open={!!selectedOrderId} onOpenChange={(open) => !open && setSelectedOrderId(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              {lang === "ar"
                ? "تحديث حالة الطلب"
                : lang === "es"
                  ? "Actualizar estado del pedido"
                  : "Update Order Status"}
            </DialogTitle>
            <DialogDescription>
              {lang === "ar"
                ? `هل أنت متأكد أنك تريد تحديث حالة الطلب ${selectedOrderId}؟`
                : lang === "es"
                  ? `¿Estás seguro de que quieres actualizar el estado del pedido ${selectedOrderId}?`
                  : `Are you sure you want to update the status of order ${selectedOrderId}?`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedOrderId(null)}>
              {lang === "ar" ? "إلغاء" : lang === "es" ? "Cancelar" : "Cancel"}
            </Button>
            <Button onClick={handleUpdateOrderStatus}>
              {lang === "ar" ? "تحديث" : lang === "es" ? "Actualizar" : "Update"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}

