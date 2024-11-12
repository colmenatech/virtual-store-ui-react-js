import { useState, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Search, User } from 'lucide-react';
import { AuthContext } from '../components/AuthContext';
import './assets/css/tailwind.css';
import CartMenu from './pages/shopping_cart/CartMenu';
import Logo from './assets/img/logo_2.png';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null); 
  const navigate = useNavigate();
  const location = useLocation();

  const categories = [
    {
      name: 'Accesorios',
      to: '/productos/accesorios',
      subcategories: [
        { name: 'Relojes', to: '/productos/accesorios/relojes' },
        { name: 'Lámparas', to: '/productos/accesorios/lámparas' },
        { name: 'Espejos', to: '/productos/accesorios/espejos' }
      ]
    },
    {
      name: 'Sala',
      to: '/productos/salas',
      subcategories: [
        { name: 'Sofás', to: '/productos/salas/sofás' },
        { name: 'Muebles TV', to: '/productos/salas/muebles-para-tv' },
        { name: 'Mesas de centro', to: '/productos/salas/mesas-de-centro' }
      ]
    },
    {
      name: 'Muebles de patio',
      to: '/productos/muebles-de-patio',
      subcategories: [
        { name: 'Mesas de exterior', to: '/productos/muebles-de-patio/mesas-de-exterior' },
        { name: 'Sillas de exterior', to: '/productos/muebles-de-patio/sillas-de-exterior' },
        { name: 'Toldos', to: '/productos/muebles-de-patio/toldos' }
      ]
    },
    {
      name: 'Muebles de oficina',
      to: '/productos/muebles-de-oficina',
      subcategories: [
        { name: 'Escritorios', to: '/productos/muebles-de-oficina/escritorios' },
        { name: 'Libreros', to: '/productos/muebles-de-oficina/libreros' },
        { name: 'Sillas de estudio', to: '/productos/muebles-de-oficina/sillas-de-estudio' }
      ]
    },
    {
      name: 'Comedores',
      to: '/productos/comedores',
      subcategories: [
        { name: 'Juego de comedor', to: '/productos/comedores/juego-comedor' },
        { name: 'Mesas', to: '/productos/comedores/mesas' },
        { name: 'Sillas', to: '/productos/comedores/sillas' }
      ]
    },
    {
      name: 'Dormitorios',
      to: '/productos/dormitorios',
      subcategories: [
        { name: 'Camas', to: '/productos/dormitorios/camas' },
        { name: 'Cómodas con espejo', to: '/productos/dormitorios/comodas-con-espejo' },
        { name: 'Mesas de noche', to: '/productos/dormitorios/mesas-de-noche' }
      ]
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleRegisterClick = () => {
    navigate('/signup');
  };

  // Función para gestionar el acceso al carrito
  const handleCartClick = () => {
    if (!user) {
      alert("Debes iniciar sesión para acceder al carrito.");
    } else {
      navigate('/carrito');
    }
  };

  return (
    <header className="bg-fondo shadow-md flex flex-col fixed w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center">
          <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold text-acento">Comfort</span>
          <span className="text-xl font-bold text-primario ml-1">Haven</span>
        </Link>
        
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
        
        <div className="flex items-center space-x-4">
          {/* Botón del carrito con lógica de acceso */}
          <button onClick={handleCartClick}>
            <CartMenu />
          </button>
          
          {user ? (
            <>
              <Link to="/user" className="flex items-center text-texto_color hover:text-primario">
                <User size={24} className="mr-2" />
                <span>Mi Perfil</span>
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center text-texto_color hover:text-primario"
              >
                <User size={24} className="mr-2" />
                <span>Cerrar Sesión</span>
              </button>
            </>
          ) : (
            <>
              <button
                onClick={handleLoginClick}
                className="flex items-center text-texto_color hover:text-primario"
              >
                <User size={24} className="mr-2" />
                <span>Iniciar Sesión</span>
              </button>
              <button
                onClick={handleRegisterClick}
                className="flex items-center text-texto_color hover:text-primario"
              >
                <User size={24} className="mr-2" />
                <span>Registrarse</span>
              </button>
            </>
          )}
        </div>
      </div>

      <div className="container mx-auto px-4 py-2 flex items-center justify-between border-t border-secundario">
        <nav className="flex items-center">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="relative"
              onMouseEnter={() => setOpenCategoryIndex(index)}
              onMouseLeave={() => setOpenCategoryIndex(null)}
            >
              <Link
                to={category.to}
                className="text-texto_color hover:text-primario px-3 py-2 flex items-center"
              >
                {category.name}
                <ChevronDown size={16} className="ml-2" />
              </Link>
              {openCategoryIndex === index && (
                <div className="absolute bg-white shadow-lg py-2 w-48 mt-1 rounded-md z-10">
                  {category.subcategories.map((subcategory) => (
                    <Link
                      key={subcategory.name}
                      to={subcategory.to}
                      className="block px-4 py-2 text-texto_color hover:bg-primario hover:text-white"
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex space-x-4">
          <Link to="/nosotros" className="text-texto_color hover:text-primario">Acerca de Nosotros</Link>
          <Link to="/contacto" className="text-texto_color hover:text-primario">Contacto</Link>
        </div>
      </div>
    </header>
  );
}
