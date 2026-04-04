import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import CategoriesSection from "@/components/landing/CategoriesSection";
import PricingSection from "@/components/landing/PricingSection";
import WaitlistSection from "@/components/landing/WaitlistSection";
import FooterSection from "@/components/landing/FooterSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white overflow-x-hidden">
      <HeroSection />
      <FeaturesSection />
      <CategoriesSection />
      <PricingSection />
      <WaitlistSection />
      <FooterSection />
    </main>
  );
}
