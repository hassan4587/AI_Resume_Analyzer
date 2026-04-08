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
