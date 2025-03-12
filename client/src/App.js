import React, { useEffect, useState } from 'react';

const App = () => {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("/api/schedules") // ✅ Proxy will forward this to backend
            .then(res => res.json())
            .then(data => {
                setSchedules(data.schedules);
                setLoading(false);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h1>Schedule Planner</h1>
            {loading ? (
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
        </div>
    );
};

export default App;