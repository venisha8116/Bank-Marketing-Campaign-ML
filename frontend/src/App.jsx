import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppShell from "./components/layout/AppShell";
import Landing from "./pages/Landing/Landing";
import Dashboard from "./pages/Dashboard/Dashboard";
import Dataset from "./pages/Dataset/Dataset";
import EDA from "./pages/EDA/EDA";
import Evaluation from "./pages/Evaluation/Evaluation";
import Prediction from "./pages/Prediction/Prediction";
import About from "./pages/About/About";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route element={<AppShell />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/dataset" element={<Dataset />} />
          <Route path="/eda" element={<EDA />} />
          <Route path="/evaluation" element={<Evaluation />} />
          <Route path="/about" element={<About />} />
          <Route path="/project" element={<Navigate to="/dashboard" replace />} />
          <Route path="/preprocessing" element={<Navigate to="/dashboard" replace />} />
          <Route path="/models" element={<Navigate to="/evaluation" replace />} />
          <Route path="/models/:modelName" element={<Navigate to="/evaluation" replace />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
