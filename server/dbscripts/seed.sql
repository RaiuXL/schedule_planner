USE schedule;

-- Insert Employees
INSERT INTO employees (employee_name) VALUES
('John Doe'),
('Jane Smith'),
('Michael Johnson'),
('Emily Davis'),
('Sarah Brown');

-- Insert Roles
INSERT INTO roles (role_name) VALUES
('Manager'),
('Med Tech'),
('Aide'),
('Security');

-- Assign Roles to Employees (Many-to-Many)
INSERT INTO employee_roles (employee_id, role_id) VALUES
(1, 1), -- John Doe is a Manager
(2, 2), -- Jane Smith is a Med Tech
(3, 3), -- Michael Johnson is an Aide
(4, 4), -- Emily Davis is Security
(5, 3), -- Sarah Brown is an Aide
(5, 2); -- Sarah Brown is also a Med Tech

-- Insert Shift Times
INSERT INTO shifts (shift_name) VALUES
('NOC'),
('AM'),
('EVE');

-- Set Employee Availability
INSERT INTO employee_availability (employee_id, available_day) VALUES
(1, 'Monday'),
(1, 'Tuesday'),
(2, 'Wednesday'),
(3, 'Thursday'),
(3, 'Friday'),
(4, 'Saturday'),
(5, 'Sunday');

-- Add Example Schedules
INSERT INTO schedules (employee_id, role_id, shift_id, schedule_date, status) VALUES
(1, 1, 2, '2024-06-01', 'pending'), -- John Doe, Manager, AM Shift
(2, 2, 3, '2024-06-01', 'pending'), -- Jane Smith, Med Tech, EVE Shift
(3, 3, 1, '2024-06-01', 'finalized'), -- Michael Johnson, Aide, NOC Shift
(4, 4, 3, '2024-06-02', 'pending'), -- Emily Davis, Security, EVE Shift
(5, 3, 2, '2024-06-02', 'finalized'); -- Sarah Brown, Aide, AM Shift

-- Insert Schedule Batches
INSERT INTO schedule_batches (schedule_month, schedule_year) VALUES
(6, 2024), -- June 2024
(7, 2024); -- July 2024