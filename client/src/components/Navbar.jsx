import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white p-4 w-full shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Schedule Planner</h1>
        <div className="space-x-4">
          <Link to="/" className="hover:underline">Dashboard</Link>
          <Link to="/employees" className="hover:underline">Employees</Link>
          <Link to="/schedule" className="hover:underline">Schedule</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;