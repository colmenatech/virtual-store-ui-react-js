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
  const categoryRef = useRef(null); // Referencia para el contenedor de la categoría

  const navigate = useNavigate();
  const location = useLocation(); 
  const searchRef = useRef(null); // Referencia para la barra de búsqueda

  const categories = [
    {
      name: 'Accesorios', // Nombre de la categoría
      to: '/productos/accesorios', // Ruta de la categoría
      subcategories: [
        { name: 'Relojes', to: '/productos/accesorios/relojes' }, // Subcategoría y su ruta
        { name: 'Lámparas', to: '/productos/accesorios/lamparas' }, // Subcategoría y su ruta
        { name: 'Espejos', to: '/productos/accesorios/espejos' } // Subcategoría y su ruta
      ]
    },
    {
      name: 'Sala', // Nombre de la categoría
      to: '/productos/salas', // Ruta de la categoría
      subcategories: [
        { name: 'Sofás', to: '/productos/salas/sofas' }, // Subcategoría y su ruta
        { name: 'Muebles TV', to: '/productos/salas/muebles-para-tv' }, // Subcategoría y su ruta
        { name: 'Mesas de centro', to: '/productos/salas/mesas-de-centro' } // Subcategoría y su ruta
      ]
    },
    {
      name: 'Muebles de patio', // Nombre de la categoría
      to: '/productos/muebles-de-patio', // Ruta de la categoría
      subcategories: [
        { name: 'Mesas de exterior', to: '/productos/muebles-de-patio/mesas-de-exterior' }, // Subcategoría y su ruta
        { name: 'Sillas de exterior', to: '/productos/muebles-de-patio/sillas-de-exterior' }, // Subcategoría y su ruta
        { name: 'Toldos', to: '/productos/muebles-de-patio/toldos' } // Subcategoría y su ruta
      ]
    },
    {
      name: 'Muebles de oficina', // Nombre de la categoría
      to: '/productos/muebles-de-oficina', // Ruta de la categoría
      subcategories: [
        { name: 'Escritorios', to: '/productos/muebles-de-oficina/escritorios' }, // Subcategoría y su ruta
        { name: 'Libreros', to: '/productos/muebles-de-oficina/libreros' }, // Subcategoría y su ruta
        { name: 'Sillas de estudio', to: '/productos/muebles-de-oficina/sillas-de-estudio' } // Subcategoría y su ruta
      ]
    },
    {
      name: 'Comedores', // Nombre de la categoría
      to: '/productos/comedores', // Ruta de la categoría
      subcategories: [
        { name: 'Juego de comedor', to: '/productos/comedores/juego-comedor' }, // Subcategoría y su ruta
        { name: 'Mesas', to: '/productos/comedores/mesas' }, // Subcategoría y su ruta
        { name: 'Sillas', to: '/productos/comedores/sillas' } // Subcategoría y su ruta
      ]
    },
    {
      name: 'Dormitorios', // Nombre de la categoría
      subcategories: [
        { name: 'Camas', to: '/productos/dormitorios/camas' }, // Subcategoría y su ruta
        { name: 'Comodas con espejo', to: '/productos/dormitorios/comodas-con-espejo' }, // Subcategoría y su ruta
        { name: 'Mesas de noche', to: '/productos/dormitorios/mesas-de-noche' } // Subcategoría y su ruta
      ]
    }
  ];
  
  // Función para manejar el clic en la categoría
  const handleCategoryClickkk = (index) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index); // Alterna entre abrir y cerrar el menú de categorías
  };
  
    const handleLogout = () => {
      logout(); // Llama a la función de cierre de sesión
      navigate('/'); // Redirige a la página principal
    };
    
    const handleLoginClick = () => {
      navigate('/login'); // Redirige a la página de inicio de sesión
    };
    
    const handleRegisterClick = () => {
      navigate('/signup'); // Redirige a la página de registro
    };
    
    useEffect(() => {
      if (location.pathname === '/factura' || location.pathname === '/carrito-checkout') {
        setShowRandomProducts(false); // Oculta los productos aleatorios en las rutas de factura y checkout
      }
    }, [location.pathname]);
    
    const handleProductClick = () => {
      // setOpenCategoryIndex(openCategoryIndex === index ? null : index); // Alterna entre abrir y cerrar el menú de categorías (actualmente comentado)
      setShowRandomProducts(false); // Oculta los productos aleatorios
    };
    
    const handleCategoryClick = (index) => {
      setOpenCategoryIndex(openCategoryIndex === index ? null : index); // Alterna entre abrir y cerrar el menú de categorías
      setShowRandomProducts(false); // Oculta los productos aleatorios
    };
  
  

    const handleSearch = (event) => {
      const term = event.target.value.toLowerCase(); // Convierte el término de búsqueda a minúsculas
      setSearchTerm(term); // Actualiza el estado con el término de búsqueda
    
      if (term) { // Si hay un término de búsqueda
        const results = []; // Array para almacenar los resultados
        categories.forEach((category) => { // Itera sobre cada categoría
          category.subcategories.forEach((subcategory) => { // Itera sobre cada subcategoría de la categoría
            if (subcategory.name.toLowerCase().includes(term)) { // Si el nombre de la subcategoría incluye el término de búsqueda
              results.push({ ...subcategory, category: category.name }); // Añade la subcategoría a los resultados, incluyendo el nombre de la categoría
            }
          });
        });
        setSearchResults(results); // Actualiza el estado con los resultados de búsqueda
        setShowSearchResults(results.length > 0); // Muestra los resultados de búsqueda si hay alguno
      } else { // Si no hay término de búsqueda
        setSearchResults([]); // Limpia los resultados de búsqueda
        setShowSearchResults(false); // Oculta los resultados de búsqueda
      }
    };

    const handleSearchIconClick = () => {
      navigate('/resultados-busqueda', { state: { results: searchResults } }); // Redirige a la página de resultados de búsqueda con los resultados como estado
      setShowSearchResults(false); // Oculta los resultados de búsqueda
    };
    
    useEffect(() => {
      // Muestra RandomProducts en las rutas deseadas
      if (location.pathname === '/' || location.pathname === '/user') {
        setShowRandomProducts(true); // Muestra productos aleatorios en la página de inicio y en la página de usuario
      } else {
        setShowRandomProducts(false); // Oculta productos aleatorios en otras rutas
      }
    }, [location.pathname]); // Efecto dependiente de la ruta actual
  

    useEffect(() => {
      const handleClickOutside = (event) => {
        // Verificar si el clic está fuera del input de búsqueda
        if (searchRef.current && !searchRef.current.contains(event.target)) {
          setShowSearchResults(false); // Oculta los resultados de búsqueda
        }
    
        // Verificar si el clic está fuera del menú de categorías
        if (categoryRef.current && !categoryRef.current.contains(event.target)) {
          setOpenCategoryIndex(null); // Oculta el menú de categorías
        }
      };
    
      // Añadir un event listener para detectar clics fuera del elemento
      document.addEventListener('mousedown', handleClickOutside);
    
      // Limpieza del event listener al desmontar el componente
      return () => {
        document.removeEventListener('mousedown', handleClickOutside); // Limpiar el event listener
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
            <CartMenu />
          {user ? (
            <>
              <Link to="/perfil" className="flex items-center text-texto_color hover:text-primario">
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

      <div className="container mx-auto px-4 py-2 flex items-center justify-between border-t border-secundario">
        <nav className="flex items-center">
        {categories.map((category, index) => (
    <div
      key={category.name}
      className="relative"
      ref={index === openCategoryIndex ? categoryRef : null} // Solo asigna la referencia al menú desplegable abierto
    >
      {/* Cambié el Link a un botón para evitar redirección */}
      <button
        className="text-texto_color hover:text-primario px-3 py-2 flex items-center"
        onClick={() => handleCategoryClickkk(index)} // Alterna el menú al hacer clic
      >
        {category.name}
        <ChevronDown size={16} className="ml-2" />
      </button>
      {openCategoryIndex === index && (
        <div className="absolute bg-white shadow-lg py-2 w-48 mt-1 rounded-md z-10">
          {category.subcategories.map((subcategory) => (
            <Link
              key={subcategory.name}
              to={subcategory.to} // Mantengo los enlaces funcionales para las subcategorías
              className="block px-4 py-2 text-texto_color hover:bg-primario hover:text-white"
              onClick={() => {
                handleCategoryClick(); // Cierra el menú y oculta los productos aleatorios
              }}
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
      {/* Mostrar productos aleatorios debajo del Navbar */}
      {showRandomProducts && <RandomProducts />}
    </header>
  );
}