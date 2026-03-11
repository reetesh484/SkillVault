import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";
import LoadingSpinner from "../components/LoadingSpinner";

const PUBLIC_ONLY_ROUTES = ["/login", "/signup"];

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  // Show loading while restoring session from localStorage
  if (isLoading) {
    return <LoadingSpinner />;
  }

  const isPublicOnly = PUBLIC_ONLY_ROUTES.includes(location.pathname);

  if (!isAuthenticated && !isPublicOnly) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isAuthenticated && isPublicOnly) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
