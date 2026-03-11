import React, { createContext, useContext, useEffect, useState } from "react";
import {
  registerUnauthorizedHandler,
  setGlobalAccessToken,
  registerTokenUpdatedHandler,
} from "./tokenStore";
import { refreshToken } from "../api/auth";

type AuthContextType = {
  accesstoken: string | null;
  isAuthenticated: boolean;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [accessToken, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Restore session from refresh token cookie on mount
  useEffect(() => {
    const restoreSession = async () => {
      try {
        // Attempt to refresh token from HttpOnly cookie
        const newToken = await refreshToken();
        if (newToken) {
          setToken(newToken);
          setGlobalAccessToken(newToken);
        }
      } catch (error) {
        // No valid refresh token, user is logged out
        console.log("No active session found");
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Handle token updates from API interceptor
  useEffect(() => {
    const handleTokenUpdated = (token: string | null) => {
      setToken(token);
    };
    registerTokenUpdatedHandler(handleTokenUpdated);
  }, []);

  // Handle unauthorized (logout)
  useEffect(() => {
    const handleUnauthorized = () => {
      logout();
    };
    registerUnauthorizedHandler(handleUnauthorized);
  }, []);

  const logout = () => {
    setToken(null);
    setGlobalAccessToken(null);
  };

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
        isLoading,
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
