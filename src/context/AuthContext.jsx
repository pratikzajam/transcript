// src/context/AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';

// Create the AuthContext with a display name (for debugging)
const AuthContext = createContext();
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    // Load user from localStorage if available
    try {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse stored user", error);
      return null;
    }
  });

  const [isAuthenticated, setIsAuthenticated] = useState(!!user);

  // Sync auth state when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      setIsAuthenticated(true);
    } else {
      localStorage.removeItem('user');
      setIsAuthenticated(false);
    }
  }, [user]);

  // Login: set user and mark authenticated
  const login = (userData) => {
    setUser(userData);
  };

  // Logout: clear user and unauthenticate
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};
