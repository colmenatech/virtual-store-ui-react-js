import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [showRandomProducts, setShowRandomProducts] = useState(true);

  const login = (username, type) => {
    setUser({ username, type });
    setShowRandomProducts(false);
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
};
