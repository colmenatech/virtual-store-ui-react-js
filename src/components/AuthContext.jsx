import React, { createContext, useState, useEffect } from 'react';

// Crea un contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación que envuelve los componentes hijos
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado
  const [showRandomProducts, setShowRandomProducts] = useState(true); // Estado para mostrar productos aleatorios

  // Hook de efecto que se ejecuta al montar el componente
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const storedUser = JSON.parse(localStorage.getItem('user'));
      // Verificar si el token es válido (esto depende de tu lógica de backend)
      if (storedUser) {
        setUser(storedUser);
      } else {
        logout(); // Si no hay usuario válido, cerramos sesión
      }
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
    // Proveedor de AuthContext que envuelve los componentes hijos
    <AuthContext.Provider
      value={{
        user,                  // Estado del usuario autenticado
        login,                 // Función de inicio de sesión
        logout,                // Función de cierre de sesión
        showRandomProducts,    // Estado para mostrar productos aleatorios
        setShowRandomProducts, // Función para actualizar el estado de mostrar productos aleatorios
      }}
    >
      {children} 
    </AuthContext.Provider>
  );
};