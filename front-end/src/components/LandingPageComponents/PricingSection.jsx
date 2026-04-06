import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function PricingSection() {
  const navigate = useNavigate();

  const plans = [
    {
      name: "Monthly Plan",
      price: "$5",
      duration: "/month",
      desc: "Perfect for short-term job hunting",
      features: [
        "Unlimited resume generations",
        "Access to all templates",
        "Job-specific tailoring",
        "Priority AI processing",
      ],
    },
    {
      name: "Quarterly Plan",
      price: "$12",
      duration: "/3 months",
      desc: "Best value for consistent applications",
      features: [
        "Everything in Monthly Plan",
        "Save multiple resumes",
        "Faster processing",
        "Better value for money",
      ],
      popular: true,
    },
  ];

  return (
    <div className="mt-32 px-6 text-center text-white">
      <h2 className="text-3xl font-bold">Simple Pricing</h2>
      <p className="mt-4 text-gray-300">
        Choose a plan that fits your job search journey
      </p>

      <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        {plans.map((plan, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className={`p-8 rounded-2xl backdrop-blur-lg border shadow-lg transition ${
              plan.popular
                ? "bg-white/15 border-white/20"
                : "bg-white/10 border-white/10"
            }`}
          >
            <h3 className="text-2xl font-semibold">{plan.name}</h3>

            <div className="mt-4 text-4xl font-bold">
              {plan.price}
              <span className="text-lg text-gray-300">{plan.duration}</span>
            </div>

            <p className="mt-3 text-gray-300 text-sm">{plan.desc}</p>

            <ul className="mt-6 space-y-2 text-sm text-gray-200">
              {plan.features.map((feature, i) => (
                <li key={i}>• {feature}</li>
              ))}
            </ul>

            <button
              onClick={() => navigate("/signup")}
              className="mt-8 w-full bg-white text-purple-700 py-3 rounded-full font-semibold hover:scale-105 transition"
            >
              {plan.popular ? "Choose Quarterly Plan" : "Choose Monthly Plan"}
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
