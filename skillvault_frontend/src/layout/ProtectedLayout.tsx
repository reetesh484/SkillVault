import { Outlet } from "react-router-dom";
import { AuthGate } from "@/components/AuthGate";
import { MainLayout } from "./MainLayout";

export function ProtectedLayout() {
  return (
    <AuthGate requiresAuth>
      <MainLayout />
    </AuthGate>
  );
}
