import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "@/routes/AppRoutes";
import { Toaster } from "sonner";
import { AuthProvider } from "./auth/AuthProvider";
import { AuthGate } from "./auth/AuthGate";

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <AuthGate>
          <AppRoutes />
        </AuthGate>
        {/* Global toast handler */}
        <Toaster richColors closeButton />
      </Router>
    </AuthProvider>
  );
}
