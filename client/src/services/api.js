const API_BASE_URL = "http://localhost:7070";

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

export async function deleteEmployee(id) {
    try {
        const response = await fetch(`http://localhost:7070/api/employees/${id}`, {
            method: "DELETE",
        });

        if (!response.ok) throw new Error("Failed to delete employee");
        return true;
    } catch (err) {
        console.error("Error deleting employee:", err);
        throw err;
    }
}

export async function updateEmployee(id, updatedData) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/employees/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) throw new Error("Failed to update employee");
        return await response.json();
    } catch (error) {
        console.error("Error updating employee:", error);
        throw error;
    }
}

export async function fetchSchedules() {
    try {
        const response = await fetch(`${API_BASE_URL}/api/schedules`);
        if (!response.ok) throw new Error("Failed to fetch schedules");
        return await response.json();
      } catch (error) {
        console.error("Error fetching schedules:", error);
        return [];
      }
}

export async function addSchedule(data) {
    try {
        const response = await fetch(`${API_BASE_URL}/api/schedules`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error adding schedule:", error);
        throw error;
    }
}

export async function deleteSchedule(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/api/schedules/${id}`, {
        method: "DELETE",
      });
  
      if (!response.ok) {
        throw new Error("Failed to delete schedule");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error deleting schedule:", error);
      throw error;
    }
  }