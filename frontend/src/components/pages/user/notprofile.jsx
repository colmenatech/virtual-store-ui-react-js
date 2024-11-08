import React, { useState } from 'react';

const ProtectedPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      {/* Si el usuario no está autenticado, muestra el mensaje */}
      {!isAuthenticated ? (
        <div className="bg-red-100 p-4 rounded-lg shadow-md max-w-lg w-full text-center">
          <h2 className="text-xl font-semibold text-red-800">¡Acceso denegado!</h2>
          <p className="mt-2 text-gray-700">Por favor, inicia sesión para acceder a esta página.</p>
         
        </div>
      ) : (
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-800">¡Bienvenido de nuevo!</h2>
          <p className="mt-2 text-gray-700">Ahora puedes acceder a tu contenido protegido.</p>
        </div>
      )}
    </div>
  );
};

export default ProtectedPage;
