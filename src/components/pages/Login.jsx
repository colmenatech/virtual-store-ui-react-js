import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/login.css'; // Importa el archivo de estilos desde la carpeta superior

const Login = () => {
  const navigate = useNavigate(); // Hook para la navegación entre rutas
  

  const handleSignUpClick = () => {
    navigate('/signup'); // Redirige al usuario a la página de registro cuando se haga clic en el botón
  };

  return (
    <div className="login-box">
      <h1>Bienvenidos</h1> {/* Título principal */}
      <h2>Iniciar Sesión</h2> {/* Subtítulo para el inicio de sesión */}
      <form>
        <div className="user-box">
          <input type="text" name="username" required placeholder="Nombre de Usuario" /> {/* Campo de entrada para el nombre de usuario */}
        </div>
        <div className="user-box">
          <input type="password" name="password" required placeholder="Contraseña" /> {/* Campo de entrada para la contraseña */}
        </div>
        <button type="submit">Iniciar Sesión</button>  {/* Botón para enviar el formulario */}
        <button type="button_regis" onClick={handleSignUpClick}>Registrarse</button> {/* Botón que redirige a la página de registro */}
        <button type="button_sala" onClick={() => navigate('/sala')}>Ir a Sala</button>
      </form>
    </div>
  );
};

export default Login; 
// Exporta el componente para que pueda ser utilizado en otras partes de la aplicación
