import { Login } from "@/components/LoginForm";
import { ProtectedLayout } from "@/layout/ProtectedLayout";
import PublicLayout from "@/layout/PublicLayout";
import AddConceptPage from "@/pages/AddConceptPage";
import Signup from "@/pages/auth/Signup";
import { ConceptDetailPage } from "@/pages/ConceptDetailPage";
import Home from "@/pages/Home";
import InfiniteScroll from "@/pages/InfiniteScroll";
import { Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Auth Routes  */}
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>

      {/* Full-screen editor routes — bypass MainLayout padding/max-width */}
      <Route path="/add-concept" element={<AddConceptPage />} />
      <Route path="/concepts/:id/edit" element={<AddConceptPage />} />

      {/* Protected Routes with MainLayout */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        <Route path="/concepts/:id" element={<ConceptDetailPage />} />
      </Route>
    </Routes>
  );
};
