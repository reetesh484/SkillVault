import { Outlet } from "react-router-dom";
import { AuthGate } from "@/components/SessionAuthGate";
import { MainLayout } from "./MainLayout";

export function ProtectedLayout() {
  return <MainLayout />;
}
