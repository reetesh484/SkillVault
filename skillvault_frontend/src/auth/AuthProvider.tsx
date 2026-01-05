import React, { createContext, useContext, useEffect, useState } from "react";
import {
  registerUnauthorizedHandler,
  setGlobalAccessToken,
} from "./tokenStore";

type AuthContextType = {
  accesstoken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setToken] = useState<string | null>(null);

  const logout = () => {
    setAccessToken(null);
  };

  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
    registerUnauthorizedHandler(handleUnauthorized);
  }, []);

  const setAccessToken = (token: string | null) => {
    setToken(token);
    setGlobalAccessToken(token);
  };

  return (
    <AuthContext.Provider
      value={{
        accesstoken: accessToken,
        isAuthenticated: !!accessToken,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
