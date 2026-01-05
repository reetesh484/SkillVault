import { useMe } from "@/hooks/useMe";
import { Navigate, useLocation } from "react-router-dom";

//this auth gate is only suited for sessionBased auth

interface AuthGateProps {
  requiresAuth: boolean;
  children: React.ReactNode;
}

export function AuthGate({ requiresAuth, children }: AuthGateProps) {
  const { isLoading, isError } = useMe();
  const location = useLocation();

  //1. Auth unknown → pause
  if (isLoading) {
    return <div>Loading...</div>;
  }

  const isAuthenticated = !isError;

  // 2. Route requires auth, but user is not authenticated
  if (requiresAuth && !isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // 3. Route requires guest, but user *is* authenticated
  if (!requiresAuth && isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
