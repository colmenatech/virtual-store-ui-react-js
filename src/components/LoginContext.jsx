// src/components/LoginMenu.js
import React, { useContext } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const LoginMenu = () => {
  const { logout, setShowRandomProducts } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // Cierra la sesión del usuario
    setShowRandomProducts(false); // Oculta los productos aleatorios al cerrar sesión
    navigate('/login');
  };

  return (
    <div className="relative">
      <button className="p-2 flex items-center" onClick={handleLogout}>
        <User size={24} className="text-texto_color" />
        <span className="ml-2 text-texto_color">Cerrar Sesión</span>
      </button>
    </div>
  );
};

export default LoginMenu;
