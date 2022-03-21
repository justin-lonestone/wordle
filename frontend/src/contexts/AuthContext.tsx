import { AUTH_TOKEN } from '../modules/apollo/auth-link/constants';
import React, { createContext, ReactNode, useContext, useMemo, useState } from 'react';

interface AuthContextType {
  token?: string;
  setCurrentToken: (token: string) => void;
  removeCurrentToken: () => void;
}

const AuthContext = createContext<Partial<AuthContextType>>({});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | undefined>(() => {
    const existingToken = localStorage.getItem(AUTH_TOKEN);
    if (existingToken) {
      return existingToken;
    }
  });

  const setCurrentToken = (token: string) => {
    localStorage.setItem(AUTH_TOKEN, token);
    setToken(token);
  };

  const removeCurrentToken = () => {
    localStorage.removeItem(AUTH_TOKEN);
    setToken(undefined);
  };

  const value = useMemo(() => {
    return { token, setCurrentToken, removeCurrentToken };
  }, [token, setCurrentToken, removeCurrentToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
