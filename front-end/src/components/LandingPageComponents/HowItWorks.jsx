import { motion } from "framer-motion";
import { fadeUp } from "../../constants/animations";
import { STEPS } from "../../constants/landingData";

export default function HowItWorks() {
  return (
    <motion.div
      className="mt-32 px-8 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
    >
      <motion.h2 variants={fadeUp} className="text-3xl font-bold">
        How It Works
      </motion.h2>

      <div className="mt-12 grid md:grid-cols-3 gap-10">
        {STEPS.map((step) => (
          <motion.div
            key={step.title}
            variants={fadeUp}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-lg transition"
          >
            <h3 className="text-xl font-semibold">{step.title}</h3>
            <p className="text-sm mt-3 text-gray-200">{step.desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
