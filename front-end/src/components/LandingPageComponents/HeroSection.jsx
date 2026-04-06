import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { fadeUp } from "../../constants/animations";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center text-center px-6 pt-40">
      <motion.h1
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6 }}
        className="text-5xl font-bold leading-tight max-w-3xl"
      >
        Facing difficulty in landing interviews?
      </motion.h1>

      <motion.p
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="mt-6 text-lg max-w-xl text-gray-200"
      >
        Analyze, improve, and tailor your resume using AI to increase your
        chances of getting hired.
      </motion.p>

      <motion.button
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ delay: 0.4, duration: 0.6 }}
        whileHover={{ scale: 1.08 }}
        onClick={() => navigate("/signup")}
        className="mt-8 bg-white text-purple-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
      >
        Let's Get You Hired
      </motion.button>

      <p className="mt-3 text-sm text-gray-300">
        No credit card required • Free credits on signup
      </p>
    </div>
  );
}
