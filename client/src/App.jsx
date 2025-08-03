import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Employees from "./pages/Employees.jsx";
import Schedule from "./pages/Schedule.jsx";
import NotFound from "./pages/NotFound.jsx";
import ScheduleEditorPage from "./features/schedules/ScheduleEditorPage.jsx";
import { Toaster } from 'sonner';

function App() {
  const location = useLocation();
  const isEditorPage = location.pathname.includes("/schedules/") && location.pathname.includes("/edit");

  return (
    <div className="min-h-screen flex flex-col bg-[var(--background)] text-[var(--foreground)]">
      <Navbar />
      <div className={`flex-1 w-full flex flex-col ${isEditorPage ? "" : "items-center px-6"}`}>
        <div className={isEditorPage ? "w-full" : "w-full max-w-screen-xl"}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/schedules/:id/edit" element={<ScheduleEditorPage />} />
          </Routes>
        </div>
      </div>
      <Toaster richColors closeButton />
    </div>

  );
}

export default App;