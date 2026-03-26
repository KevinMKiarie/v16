import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useMousePosition } from "./hooks/useMousePosition";
import { AuroraBackground } from "./components/AuroraBackground";
import { featuresList } from "./data/features";
import { useCasesList } from "./data/useCases";
import LandingPage from "./pages/LandingPage";
import FeaturePage from "./pages/FeaturePage";
import UseCasePage from "./pages/UseCasePage";
import AffiliatePage from "./pages/AffiliatePage";
import ApisPage from "./pages/ApisPage";
import PrivacyPage from "./pages/PrivacyPage";
import TermsPage from "./pages/TermsPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import CaseStudiesPage from "./pages/CaseStudiesPage";
import CaseStudyDetailsPage from "./pages/CaseStudyDetailsPage";
import DoctrinePage from "./pages/DoctrinePage";
import WhitepapersPage from "./pages/WhitepapersPage";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import PromoBanner, { MiniBanner } from "./components/PromoBanner";
import StickyActionBar from "./components/StickyActionBar";
import SocialShareWidget from "./components/SocialShareWidget";
import AILearnPage from "./pages/AILearnPage";
import ContactPage from "./pages/ContactPage";
import SolutionsPage from "./pages/SolutionsPage";
import InboundSolutionPage from "./pages/InboundSolutionPage";
import DataEnrichmentPage from "./pages/DataEnrichmentPage";
import DealExecutionPage from "./pages/DealExecutionPage";
import OutboundSolutionPage from "./pages/OutboundSolutionPage";
import PricingPage from "./pages/PricingPage";
import StartupProgramPage from "./pages/StartupProgramPage";
import AgenciesPage from "./pages/AgenciesPage";

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const mousePosition = useMousePosition();
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);

  // Get current page from pathname
  const getPageFromPath = (pathname) => {
    if (pathname === "/pricing") return "pricing";
    if (pathname === "/affiliates") return "affiliate";
    if (pathname === "/apis" || pathname === "/api") return "apis";
    const feature = featuresList.find((f) => pathname === `/${f.id}`);
    if (feature) return feature.id;
    const useCase = useCasesList.find((u) => pathname === `/${u.id}`);
    if (useCase) return useCase.id;
    return "home";
  };

  const currentPage = getPageFromPath(location.pathname);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setScrolled(scrollY > 20);
      setShowStickyBar(scrollY > 700);

      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScrollProgress(Number(scroll) * 100);

      // Hide nav while scrolling, show when scrolling stops
      if (scrollY > 50) {
        setIsScrolling(true);
        if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
        scrollTimeoutRef.current = setTimeout(() => {
          setIsScrolling(false);
        }, 300);
      } else {
        setIsScrolling(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
    setActiveMenu(null);
  }, [location.pathname]);

  const handleSetPage = (page) => {
    if (page === "home") {
      navigate("/");
    } else if (page === "pricing") {
      navigate("/pricing");
    } else if (page === "affiliate") {
      navigate("/affiliates");
    } else if (page === "apis" || page === "api") {
      navigate("/apis");
    } else {
      navigate(`/${page}`);
    }
  };

  return (
    <div className="min-h-screen text-zinc-300 font-sans selection:bg-indigo-500/30 selection:text-white overflow-x-hidden bg-[#020203]">
      <AuroraBackground mousePosition={mousePosition} />
      <MiniBanner />
      <StickyActionBar visible={showStickyBar} />
      <SocialShareWidget />
      <Navigation
        scrolled={scrolled}
        isScrolling={isScrolling}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        page={currentPage}
        setPage={handleSetPage}
        activeMenu={activeMenu}
        setActiveMenu={setActiveMenu}
        scrollProgress={scrollProgress}
      />

      <main className="pt-[168px]">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/affiliates" element={<AffiliatePage />} />
          <Route path="/apis" element={<ApisPage />} />
          <Route path="/api" element={<ApisPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/blogs" element={<BlogPage />} />
          <Route path="/blogs/:slug" element={<BlogDetailsPage />} />
          <Route path="/case-studies" element={<CaseStudiesPage />} />
          <Route
            path="/case-studies/:slug"
            element={<CaseStudyDetailsPage />}
          />
          <Route path="/doctrine" element={<DoctrinePage />} />
          <Route path="/learn-about-our-AI" element={<AILearnPage />} />
          <Route path="/whitepapers" element={<WhitepapersPage />} />
          <Route path="/contact-us" element={<ContactPage />} />
          <Route path="/solutions" element={<SolutionsPage />} />
          <Route path="/solutions/inbound" element={<InboundSolutionPage />} />
          <Route
            path="/solutions/data-enrichment"
            element={<DataEnrichmentPage />}
          />
          <Route
            path="/solutions/deal-execution"
            element={<DealExecutionPage />}
          />
          <Route
            path="/solutions/outbound"
            element={<OutboundSolutionPage />}
          />
          <Route path="resources/start-up" element={<StartupProgramPage />} />
          <Route path="/agencies" element={<AgenciesPage />} />

          {featuresList.map((feature) => (
            <Route
              key={feature.id}
              path={`/${feature.id}`}
              element={<FeaturePage feature={feature} />}
            />
          ))}
          {useCasesList.map((useCase) => (
            <Route
              key={useCase.id}
              path={`/${useCase.id}`}
              element={<UseCasePage useCase={useCase} />}
            />
          ))}
          <Route path="*" element={<LandingPage />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}
