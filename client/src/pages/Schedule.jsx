import React, { useState, useEffect } from "react";
import { fetchSchedules } from "@/services/api";
import ScheduleTable from "@/features/schedules/ScheduleTable";

const Schedule = () => {
  const [schedules, setSchedules] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const data = await fetchSchedules();
        setSchedules(Array.isArray(data.schedules) ? data.schedules : []);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    })();
  }, []);

  return (
    <div className="p-6">
      <ScheduleTable data={schedules} onScheduleAdded={setSchedules} />
    </div >
  );
};

export default Schedule;