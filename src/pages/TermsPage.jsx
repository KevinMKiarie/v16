import { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  FileText,
  BookOpen,
  CreditCard,
  AlertTriangle,
  Mail,
  ShieldCheck,
  ChevronUp,
  ChevronDown,
} from "lucide-react";

const TermsOfService = () => {
  const [activeSections, setActiveSections] = useState({
    introduction: true,
    communications: true,
    "sensitive-information": true,
    "customer-responsibilities": true,
    "free-trial": true,
    purchases: true,
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionsRef = useRef({});

  const accentColor = "#787ff6";
  const accentColorEnd = "#a87ff6";

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <BookOpen className="text-indigo-400" size={20} />,
      content: `These Terms of Service ("Terms", "Terms of Service") govern your use of our service located at nexuscale.ai operated by 10xEngage ("Company", "Service" "we", "our", "us") and are a legally binding agreement between you and us.

Our privacy policy governs our data collection practices. It is available at nexuscale.ai/privacy

Your agreement with us includes these Terms and our Privacy Policy (jointly referred to as "Agreements"). You acknowledge that you have read and understood Agreements, and agree to be bound by them.

If you do not agree with Agreements, then you must not (and you do not have our permission to) use the Service.

These Terms apply to all visitors, users and others who wish to access or use Service.

We may modify these Terms (as a whole or particular sections of these Terms, as may be applicable) in our sole discretion by posting an updated version of these Terms on nexuscale.ai/terms or otherwise providing notice to you. All such changes shall become effective upon the posting of the revised Terms of Service on the Website or upon notice to you, as applicable.`,
    },
    {
      id: "communications",
      title: "Communications",
      icon: <Mail className="text-indigo-400" size={20} />,
      content: `By creating an Account on our Service, you agree to subscribe to newsletters, marketing or promotional materials and other information we may send. However, you may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send (which will originate from a nexuscale.ai email address).`,
    },
    {
      id: "sensitive-information",
      title: "No Sensitive Information",
      icon: <AlertTriangle className="text-indigo-400" size={20} />,
      content: `YOU ACKNOWLEDGE THAT THE SERVICES HAVE NOT BEEN DESIGNED TO PROCESS OR MANAGE SENSITIVE INFORMATION AND ACCORDINGLY YOU AGREE NOT TO USE THE SUBSCRIPTION SERVICE TO COLLECT, MANAGE OR PROCESS SENSITIVE INFORMATION. WE WILL NOT HAVE AND WE SPECIFICALLY DISCLAIM ANY LIABILITY THAT MAY RESULT FROM YOUR USE OF THE SUBSCRIPTION SERVICE TO COLLECT, PROCESS OR MANAGE SENSITIVE INFORMATION.`,
    },
    {
      id: "customer-responsibilities",
      title: "Customer Responsibilities",
      icon: <ShieldCheck className="text-indigo-400" size={20} />,
      content: `To realize the full value of the Service, your participation and effort are needed. Resources that may be required from you include a project manager, one or more content creators, a sales sponsor, an executive sponsor and a technical resource (or equivalent). Responsibilities that may be required include creating a persona, setting up and monitoring email campaigns, warming-up and adding mailboxes, verifying and adding contact details; acting as internal liaison between sales and marketing; providing top level internal goals for the use of the Service; attending regular success review meetings; and supporting the integration of the Service with other sales and marketing systems.`,
    },
    {
      id: "free-trial",
      title: "Free Trial",
      icon: <FileText className="text-indigo-400" size={20} />,
      content: `10xEngage may, at its sole discretion, offer a Subscription with a free trial for a limited period of time ("Free Trial").

You may be required to enter your billing information in order to sign up for Free Trial.

If you do enter your billing information when signing up for Free Trial, you will not be charged by 10xEngage until Free Trial has expired. On the last day of Free Trial period, unless you cancelled your Subscription, you will be automatically charged the applicable Subscription fees for the type of Subscription you have selected.

At any time and without notice, 10xEngage reserves the right to (i) modify Terms of Service of Free Trial offer, or (ii) cancel such Free Trial offer.

If you register for a free trial, we will make the applicable Service available to you on a trial basis free of charge until the earlier of (a) the end of the free trial period (if not terminated earlier) or (b) the start date of your paid subscription. Unless you purchase a subscription to the Service before the end of the free trial, all of your data in the Service may be permanently deleted at the end of the trial, and we will not recover it. If we include additional terms and conditions on the trial registration web page, those will apply as well.`,
    },
    {
      id: "purchases",
      title: "Purchases",
      icon: <CreditCard className="text-indigo-400" size={20} />,
      content: `If you wish to purchase any product or service made available through Service ("Purchase"), you may be asked to supply certain information relevant to your Purchase including, without limitation, your credit card number, the expiration date of your credit card, your billing address, and your shipping information.

Your payment for the Purchases may be processed by third-party payment processing providers, including, but not limited to, Stripe, PayPal or other banking or payment processing service.

You represent and warrant that: (i) you have the legal right to use any credit card(s) or other payment method(s) in connection with any Purchase; and that (ii) the information you supply to us is true, correct and complete.

By submitting such information, you grant us the right to provide the information to third parties for purposes of facilitating the completion of Purchases.`,
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleSection = (sectionId) => {
    setActiveSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
    if (!activeSections[sectionId] && sectionsRef.current[sectionId]) {
      sectionsRef.current[sectionId].scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#020203] text-zinc-300">
      {/* Hero Section */}
      <div className="pt-20 pb-16 md:pb-20 w-full px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-purple-900/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1
            className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight"
            style={{
              background: `linear-gradient(120deg, ${accentColor} 20%, #ffffff 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Terms of Service
          </h1>
          <p className="text-xl text-zinc-300 max-w-3xl mx-auto leading-relaxed">
            Please read these terms carefully before using our service
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="w-full">
          <div className="mt-8 lg:mt-0">
            {/* Mobile Table of Contents */}
            <div className="lg:hidden mb-8">
              <div className="bg-[#09090B]/50 border border-white/[0.08] rounded-xl p-4 backdrop-blur-sm">
                <h3 className="text-lg font-semibold text-white mb-4">Contents</h3>
                <div className="space-y-2">
                  {sections.map((section) => (
                    <div
                      key={section.id}
                      className="border border-white/[0.08] rounded-lg overflow-hidden bg-[#09090B]/30"
                    >
                      <button
                        className={`w-full flex items-center justify-between p-4 text-left transition-colors ${
                          activeSections[section.id]
                            ? "bg-indigo-500/10 text-indigo-300 border-indigo-500/20"
                            : "bg-[#09090B]/50 text-zinc-300 hover:bg-white/[0.05]"
                        }`}
                        onClick={() => toggleSection(section.id)}
                      >
                        <div className="flex items-center gap-2">
                          {section.icon}
                          <span className="font-medium">{section.title}</span>
                        </div>
                        {activeSections[section.id] ? (
                          <ChevronUp size={20} />
                        ) : (
                          <ChevronDown size={20} />
                        )}
                      </button>
                      {activeSections[section.id] && (
                        <div className="p-4 bg-[#09090B]/50 border-t border-white/[0.08]">
                          <p className="text-zinc-300 whitespace-pre-line leading-relaxed">
                            {section.content}
                          </p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Desktop Content */}
            <div className="hidden lg:block space-y-8">
              {sections.map((section) => (
                <div
                  key={section.id}
                  id={section.id}
                  ref={(el) => (sectionsRef.current[section.id] = el)}
                  className="bg-[#09090B]/50 border border-white/[0.08] rounded-2xl p-8 backdrop-blur-sm hover:border-white/[0.12] transition-all duration-300"
                >
                  <div className="flex items-center mb-6">
                    <span
                      className="p-3 rounded-xl mr-4 border border-white/[0.08]"
                      style={{
                        background: `radial-gradient(circle at 50% 50%, rgba(120, 127, 246, 0.1), rgba(120, 127, 246, 0.0) 70%), ${accentColor}08`,
                      }}
                    >
                      {section.icon}
                    </span>
                    <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  </div>
                  <p className="text-zinc-300 whitespace-pre-line leading-relaxed">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 p-3 rounded-full text-white shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-[#020203] z-50"
          style={{ backgroundColor: accentColor }}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Contact Section */}
      <div className="bg-[#09090B]/30 border-t border-white/[0.05] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-zinc-400">
            If you have any questions about these Terms, please contact us at{" "}
            <a
              href="mailto:support@nexuscale.ai"
              className="text-indigo-400 hover:text-indigo-300 transition-colors"
            >
              support@nexuscale.ai
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;

