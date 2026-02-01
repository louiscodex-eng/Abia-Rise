import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ModifyDetails from "./Pages/ModifyDetails";
import ResetPassword from "./Pages/ResetPassword";

function App() {
  return (
    <Router>
      <Routes>
        {/* 👇 LANDING PAGE */}
        <Route path="/" element={<Navigate to="/register" replace />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/modify-details" element={<ModifyDetails />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </Router>
  );
}

export default App;
