// Importación de dependencias necesarias de React y otras librerías
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faSearch, faChevronDown, faUser } from '@fortawesome/free-solid-svg-icons'; 
import logo from './assets/img/logo_2.png';
import './assets/css/home.css'
import Modal from './modals/modal_cart';
import Cart from './pages/Cart';
import Login from './pages/Login';
import LoginModal from './modals/modal_login';

// Componente principal de la página Home
export default function Home() {
  // Estado para gestionar el menú activo y si el submenú de productos está abierto
  const [activeMenu, setActiveMenu] = useState('Productos');
  const [isProductsOpen, setIsProductsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // Estado para controlar la visibilidad del modal del carrito
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

 
  // Categorías de productos que se mostrarán en el submenú
  const productCategories = ["Salas", "Comedores", "Dormitorios", "Muebles de Patio", "Muebles de Oficina", "Accesorios"];
  // Elementos de navegación principales
  const navItems = [
    { name: "Productos", href: "#" },
    { name: "Catálogo", href: "/catalogo" },
    { name: "Nosotros", href: "/nosotros" },
    { name: "Contacto", href: "/contacto" },
  ];

  return (
    <>
     {/* Barra de navegación principal */}
    <nav className="bg-fondo shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
           {/* Sección del logo */}
          <div className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-10 w-auto space-x-2" />
            <span className="text-primario font-bold text-2xl">Comfort</span>
            <span className="text-gray-800 font-bold text-2xl">Haven</span>
          </div>

          {/* Barra de búsqueda */}
          <div className="flex-1 mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar en toda la tienda..."
                className="w-full py-2 px-4 pr-10 rounded-full border border-gray-800 focus:outline-none focus:ring-2 focus:ring-primario"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-primario hover:text-secundario">
                <FontAwesomeIcon icon={faSearch} className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Iconos del lado derecho */}
          <div className="flex items-center space-x-4">
              <button onClick={() => setIsCartOpen(true)} className="relative text-primario hover:text-secundario">
                <FontAwesomeIcon icon={faCartShopping} className="h-6 w-6" />
                <span className="absolute -top-1 -right-1 bg-secundario text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  0
                </span>
              </button>
            </div>
          </div>

        {/* Menú de navegación */}
        <div className="flex items-center justify-between py-2">
          <ul className="flex space-x-6">
            <li className="relative group">
              <button
                onClick={() => {
                  setActiveMenu('Productos');
                  setIsProductsOpen(!isProductsOpen);
                }}
                className={`text-sm font-medium flex items-center ${
                  activeMenu === 'Productos' ? 'text-red-700 border-b-2 border-red-700' : 'text-primario hover:text-secundario'
                }`}
              >
                Productos
                <FontAwesomeIcon icon={faChevronDown} className="ml-1 h-4 w-4" />
              </button>
              {isProductsOpen && (
                <div className="absolute left-0 mt-2 w-56 rounded-md shadow-lg bg-fondo ring-black ring-opacity-5 z-10">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    {productCategories.map((category) => (
                      <NavLink
                        key={category}
                        to={`/productos/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-primario hover:bg-gray-100 hover:text-red-700"
                        role="menuitem"
                      >
                        {category}
                      </NavLink>
                    ))}
                  </div>
                </div>
              )}
            </li>
            {navItems.slice(1).map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={`text-sm font-medium ${
                    activeMenu === item.name ? 'text-red-700 border-b-2 border-red-700' : 'text-primario hover:text-secundario'
                  }`}
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          {/* Botón para abrir el modal de inicio de sesión */}
          <button onClick={() => setIsLoginModalOpen(true)} className="flex items-center text-primario hover:text-secundario">
            <FontAwesomeIcon icon={faUser} className="h-5 w-5 mr-1" />
            <span>Iniciar Sesión</span>
          </button>
          </div>
        </div>
      </nav>
      {/* Modal para el carrito */}
      <Modal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)}>
        <Cart /> {/* Componente del carrito */}
      </Modal>

      {/* Modal para el inicio de sesión */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)}>
        <Login /> {/* Componente del formulario de inicio de sesión */}
      </LoginModal>
    </>
  );
}