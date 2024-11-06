import React, { useState } from 'react';
import { User } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginMenu = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  return (
    <div className="relative">
      {/* Icono de usuario y botón para abrir el menú */}
      <button className="p-2 relative flex items-center" onClick={() => setIsLoginOpen(!isLoginOpen)}>
        <User size={24} className="text-texto_color" />
        <span className="ml-2 text-texto_color">Iniciar Sesión</span>
      </button>

      {/* Menú de inicio de sesión */}
      {isLoginOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-fondo border border-secundario shadow-lg rounded-lg z-50">
          <div className="p-4">
            <h2 className="font-bold text-lg text-texto_color">Iniciar Sesión</h2>
            <ul className="mt-4 space-y-2">
              <li>
                <Link to="/login" className="block text-texto_color hover:text-primario">Usuario</Link>
              </li>
              <li>
                <Link to="/login" className="block text-texto_color hover:text-primario">Administrador</Link>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginMenu;
