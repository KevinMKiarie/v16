import { useState, useRef, useEffect } from "react";
import {
  ArrowUp,
  ChevronDown,
  ChevronUp,
  Shield,
  Lock,
  Book,
  FileText,
  List,
} from "lucide-react";

const PrivacyPolicy = () => {
  const [activeSections, setActiveSections] = useState({
    scope: true,
    "data-collected": true,
    "permissions": true,
    "processing-retention": true,
    "storage-security": true,
    "data-sharing": true,
    "advertising": true,
    "website-data": true,
    "user-rights": true,
    "compliance": true,
    "contact": true,
  });
  const [showScrollTop, setShowScrollTop] = useState(false);
  const sectionsRef = useRef({});

  const accentColor = "#787ff6";
  const accentColorEnd = "#a87ff6";

  const sections = [
    {
      id: "scope",
      title: "1. Scope",
      icon: <Book className="text-indigo-400" size={20} />,
      content: `This Privacy Policy applies to:
• The Nexuscale Companion Chrome Extension
• The nexuscale.ai web application

If there is any conflict, this policy governs the Chrome Extension.`,
    },
    {
      id: "data-collected",
      title: "2. Data Collected by the Chrome Extension",
      icon: <Shield className="text-indigo-400" size={20} />,
      content: `The Nexuscale Companion extension collects data only when the user explicitly interacts with it.

A. Page Content (User-Initiated)
When you click or activate the extension on a supported website (such as LinkedIn or Sales Navigator), the extension may temporarily read visible content from the active browser tab, including:
• Profile names
• Job titles
• Company names
• Public bios and work history

Purpose: To generate personalized outreach messages at the user's request.

Important clarifications:
• The extension does not run in the background
• The extension does not scrape data automatically
• Data is accessed only on the active tab
• Data is processed only after user action

B. Authentication & Account Data
The extension accesses authentication tokens or cookies solely to:
• Verify your Nexuscale account status
• Confirm subscription or feature access

This data is not used for tracking or advertising.

C. User-Provided Input
Any text, prompts, or configurations you enter into the extension interface are collected and processed to deliver the requested functionality.`,
    },
    {
      id: "permissions",
      title: "3. Chrome Extension Permissions",
      icon: <Lock className="text-indigo-400" size={20} />,
      content: `The extension uses the following permissions strictly for functionality:
• activeTab – to read visible page content when triggered by the user
• cookies – to authenticate your Nexuscale account
• storage – to store user preferences and session settings
• scripting – to inject UI elements after user interaction

No permissions are used for undisclosed purposes.`,
    },
    {
      id: "processing-retention",
      title: "4. Data Processing & Retention",
      icon: <FileText className="text-indigo-400" size={20} />,
      content: `Processing
• Page data is processed temporarily
• Data is used only to generate the requested output (e.g., a message draft)

Retention
• Page content is discarded immediately after processing
• Data is stored only if the user explicitly saves a lead or message
• Account data is retained until the user deletes their account`,
    },
    {
      id: "storage-security",
      title: "5. Data Storage & Security",
      icon: <Lock className="text-indigo-400" size={20} />,
      content: `• Data is stored on secure servers in the United States
• All data in transit is encrypted using TLS/SSL
• We apply industry-standard access controls and security practices`,
    },
    {
      id: "data-sharing",
      title: "6. Data Sharing & Third Parties",
      icon: <Shield className="text-indigo-400" size={20} />,
      content: `We do not sell, rent, or trade user data.

We share data only with essential sub-processors:

A. AI Providers
Limited, non-sensitive inputs may be processed by AI providers (e.g., OpenAI, Anthropic) solely to generate text output.
• Data is not used for advertising
• Data is not used to train public AI models

B. Infrastructure Providers
Hosting and database services (e.g., AWS, Google Cloud) are used strictly for service operation.`,
    },
    {
      id: "advertising",
      title: "7. Advertising & Data Sales",
      icon: <FileText className="text-indigo-400" size={20} />,
      content: `• We do not use extension data for advertising
• We do not sell user data
• We do not share data with data brokers`,
    },
    {
      id: "website-data",
      title: "8. Website Data Collection (nexuscale.ai)",
      icon: <FileText className="text-indigo-400" size={20} />,
      content: `When visiting our website, we may collect:
• Name and email address (account creation)
• Usage data (IP address, browser type)
• Cookies for security and session management`,
    },
    {
      id: "user-rights",
      title: "9. User Rights",
      icon: <Shield className="text-indigo-400" size={20} />,
      content: `Depending on your location, you may have the right to:
• Access your data
• Correct inaccurate data
• Request deletion of your data
• Object to processing

Requests can be sent to privacy@nexuscale.ai`,
    },
    {
      id: "compliance",
      title: "10. Compliance",
      icon: <Lock className="text-indigo-400" size={20} />,
      content: `Nexuscale is working toward:
• SOC 2 Type II
• GDPR compliance`,
    },
    {
      id: "contact",
      title: "11. Contact Information",
      icon: <Shield className="text-indigo-400" size={20} />,
      content: `If you have questions about this policy or data handling practices:
📧 privacy@nexuscale.ai
📧 support@nexuscale.ai`,
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
            className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight leading-tight"
            style={{
              background: `linear-gradient(120deg, ${accentColor} 20%, #ffffff 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}
          >
            Privacy Policy – Nexuscale <br className="hidden md:block" />
            Companion Chrome Extension
          </h1>
          <p className="text-sm text-zinc-400 max-w-3xl mx-auto mb-8">
            Last Updated: January 26, 2026
          </p>
          <p className="text-lg md:text-xl text-white max-w-3xl mx-auto leading-relaxed mb-6">
            This Privacy Policy explains how 10xEngage Inc. ("Nexuscale", "we", "us") collects, uses, stores, and shares data when you use the Nexuscale Companion Chrome Extension and related services.
          </p>
          <p className="text-base md:text-lg text-white max-w-3xl mx-auto leading-relaxed">
            This policy is written to comply with the Chrome Web Store Developer Program Policies and applies specifically to the Chrome Extension.
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

    </div>
  );
};

export default PrivacyPolicy;

