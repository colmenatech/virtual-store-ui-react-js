import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, isLoggedIn }) => {
  if (!isLoggedIn) {
    alert("Inicia sesión para tener acceso a esto"); // O usa un modal para una mejor experiencia de usuario
    return <Navigate to="/login" replace />;
  }
  return children;
};

export default ProtectedRoute;
