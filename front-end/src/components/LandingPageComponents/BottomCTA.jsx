import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeUp } from "../../constants/animations";

export default function BottomCTA() {
  const navigate = useNavigate();

  return (
    <motion.div
      className="mt-32 mb-20 text-center px-6"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
    >
      <h2 className="text-3xl font-bold max-w-2xl mx-auto">
        Your next opportunity starts with a better resume
      </h2>
      <button
        onClick={() => navigate("/signup")}
        className="mt-8 bg-white text-purple-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition"
      >
        Get Started for Free
      </button>
    </motion.div>
  );
}
