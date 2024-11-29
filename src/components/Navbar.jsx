import { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { ChevronDown, Search, User } from 'lucide-react';
import { AuthContext } from './AuthContext';
import CartMenu from './pages/shopping_cart/CartMenu';
import Logo from './assets/img/logo_2.png';
import RandomProducts from './pages/Categorías/RandomProducts';
import axios from 'axios';
import Cookies from 'js-cookie';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext); // Accede a user y logout desde el contexto
  const [showRandomProducts, setShowRandomProducts] = useState(true); // Estado para mostrar/ocultar RandomProducts
  const [openCategoryIndex, setOpenCategoryIndex] = useState(null); // Estado para manejar el hover en categorías
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false); // Estado para controlar si mostrar los resultados
  const categoryRef = useRef(null); // Referencia para el contenedor de la categoría
  const [subcategories, setSubcategories] = useState([]); // Subcategorías en array
  const [categories, setCategories] = useState([]); // Categories state

  const navigate = useNavigate();
  const location = useLocation(); 
  const searchRef = useRef(null); // Referencia para la barra de búsqueda

  // Función para obtener las categorías
  const fetchCategories = async () => {
    const token = Cookies.get('token');
    try {
      const response = await axios.get(`${'http://localhost:8000/api/'}user-profile/categories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data.categories)) {
        console.log('Categories fetched:', response.data.categories);
        setCategories(response.data.categories);  // Asigna las categorías correctamente
      } else {
        console.error('Esperábamos un array de categorías');
        setCategories([]);  // Si no es un array, asigna un array vacío
      }

    } catch (error) {
      console.error('Error al obtener categorías:', error);
      setCategories([]);  // Si hay un error, asigna un array vacío
    }
  };

  // Función para obtener las subcategorías
  const fetchSubcategories = async () => {
    const token = Cookies.get('token');
    try {
      const response = await axios.get(`${'http://localhost:8000/api/'}user-profile/subcategories`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (Array.isArray(response.data)) {
        console.log('Subcategories fetched:', response.data);
        setSubcategories(response.data);  // Asigna las subcategorías correctamente
      } else {
        console.error('Esperábamos un array de subcategorías');
        setSubcategories([]);  // Si no es un array, asigna un array vacío
      }

    } catch (error) {
      console.error('Error al obtener subcategorías:', error);
      setSubcategories([]);  // Si hay un error, asigna un array vacío
    }
  };

  // Llamamos a las funciones para obtener categorías y subcategorías
  useEffect(() => {
    fetchCategories();  // Obtener categorías
    fetchSubcategories();  // Obtener subcategorías
  }, []);

  // Asignamos subcategorías a sus categorías correspondientes
  const categoriesWithSubcategories = categories.map(category => {
    // Filtramos las subcategorías para esa categoría
    const relatedSubcategories = subcategories.filter(subcategory => subcategory.category_id === category.id);
    return { ...category, subcategories: relatedSubcategories };
  });

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

  // Función para manejar el clic en la categoría
  const handleCategoryClick = (index) => {
    setOpenCategoryIndex(openCategoryIndex === index ? null : index); // Alterna entre abrir y cerrar el menú de categorías
  };
  
    
  useEffect(() => {
    if (location.pathname === '/factura' || location.pathname === '/carrito-checkout') {
      setShowRandomProducts(false); // Oculta los productos aleatorios en las rutas de factura y checkout
    }
  }, [location.pathname]);
    
  const handleProductClick = () => {
    setShowRandomProducts(false); // Oculta los productos aleatorios
  };

  // Función para manejar la búsqueda
  const handleSearch = (event) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    if (term) {
      const results = [];
      categories.forEach((category) => {
        category.subcategories.forEach((subcategory) => {
          if (subcategory.name.toLowerCase().includes(term)) {
            results.push({ ...subcategory, category: category.name });
          }
        });
      });
      setSearchResults(results);
      setShowSearchResults(results.length > 0);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };
  
  const handleSearchIconClick = () => {
    navigate('/resultados-busqueda', { state: { results: searchResults } });
    setShowSearchResults(false);
  };
  
  useEffect(() => {
    if (location.pathname === '/' || location.pathname === '/user') {
      setShowRandomProducts(true);
    } else {
      setShowRandomProducts(false);
    }
  }, [location.pathname]);
  
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Solo cierra el menú de categorías si hay una categoría abierta y el clic es fuera del contenedor de categorías
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        if (openCategoryIndex !== null) {
          setOpenCategoryIndex(null);  // Cierra la categoría si no está en la categoría actual
        }
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openCategoryIndex]); // Solo ejecutar este efecto cuando el índice de categoría abierta cambie

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
          {categoriesWithSubcategories.map((category, index) => (
            <div
              key={category.name}
              className="relative"
              ref={index === openCategoryIndex ? categoryRef : null} // Solo asigna la referencia al menú desplegable abierto
            >
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
                      onClick={() => handleCategoryClick()} // Cierra el menú y oculta los productos aleatorios
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
