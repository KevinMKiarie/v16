import HeroSection from "../sections/HeroSection";
import ROICalculator from "../components/ROICalculator";
import SequenceSection from "../sections/SequenceSection";
import SDRSection from "../sections/SDRSection";
import FounderQuote from "../sections/FounderQuote";
import ReviewsSection from "../sections/ReviewsSection";
import CTASection from "../sections/CTASection";
import IntercomWidget from "../components/IntercomWidget";

export default function LandingPage() {
  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-400">
      <IntercomWidget />
      <HeroSection />
      <SequenceSection />
      {/* <SDRSection /> */}
      <FounderQuote />
      <ReviewsSection />
      <CTASection />
    </div>
  );
}
