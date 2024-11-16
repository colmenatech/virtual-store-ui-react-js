import { useState } from 'react'; // Importa el hook useState para manejar el estado en el componente
import { Link } from 'react-router-dom'; // Importa el componente Link para manejar las rutas de la aplicación
import { ChevronDown, Search, User } from 'lucide-react'; // Importa iconos de la librería lucide-react
import CartMenu from './CartMenu'; // Importa el componente CartMenu (menú de carrito)

export default function Navbar() { // Define el componente Navbar como una función
  const [isProductsOpen, setIsProductsOpen] = useState(false); // Establece el estado para controlar si el menú de productos está abierto

  // Define las categorías de productos con sus respectivas subcategorías y rutas
  const categories = [
    {
      name: 'Accesorios', // Nombre de la categoría
      to: '/accesorios', // Ruta principal de la categoría
      subcategories: [ // Lista de subcategorías dentro de esta categoría
        { name: 'Relojes', to: '/accesorios/relojes' }, // Subcategoría: Relojes
        { name: 'Lámparas', to: '/accesorios/lamparas' }, // Subcategoría: Lámparas
        { name: 'Espejos', to: '/espejos' } // Subcategoría: Espejos
      ]
    },
    {
      name: 'Sala',
      to: '/sala',
      subcategories: [
        { name: 'Sofás', to: '/sala/sofas' }, // Subcategoría: Sofás
        { name: 'Muebles TV', to: '/sala/muebles-tv' }, // Subcategoría: Muebles para TV
        { name: 'Mesas de centro', to: '/sala/mesas-de-centro' } // Subcategoría: Mesas de centro
      ]
    },
    {
      name: 'Muebles de patio',
      to: '/muebles-de-patio',
      subcategories: [
        { name: 'Mesas de exterior', to: '/muebles-de-patio/mesas-de-exterior' }, // Subcategoría: Mesas de exterior
        { name: 'Sillas de exterior', to: '/muebles-de-patio/sillas-de-exterior' }, // Subcategoría: Sillas de exterior
        { name: 'Toldos', to: '/muebles-de-patio/toldos' } // Subcategoría: Toldos
      ]
  },
  {
      name: 'Muebles de oficina',
      to: '/muebles-de-oficina',
      subcategories: [
        { name: 'Escritorios', to: '/muebles-de-oficina/escritorios' }, // Subcategoría: Escritorios
        { name: 'Libreros', to: '/muebles-de-oficina/libreros' }, // Subcategoría: Libreros
        { name: 'Sillas de estudio', to: '/muebles-de-oficina/sillas-de-estudio' } // Subcategoría: Sillas de estudio
      ]
    },
    {
      name: 'Comedores',
      to: '/comedores',
      subcategories: [
        { name: 'Juego de comedor', to: '/comedores/juego-de-comedor' },// Subcategoría: Juego de comedor
        { name: 'Mesas', to: '/comedores/mesas' }, // Subcategoría: Mesas
        { name: 'Sillas', to: '/comedores/sillas' } // Subcategoría: Sillas
      ]
    },
    {
      name: 'Dormitorios',
      to: '/dormitorios',
      subcategories: [
        { name: 'Camas', to: '/dormitorios/camas' }, // Subcategoría: Camas
        { name: 'Cómodas con espejo', to: '/dormitorios/comodas-con-espejo' }, // Subcategoría: Cómodas con espejo
        { name: 'Mesas de noche', to: '/dormitorios/mesas-de-noche' } // Subcategoría: Mesas de noche
      ]
    }
  ];

  return ( // Devuelve el JSX del componente
    <header className="bg-white shadow-md flex flex-col"> // Contenedor principal del encabezado con fondo blanco y sombra
      <div className="container mx-auto px-4 py-3 flex items-center justify-between"> // Contenedor para el logo y la barra de búsqueda
        <Link to="/" className="flex items-center"> // Enlace al inicio con el logo de la tienda
          <svg className="w-8 h-8 text-red-600 mr-2" viewBox="0 0 24 24" fill="currentColor"> // Icono SVG del logo
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" /> // Contenido del logo SVG
            <path d="M9 22V12h6v10" /> // Contenido del logo SVG
          </svg>
          <span className="text-xl font-bold text-red-600">Comfort Haven</span> // Nombre de la tienda con estilo
        </Link>
        
        <div className="flex-grow mx-4"> // Contenedor para la barra de búsqueda
          <div className="relative"> // Contenedor para el input de búsqueda
            <input
              type="text"
              placeholder="Buscar en toda la tienda..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent" // Estilo del input de búsqueda
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} /> // Icono de búsqueda dentro del input
          </div>
        </div>
        
        <div className="flex items-center space-x-4"> // Contenedor para el carrito y la sección de inicio de sesión
          <CartMenu /> // Componente del menú de carrito
          <Link to="/login" className="flex items-center text-gray-700 hover:text-red-600"> // Enlace a la página de login
            <User size={24} className="mr-2" /> // Icono de usuario
            <span>Iniciar Sesión</span> // Texto del enlace
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-2 flex items-center justify-between border-t border-gray-200"> // Contenedor para el menú de navegación de categorías
        <nav className="flex items-center"> // Contenedor para los enlaces de navegación
          <div className="relative group"> // Contenedor para el dropdown de productos
            <button
              className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2"
              onClick={() => setIsProductsOpen(!isProductsOpen)} // Controla el estado del dropdown de productos
            >
              Productos
              <ChevronDown size={16} className="ml-1" /> // Icono para mostrar el dropdown
            </button>
            {isProductsOpen && ( // Muestra el dropdown si está abierto
              <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-4 px-6 grid grid-cols-3 gap-6 w-max z-50">
                {categories.map((category, index) => ( // Mapea las categorías para generar los enlaces
                  <div key={index} className="min-w-[200px]"> // Contenedor de cada categoría
                    <h3 className="font-semibold text-gray-800 mb-2"> // Título de la categoría
                      <Link to={category.to} className="hover:text-red-600"> // Enlace a la categoría
                        {category.name}
                      </Link>
                    </h3>
                    <ul> // Lista de subcategorías
                      {category.subcategories.map((subcategory, subIndex) => ( // Mapea las subcategorías
                        <li key={subIndex}> // Contenedor de cada subcategoría
                          <Link to={subcategory.to} className="text-gray-600 hover:text-red-600 block py-1"> // Enlace a la subcategoría
                            {subcategory.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
          <Link to="/catalogo" className="text-gray-700 hover:text-red-600 px-3 py-2"> // Enlace a la página del catálogo
            Catálogo
          </Link>
          <Link to="/nosotros" className="text-gray-700 hover:text-red-600 px-3 py-2"> // Enlace a la página "Nosotros"
            Nosotros
          </Link>
          <Link to="/contacto" className="text-gray-700 hover:text-red-600 px-3 py-2"> // Enlace a la página de contacto
            Contacto
          </Link>
        </nav>
      </div>
    </header> // Cierre del encabezado
  );
} // Fin del componente Navbar
