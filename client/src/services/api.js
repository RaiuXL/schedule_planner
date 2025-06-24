const API_BASE_URL = "http://localhost:7070"; // Change if needed

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

export async function addEmployee(employeeData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/employees`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(employeeData)
        });

        if (!response.ok) throw new Error("Failed to add employee");
        return await response.json();
    } catch (error) {
        console.error("Error adding employee:", error);
        throw error;
    }
}