import React, { useState } from 'react';
import { User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LoginMenu = () => {
  const navigate = useNavigate();
  const setIsLoginClose = () => navigate('/login');

  return (
    <div className="relative">
      {/* Icono de usuario y botón para abrir el menú */}
      <button className="p-2 relative flex items-center" onClick={setIsLoginClose}>
        <User size={24} className="text-texto_color" />
        <span className="ml-2 text-texto_color">Cerrar Sesión</span>
      </button>
    </div>
  );
};

export default LoginMenu;
