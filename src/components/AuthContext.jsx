import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext(); // Creación del contexto de autenticación

<<<<<<< Updated upstream
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado
  const [showRandomProducts, setShowRandomProducts] = useState(true); // Estado para mostrar productos aleatorios
=======
export function AuthProvider({ children }) {
  // Estado que almacena la información del usuario autenticado
  const [user, setUser] = useState(null);
  // Estado que controla la visibilidad de los productos aleatorios
  const [showRandomProducts, setShowRandomProducts] = useState(true);
>>>>>>> Stashed changes

  useEffect(() => {
    // Verifica si hay un token en el localStorage y establece el usuario en el estado
    const token = localStorage.getItem('token');
    if (token) {
      // Si hay un token, puedes hacer una solicitud para verificar si el token es válido
      const storedUser = JSON.parse(localStorage.getItem('user'));
      setUser(storedUser);
    }
  }, []);

  const login = (username, type, token) => {
    setUser({ username, type }); // Configura los datos del usuario
    setShowRandomProducts(false); // Oculta productos aleatorios al iniciar sesión
    localStorage.setItem('token', token); // Guarda el token en localStorage
    localStorage.setItem('user', JSON.stringify({ username, type })); // Guarda los datos del usuario en localStorage
  };

  const logout = () => {
    setUser(null); // Limpia el estado del usuario
    setShowRandomProducts(true); // Muestra productos aleatorios al cerrar sesión
    localStorage.removeItem('token'); // Elimina el token del localStorage
    localStorage.removeItem('user'); // Elimina los datos del usuario del localStorage
  };

  return (
<<<<<<< Updated upstream
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        showRandomProducts,
        setShowRandomProducts,
      }}
    >
      {children}
=======
    // Proveedor del contexto de autenticación
    <AuthContext.Provider value={{ user, login, logout, showRandomProducts, setShowRandomProducts }}>
      {children} // Renderiza los componentes hijos que necesitan acceso al contexto
>>>>>>> Stashed changes
    </AuthContext.Provider>
  );
};
