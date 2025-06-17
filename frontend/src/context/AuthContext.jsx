import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  const login = (email, password) => {
    setCurrentUser({ email }); 
  };

  const register = (email, password) => {
    setCurrentUser({ email }); 
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem("token"); 
  };

  return (
    <AuthContext.Provider value={{ currentUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
