CREATE DATABASE IF NOT EXISTS schedule;
USE schedule;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_name VARCHAR(100) NOT NULL
);

CREATE TABLE roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(20) NOT NULL UNIQUE
);

-- Create Employee-Roles Relationship Table (Many-to-Many)
CREATE TABLE employee_roles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    role_id INT NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE
);

-- Create Shift Times Table
CREATE TABLE shifts (
    id INT AUTO_INCREMENT PRIMARY KEY,
    shift_name VARCHAR(20) NOT NULL UNIQUE
);

CREATE TABLE employee_availability (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    available_day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE
);

-- Create Schedules Table (Stores Shift Assignments)
CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    employee_id INT NOT NULL,
    role_id INT NOT NULL,
    shift_id INT NOT NULL,
    schedule_date DATE NOT NULL,
    status ENUM('pending', 'finalized') NOT NULL DEFAULT 'pending',
    FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
    FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE CASCADE,
    FOREIGN KEY (shift_id) REFERENCES shifts(id) ON DELETE CASCADE
);

-- Create Schedule Batches Table (Groups Schedules by Month)
CREATE TABLE schedule_batches (
    id INT AUTO_INCREMENT PRIMARY KEY,
    schedule_month INT NOT NULL CHECK (schedule_month >= 1 AND schedule_month <= 12), 
    schedule_year INT NOT NULL CHECK (schedule_year >= 2024),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);