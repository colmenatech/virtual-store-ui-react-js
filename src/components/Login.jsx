import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const loginAdmin =  () => {  navigate('/interfazadmin'); };
  const handleSignUpClick = () => {navigate('/profileuser'); };
  const handleNavbarClick = () => { navigate('/navbar')}

  return (
    <div className="max-w-md p-10 mx-auto my-24 bg-gray-200 shadow-lg rounded-lg text-center">
      <h1 className="text-3xl mb-5">Bienvenidos</h1>
      <h2 className="text-xl mb-5">Iniciar Sesión</h2>
      <form>
        <div className="mb-5">
          <input
            type="text"
            name="username"
            required
            placeholder="Nombre de Usuario"
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
          type="button"
          onClick={loginAdmin}
          className="w-full bg-red-800 text-white py-3 rounded-md hover:bg-red-700 transition duration-300 mb-2"
        >
          Iniciar sesión como Administrador
        </button>

        <button
          type="button"
          onClick={handleNavbarClick}
          className="w-full bg-red-800 text-white py-3 rounded-md hover:bg-red-700 transition duration-300 mb-2"
        >
          Iniciar sesión como Cliente
        </button>
        <button
          type="button"
          onClick={handleSignUpClick}
          className="w-full bg-red-800 text-white py-3 rounded-md hover:bg-red-700 transition duration-300"
        >
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Login;
