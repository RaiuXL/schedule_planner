import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="shadow-md p-4 flex items-center justify-between">
      <div className="text-xl font-bold dark:text-white">
        Schedule Planner
      </div>
      <div className="hidden md:flex space-x-6">
        <Link to="/" className="dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Dashboard
        </Link>
        <Link to="/employees" className="dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Employees
        </Link>
        <Link to="/schedule" className="dark:text-gray-300 hover:text-black dark:hover:text-white transition">
          Schedules
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;