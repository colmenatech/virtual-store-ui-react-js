import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

<<<<<<< Updated upstream
const LoginMenu = () => {
  const navigate = useNavigate();
  const setIsLoginClose = () => navigate('/login');

  return (
    <div className="relative">
      {/* Icono de usuario y botón para abrir el menú */}
      <button className="p-2 relative flex items-center" onClick={setIsLoginClose}>
=======
  const LoginMenu = () => { 
  const { logout, setShowRandomProducts } = useContext(AuthContext); // Extrae las funciones 'logout' y 'setShowRandomProducts' del contexto de autenticación
  const navigate = useNavigate();// Hook de React Router para la navegación

  const handleLogout = () => {
    logout(); // Cierra la sesión del usuario
    setShowRandomProducts(false); // Oculta los productos aleatorios al cerrar sesión
    navigate('/login');
  };

  return (
    <div className="relative">
      {/* Botón para cerrar sesión */}
      <button className="p-2 flex items-center" onClick={handleLogout}>
        {/* Icono de usuario */}
>>>>>>> Stashed changes
        <User size={24} className="text-texto_color" />
         {/* Texto para indicar cerrar sesión */}
        <span className="ml-2 text-texto_color">Cerrar Sesión</span>
      </button>
    </div>
  );
};

export default LoginMenu;
