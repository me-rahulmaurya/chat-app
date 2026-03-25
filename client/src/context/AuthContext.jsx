import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem('chat-user')) || null
  );

  const login = (userData) => {
    localStorage.setItem('chat-user', JSON.stringify(userData));
    setAuthUser(userData);
  };

  const logout = () => {
    localStorage.removeItem('chat-user');
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};