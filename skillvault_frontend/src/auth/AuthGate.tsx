import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./AuthProvider";

const PUBLIC_ONLY_ROUTES = ["/login", "/signup"];

export const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  console.log("AuthGate isAuthenticated:", isAuthenticated);

  const isPublicOnly = PUBLIC_ONLY_ROUTES.includes(location.pathname);

  if (!isAuthenticated && !isPublicOnly) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (isAuthenticated && isPublicOnly) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};
