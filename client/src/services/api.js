const API_BASE_URL = "http://localhost:7070"; // Change if needed

export const fetchSchedules = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/schedules`);
        if (!response.ok) throw new Error("Failed to fetch schedules");
        return await response.json();
    } catch (error) {
        console.error("Error fetching schedules:", error);
        return { schedules: [] };
    }
};

export const fetchAvailability = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/api/availability`);
        if (!response.ok) throw new Error("Failed to fetch availability");
        return await response.json();
    } catch (error) {
        console.error("Error fetching availability:", error);
        return { availability: [] };
    }
};

export async function fetchEmployees() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/employees`);
        if (!response.ok) throw new Error("Failed to fetch employees");
        return await response.json();
    } catch (error) {
        console.error("Error fetching employees:", error);
        return { employees: [] };
    }
};