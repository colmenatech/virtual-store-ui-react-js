import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado
  const [showRandomProducts, setShowRandomProducts] = useState(true); // Estado para mostrar productos aleatorios

  const login = (username, type) => {
    setUser({ username, type }); // Configura los datos del usuario
    setShowRandomProducts(false); // Oculta productos aleatorios al iniciar sesión
  };

  const logout = () => {
    setUser(null); // Limpia el estado del usuario
    setShowRandomProducts(true); // Muestra productos aleatorios al cerrar sesión
  };

  return (
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
    </AuthContext.Provider>
  );
};
