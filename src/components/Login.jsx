import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import RandomProducts from './pages/Categorías/RandomProducts';

const Login = () => {
  const { login, showRandomProducts, setShowRandomProducts } = useContext(AuthContext);
  const navigate = useNavigate();

  // Ocultar productos aleatorios al entrar en la página de login
  useEffect(() => {
    setShowRandomProducts(false);
  }, [setShowRandomProducts]);

  // Función para manejar el inicio de sesión
  const handleLogin = (userType) => {
    login('username', userType); // Aquí deberías reemplazar 'username' por el valor real
    if (userType === 'admin') {
      navigate('/interfazadmin'); // Redirige a la interfaz de administración
    } else {
      navigate('/navbar'); // Redirige a la página de cliente
    }
  };

  // Función para redirigir al registro
  const handleSignUpClick = () => {
    navigate('/signup'); // Redirige al usuario a la página de registro
  };

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
          onClick={() => handleLogin('admin')}
          className="w-full bg-red-800 text-white py-3 rounded-md hover:bg-red-700 transition duration-300 mb-2"
        >
          Iniciar sesión como Administrador
        </button>
        <button
          type="button"
          onClick={() => handleLogin('cliente')}
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

      {/* Renderiza RandomProducts si showRandomProducts es true */}
      {showRandomProducts && (
        <RandomProducts
          onHide={() => setShowRandomProducts(false)} // Cierra el componente cuando se hace clic en un producto
          products={[/* Aquí pasan tus productos */]}
        />
      )}
    </div>
  );
};

export default Login;
