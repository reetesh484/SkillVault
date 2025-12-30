import { AddConceptForm } from "@/components/ConceptForm";
import { Login } from "@/components/Login";
import AddConcept from "@/pages/AddConcept";
import Home from "@/pages/Home";
import InfiniteScroll from "@/pages/InfiniteScroll";
import { Routes, Route } from "react-router-dom";

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/infinite-scroll" element={<InfiniteScroll />} />
      <Route path="/add-concept" element={<AddConcept />} />
      <Route path="/concepts/:id/edit" element={<AddConceptForm />} />
    </Routes>
  );
};
