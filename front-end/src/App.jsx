import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import DashboardPage from "./pages/DashboardPage";
function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analyze" element={<ResumeAnalyzer />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
}

export default App;
