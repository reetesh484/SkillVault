import { AddConceptForm } from "@/components/ConceptForm";
import { Login } from "@/components/LoginForm";
import { ProtectedLayout } from "@/layout/ProtectedLayout";
import PublicLayout from "@/layout/PublicLayout";
import AddConcept from "@/pages/AddConcept";
import Signup from "@/pages/auth/Signup";
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

      {/* Protected Routes */}
      <Route element={<ProtectedLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/infinite-scroll" element={<InfiniteScroll />} />
        <Route path="/add-concept" element={<AddConcept />} />
        <Route path="/concepts/:id/edit" element={<AddConceptForm />} />
      </Route>
    </Routes>
  );
};
