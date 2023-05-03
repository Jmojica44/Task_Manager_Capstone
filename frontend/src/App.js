// General Imports
import { Routes, Route } from "react-router-dom";
import "./App.css";

// Pages Imports
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import AddTaskPage from "./components/AddTaskPage/AddTaskPage";
import ViewTaskPage from "./components/ViewTaskPage/ViewTaskPage";
import CalendarPage from "./components/CalendarPage/CalendarPage";

// Component Imports
import Navbar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";

// Util Imports
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/viewtask" element={<ViewTaskPage />} />
        <Route path="/addtask" element={<AddTaskPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
