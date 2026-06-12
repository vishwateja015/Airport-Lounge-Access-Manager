import React, { createContext, useContext, useState } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  membershipTier: 'silver' | 'gold' | 'platinum';
  rewardPoints: number;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AUTH_STORAGE_KEY = 'lounge_user';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(AUTH_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      localStorage.removeItem(AUTH_STORAGE_KEY);
      return null;
    }
  });

  const login = async (email: string, password: string) => {
    if (!email || !password) throw new Error('Email and password are required');

    const isAdmin = email.toLowerCase().includes('admin') ||
      email === 'admin@airport.com' ||
      email === 'admin@loungeaccess.com';

    const newUser: User = {
      id: Math.random().toString(36).slice(2),
      email,
      name: email.split('@')[0].replace(/[._]/g, ' ').replace(/\b\w/g, c => c.toUpperCase()),
      role: isAdmin ? 'admin' : 'user',
      membershipTier: isAdmin ? 'platinum' : 'gold',
      rewardPoints: isAdmin ? 9999 : 1250,
    };

    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const register = async (name: string, email: string, _password: string) => {
    const newUser: User = {
      id: Math.random().toString(36).slice(2),
      email,
      name,
      role: 'user',
      membershipTier: 'silver',
      rewardPoints: 100,
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));
    setUser(newUser);
  };

  const logout = () => {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      register,
      logout,
      isAuthenticated: !!user,
      isAdmin: user?.role === 'admin',
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
