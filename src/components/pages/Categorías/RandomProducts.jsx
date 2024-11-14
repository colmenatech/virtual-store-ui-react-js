import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart, ArrowRight } from 'lucide-react';
import ImgSlide1 from '../../assets/img/banner1.jpg';
import ImgSlide2 from '../../assets/img/banner2.jpg';
import ImgSlide3 from '../../assets/img/banner3.jpg';
import { useCart } from '../shopping_cart/CartContext';

const RandomProductsWithBanner = () => {
  const { dispatch } = useCart();
  
  // Estado para controlar qué slide se muestra
  const [currentSlide, setCurrentSlide] = useState(0);

  // Datos de los slides del carrusel
  const slides = [
    {
      title: "Comfort Haven",
      subtitle: '"Hogar que Inspira"',
      description: '"Descubre muebles únicos que transforman tu espacio en un hogar lleno de confort y estilo. Encuentra tu inspiración hoy en Comfort Haven!"',
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
      description: '"Haz de cada rincón un lugar especial con muebles que combinan diseño, calidad y comodidad. Visítanos y crea el hogar de tus sueños"',
      image: ImgSlide3,
    },
  ];

  // Datos iniciales de los productos aleatorios
  const initialRandomProducts = [
    { id: 1, nombre: 'Espejo baño cuadrado', precio: 500, img: '/placeholder.svg?height=200&width=200' },
    { id: 2, nombre: 'Espejo champague italiano', precio: 300, img: '/placeholder.svg?height=200&width=200' },
    { id: 3, nombre: 'Espejo cuadrado negro', precio: 150, img: '/placeholder.svg?height=200&width=200' },
    { id: 4, nombre: 'Espejo para escritorio', precio: 400, img: '/placeholder.svg?height=200&width=200' },
    { id: 5, nombre: 'Espejo de pie', precio: 250, },
    { id: 6, nombre: 'Espejo irregular negro', precio: 700, },
    { id: 7, nombre: 'Espejo irregular rosado', precio: 120, },
    { id: 8, nombre: 'Espejo con marco de madera', precio: 400, },
    { id: 9, nombre: 'Espejo moderno para recibidor', precio: 350, },
    { id: 10, nombre: 'Espejo redondo dorado', precio: 90, },
    { id: 11, nombre: 'Espejo redondo con luz led', precio: 50, },
    { id: 12, nombre: 'Espejo redondo sencillo', precio: 200, },
    { id: 13, nombre: 'Lámpara Biconica', precio: 500, },
    { id: 14, nombre: 'Lámpara Blanca', precio: 300, },
  ];

  const [randomProducts, setRandomProducts] = useState(initialRandomProducts.slice(0, 4)); 

  // Función para avanzar al siguiente slide
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  // Función para retroceder al slide anterior
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Efecto para cambiar automáticamente los slides cada 5 segundos
  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  // Función para actualizar los productos aleatorios cada 5 segundos
  useEffect(() => {
    const updateProducts = () => {
      const shuffledProducts = [...initialRandomProducts].sort(() => Math.random() - 0.5);
      setRandomProducts(shuffledProducts.slice(0, 4)); // Aseguramos que solo se muestren 4 productos
  };

    const productTimer = setInterval(updateProducts, 5000);
    return () => clearInterval(productTimer);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Sección del Carrusel */}
      <div className="relative h-[600px] w-full overflow-hidden bg-background pt-20">
        <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
          {slides.map((slide, index) => (
            <div key={index} className="min-w-full px-4 md:px-8">
              <div className="mx-auto grid h-full max-w-6xl grid-cols-1 items-center gap-8 md:grid-cols-2">
                <div className="space-y-4">
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
                    alt="Slide img"
                    className="h-full w-full object-cover rounded-lg shadow-lg"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-primario shadow-lg transition-all hover:bg-white"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white/80 p-2 text-primario shadow-lg transition-all hover:bg-white"
          aria-label="Next slide"
        >
          <ChevronRight className="h-6 w-6" />
        </button>
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 transform space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 w-2 rounded-full transition-all ${
                currentSlide === index ? 'bg-primary w-6' : 'bg-primario'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Sección de Productos Aleatorios */}
      <section className="py-16 px-4 md:px-8 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-semibold text-gray-800">Productos Recomendados</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {randomProducts.map((producto) => (
              <div key={producto.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <img src={producto.img} alt={producto.nombre} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{producto.nombre}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">${producto.precio.toFixed(2)}</span>
                    <button
                      onClick={() => dispatch({ type: 'ADD_TO_CART', payload: { ...producto, quantity: 1 } })}
                      className="p-2 rounded-full bg-primario text-white hover:bg-acento transition-colors"
                    >
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
  );
};

export default RandomProductsWithBanner;
