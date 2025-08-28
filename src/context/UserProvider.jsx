import React, { createContext, useContext, useEffect, useState } from 'react';
const Context = createContext();

export const useUserContext = () => useContext(Context);

export default function UserProvider({ children }) {
  // Try to load user and token from localStorage
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [token, setToken] = useState(() => localStorage.getItem('token') || '');

  // Add user (and token) after login/signup
  const addUser = (userData, jwtToken) => {
    setUser(userData);
    setToken(jwtToken);
  };

  // Logout clears data
  const logout = () => {
    setUser(null);
    setToken('');
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  // Store to localStorage whenever user/token changes
  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
    if (token) localStorage.setItem('token', token);
    else localStorage.removeItem('token');
  }, [user, token]);

  return (
    <Context.Provider value={{ user, token, addUser, logout }}>
      {children}
    </Context.Provider>
  );
}
