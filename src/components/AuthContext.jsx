import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Estado para el usuario autenticado
  const [showRandomProducts, setShowRandomProducts] = useState(true); // Estado para mostrar productos aleatorios

  useEffect(() => {
    const user = localStorage.getItem('user')
    const token = localStorage.getItem('token');
    if (!token) { return; }
    if (!user || user == 'undefined') { return logout(); }
    const storedUser = JSON.parse(localStorage.getItem('user'));
    // Verificar si el token es válido (esto depende de tu lógica de backend)
    setUser(storedUser);
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