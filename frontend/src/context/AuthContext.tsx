import React, { createContext, useState, useContext, useEffect } from 'react';
import * as auth from '../utils/auth';

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check for an existing token when the provider mounts
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  // Wrap the auth.ts logout method and update context state
  const logout = async (): Promise<void> => {
    await auth.logout();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};