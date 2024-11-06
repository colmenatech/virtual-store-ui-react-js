import React from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación entre rutas

  const handleLoginClick = () => {
    navigate('/login'); // Función que redirige a la página de inicio de sesión
  };

  return (
    <div className="max-w-md p-10 mx-auto my-24 bg-gray-200 shadow-lg rounded-lg text-center">
      <h1 className="text-3xl mb-5">Bienvenidos</h1> {/* Título principal */}
      <h2 className="text-xl mb-5">Registrarse</h2> {/* Subtítulo para el formulario */}
      
      <form> {/* Formulario de registro */}
        <div className="mb-5">
          <input
            type="text"
            name="firstname"
            required
            placeholder="Nombre"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div className="mb-5">
          <input
            type="text"
            name="lastname"
            required
            placeholder="Apellido"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div className="mb-5">
          <input
            type="email"
            name="email"
            required
            placeholder="Correo Electrónico"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            name="password"
            required
            placeholder="Contraseña"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-red-800 text-white py-3 rounded-md hover:bg-red-700 transition duration-300 mb-2"
        >
          Registrarse
        </button> {/* Botón para enviar el formulario */}

        <button
          type="button"
          onClick={handleLoginClick}
          className="w-full bg-red-800 text-white py-3 rounded-md hover:bg-red-700 transition duration-300"
        >
          Regresar
        </button> {/* Botón que redirige al inicio de sesión */}
      </form>
    </div>
  );
};

export default SignUp;