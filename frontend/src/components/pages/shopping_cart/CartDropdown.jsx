import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search, User } from 'lucide-react';
import CartMenu from './CartMenu';

export default function Navbar() {
  const [isProductsOpen, setIsProductsOpen] = useState(false);

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
    <header className="bg-white shadow-md flex flex-col">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <svg className="w-8 h-8 text-red-600 mr-2" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
            <path d="M9 22V12h6v10" />
          </svg>
          <span className="text-xl font-bold text-red-600">Comfort Haven</span>
        </Link>
        
        <div className="flex-grow mx-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar en toda la tienda..."
              className="w-full py-2 px-4 pr-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-600 focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <CartMenu />
          <Link to="/login" className="flex items-center text-gray-700 hover:text-red-600">
            <User size={24} className="mr-2" />
            <span>Iniciar Sesión</span>
          </Link>
        </div>
      </div>
      <div className="container mx-auto px-4 py-2 flex items-center justify-between border-t border-gray-200">
        <nav className="flex items-center">
          <div className="relative group">
            <button
              className="flex items-center text-gray-700 hover:text-red-600 px-3 py-2"
              onClick={() => setIsProductsOpen(!isProductsOpen)}
            >
              Productos
              <ChevronDown size={16} className="ml-1" />
            </button>
            {isProductsOpen && (
              <div className="absolute top-full left-0 bg-white shadow-md rounded-md py-4 px-6 grid grid-cols-3 gap-6 w-max z-50">
                {categories.map((category, index) => (
                  <div key={index} className="min-w-[200px]">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      <Link to={category.to} className="hover:text-red-600">
                        {category.name}
                      </Link>
                    </h3>
                    <ul>
                      {category.subcategories.map((subcategory, subIndex) => (
                        <li key={subIndex}>
                          <Link to={subcategory.to} className="text-gray-600 hover:text-red-600 block py-1">
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
          <Link to="/catalogo" className="text-gray-700 hover:text-red-600 px-3 py-2">Catálogo</Link>
          <Link to="/nosotros" className="text-gray-700 hover:text-red-600 px-3 py-2">Nosotros</Link>
          <Link to="/contacto" className="text-gray-700 hover:text-red-600 px-3 py-2">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
