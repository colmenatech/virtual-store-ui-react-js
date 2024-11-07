// Home.js
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Search } from 'lucide-react';
import Logo from './assets/img/logo_2.png';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import LoginMenu from './LoginContextHome';

export default function Home() {
  const navigate = useNavigate();
  
  // Navegar al Login
  const setIsLoginOpen = () => navigate('/login');

  const [isProductsOpen, setIsProductsOpen] = useState(false);

  // Definición de categorías para el menú de navegación
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
          <Link to="/perfil" className="text-texto_color hover:text-primario px-3 py-2">Mi Perfil</Link>
          <Link to="/nosotros" className="text-texto_color hover:text-primario px-3 py-2">Nosotros</Link>
          <Link to="/contacto" className="text-texto_color hover:text-primario px-3 py-2">Contacto</Link>
        </nav>
      </div>
    </header>
  );
}
