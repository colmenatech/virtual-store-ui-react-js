import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUp = () => {
  const navigate = useNavigate();

  // Estado para los datos del formulario y los mensajes de error
  const [formData, setFormData] = useState({
    name: '', // Campo para el nombre
    email: '', // Campo para el correo electrónico
    password: '', // Campo para la contraseña
    password_confirmation: ''  // Asegúrate de que coincida con el atributo name en tu campo de entrada
  });
  const [error, setError] = useState(''); // Estado para manejar los errores

  const handleLoginClick = () => {
    navigate('/login'); // Redirige a la página de inicio de sesión
  };

  // Función para manejar el cambio de valores en el formulario
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value // Actualiza el estado del formulario con el nuevo valor
    });
  };

 // Función para manejar el envío del formulario
const handleSubmit = async (e) => {
  e.preventDefault(); // Previene la acción por defecto del formulario (recargar la página)

  if (formData.password !== formData.password_confirmation) {
    setError("Las contraseñas no coinciden."); // Establece el mensaje de error si las contraseñas no coinciden
    return;
  }

  try {
    // Limpia el mensaje de error
    setError('');

    // Realiza la solicitud POST a la API de registro en Laravel
    const response = await axios.post('http://localhost:8000/api/register', {
      name: formData.name,
      email: formData.email,
      password: formData.password,
      password_confirmation: formData.password_confirmation
    });
    console.log(response.data); // Muestra la respuesta de la API en consola

    // Redirige al usuario a la página de inicio de sesión después del registro exitoso
    navigate('/login');
  } catch (error) {
    console.error("Error en el registro:", error); // Muestra el error en consola
    setError("Hubo un problema con el registro."); // Establece un mensaje de error para mostrar al usuario
  }
};

  return (
    <div className="max-w-md p-10 mx-auto my-24 bg-gray-200 shadow-lg rounded-lg text-center">
      <h1 className="text-3xl mb-5">Bienvenidos</h1>
      <h2 className="text-xl mb-5">Registrarse</h2>

      {error && <p className="text-red-600 mb-4">{error}</p>} {/* Muestra el mensaje de error */}

      <form onSubmit={handleSubmit}>
      <div className="mb-5">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          placeholder="Nombre Completo"
          autocomplete="off" // Añadido aquí para desactivar el autocompletado
          className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>
      <div className="mb-5">
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="Correo Electrónico"
          autocomplete="off" // Añadido aquí para desactivar el autocompletado
          className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>
      <div className="mb-5">
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
          placeholder="Contraseña"
          autocomplete="off" // Añadido aquí para desactivar el autocompletado
          className="w-full p-2 mb-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600"
        />
      </div>
      <div className="mb-5">
        <input
          type="password"
          name="password_confirmation"
          value={formData.password_confirmation}
          onChange={handleChange}
          required
          placeholder="Confirmar Contraseña"
          autocomplete="off" // Añadido aquí para desactivar el autocompletado
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