import { useState, useEffect } from "react";
import { fetchSchedules, fetchAvailability } from "./services/api";

function App() {
  const [schedules, setSchedules] = useState([]);
  const [availability, setAvailability] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      const schedulesData = await fetchSchedules();
      const availabilityData = await fetchAvailability();
      setSchedules(schedulesData.schedules);
      setAvailability(availabilityData.availability);
      setLoading(false);
    }
    getData();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-blue-500">Schedule Planner</h1>

      <h2 className="text-xl font-semibold mt-4">Schedules</h2>
      {loading ? (
        <p>Loading schedules...</p>
      ) : (
        <ul className="list-disc list-inside">
          {schedules.map((schedule) => (
            <li key={schedule.id} className="text-gray-700">
              Employee: {schedule.employee_name}
            </li>
          ))}
        </ul>
      )}

      <h2 className="text-xl font-semibold mt-4">Employee Availability</h2>
      {loading ? (
        <p>Loading availability...</p>
      ) : (
        <ul className="list-disc list-inside">
          {availability.map((entry, index) => (
            <li key={index} className="text-gray-700">
              Employee ID: {entry.employee_id}, Available Day: {entry.available_day}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;