import React from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';

const SignUp = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Evita que el formulario se envíe de forma predeterminada
    // Aquí podrías agregar cualquier lógica adicional antes de redirigir al perfil
    navigate('/user'); // Redirige a la página de perfil
  };

  return (
    <div className="max-w-md p-10 mx-auto my-24 bg-gray-200 shadow-lg rounded-lg text-center">
      <h1 className="text-3xl mb-5">Bienvenidos</h1>
      <h2 className="text-xl mb-5">Registrarse</h2>

      <form onSubmit={handleSubmit}>
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
        </button>

        <button
          type="button"
          onClick={handleLoginClick}
          className="w-full bg-red-800 text-white py-3 rounded-md hover:bg-red-700 transition duration-300"
        >
          Regresar
        </button>
      </form>
    </div>
  );
};

export default SignUp;
