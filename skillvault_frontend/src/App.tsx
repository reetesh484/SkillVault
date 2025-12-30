import { BrowserRouter as Router } from "react-router-dom";
import { AppRoutes } from "@/routes/AppRoutes";
import { Toaster } from "sonner";

export default function App() {
  return (
    <Router>
      <AppRoutes />

      {/* Global toast handler */}
      <Toaster richColors closeButton />
    </Router>
  );
}
