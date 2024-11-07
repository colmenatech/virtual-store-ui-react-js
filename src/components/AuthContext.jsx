// src/components/AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user almacenará el tipo de usuario: 'cliente' o 'admin'

  const login = (userType) => {
    setUser({ type: userType }); // Almacena un objeto con el tipo de usuario
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
