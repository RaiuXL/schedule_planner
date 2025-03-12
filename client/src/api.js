export const fetchSchedules = async () => {
    const response = await fetch("/api/schedules");
    return response.json();
};

export const fetchAvailability = async () => {
    const response = await fetch("/api/availability");
    return response.json();
};