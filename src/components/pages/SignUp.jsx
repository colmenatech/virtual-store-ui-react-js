import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles.css';

const SignUp = () => {
  const navigate = useNavigate(); // Hook para manejar la navegación entre rutas

  const handleLoginClick = () => {
    navigate('/login'); // Función que redirige a la página de inicio de sesión
  };

  return (
    <div className="signup-box"> {/* Contenedor principal del formulario de registro */}
      <h1>Bienvenidos</h1> {/* Título principal */}
      <h2>Registrarse</h2> {/* Subtítulo para el formulario */}
      <form> {/* Formulario de registro */}
        <div className="user-box">
          <label>Nombre</label> {/* Etiqueta para el campo de nombre */}
          <input type="text" name="firstname" required /> {/* Campo de entrada para el nombre */}
        </div>
        <div className="user-box">
          <label>Apellido</label> {/* Etiqueta para el campo de apellido */}
          <input type="text" name="lastname" required /> {/* Campo de entrada para el apellido */}
        </div>
        <div className="user-box">
          <label>Correo Electrónico</label> {/* Etiqueta para el correo electrónico */}
          <input type="email" name="email" required /> {/* Campo de entrada para el correo electrónico */}
        </div>
        <div className="user-box">
          <label>Contraseña</label> {/* Etiqueta para la contraseña */}
          <input type="password" name="password" required /> {/* Campo de entrada para la contraseña */}
        </div>
        <button type="submit">Registrarse</button> {/* Botón para enviar el formulario */}
        <button type="button" onClick={handleLoginClick}>Regresar</button> {/* Botón que redirige al inicio de sesión */}
      </form>
    </div>
  );
};

export default SignUp; // Exporta el componente para ser usado en otras partes de la aplicación
