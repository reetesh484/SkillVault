import { ModeToggle } from "@/components/ModeToggle";
import { Link, Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors">
      <nav className="border-b dark:border-gray-800 p-4 flex justify-between items-center">
        <div className="flex gap-4">
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </div>
        <ModeToggle />
      </nav>
      <main className="p-6 flex-1 overflow-auto">
        {/* <div className="border border-red-500 p-4">
          Random div with dummy text Lorem ipsum dolor sit amet consectetur
          adipisicing elit. Aut voluptatibus nesciunt sunt quod assumenda est
          officia rem quas voluptas? Eveniet sint accusantium ut nulla
          laboriosam officiis alias perspiciatis, fuga corrupti.
        </div> */}
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
