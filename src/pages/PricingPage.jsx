import PricingSection from "../sections/PricingSection";
import BoosterPacks from "../sections/BoosterPacks";
import ComparisonStack from "../sections/ComparisonStack";
import FAQSection from "../sections/FAQSection";
import CTASection from "../sections/CTASection";
import IntercomWidget from "../components/IntercomWidget";
import ROICalculator from "@/components/ROICalculator";

export default function PricingPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-400">
      <IntercomWidget />
      <ComparisonStack />
      <PricingSection />
      {/* <BoosterPacks /> */}
      <ROICalculator />
      <FAQSection />
      <CTASection />
    </div>
  );
}
