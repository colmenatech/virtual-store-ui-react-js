import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Search, User } from 'lucide-react';
import { AuthContext } from './AuthContext';
import CartMenu from './pages/shopping_cart/CartMenu';
import Logo from './assets/img/logo_2.png'
import RandomProducts from './pages/Categorías/RandomProducts';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext); // Accede a user y logout desde el contexto
  const [showRandomProducts, setShowRandomProducts] = useState(true); // Estado para mostrar/ocultar RandomProducts
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null); // Estado para manejar el hover en categorías
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // Estado para controlar si mostrar los resultados

  const navigate = useNavigate();
  const location = useLocation(); 
  const searchRef = useRef(null); // Referencia para la barra de búsqueda

  const categories = [
    {
      name: 'Accesorios',
    to: '/productos/accesorios', // Esto puede ser una ruta que muestre todos los accesorios, si existe.
    subcategories: [
      { name: 'Relojes', to: '/productos/accesorios/relojes' },
      { name: 'Lámparas', to: '/productos/accesorios/lámparas' },
      { name: 'Espejos', to: '/productos/accesorios/espejos' }
    ]
  },
  {
    name: 'Sala',
    to: '/productos/salas', // Esto puede ser una ruta que muestre todos los productos de sala.
    subcategories: [
      { name: 'Sofás', to: '/productos/salas/sofás' },
      { name: 'Muebles TV', to: '/productos/salas/muebles-para-tv' },
      { name: 'Mesas de centro', to: '/productos/salas/mesas-de-centro' }
    ]
  },
  {
    name: 'Muebles de patio',
    to: '/productos/muebles-de-patio', // Esto puede ser una ruta que muestre todos los muebles de patio.
    subcategories: [
      { name: 'Mesas de exterior', to: '/productos/muebles-de-patio/mesas-de-exterior' },
      { name: 'Sillas de exterior', to: '/productos/muebles-de-patio/sillas-de-exterior' },
      { name: 'Toldos', to: '/productos/muebles-de-patio/toldos' }
    ]
  },
  {
    name: 'Muebles de oficina',
    to: '/productos/muebles-de-oficina', // Esto puede ser una ruta que muestre todos los muebles de oficina.
    subcategories: [
      { name: 'Escritorios', to: '/productos/muebles-de-oficina/escritorios' },
      { name: 'Libreros', to: '/productos/muebles-de-oficina/libreros' },
      { name: 'Sillas de estudio', to: '/productos/muebles-de-oficina/sillas-de-estudio' }
    ]
  },
  {
    name: 'Comedores',
    to: '/productos/comedores', // Esto puede ser una ruta que muestre todos los comedores.
    subcategories: [
      { name: 'Juego de comedor', to: '/productos/comedores/juego-comedor' },
      { name: 'Mesas', to: '/productos/comedores/mesas' },
      { name: 'Sillas', to: '/productos/comedores/sillas' }
    ]
  },
  {
    name: 'Dormitorios',
    to: '/productos/dormitorios', // Esto puede ser una ruta que muestre todos los dormitorios.
    subcategories: [
      { name: 'Camas', to: '/productos/dormitorios/camas' },
      { name: 'Comodas con espejo', to: '/productos/dormitorios/comodas-con-espejo' },
      { name: 'Mesas de noche', to: '/productos/dormitorios/mesas-de-noche' }
    ]
  }
  
  ];
  // Función para gestionar el acceso al carrito
  const handleCartClick = () => {
    if (!user) {
      alert("Debes iniciar sesión para acceder al carrito.");
    } else {
      navigate('/carrito');
    }
  };

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

  useEffect(() => {
    // Oculta los productos aleatorios en las páginas de factura y carrito
    if (location.pathname === '/factura' || location.pathname === '/carritoo') {
      setShowRandomProducts(false);
    }
  }, [location.pathname]);

   // Función para ocultar los productos aleatorios
  const handleProductClick = () => {
    setShowRandomProducts(false);
  };
  const handleCategoryClick = () => {
    setShowRandomProducts(false); // Cierra el componente cuando se haga clic en categorías u otros elementos
  };
  // Función de búsqueda
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const results = [];
      categories.forEach(category => {
        category.subcategories.forEach(subcategory => {
          if (subcategory.name.toLowerCase().includes(term)) {
            results.push({ ...subcategory, category: category.name });
          }
        });
      });
      setSearchResults(results);
      setShowSearchResults(true); // Mostrar resultados si hay algo
    } else {
      setSearchResults([]);
      setShowSearchResults(false); // Ocultar resultados si no hay término de búsqueda
    }
  };

  // Función para manejar el clic en el ícono de búsqueda
  const handleSearchIconClick = () => {
    navigate('/resultados-busqueda', { state: { results: searchResults } });
    setShowRandomProducts(false);
  };
   // Función para cerrar el menú de recomendaciones al hacer clic fuera
   useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResults([false]); // Cerrar las recomendaciones de búsqueda si el clic es fuera
      }
    };

    // Agregar el event listener para clics fuera
    document.addEventListener('mousedown', handleClickOutside);

    // Limpiar el event listener cuando el componente se desmonte
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-fondo shadow-md flex flex-col relative">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center" onClick={() => setShowRandomProducts(true)}>
          <img src={Logo} alt="Logo" className="w-8 h-8 mr-2" />
          <span className="text-xl font-bold text-acento">Comfort</span>
          <span className="text-xl font-bold text-primario ml-1">Haven</span>
        </Link>

        {/* Barra de búsqueda */}
        <div ref={searchRef} className="flex-grow mx-4 relative">
          <input
            type="text"
            placeholder="Buscar en toda la tienda..."
            className="w-full py-2 px-4 pr-10 rounded-full border border-secundario focus:outline-none focus:ring-2 focus:ring-primario focus:border-transparent"
            value={searchTerm}
            onChange={handleSearch}
          />
          <Search
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-secundario cursor-pointer"
            size={20}
            onClick={handleSearchIconClick}
            
          />

          {/* Resultados de búsqueda */}
          {showSearchResults && searchTerm && (
            <div className="absolute top-full mt-1 w-full bg-white border border-secundario rounded-md shadow-md max-h-60 overflow-y-auto z-50">
              {searchResults.length > 0 ? (
                searchResults.map((result, index) => (
                  <Link
                    to={result.to}
                    key={index}
                    className="block px-4 py-2 text-sm text-texto_color hover:bg-secundario hover:text-white"
                    onClick={handleProductClick}
                  >
                    {result.category} - {result.name}
                  </Link>
                ))
              ) : (
                <p className="px-4 py-2 text-sm text-secundario">No se encontraron resultados</p>
              )}
            </div>
          )}
        </div>

        {/* Icono del carrito de compras y enlace de inicio de sesión */}
        <div className="flex items-center space-x-4">
          <button onClick={handleCartClick}>
            <CartMenu />
          </button>

          {user ? (
            <>
              <Link to="/user" className="flex items-center text-texto_color hover:text-primario">
                <User size={24} className="mr-2" />
                <span onClick={handleCategoryClick}>Mi Perfil</span>
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

      <div className="container mx-auto px-4 py-2 flex items-center justify-between border-t border-secundario"onClick={handleCategoryClick}>
        <nav className="flex items-center">
          {categories.map((category, index) => (
            <div
              key={category.name}
              className="relative"
              onMouseEnter={() => setOpenCategoryIndex(index)}
              onMouseLeave={() => setTimeout(() => setOpenCategoryIndex(null), 10000)} // Agrega un retraso de 200 ms
            >
              <Link
                to={category.to}
                className="text-texto_color hover:text-primario px-3 py-2 flex items-center"
                onClick={handleCategoryClick}
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
                      onClick={handleCategoryClick}
                    >
                      {subcategory.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

      

        {/* Enlaces de navegación adicionales */}
        <div className="flex space-x-4">
          <Link to="/nosotros" className="text-texto_color hover:text-primario px-3 py-2" onClick={handleCategoryClick}>
            Nosotros
          </Link>
          <Link to="/contacto" className="text-texto_color hover:text-primario px-3 py-2" onClick={handleCategoryClick}>
            Contacto
          </Link>
        </div>
      </div>

      {/* Renderiza RandomProducts si showRandomProducts es true */}
      {showRandomProducts && (
        <RandomProducts
          onHide={() => setShowRandomProducts(false)}
          products={[]} // Asegúrate de pasar los productos aleatorios reales
          className="relative z-40"
        />
      )}
    </header>
  );
}