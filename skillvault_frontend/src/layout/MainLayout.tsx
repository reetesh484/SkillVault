import { ModeToggle } from "@/components/ModeToggle";
import { Link } from "react-router-dom";

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
      <nav className="border-b dark:border-gray-800 p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/login" className="hover:underline">
            Login
          </Link>
          <Link to="/infinite-scroll" className="hover:underline">
            Infinite Scroll
          </Link>
          <Link to="/add-concept" className="hover:underline">
            Add Concept
          </Link>
        </div>
        <ModeToggle />
      </nav>
      <main className="p-6 max-w-4xl mx-auto">{children}</main>
    </div>
  );
};
