import React from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginMenu = ({ setShowRandomProducts }) => {
  const navigate = useNavigate();
  
  // Función para redirigir a la página de login
  const setIsLoginClose = () => {
    navigate('/login'); 
  };

  // Función para cerrar el componente RandomProducts
  const handleCategoryClick = () => {
    if (setShowRandomProducts) {
      setShowRandomProducts(false); // Cierra el componente de productos aleatorios
    }
  };

  // Función combinada para manejar ambos eventos de clic
  const handleClick = () => {
    setIsLoginClose(); // Redirige a /login
    handleCategoryClick(); // Cierra el componente de productos aleatorios
  };

  return (
    <div className="relative">
      {/* Icono de usuario y botón para abrir el menú */}
      <button className="p-2 relative flex items-center" onClick={handleClick}>
        <User size={24} className="text-texto_color" />
        <span className="ml-2 text-texto_color">
          Cerrar Sesión
        </span>
      </button>
    </div>
  );
};

export default LoginMenu;
