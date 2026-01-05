import LogoutButton from "@/components/LogoutButton";
import { ModeToggle } from "@/components/ModeToggle";
import { Link, Outlet } from "react-router-dom";

export const MainLayout = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
      <nav className="border-b dark:border-gray-800 p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/" className="hover:underline">
            Concepts
          </Link>
          <Link to="/infinite-scroll" className="hover:underline">
            Infinite Scroll
          </Link>
          <Link to="/add-concept" className="hover:underline">
            Add Concept
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <LogoutButton />
          <ModeToggle />
        </div>
      </nav>
      <main className="p-6 max-w-4xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};
