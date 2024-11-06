import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import CartMenu from './pages/shopping_cart/CartMenu';
import LoginMenu from './LoginContext';
import Logo from './assets/img/logo_2.png'

export default function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

  // Definición de categorías y subcategorías para el menú de navegación
  const categories = [
    {
      name: 'Accesorios',
      to: '/accesorios',
      subcategories: [
        { name: 'Relojes', to: '/accesorios/relojes' },
        { name: 'Lamparas', to: '/accesorios/lamparas' },
        { name: 'Espejos', to: '/espejos' }
      ]
    },
    {
      name: 'Sala',
      to: '/sala',
      subcategories: [
        { name: 'Sofas', to: '/sala/sofas' },
        { name: 'Muebles TV', to: '/sala/muebles-tv' },
        { name: 'Mesas de centro', to: '/sala/mesas-de-centro' }
      ]
    },
    {
      name: 'Muebles de patio',
      to: '/muebles-de-patio',
      subcategories: [
        { name: 'Mesas de exterior', to: '/muebles-de-patio/mesas-de-exterior' },
        { name: 'Sillas de exterior', to: '/muebles-de-patio/sillas-de-exterior' },
        { name: 'Toldos', to: '/muebles-de-patio/toldos' }
      ]
    },
    {
      name: 'Muebles de oficina',
      to: '/muebles-de-oficina',
      subcategories: [
        { name: 'Escritorios', to: '/muebles-de-oficina/escritorios' },
        { name: 'Libreros', to: '/muebles-de-oficina/libreros' },
        { name: 'Sillas de estudio', to: '/muebles-de-oficina/sillas-de-estudio' }
      ]
    },
    {
      name: 'Comedores',
      to: '/comedores',
      subcategories: [
        { name: 'Juego de comedor', to: '/comedores/juego-de-comedor' },
        { name: 'Mesas', to: '/comedores/mesas' },
        { name: 'Sillas', to: '/comedores/sillas' }
      ]
    },
    {
      name: 'Dormitorios',
      to: '/dormitorios',
      subcategories: [
        { name: 'Camas', to: '/dormitorios/camas' },
        { name: 'Comodas con espejo', to: '/dormitorios/comodas-con-espejo' },
        { name: 'Mesas de noche', to: '/dormitorios/mesas-de-noche' }
      ]
    }
  ];

  return (
    <header className="bg-fondo shadow-md flex flex-col">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Enlace al inicio con logo y nombre de la tienda */}
        <Link to="/" className="flex items-center">
          {/* Imagen del logo */}
          <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
          {/* Nombre de la tienda con diferentes colores */}
          <span className="text-xl font-bold text-acento">Comfort</span>
          <span className="text-xl font-bold text-primario ml-1">Haven</span>
        </Link>
        
        {/* Barra de búsqueda */}
        <div className="flex-grow mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en toda la tienda..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-secundario focus:outline-none focus:ring-2 focus:ring-primario focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secundario" size={20} />
          </div>
        </div>
        
        {/* Icono del carrito de compras y enlace de inicio de sesión */}
        <div className="flex items-center space-x-4">
          <CartMenu />
          <LoginMenu />
        </div>
      </div>
      {/* Menú de navegación principal */}
      <div className="container mx-auto px-4 py-2 flex items-center justify-between border-t border-secundario">
        <nav className="flex items-center">
          {/* Menú desplegable de productos */}
          <div className="relative group">
            <button
              className="flex items-center text-texto_color hover:text-primario px-3 py-2"
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              Productos
              <ChevronDown size={16} className="ml-1" />
            </button>
            {isProductsOpen && (
              <div className="absolute top-full left-0 bg-fondo shadow-md rounded-md py-4 px-6 grid grid-cols-3 gap-6 w-max z-50">
                {categories.map((category, index) => (
                  <div key={index} className="min-w-[200px]">
                    <h3 className="font-semibold text-texto_color mb-2">
                      <Link to={category.to} className="hover:text-primario">
                        {category.name}
                      </Link>
                    </h3>
                    <ul>
                      {category.subcategories.map((subcategory, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subcategory.to} className="text-secundario hover:text-primario block py-1">
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
          <Link to="/catalogo" className="text-texto_color hover:text-primario px-3 py-2">Catálogo</Link>
          <Link to="/nosotros" className="text-texto_color hover:text-primario px-3 py-2">Nosotros</Link>
          <Link to="/contacto" className="text-texto_color hover:text-primario px-3 py-2">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
