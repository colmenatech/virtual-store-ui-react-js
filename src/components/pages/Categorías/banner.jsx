// Importamos los hooks necesarios de React y los iconos de Lucide
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, ShoppingCart, Heart, Star, ArrowRight } from "lucide-react"
// Importamos las imagenes necesarias para el banner
import ImgSlide1 from '../../assets/img/banner1.jpg'
import ImgSlide2 from '../../assets/img/banner2.jpg'
import ImgSlide3 from '../../assets/img/banner3.jpg'

export default function Component() {
  // Estado para controlar qué slide se muestra actualmente
  const [currentSlide, setCurrentSlide] = useState(0)

  // Datos de los slides del carrusel
  const slides = [
    {
      title: "Comfort Haven",
      subtitle: '"Hogar que Inspira"',
      description: '"Descubre muebles únicos que transforma tu espacio en un hogar lleno de confort y estilo. Encuentra tu inspiración hoy en en Comfort Haven!"',
      image: ImgSlide1,
    },
    {
      title: "Comfort Haven",
      subtitle: '"Renueva tu Estilo"',
      description: '"Desde sofás elegantes hasta mesas modernas, tenemos todo lo que necesitas para un cambio de ambiente. Dale vida a tu hogar con nuestras colecciones exclusivas"',
      image: ImgSlide2,
    },
    {
      title: "Comfort Haven",
      subtitle: '"Diseño y Comodidad"',
      description: '"Haz de cada rincón un lugar especial con muebles que combinan diseño, calidad y comodida. Visítanos y crear el hogar de tus sueños"',
      image: ImgSlide3,
    },
  ]

  // Datos de los productos destacados
  const products = [
    { id: 1, name: "Elegant Watch", price: 199.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 2, name: "Leather Bag", price: 89.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 3, name: "Sunglasses", price: 59.99, image: "/placeholder.svg?height=200&width=200" },
    { id: 4, name: "Wireless Earbuds", price: 129.99, image: "/placeholder.svg?height=200&width=200" },
  ]

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

   // Función para retroceder al slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

   // Efecto para cambiar automáticamente los slides cada 5 segundos
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sección del Carrusel */}
      <div className="relative h-[600px] w-full overflow-hidden bg-background pt-20">
        {/* Contenedor de slides con animación de transición */}
        <div
          className="flex h-full transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {slides.map((slide, index) => (
            <div
              key={index}
              className="min-w-full px-4 md:px-8"
            >
              <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
                <div className="space-y-4">
                  {/* Título del carrusel con colores diferentes */}
                  <h2 className="text-4xl font-light tracking-tight">
                    <span className="text-acento">Comfort</span>{' '}
                    <span className="text-primario">Haven</span>
                  </h2>
                  <h3 className="text-2xl font-light text-gray-600">{slide.subtitle}</h3>
                  <p className="text-muted-foreground">{slide.description}</p>
                </div>
                <div className="relative h-[400px]">
                  <img
                    src={slide.image}
                    alt="Slide image"
                    className="h-full w-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Botón para slide anterior */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-primario shadow-lg transition-all hover:bg-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>

        {/* Botón para siguiente slide */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-primario shadow-lg transition-all hover:bg-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Indicadores de posición del slide */}
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentSlide === index ? "bg-primary w-6" : "bg-primario"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Sección de Productos Destacados */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Featured Products</h2>
            <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              Ver más <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          {/* Grid de productos */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                    <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contender de Productos*/}
      <section className="py-16 px-4 md:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">New Arrivals</h2>
            {/* Enlace para ver más productos */}
            <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              Ver más <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mapeo de los productos para la sección de nuevas llegadas */}
            {[
              { id: 5, name: "Smart Speaker", price: 79.99, image: "/placeholder.svg?height=200&width=200" },
              { id: 6, name: "Fitness Tracker", price: 49.99, image: "/placeholder.svg?height=200&width=200" },
              { id: 7, name: "Wireless Charger", price: 29.99, image: "/placeholder.svg?height=200&width=200" },
              { id: 8, name: "Bluetooth Headphones", price: 159.99, image: "/placeholder.svg?height=200&width=200" },
            ].map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Cada producto se presenta en una tarjeta */}
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                    {/* Botón para agregar el producto al carrito */}
                    <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contender de Productos*/}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Best Sellers</h2>
            {/* Enlace para ver más productos */}
            <a href="#" className="text-blue-600 hover:text-blue-700 flex items-center gap-2">
              Ver más <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Mapeo de los productos para la sección de nuevas llegadas */}
            {[
              { id: 9, name: "Coffee Maker", price: 89.99, image: "/placeholder.svg?height=200&width=200" },
              { id: 10, name: "Smart Watch", price: 199.99, image: "/placeholder.svg?height=200&width=200" },
              { id: 11, name: "Portable Speaker", price: 69.99, image: "/placeholder.svg?height=200&width=200" },
              { id: 12, name: "Tablet Stand", price: 24.99, image: "/placeholder.svg?height=200&width=200" },
            ].map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                {/* Cada producto se presenta en una tarjeta */}
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">${product.price.toFixed(2)}</span>
                    {/* Botón para agregar el producto al carrito */}
                    <button className="p-2 rounded-full bg-blue-500 text-white hover:bg-blue-600 transition-colors">
                      <ShoppingCart className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}