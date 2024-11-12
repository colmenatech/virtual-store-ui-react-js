import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  // user almacenará un objeto con la información del usuario
  const [user, setUser] = useState(null); 

  // Función para iniciar sesión, guardando la información del usuario
  const login = (username, userType) => {
    setUser({ username, type: userType }); // Almacena el nombre de usuario y el tipo de usuario
  };

  // Función para cerrar sesión
  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
