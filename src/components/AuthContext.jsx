// src/components/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showRandomProducts, setShowRandomProducts] = useState(true);

  const login = (userType) => {
    setUser({ type: userType });
    setShowRandomProducts(false); // Oculta productos aleatorios al iniciar sesión
  };

  const logout = () => {
    setUser(null);
    setShowRandomProducts(false); // Asegura que se oculte al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, showRandomProducts, setShowRandomProducts }}>
      {children}
    </AuthContext.Provider>
  );
}
