import React, { createContext, useState } from 'react';

// Crea el contexto de autenticación
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [showRandomProducts, setShowRandomProducts] = useState(true);

  const login = (username, userType) => {
    setUser({ username, type: userType });
  };

  const logout = () => {
    setUser(null);
    setShowRandomProducts(true);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, showRandomProducts, setShowRandomProducts }}>
      {children}
    </AuthContext.Provider>
  );
}
