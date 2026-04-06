import { motion } from "framer-motion";
import { fadeUp } from "../../constants/animations";
import { FEATURES } from "../../constants/landingData";

export default function FeaturesSection() {
  return (
    <motion.div
      className="mt-32 px-8 grid md:grid-cols-3 gap-8 text-center"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ staggerChildren: 0.2 }}
    >
      {FEATURES.map((feature) => (
        <motion.div
          key={feature.title}
          variants={fadeUp}
          className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10"
        >
          <h3 className="text-xl font-semibold">{feature.title}</h3>
          <p className="mt-3 text-sm text-gray-200">{feature.desc}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}
