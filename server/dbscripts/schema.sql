CREATE DATABASE IF NOT EXISTS schedule;
USE schedule;

CREATE TABLE employees (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    roles VARCHAR(100) NOT NULL,
    availability JSON NOT NULL
);

CREATE TABLE schedules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE schedule_assignments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  schedule_id INT NOT NULL,
  employee_id INT NOT NULL,
  role ENUM('Aide', 'Med Tech', 'Manager', 'Security') NOT NULL,
  date DATE NOT NULL,
  shift ENUM('AM', 'EVE', 'NOC') NOT NULL,
  FOREIGN KEY (schedule_id) REFERENCES schedules(id),
  FOREIGN KEY (employee_id) REFERENCES employees(id)
);

