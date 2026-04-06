import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import ResumeAnalyzer from "./pages/ResumeAnalyzer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/analyze" element={<ResumeAnalyzer />} />
    </Routes>
  );
}

export default App;
