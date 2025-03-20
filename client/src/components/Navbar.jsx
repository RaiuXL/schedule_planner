import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-900 shadow-md p-4 flex items-center justify-between">
      <div className="text-xl font-bold text-gray-900 dark:text-white">
        Schedule Planner
      </div>
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Dashboard
        </Link>
        <Link to="/employees" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Employees
        </Link>
        <Link to="/schedule" className="text-gray-600 dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Schedules
        </Link>
      </div>

      {/* Actions (Dark Mode & Login) */}
      <div className="flex items-center space-x-4 text-gray-600">
        <Button variant="outline" size="sm">Darkmode</Button>
      </div>
    </nav>
  );
};

export default Navbar;