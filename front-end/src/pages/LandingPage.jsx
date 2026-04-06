// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";
// import { useEffect, useState } from "react";
// import PricingSection from "../components/LandingPageComponents/PricingSection";
// import Footer from "../components/LandingPageComponents/Footer";

// export default function LandingPage() {
//   const navigate = useNavigate();
//   const [scrolled, setScrolled] = useState(false);

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 20);
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => window.removeEventListener("scroll", handleScroll);
//   }, []);

//   const fadeUp = {
//     hidden: { opacity: 0, y: 40 },
//     visible: { opacity: 1, y: 0 },
//   };

//   return (
//     <div className="bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700 min-h-screen text-white">
//       {/* Sticky Navbar */}
//       <div
//         className={`fixed top-0 w-full z-50 px-8 py-4 flex justify-between items-center transition-all duration-300 ${
//           scrolled ? "bg-black/30 backdrop-blur-lg shadow-lg" : "bg-transparent"
//         }`}
//       >
//         <h1 className="text-2xl font-bold tracking-wide">ResumeAI</h1>

//         <button
//           onClick={() => navigate("/signup")}
//           className="bg-white text-purple-700 px-5 py-2 rounded-full font-semibold hover:scale-105 transition"
//         >
//           Get Started
//         </button>
//       </div>

//       {/* Hero Section */}
//       <div className="flex flex-col items-center justify-center text-center px-6 pt-40">
//         <motion.h1
//           initial="hidden"
//           animate="visible"
//           variants={fadeUp}
//           transition={{ duration: 0.6 }}
//           className="text-5xl font-bold leading-tight max-w-3xl"
//         >
//           Facing difficulty in landing interviews?
//         </motion.h1>

//         <motion.p
//           initial="hidden"
//           animate="visible"
//           variants={fadeUp}
//           transition={{ delay: 0.2, duration: 0.6 }}
//           className="mt-6 text-lg max-w-xl text-gray-200"
//         >
//           Analyze, improve, and tailor your resume using AI to increase your
//           chances of getting hired.
//         </motion.p>

//         <motion.button
//           initial="hidden"
//           animate="visible"
//           variants={fadeUp}
//           transition={{ delay: 0.4, duration: 0.6 }}
//           whileHover={{ scale: 1.08 }}
//           onClick={() => navigate("/signup")}
//           className="mt-8 bg-white text-purple-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg"
//         >
//           Let’s Get You Hired
//         </motion.button>

//         <p className="mt-3 text-sm text-gray-300">
//           No credit card required • Free credits on signup
//         </p>
//       </div>

//       {/* Features Section */}
//       <motion.div
//         className="mt-32 px-8 grid md:grid-cols-3 gap-8 text-center"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         transition={{ staggerChildren: 0.2 }}
//       >
//         {[
//           {
//             title: "AI Resume Analysis",
//             desc: "Get instant feedback and identify weak areas in your resume.",
//           },
//           {
//             title: "Job-Specific Tailoring",
//             desc: "Customize your resume based on job descriptions.",
//           },
//           {
//             title: "ATS Optimization",
//             desc: "Improve your chances of passing screening systems.",
//           },
//         ].map((item, index) => (
//           <motion.div
//             key={index}
//             variants={fadeUp}
//             className="bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/10"
//           >
//             <h3 className="text-xl font-semibold">{item.title}</h3>
//             <p className="mt-3 text-sm text-gray-200">{item.desc}</p>
//           </motion.div>
//         ))}
//       </motion.div>

//       {/* How It Works */}
//       <motion.div
//         className="mt-32 px-8 text-center"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         transition={{ staggerChildren: 0.2 }}
//       >
//         <motion.h2 variants={fadeUp} className="text-3xl font-bold">
//           How It Works
//         </motion.h2>

//         <div className="mt-12 grid md:grid-cols-3 gap-10">
//           {[
//             {
//               title: "Upload Resume",
//               desc: "Upload your resume quickly and securely.",
//             },
//             {
//               title: "AI Processing",
//               desc: "Get detailed analysis and suggestions.",
//             },
//             {
//               title: "Apply with Confidence",
//               desc: "Use an optimized resume to stand out.",
//             },
//           ].map((step, index) => (
//             <motion.div
//               key={index}
//               variants={fadeUp}
//               whileHover={{ scale: 1.05 }}
//               className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/10 shadow-lg transition"
//             >
//               <h3 className="text-xl font-semibold">{step.title}</h3>
//               <p className="text-sm mt-3 text-gray-200">{step.desc}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//       {/* Bottom CTA */}
//       <motion.div
//         className="mt-32 mb-20 text-center px-6"
//         initial="hidden"
//         whileInView="visible"
//         viewport={{ once: true }}
//         variants={fadeUp}
//       >
//         <h2 className="text-3xl font-bold max-w-2xl mx-auto">
//           Your next opportunity starts with a better resume
//         </h2>

//         <button
//           onClick={() => navigate("/signup")}
//           className="mt-8 bg-white text-purple-700 px-8 py-3 rounded-full text-lg font-semibold shadow-lg hover:scale-105 transition"
//         >
//           Get Started for Free
//         </button>
//       </motion.div>
//       {/* Pricing Section */}
//       <PricingSection />
//       <Footer />
//     </div>
//   );
// }

import HeroSection from "../components/LandingPageComponents/HeroSection";
import FeaturesSection from "../components/LandingPageComponents/FeaturesSection";
import HowItWorks from "../components/LandingPageComponents/HowItWorks";
import BottomCTA from "../components/LandingPageComponents/BottomCTA";
import PricingSection from "../components/LandingPageComponents/PricingSection";
import Footer from "../components/LandingPageComponents/Footer";
import LpNavbar from "../components/LandingPageComponents/LpNavbar";

export default function LandingPage() {
  return (
    <div className="bg-gradient-to-br from-indigo-800 via-purple-800 to-pink-700 min-h-screen text-white">
      <LpNavbar />
      <HeroSection />
      <FeaturesSection />
      <HowItWorks />
      <BottomCTA />
      <PricingSection />
      <Footer />
    </div>
  );
}
