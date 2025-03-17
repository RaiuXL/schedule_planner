import { useState, useEffect } from "react";
import { fetchSchedules, fetchAvailability } from "./services/api";
// ShadCN UI Components
import { Button } from "./components/ui/button.jsx";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
// Router & Pages
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees.jsx";
import Schedule from "./pages/Schedule.jsx";

function App() {
  const [schedules, setSchedules] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const schedulesData = await fetchSchedules();
        const availabilityData = await fetchAvailability();

        setSchedules(Array.isArray(schedulesData.schedules) ? schedulesData.schedules : []);
        setAvailability(Array.isArray(availabilityData.availability) ? availabilityData.availability : []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 w-full flex flex-col items-center px-6">
        <div className="w-full max-w-screen-xl">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/schedule" element={<Schedule />} />
          </Routes>

        </div>
      </div>

    </div>
  );
}

export default App;