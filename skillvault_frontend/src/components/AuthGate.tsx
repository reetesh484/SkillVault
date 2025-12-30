import { useMe } from "@/hooks/useMe";
import { Navigate } from "react-router-dom";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const { isLoading, isError } = useMe();

  if (isError) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
}
