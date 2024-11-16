import React, { useState } from 'react';
import { User } from 'lucide-react';// Importa el icono de usuario de lucide-react
import { useNavigate } from 'react-router-dom';  // Importa el hook useNavigate para redireccionar

const LoginMenu = () => {
  const navigate = useNavigate(); // Hook para navegar entre rutas
  const setIsLoginOpen = () => navigate('/login');  // Función que redirige al formulario de login

  return (
    <div className="relative">
      {/* Icono de usuario y botón para abrir el menú */}
      <button className="p-2 relative flex items-center" onClick={setIsLoginOpen}>
         {/* Icono de usuario (User) con un tamaño de 24px */}
        <User size={24} className="text-texto_color" />

        {/* Texto para indicar la opción de iniciar sesión */}
        <span className="ml-2 text-texto_color">Iniciar Sesión</span>
      </button>
    </div>
  );
};

export default LoginMenu; // Exporta el componente LoginMenu
