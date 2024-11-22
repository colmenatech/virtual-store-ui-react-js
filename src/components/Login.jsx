import React, { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './AuthContext';
import axios from 'axios';

const Login = () => {
  const { login, setShowRandomProducts } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Ocultar productos aleatorios en la página de login
  useEffect(() => {
    setShowRandomProducts(false);
  }, [setShowRandomProducts]);

  // Manejo del login
  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, complete todos los campos');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/api/login', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Guardar token y datos del usuario en localStorage o un contexto global
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        // Actualizar contexto con la información del usuario
        login(user.email, user.roles[0]); // Suponiendo que roles es un array y tomamos el primer rol

        // Redirigir según el rol del usuario
        if (user.roles.includes('admin')) {
          navigate('/interfazadmin');
        } else {
          navigate('/user');
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Correo o contraseña incorrectos');
      } else {
        setError('Ocurrió un error, por favor intente nuevamente');
      }
      console.error('Error en el login:', error);
    }
  };

  const handleSignUpClick = () => {
    navigate('/signup');
  };

  return (
    <div className="max-w-md p-10 mx-auto my-24 bg-gray-200 shadow-lg rounded-lg text-center">
      <h1 className="text-3xl mb-5">Bienvenidos</h1>
      <h2 className="text-xl mb-5">Iniciar Sesión</h2>
      <form>
        <div className="mb-5">
          <input
            type="email"
            required
            placeholder="Correo electrónico"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-5">
          <input
            type="password"
            required
            placeholder="Contraseña"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {error && <p className="text-red-600 mb-4">{error}</p>}

        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-red-800 text-white py-3 rounded-md hover:bg-red-700 transition duration-300 mb-2"
        >
          Iniciar sesión
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
