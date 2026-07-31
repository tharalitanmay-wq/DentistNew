'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

interface AdminAuthContextType {
  user: AdminUser | null;
  token: string | null;
  login: (token: string, user: AdminUser) => void;
  logout: () => void;
  isLoading: boolean;
}

const AdminAuthContext = createContext<AdminAuthContextType>({
  user: null,
  token: null,
  login: () => {},
  logout: () => {},
  isLoading: true,
});

export const AdminAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('lumina_admin_token');
    const savedUser = localStorage.getItem('lumina_admin_user');
    if (savedToken && savedUser) {
      setToken(savedToken);
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error(e);
      }
    } else {
      // Default to Master Admin demo state for instant testing
      const demoAdmin = {
        id: 'usr-admin-1',
        name: 'Master Admin',
        email: 'admin@lumina-dental.com',
        role: 'admin'
      };
      setToken('mock_admin_token_2026');
      setUser(demoAdmin);
    }
    setIsLoading(false);
  }, []);

  const login = (newToken: string, newUser: AdminUser) => {
    setToken(newToken);
    setUser(newUser);
    localStorage.setItem('lumina_admin_token', newToken);
    localStorage.setItem('lumina_admin_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('lumina_admin_token');
    localStorage.removeItem('lumina_admin_user');
  };

  return (
    <AdminAuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => useContext(AdminAuthContext);
