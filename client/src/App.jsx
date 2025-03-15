import { useState, useEffect } from "react";
import { fetchSchedules, fetchAvailability } from "./services/api";
import { Button } from "./components/ui/button.jsx";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Info } from "lucide-react";
import { Terminal } from "lucide-react"



function App() {
  const [schedules, setSchedules] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      try {
        const schedulesData = await fetchSchedules();
        console.log("Fetched schedules:", JSON.stringify(schedulesData, null, 2)); // Debugging
        const availabilityData = await fetchAvailability();
        console.log("Fetched availability:", JSON.stringify(availabilityData, null, 2)); // Debugging

        // Ensure schedules and availability are arrays before setting state
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
    <div className="p-6">
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components and dependencies dynamically.
        </AlertDescription>
      </Alert>
      <Alert>
        <Terminal className="h-4 w-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          You can add components to your app using the cli.
        </AlertDescription>
      </Alert>
      <h1 className="text-2xl font-bold text-blue-500">Schedule Planner</h1>
      <h2 className="text-xl font-semibold mt-4">Schedules</h2>
      {loading ? (
        <p>Loading schedules...</p>
      ) : schedules.length > 0 ? (
        <ul className="list-disc list-inside">
          {schedules.map((schedule, index) => (
            <li key={index} className="text-gray-700">
              Employee: {schedule.employee_name}
            </li>
          ))}
        </ul>
      ) : (
        <p>No schedules found.</p>
      )}

      <h2 className="text-xl font-semibold mt-4">Employee Availability</h2>
      {loading ? (
        <p>Loading availability...</p>
      ) : availability.length > 0 ? (
        <ul className="list-disc list-inside">
          {availability.map((entry, index) => (
            <li key={index} className="text-gray-700">
              Employee ID: {entry.employee_id}, Available Day: {entry.available_day}
            </li>
          ))}
        </ul>
      ) : (
        <p>No availability data found.</p>
      )}
    </div>
  );
}

export default App;