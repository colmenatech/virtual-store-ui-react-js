// Importa useContext, useState, y useEffect desde React
import React, { useContext, useState, useEffect } from 'react';

// Importa useNavigate desde react-router-dom para la navegación
import { useNavigate } from 'react-router-dom';

// Importa AuthContext desde AuthContext.js
import { AuthContext } from './AuthContext';

// Importa axios para realizar solicitudes HTTP
import axios from 'axios';
import Cookies from 'js-cookie';

const Login = () => {
  const { login, setShowRandomProducts } = useContext(AuthContext); // Obtiene login y setShowRandomProducts del contexto de autenticación
  const navigate = useNavigate(); // Hook de navegación para redirigir a diferentes rutas

  const [email, setEmail] = useState(''); // Estado para el campo de correo electrónico
  const [password, setPassword] = useState(''); // Estado para el campo de contraseña
  const [error, setError] = useState(''); // Estado para manejar mensajes de error

  // Ocultar productos aleatorios en la página de login
  useEffect(() => {
    setShowRandomProducts(false); // Cambia el estado para no mostrar productos aleatorios
  }, [setShowRandomProducts]);

 

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Por favor, complete todos los campos'); // Muestra un mensaje de error si falta algún campo
      return;
    }
  
    try {
      // Realiza una solicitud POST a la API de login con los datos de email y password
      const response = await axios.post('http://localhost:8000/api/login', {
        email,

        password,
      }, {
        //withCredentials: true, // Esto asegura que las cookies se envíen y reciban automáticamente
      });

      if (response.status === 200) {
        // Desestructura el token y la información del usuario de la respuesta
        const { token, user } = response.data;

  
        // Guardar el token y los datos del usuario en cookies
        Cookies.set('token', token, { expires: 2, path: '/' }); // Expira en 2 días
        Cookies.set('user', JSON.stringify(user), { expires: 2, path: '/' });
  
        // Actualizar contexto con la información del usuario
        login(user.email, user.roles[0]); // Suponiendo que roles es un array y tomamos el primer rol
  
        // Redirigir según el rol del usuario

    
        // Guarda el token en el almacenamiento local del navegador
        localStorage.setItem('token', token);
        // Guarda la información del usuario en el almacenamiento local, en formato JSON
        localStorage.setItem('user', JSON.stringify(user));
    
        // Actualiza el contexto de autenticación con la información del usuario
        login(user.email, user.roles[0]); // Suponiendo que roles es un array y tomamos el primer rol
    
        // Redirige al usuario según su rol

        if (user.roles.includes('admin')) {
          navigate('/interfazadmin'); // Redirige a la interfaz de administrador si el usuario tiene rol de admin
        } else {
          navigate('/user'); // Redirige a la interfaz de usuario regular si no es admin
        }
      }
    } catch (error) {
      // Manejo de errores en caso de que la respuesta de la API indique un fallo
      if (error.response && error.response.status === 401) {
        setError('Correo o contraseña incorrectos'); // Mensaje de error para credenciales incorrectas
      } else {
        setError('Ocurrió un error, por favor intente nuevamente'); // Mensaje de error genérico
      }
      // Imprime el error en la consola para depuración
      console.error('Error en el login:', error);
    }
  };
  

  // Función para manejar el clic en el botón de registro
  const handleSignUpClick = () => {
    // Utiliza el hook de navegación para redirigir a la página de registro
    navigate('/signup');
  };  

  return (
    // Contenedor principal del formulario de inicio de sesión, con estilos de Tailwind CSS
    <div className="max-w-md p-10 mx-auto my-24 bg-gray-200 shadow-lg rounded-lg text-center">
      {/* Título principal de bienvenida */}
      <h1 className="text-3xl mb-5">Bienvenidos</h1>
      {/* Subtítulo indicando que es la sección de iniciar sesión */}
      <h2 className="text-xl mb-5">Iniciar Sesión</h2>
      {/* Inicio del formulario */}
      <form>
        <div className="mb-5">
          {/* Campo de entrada para el correo electrónico del usuario */}
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
          {/* Campo de entrada para la contraseña del usuario */}
          <input
            type="password"
            required
            placeholder="Contraseña"
            className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
  
        {/* Mensaje de error, visible solo si existe un error */}
        {error && <p className="text-red-600 mb-4">{error}</p>}
  
        {/* Botón para enviar el formulario e iniciar sesión */}
        <button
          type="button"
          onClick={handleLogin}
          className="w-full bg-red-800 text-white py-3 rounded-md hover:bg-red-700 transition duration-300 mb-2"
        >
          Iniciar sesión
        </button>
  
        {/* Botón para redirigir al formulario de registro */}
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
