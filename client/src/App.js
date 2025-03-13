import React, { useEffect, useState } from 'react';
import { fetchSchedules, fetchAvailability } from "./services/api";

const App = () => {
    const [schedules, setSchedules] = useState([]);
    const [availability, setAvailability] = useState([]);
    const [loadingSchedules, setLoadingSchedules] = useState(true);
    const [loadingAvailability, setLoadingAvailability] = useState(true);

    useEffect(() => {
        fetchSchedules()
            .then(data => {
                setSchedules(data.schedules);
                setLoadingSchedules(false);
            })
            .catch(error => {
                console.error("Error fetching schedules:", error);
                setLoadingSchedules(false);
            });

        fetchAvailability()
            .then(data => {
                setAvailability(data.availability);
                setLoadingAvailability(false);
            })
            .catch(error => {
                console.error("Error fetching availability:", error);
                setLoadingAvailability(false);
            });
    }, []);

    return (
        <div>
            <h1>Schedule Planner</h1>

            <h2>Schedules</h2>
            {loadingSchedules ? (
                <p>Loading schedules...</p>
            ) : (
                <ul>
                    {schedules.map((schedule) => (
                        <li key={schedule.id}>
                            Employee: {schedule.employee_name}
                        </li>
                    ))}
                </ul>
            )}

            <h2>Employee Availability</h2>
            {loadingAvailability ? (
                <p>Loading availability...</p>
            ) : (
                <ul>
                    {availability.map((entry, index) => (
                        <li key={index}>
                            Employee ID: {entry.employee_id}, Available Day: {entry.available_day}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default App;