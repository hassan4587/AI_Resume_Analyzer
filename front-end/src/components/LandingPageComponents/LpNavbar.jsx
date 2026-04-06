import { useNavigate } from "react-router-dom";
import { useScrolled } from "../../hooks/useScrolled";

export default function LpNavbar() {
  const navigate = useNavigate();
  const scrolled = useScrolled();

  return (
    <div
      className={`fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-300 ${
        scrolled ? "bg-black/30 backdrop-blur-lg shadow-lg" : "bg-transparent"
      }`}
    >
      <h1 className="text-2xl font-bold tracking-wide">ResumeAI</h1>
      <button
        onClick={() => navigate("/signup")}
        className="bg-white text-purple-700 px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
      >
        Get Started
      </button>
    </div>
  );
}
