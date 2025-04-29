import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="p-4 flex items-center justify-between">
      <div>
        Schedule Planner
      </div>
      <div className="hidden md:flex space-x-6">
        <Link to="/">Dashboard</Link>
        <Link to="/employees">Employees</Link>
        <Link to="/schedule">Schedules</Link>
      </div>
      <div>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;