# Schedule Planner 📅
Schedule Planner is a modern employee scheduling tool designed to simplify role-based shift planning in workplace environments like assisted living or healthcare. It supports calendar-style views, tracks employee availability, and allows easy CRUD operations for employee data.

Built with React 19 and Tailwind CSS v4 (shadcn-ui), it features a clean UI and a robust Express.js + MySQL backend, running inside Docker containers for development convenience.

## Features
- **Employee Management**
  - Add/edit/delete employees with role and availability tracking
  - Search employees by name
- **Role-Based Scheduling (in progress)**
  - Assign roles and shifts per day
  - Prevent over-scheduling (planned constraint: max 40 hrs/week)
- **Modern UI**
  - Built with React 19, Vite, Tailwind CSS v4, and shadcn-ui
  - Responsive and clean design
- **Backend API**
  - RESTful API built with Express.js
  - Secure data handling with MySQL (via Docker)
- **Dev Tools**
  - Dockerized MySQL + phpMyAdmin
  - React Hook Form + Zod for validation

## Database ERD
**Entities:**  
- `employees`  
- `roles`  
- `shifts`  
- `employee_roles` (many-to-many)  
- `employee_availability`
![Untitled](https://github.com/user-attachments/assets/f00d776c-ac1b-4d3b-9fa3-97f688bf5422)

## Installation
Prerequisites
- Node.js v20+
- npm v10+
- Docker + Docker Compose

1. Clone the repository: git clone https://github.com/RaiuXL/schedule_planner.git
2. Navigate to the project folder: cd schedule_planner
3. Install dependencies: npm install
4. Start docker compose to launch MySQL and phpMyAdmin
5. Start the backend: cd server npm start
6. Start the frontend: cd client npm start
7. Open local host in your browser

## Technologies Used
- **Frontend:** React 19, Vite, Tailwind CSS v4, shadcn-ui
- **Form Validation:** React Hook Form + Zod
- **Backend:** Express.js (Node.js)
- **Database Management:** MySQL (Dockerized)
- **Tools:** GitHub, Docker, phpMyAdmin

## License
MIT License
