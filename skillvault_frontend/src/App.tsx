import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "@/routes/AppRoutes";
import { Toaster } from "sonner";
import { MainLayout } from "./layout/MainLayout";

export default function App() {
  return (
    <Router>
      <MainLayout>
        <AppRoutes />
      </MainLayout>

      {/* Global toast handler */}
      <Toaster richColors closeButton />
    </Router>
  );
}
