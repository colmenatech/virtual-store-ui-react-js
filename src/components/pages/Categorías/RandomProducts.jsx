import React, { useState, useEffect, useMemo } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import ImgSlide1 from '../../assets/img/banner1.jpg';
import ImgSlide2 from '../../assets/img/banner2.jpg';
import ImgSlide3 from '../../assets/img/banner3.jpg';
import { useCart } from '../shopping_cart/CartContext';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';


const RandomProductsWithBanner = () => {
  // Estado para controlar la visibilidad del banner, productos aleatorios y footer
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation(); // Obtener la ubicación actual

  const { dispatch } = useCart();
  
  // Estado para controlar qué slide se muestra
  const [currentSlide, setCurrentSlide] = useState(0)
  const [currentCategory, setCurrentCategory] = useState(0)


  // Datos de los slides del carrusel
  const slides = [
    {
      title: "Bienvenido a Comfort Haven",
      subtitle: "Tu Hogar, Tu Refugio",
      description: "Descubre piezas únicas que transforman cualquier espacio en un oasis de confort y estilo. Encuentra la inspiración que necesitas para crear tu hogar perfecto.",
      image: ImgSlide1,
    },
    {
      title: "Renueva tu Hogar con Estilo",
      subtitle: "Ambientes que Enamoran",
      description: "Desde sofás elegantes hasta mesas contemporáneas, encuentra todo lo necesario para reinventar tu espacio. Dale un toque de vida y sofisticación con nuestras exclusivas colecciones.",
      image: ImgSlide2,
    },
    {
      title: "Diseño y Confort en Armonía",
      subtitle: "Muebles que Marcan la Diferencia",
      description:  "Convierte cada rincón en un lugar especial con muebles que combinan diseño, calidad y comodidad. Visítanos y da vida al hogar de tus sueños.",
      image: ImgSlide3,
    },

  ];

  
  const categories = [
    { name: 'Relojes', to: '/productos/accesorios/relojes', img: require('../../assets/img/reloj.png')},
    { name: 'Sofás', to: '/productos/salas/sofas', img: require('../../assets/img/sofa.png')},
    { name: 'Toldos', to: '/productos/muebles-de-patio/toldos', img: require('../../assets/img/toldo.png') },
    { name: 'Escritorios', to: '/productos/muebles-de-oficina/escritorios', img: require('../../assets/img/escritorio.png') },
    { name: 'Camas', to: '/productos/dormitorios/camas', img: require('../../assets/img/cama.png') },
    { name: 'Mesas', to: '/productos/comedores/mesas', img: require('../../assets/img/mesa.png')},
    { name: 'Sillas', to: '/productos/comedores/sillas', img: require('../../assets/img/silla.png')},
    { name: 'Lámparas', to: '/productos/accesorios/lamparas', img: require('../../assets/img/lampara.png')},
  ]
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  const nextCategory = () => {
    setCurrentCategory((prev) => (prev === categories.length - 1 ? 0 : prev + 1))
  }

  const prevCategory = () => {
    setCurrentCategory((prev) => (prev === 0 ? categories.length - 1 : prev - 1))
  }



  // Datos iniciales de los productos aleatorios
  const initialRandomProducts = useMemo(() => [
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
  ], []);

  const [randomProducts, setRandomProducts] = useState(initialRandomProducts.slice(0, 4)); 


 // Función para actualizar los productos aleatorios cada 5 segundos
useEffect(() => {
  const updateProducts = () => {
    const shuffledProducts = [...initialRandomProducts].sort(() => Math.random() - 0.5);
    setRandomProducts(shuffledProducts.slice(0, 4)); // Aseguramos que solo se muestren 4 productos
  };

  const productTimer = setInterval(updateProducts, 5000);
  return () => clearInterval(productTimer);
}, [initialRandomProducts]); // Ahora 'initialRandomProducts' es una dependencia




useEffect(() => {
  // Al cambiar la ruta, restauramos la visibilidad a true
  if (location.pathname !== "/nosotros" && !categories.some(category => location.pathname === category.to)) {
    setIsVisible(true);
  } 
}, [location.pathname]); // Dependemos de la ruta para restaurar la visibilidad

  // Función para ocultar la interfaz cuando se hace clic en el enlace
  const handleLinkClick = () => {
    setIsVisible(false); // Ocultar la interfaz (productos y banner)
  };

  return (
    <>
      {isVisible && (
      <section className="flex flex-col min-h-screen bg-gray-100">
      <div className="relative h-[600px] w-full overflow-hidden bg-background pt-20">
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
                  <h2 className="text-4xl font-light tracking-tight text-primario">{slide.title}</h2>
                  <h3 className="text-2xl font-light text-red-600">{slide.subtitle}</h3>
                  <p className="text-muted-foreground">{slide.description}</p>
                </div>
                <div className="relative h-[400px]">
                  <img
                    src={slide.image}
                    alt={slide.description} // Aquí podrías usar una descripción más significativa
                    className="h-full w-full object-cover"
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
                currentSlide === index ? "bg-primary w-6" : "bg-primario"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
        </div>
      </section>
 )}
  {isVisible && (
 <section>
      {/* Category Carousel */}
      <div className="w-full py-12">
        <div className="container px-4 md:px-6">
          <div className="mb-10 flex items-center justify-center gap-4">
            <div className="h-px flex-1 bg-acento" />
            <h2 className="text-2xl font-semibold text-primario">Échale vistazo a nuestras categorías</h2>
            <div className="h-px flex-1 bg-acento" />
          </div>

          <div className="relative">
            <div className="relative overflow-hidden">
              <div
                className="flex transition-transform duration-300 ease-out"
                style={{ transform: `translateX(-${currentCategory * 20}%)` }}
              >
                {categories.map((category, index) => (
                  <div key={index} className="min-w-[20%] px-4">
                    <Link
                        to={category.to}
                        className="group flex flex-col items-center gap-4 no-underline transition-all duration-300 hover:transform hover:scale-105"
                        aria-label={`Ver productos en la categoría ${category.name}`}
                        onClick={handleLinkClick}
                        >
                        <div className="relative aspect-square w-full max-w-[120px] overflow-hidden rounded-full bg-gray-100 p-4 transition-all duration-300 group-hover:shadow-lg">
                        <img
                        src={category.img}
                        alt=""
                        className="h-full w-full object-contain transition-all duration-300 group-hover:scale-110"
                         />
                        </div>
                      <h3 className="text-center text-sm font-medium mt-2 transition-colors duration-300 group-hover:text-primary">{category.name}</h3>
                    </Link>

                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={prevCategory}
              className="absolute -left-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-3 text-primario shadow-lg transition-all hover:bg-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Categoría anterior"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <button
              onClick={nextCategory}
              className="absolute -right-4 top-1/2 -translate-y-1/2 transform rounded-full bg-white p-3 text-primario shadow-lg transition-all hover:bg-gray-50 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary"
              aria-label="Siguiente categoría"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
    )}
      {isVisible && (
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
    )}
      {isVisible && (
      <section>
      <footer className="footer" style={{ fontSize: '16px', padding: '50px', backgroundColor: '#F3F4F6' }}>
        <div className="footer-content" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '50px' }}>
          {/* Información de contacto */}
          <div className="contact-info" style={{ textAlign: 'left' }}>
            <h2 className='font-bold text-xm'>Información de Contacto</h2>
            <p>Teléfono: +506 1234-5678</p>
            <p>Correo Electrónico: comforthaven@gmail.com</p>
            <p>Horario de Atención: Lunes a Viernes: 9am a 6pm</p>
            
          </div>
          
          {/* Enlace "Sobre Nosotros" */}
          <div style={{ textAlign: 'right' }}>
          <Link to="/nosotros" className="footer-link" style={{ marginBottom: '10px', display: 'block' }} onClick={handleLinkClick}>Sobre Nosotros</Link>
          </div>
        </div>
  
        {/* Línea horizontal y derechos de autor */}
        <hr style={{ margin: '20px 0', borderTop: '1px solid #ccc' }} />
        <div style={{ textAlign: 'center', fontSize: '14px', color: '#555' }}>
          <p>Todos los derechos reservados © Comfort Haven 2024</p>
        </div>
      </footer>

      </section>
    )}
    </>
  );
};

export default RandomProductsWithBanner;
