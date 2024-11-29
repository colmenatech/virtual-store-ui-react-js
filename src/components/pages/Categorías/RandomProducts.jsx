import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-react';
import ImgSlide1 from '../../assets/img/banner1.jpg';
import ImgSlide2 from '../../assets/img/banner2.jpg';
import ImgSlide3 from '../../assets/img/banner3.jpg';
import { useCart } from '../shopping_cart/CartContext';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Cookies from "js-cookie";  // For handling cookies


const RandomProductsWithBanner = () => {
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const { dispatch } = useCart();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentCategory, setCurrentCategory] = useState(0);
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);


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
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextCategory = () => {
    setCurrentCategory((prev) => (prev === categories.length - 1 ? 0 : prev + 1));
  };

  const prevCategory = () => {
    setCurrentCategory((prev) => (prev === 0 ? categories.length - 1 : prev - 1));
  };
  const shuffleArray = (array) => {
    // Algoritmo de Fisher-Yates para mezclar el array
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));  // Obtiene un índice aleatorio
      [array[i], array[j]] = [array[j], array[i]];  // Intercambia los elementos
    }
    return array;
  };

  const fetchRandomProducts = async () => {
    const token = Cookies.get('token');  // Obtener el token de las cookies

    if (!token) {
      console.error('No estás autenticado');
      return;
    }

    try {
      const response = await axios.get('http://localhost:8000/api/user-profile/products', {
        headers: {
          Authorization: `Bearer ${token}`,  // Incluir el token en los headers
        },
      });

      const shuffledProducts = shuffleArray(response.data.products);
      setRandomProducts(shuffledProducts.slice(0, 4));  // Tomar los primeros 4 productos de la lista mezclada
      setLoading(false);  // Desactivar el loading
    } catch (error) {
      console.error('Hubo un error al obtener los productos:', error);
    }
  };
  
  useEffect(() => {
    fetchRandomProducts();  // Cargar productos al montar el componente
    

    const productTimer = setInterval(() => {
      fetchRandomProducts();  // Refrescar productos cada 5 segundos
    }, 10000);

    return () => clearInterval(productTimer); // Limpiar el intervalo al desmontar el componente
  }, []);  // Se ejecuta solo una vez cuando el componente se monta.

  useEffect(() => {
    if (
      location.pathname !== '/nosotros' &&
      !slides.some((slide) => location.pathname.includes(slide.title))
    ) {
      setIsVisible(true);
    }
  }, [location.pathname]);

  const handleLinkClick = () => {
    setIsVisible(false);
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
            <h2 className="text-2xl font-semibold text-primario">Échale vistazo a nuestras subcategorías</h2>
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
                <img src={producto.image_url} alt={producto.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800">{producto.name}</h3>
                  <div className="mt-4 flex items-center justify-between">
                    <span className="text-xl font-bold text-gray-800">${producto.price}</span>
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
