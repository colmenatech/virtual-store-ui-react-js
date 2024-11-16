import React, { useState } from 'react'; // Importa React y el hook useState para manejar el estado

const ProtectedPage = () => { // Define el componente ProtectedPage como una función
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Estado para verificar si el usuario está autenticado

  return ( // Devuelve el JSX del componente
    <div className="min-h-screen flex items-center justify-center bg-gray-100"> // Contenedor que ocupa toda la pantalla y centra su contenido
      {/* Si el usuario no está autenticado, muestra el mensaje */}
      {!isAuthenticated ? ( // Si isAuthenticated es falso, muestra el mensaje de acceso denegado
        <div className="bg-red-100 p-4 rounded-lg shadow-md max-w-lg w-full text-center"> // Contenedor para el mensaje de acceso denegado
          <h2 className="text-xl font-semibold text-red-800">¡Acceso denegado!</h2> // Título del mensaje de error
          <p className="mt-2 text-gray-700">Por favor, inicia sesión para acceder a esta página.</p> // Mensaje para indicar al usuario que debe iniciar sesión
        </div>
      ) : ( // Si isAuthenticated es verdadero, muestra el mensaje de bienvenida
        <div className="text-center"> // Contenedor para el mensaje de bienvenida
          <h2 className="text-xl font-semibold text-gray-800">¡Bienvenido de nuevo!</h2> // Título de bienvenida
          <p className="mt-2 text-gray-700">Ahora puedes acceder a tu contenido protegido.</p> // Mensaje indicando que el usuario tiene acceso
        </div>
      )}
    </div>
  );
};

export default ProtectedPage; // Exporta el componente ProtectedPage

