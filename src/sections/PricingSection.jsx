import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles as LucideSparkles,
  CheckCircle2,
  MinusCircle,
  Zap,
  ArrowRight,
  Star,
  ChevronDown,
  ShieldCheck,
  Quote,
  Shield,
  Lock,
  FileCheck,
  Info,
  Rocket,
  TrendingUp,
} from "lucide-react";
import {
  pricingPlansData,
  platformEcosystemData,
  faqData,
  planStyles,
} from "../data/pricing";
import { VerticalCutReveal } from "../components/ui/vertical-cut-reveal";
import { TimelineContent } from "../components/ui/timeline-animation";
import ComparisonStack from "./ComparisonStack";

const ScrollReveal = ({ children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
      delay: delay / 1000,
    }}
  >
    {children}
  </motion.div>
);

const Button = ({ text, variant, className, onClick }) => {
  const isBrand = variant === "brand";
  return (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center gap-2 rounded-xl font-bold transition-all duration-300 overflow-hidden group ${
        isBrand
          ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white hover:shadow-[0_0_25px_rgba(99,102,241,0.4)] border border-indigo-400/50"
          : "bg-white/[0.05] text-white hover:bg-white/[0.1] border border-white/[0.05] hover:border-white/[0.15]"
      } ${className}`}
    >
      <span className="relative z-10">{text}</span>
      {isBrand && (
        <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
      )}
      {/* Button Shine Effect */}
      {isBrand && (
        <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12" />
      )}
    </button>
  );
};

const StatChip = ({ value, label, sublabel, dim }) => {
  return (
    <div
      className="bg-white/[0.02] border border-white/[0.05] rounded-xl px-3 py-2.5 
            group-hover:bg-white/[0.06] group-hover:border-white/[0.1] transition-all duration-300 flex flex-col justify-center h-full"
    >
      <div
        className={`text-sm font-black leading-none mb-1 truncate ${
          dim ? "text-zinc-500" : "text-white"
        }`}
      >
        {value}
      </div>
      <div className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold leading-tight">
        {label}
      </div>
      {sublabel && (
        <div className="text-[9px] text-zinc-600 font-semibold mt-1 leading-tight">
          {sublabel}
        </div>
      )}
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-white/[0.05] bg-[#0A0A0C]/50 rounded-2xl overflow-hidden hover:border-white/[0.1] transition-colors">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
      >
        <span className="text-[15px] font-bold text-white">{question}</span>
        <ChevronDown
          className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-white/[0.05] pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FeatureTooltip = ({ text }) => {
  const [visible, setVisible] = useState(false);
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  return (
    <span
      className="inline-flex items-center cursor-help ml-1 shrink-0"
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onMouseMove={(e) => setCoords({ x: e.clientX, y: e.clientY })}
    >
      <Info className="w-3 h-3 text-zinc-700 hover:text-zinc-400 transition-colors" />
      {visible &&
        createPortal(
          <div
            style={{
              position: "fixed",
              left: Math.min(coords.x + 14, window.innerWidth - 240),
              top: Math.max(coords.y - 72, 8),
              zIndex: 99999,
            }}
            className="max-w-[220px] p-3 rounded-xl bg-[#16161e] border border-white/[0.12] text-[11px] text-zinc-300 leading-relaxed shadow-[0_8px_30px_rgba(0,0,0,0.7)] pointer-events-none"
          >
            {text}
          </div>,
          document.body,
        )}
    </span>
  );
};

// --- CARD FEATURE LIST WITH KEYFEATURES SUPPORT ---

const CardFeatureList = ({ plan, s }) => {
  const [showAll, setShowAll] = React.useState(false);

  const displayFeatures = plan.keyFeatures
    ? plan.keyFeatures.map((f) => ({ text: f, included: true }))
    : plan.features.slice(0, 5);

  const featuresToShow = showAll ? plan.features : displayFeatures;

  return (
    <div className="relative flex-1 mb-2">
      <div className="space-y-3.5 pb-2">
        {featuresToShow.map((f, j) => {
          const isIncluded = f.included;
          const isBadge = f.isBadge;
          if (!showAll && plan.keyFeatures) {
            return (
              <div
                key={j}
                className="flex items-start gap-3 text-sm font-medium text-zinc-200"
              >
                <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                <span className="leading-tight">{f.text}</span>
              </div>
            );
          }
          if (isBadge) {
            return (
              <div
                key={j}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] -mx-1 text-sm font-bold ${s.label} mb-1`}
              >
                <LucideSparkles className="w-3.5 h-3.5 shrink-0" />
                <span className="leading-tight">{f.text}</span>
              </div>
            );
          }
          return (
            <div
              key={j}
              className={`flex items-start gap-3 text-sm font-medium transition-colors
                ${isIncluded ? "text-zinc-200" : "text-zinc-600 line-through decoration-zinc-700"}`}
            >
              {isIncluded ? (
                <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
              ) : (
                <MinusCircle className="w-4 h-4 shrink-0 text-zinc-700 mt-0.5" />
              )}
              <span className="leading-tight">{f.text}</span>
              {f.tooltip && isIncluded && <FeatureTooltip text={f.tooltip} />}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => setShowAll(!showAll)}
        className="mt-3 text-xs text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-2"
      >
        {showAll ? "Show less" : "See full feature list"}
      </button>
    </div>
  );
};

// --- PRICE TICKER ---

const PriceTicker = ({ value, gradClass }) => {
  const prevRef = React.useRef(value);
  const [dir, setDir] = React.useState(0);

  React.useEffect(() => {
    const prev = prevRef.current;
    if (value !== prev) {
      setDir(value > prev ? 1 : -1);
      prevRef.current = value;
    }
  }, [value]);

  const inner = (
    <AnimatePresence mode="wait">
      <motion.span
        key={value}
        initial={{
          y: dir === 0 ? -16 : dir > 0 ? -22 : 22,
          opacity: 0,
          scale: 0.94,
        }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{
          y: dir === 0 ? 16 : dir > 0 ? 22 : -22,
          opacity: 0,
          scale: 0.94,
        }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        className={
          gradClass
            ? `inline-block text-transparent bg-clip-text bg-gradient-to-r ${gradClass}`
            : "inline-block"
        }
      >
        ${value}
      </motion.span>
    </AnimatePresence>
  );

  return gradClass ? (
    <span>{inner}</span>
  ) : (
    <span className="text-white">{inner}</span>
  );
};

// --- COMPARE PLANS CELL VALUE ---
const CellValue = ({ value, highlight }) => {
  if (value === true) {
    return (
      <CheckCircle2
        className={`w-5 h-5 ${highlight ? "text-indigo-400 drop-shadow-[0_0_10px_rgba(99,102,241,0.7)]" : "text-indigo-500/60"}`}
      />
    );
  }
  if (value === false) {
    return (
      <span className="text-zinc-700 text-xl leading-none font-light select-none">
        ×
      </span>
    );
  }
  return (
    <span
      className={`text-sm font-semibold leading-snug text-center ${highlight ? "text-white" : "text-zinc-300"}`}
    >
      {value}
    </span>
  );
};

const comparePlanData = [
  {
    category: "AI & Automation",
    rows: [
      {
        feature: "AI Agents",
        tooltip: "Parallel AI agents running outreach 24/7",
        startup: "2",
        growth: "10",
        scale: "50",
      },
      {
        feature: "Agent Type",
        startup: "Research",
        growth: "Deep AI",
        scale: "Deep AI",
      },
      {
        feature: "Workspaces",
        tooltip: "Isolated campaign environments",
        startup: "1",
        growth: "3",
        scale: "10",
      },
      {
        feature: "Credits / Month",
        tooltip: "Used for prospecting & enrichment actions",
        startup: "2,500",
        growth: "4,000",
        scale: "15,000",
      },
      {
        feature: "Customizable Agents & AI Replies",
        startup: false,
        growth: true,
        scale: true,
      },
      {
        feature: "AI Meeting Agent",
        tooltip: "AI automatically books meetings when prospects show interest",
        startup: false,
        growth: true,
        scale: true,
      },
    ],
  },
  {
    category: "Email Outreach",
    rows: [
      {
        feature: "Email Sending",
        startup: "Unlimited",
        growth: "Unlimited",
        scale: "Unlimited",
      },
      {
        feature: "Email Warmup",
        startup: "Unlimited",
        growth: "Unlimited",
        scale: "Unlimited",
      },
      {
        feature: "External Inboxes (Google / Outlook)",
        startup: "3",
        growth: "4",
        scale: "12",
      },
      {
        feature: "Mailbox Rotation & ESP Match",
        startup: true,
        growth: true,
        scale: true,
      },
      {
        feature: "Email Verification",
        tooltip: "Real-time verification — 1 credit per email",
        startup: true,
        growth: true,
        scale: true,
      },
      {
        feature: "Premium Deliverability Routing",
        tooltip: "Dedicated IPs engineered for maximum inbox placement",
        startup: false,
        growth: true,
        scale: true,
      },
    ],
  },
  {
    category: "Lead Intelligence",
    rows: [
      {
        feature: "B2B Database Access",
        startup: "Standard",
        growth: "Premium",
        scale: "Premium",
      },
      {
        feature: "Contact Storage",
        startup: "10,000",
        growth: "25,000",
        scale: "50,000",
      },
      {
        feature: "Contact Uploads",
        startup: "Unlimited",
        growth: "Unlimited",
        scale: "Unlimited",
      },
      {
        feature: "Lead Scoring",
        startup: "Basic",
        growth: "Advanced",
        scale: "Advanced",
      },
      {
        feature: "Funding & Hiring Signals",
        tooltip:
          "Identify companies actively raising or hiring — prime buying signals",
        startup: true,
        growth: true,
        scale: true,
      },
      {
        feature: "AI Lead Search & Scrape",
        startup: true,
        growth: true,
        scale: true,
      },
    ],
  },
  {
    category: "LinkedIn Outreach",
    rows: [
      {
        feature: "LinkedIn Sender Seats",
        tooltip: "+$19/mo per additional seat",
        startup: "Add-on (max 2)",
        growth: "Add-on (max 10)",
        scale: "Unlimited",
      },
      {
        feature: "Connection Requests & DMs",
        startup: true,
        growth: true,
        scale: true,
      },
    ],
  },
  {
    category: "Platform & Support",
    rows: [
      {
        feature: "Team Seats",
        startup: "2",
        growth: "10",
        scale: "50",
      },
      {
        feature: "Native CRM Integrations",
        startup: true,
        growth: true,
        scale: true,
      },
      {
        feature: "A/Z Testing",
        startup: true,
        growth: true,
        scale: true,
      },
      {
        feature: "Smart Inbox & Inbuilt CRM",
        startup: true,
        growth: true,
        scale: true,
      },
      {
        feature: "Multi-Language Outreach (50+)",
        startup: true,
        growth: true,
        scale: true,
      },
      {
        feature: "Support",
        startup: "Live Chat",
        growth: "Priority",
        scale: "Priority",
      },
    ],
  },
];

// --- MAIN SECTION COMPONENT ---

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const [linkedinSeatsByPlan, setLinkedinSeatsByPlan] = useState({});
  const [mailboxesByPlan, setMailboxesByPlan] = useState({});
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (i) =>
    setOpenCategories((prev) => ({ ...prev, [i]: !prev[i] }));

  const getLinkedinSeats = (planName) => linkedinSeatsByPlan[planName] ?? 0;
  const getMailboxes = (planName) => mailboxesByPlan[planName] ?? 0;

  const updateLinkedinSeats = (planName, delta, max) => {
    setLinkedinSeatsByPlan((prev) => {
      const current = prev[planName] ?? 0;
      const next = Math.min(Math.max(0, current + delta), max);
      return { ...prev, [planName]: next };
    });
  };

  const updateMailboxes = (planName, delta) => {
    setMailboxesByPlan((prev) => {
      const current = prev[planName] ?? 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [planName]: next };
    });
  };

  const getMaxSeats = (plan) => {
    const seats = plan.credits.linkedinSeats;
    if (seats === "∞") return 20;
    const n = parseInt(seats, 10);
    return isNaN(n) ? 0 : n;
  };

  const revealVariants = {
    visible: (i) => ({
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: { delay: i * 0.4, duration: 0.5 },
    }),
    hidden: { filter: "blur(10px)", y: -20, opacity: 0 },
  };

  const savingsHighlight = annual
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-1 pointer-events-none";

  const getPrice = (plan) => {
    if (plan.price === "0") return "0";
    return annual && plan.annualPrice ? plan.annualPrice : plan.price;
  };

  const getTotalPrice = (plan) => {
    const base = Number(getPrice(plan));
    const seats = getLinkedinSeats(plan.name);
    const mailboxes = getMailboxes(plan.name);
    return base + seats * 19 + mailboxes * 3;
  };

  return (
    <div className="min-h-screen bg-[#050505] font-sans selection:bg-indigo-500/30 text-zinc-200">
      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2);
        }
        .marquee-container {
          overflow: hidden;
          white-space: nowrap;
          position: relative;
        }
        .marquee-content {
          display: inline-block;
          animation: marquee 30s linear infinite;
        }
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <section className="py-24 relative px-6 overflow-hidden">
        {/* Dot grid + glow reveal */}
        <TimelineContent
          animationNum={4}
          customVariants={revealVariants}
          className="absolute top-0 h-96 w-full overflow-hidden pointer-events-none [mask-image:radial-gradient(50%_50%,white,transparent)]"
        >
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff2c_1px,transparent_1px),linear-gradient(to_bottom,#3a3a3a01_1px,transparent_1px)] bg-[size:70px_80px]" />
        </TimelineContent>

        {/* Animated dual-ellipse glow */}
        <TimelineContent
          animationNum={5}
          customVariants={revealVariants}
          className="absolute left-0 top-[-114px] w-full h-[113.625vh] overflow-hidden pointer-events-none z-0"
        >
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] rounded-full"
            style={{
              border: "200px solid #3131f5",
              filter: "blur(92px)",
              WebkitFilter: "blur(92px)",
            }}
          />
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] rounded-full"
            style={{
              border: "200px solid #3131f5",
              filter: "blur(92px)",
              WebkitFilter: "blur(92px)",
            }}
          />
        </TimelineContent>

        {/* Blue radial gradient overlay */}
        <div
          className="absolute top-0 left-[10%] w-[80%] h-full z-0 pointer-events-none"
          style={{
            backgroundImage:
              "radial-gradient(circle at center, #206ce8 0%, transparent 70%)",
            opacity: 0.15,
            mixBlendMode: "screen",
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <ScrollReveal>
            <div className="text-center mb-10">
              {/* Trust Badge - Social Proof */}
              <div className="inline-flex flex-col sm:flex-row items-center gap-3 px-4 py-2 rounded-full bg-white/[0.03] border border-white/[0.08] mb-6 backdrop-blur-sm">
                <div className="flex items-center gap-1.5">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-3.5 h-3.5 fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-xs font-black text-white ml-1">
                    G2: 4.9/5
                  </span>
                </div>
                <div className="hidden sm:block w-px h-3.5 bg-white/20"></div>
                <span className="text-[11px] font-bold text-zinc-300 uppercase tracking-wide">
                  Trusted by 2,000+ Revenue Teams{" "}
                  <span className="text-zinc-500 lowercase">(76 reviews)</span>
                </span>
              </div>

              <h1 className="font-black text-4xl md:text-5xl lg:text-6xl mb-1 tracking-tight flex flex-wrap justify-center gap-x-[0.3em]">
                {["Replace", "$665/mo", "of", "Tools"].map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block">
                    <motion.span
                      className={`inline-block ${
                        word === "$665/mo"
                          ? "text-white"
                          : "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300"
                      }`}
                      initial={{ y: "-110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 40,
                        delay: i * 0.15,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>

              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400 font-black text-4xl md:text-5xl lg:text-6xl mb-2 tracking-tight flex flex-wrap justify-center gap-x-[0.3em]">
                {["With", "One", "Autopilot"].map((word, i) => (
                  <span key={i} className="overflow-hidden inline-block">
                    <motion.span
                      className="inline-block"
                      initial={{ y: "-110%" }}
                      animate={{ y: 0 }}
                      transition={{
                        type: "spring",
                        stiffness: 250,
                        damping: 40,
                        delay: 0.3 + i * 0.15,
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h1>
              <p className="text-zinc-400 text-base max-w-xl mx-auto mb-10 leading-relaxed">
                Every plan includes the full Autonomous OS, unlimited seats, and
                all core AI capabilities to scale your pipeline.
              </p>
              <ComparisonStack />

              <div className="flex flex-col items-center gap-3">
                <div className="relative z-10 mx-auto flex w-fit rounded-full bg-neutral-900 border border-gray-700 p-1">
                  <button
                    onClick={() => setAnnual(false)}
                    className="relative z-10 w-fit h-10 rounded-full sm:px-6 px-4 sm:py-2 py-1 font-bold text-sm transition-colors text-gray-200"
                  >
                    {!annual && (
                      <motion.span
                        layoutId="pricing-switch"
                        className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative">Monthly</span>
                  </button>
                  <button
                    onClick={() => setAnnual(true)}
                    className="relative z-10 w-fit h-10 flex-shrink-0 rounded-full sm:px-6 px-4 sm:py-2 py-1 font-bold text-sm transition-colors text-gray-200 flex items-center gap-2"
                  >
                    {annual && (
                      <motion.span
                        layoutId="pricing-switch"
                        className="absolute top-0 left-0 h-10 w-full rounded-full border-4 shadow-sm shadow-blue-600 border-blue-600 bg-gradient-to-t from-blue-500 to-blue-600"
                        transition={{
                          type: "spring",
                          stiffness: 500,
                          damping: 30,
                        }}
                      />
                    )}
                    <span className="relative flex items-center gap-2">
                      Yearly
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500 text-white border border-emerald-600 shadow-sm">
                        2 months Free
                      </span>
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div
                    className={`text-emerald-400 text-xs font-bold tracking-widest uppercase transition-all duration-500 ${savingsHighlight}`}
                  >
                    <LucideSparkles className="w-3.5 h-3.5 inline-block mr-1.5 mb-0.5" />
                    Save up to $2,397 a year
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                    • Cancel Anytime
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="text-center mb-6">
            <span className="text-sm text-zinc-500">
              Not ready to commit?{" "}
              <a
                href="https://app.nexuscale.ai/users/register"
                className="text-indigo-400 underline underline-offset-2 hover:text-indigo-300 transition-colors"
              >
                Start free, no card needed.
              </a>
            </span>
          </div>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[90%] mx-auto mb-16 items-start"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {pricingPlansData
              .filter((plan) => plan.name !== "Free" && plan.name !== "Agency")
              .map((plan, i) => {
                const isPopular = plan.popular;
                const s = planStyles[plan.name] || planStyles["Free"];
                const isLastAlone = false;

                return (
                  <motion.div
                    key={i}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 320, damping: 25 }}
                    className={`relative group rounded-3xl border bg-[#0A0A0C]/80 backdrop-blur-xl overflow-hidden cursor-default flex flex-col
                              transition-all duration-500 ${s.border} ${s.glow}
                              ${isLastAlone ? "md:col-span-2 lg:col-span-4 w-full" : ""}
                              ${isPopular ? "lg:scale-[1.03] z-10 ring-1 ring-indigo-500/50 shadow-[0_0_40px_rgba(99,102,241,0.1)]" : ""}`}
                  >
                    {isPopular && (
                      <div className="absolute top-0 left-0 right-0 flex justify-center z-20">
                        <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-black px-4 py-1.5 rounded-b-xl uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                          <Zap className="w-3 h-3 text-yellow-300" /> Most
                          Popular
                        </div>
                      </div>
                    )}

                    {/* Ambient orb */}
                    <div
                      className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl ${s.orb} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}
                    />

                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                    />

                    {isLastAlone ? (
                      <div
                        className={`relative z-10 p-6 flex flex-col md:flex-row flex-1 gap-6 md:gap-8 ${isPopular ? "pt-10" : "pt-8"}`}
                      >
                        <div className="flex flex-col gap-5 md:w-[280px] md:shrink-0 md:border-r md:border-white/[0.06] md:pr-8">
                          <div>
                            <div
                              className={`text-[10px] font-black uppercase tracking-widest ${s.label} mb-1.5`}
                            >
                              {plan.name}
                            </div>
                            <div className="text-xl font-black text-white mb-1">
                              {plan.tier}
                            </div>
                            <div className="text-xs text-zinc-500 leading-relaxed">
                              {plan.desc}
                            </div>
                          </div>

                          <div>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              {s.priceGrad ? (
                                <span
                                  className={`text-5xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r ${s.price}`}
                                >
                                  <AnimatePresence mode="wait">
                                    <motion.span
                                      key={getPrice(plan)}
                                      initial={{ y: -16, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      exit={{ y: 16, opacity: 0 }}
                                      transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                      }}
                                      className="inline-block"
                                    >
                                      ${getPrice(plan)}
                                    </motion.span>
                                  </AnimatePresence>
                                </span>
                              ) : (
                                <span className="text-5xl font-black tracking-tight leading-none text-white">
                                  <AnimatePresence mode="wait">
                                    <motion.span
                                      key={getPrice(plan)}
                                      initial={{ y: -16, opacity: 0 }}
                                      animate={{ y: 0, opacity: 1 }}
                                      exit={{ y: 16, opacity: 0 }}
                                      transition={{
                                        duration: 0.2,
                                        ease: "easeOut",
                                      }}
                                      className="inline-block"
                                    >
                                      ${getPrice(plan)}
                                    </motion.span>
                                  </AnimatePresence>
                                </span>
                              )}
                              {plan.price !== "0" && (
                                <>
                                  {annual && (
                                    <span className="text-xs text-emerald-500/80 font-bold uppercase tracking-wider">
                                      Save 20%
                                    </span>
                                  )}
                                  <span className="text-sm text-zinc-500 font-bold">
                                    /mo
                                  </span>
                                </>
                              )}
                            </div>
                            {plan.price !== "0" && annual && (
                              <p className="text-[10px] text-emerald-500/80 mt-1.5 font-bold uppercase tracking-wider">
                                Billed yearly
                              </p>
                            )}
                          </div>

                          <div className="mt-auto pt-2">
                            <Button
                              text={plan.cta}
                              variant={isPopular ? "brand" : "secondary"}
                              className="w-full py-3.5 text-sm"
                              onClick={() => {
                                if (
                                  plan.cta.includes("Schedule Call") ||
                                  plan.cta.includes("Demo")
                                ) {
                                  window.open(
                                    "https://cal.com/kevin-nexuscale/15min",
                                    "_blank",
                                  );
                                } else if (annual && plan.stripeAnnualUrl) {
                                  window.open(plan.stripeAnnualUrl, "_blank");
                                } else if (!annual && plan.stripeMonthlyUrl) {
                                  window.open(plan.stripeMonthlyUrl, "_blank");
                                } else {
                                  window.open(
                                    "https://app.nexuscale.ai/users/register",
                                    "_blank",
                                  );
                                }
                              }}
                            />
                            <div className="text-center mt-3">
                              <span
                                className={`text-[10px] font-semibold tracking-wide uppercase ${isPopular ? "text-indigo-400" : "text-zinc-500"}`}
                              >
                                {plan.microcopy}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col gap-5 flex-1 min-w-0">
                          <div className="h-px md:hidden bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05]" />

                          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                            <StatChip
                              value={plan.credits.contacts}
                              label="Credits /mo"
                              sublabel="Engine Credits"
                            />
                            <StatChip
                              value={`${plan.credits.linkedinSeats}`}
                              label="LinkedIn Add-ons"
                              sublabel={plan.credits.linkedinSub}
                              dim={plan.name === "Free"}
                            />
                            <StatChip
                              value={plan.credits.agents}
                              label="AI Agents"
                              sublabel={plan.credits.agentsType}
                            />
                            <StatChip
                              value={plan.credits.teamSeats}
                              label="Team Seats"
                              sublabel="Collaborators"
                            />
                            <StatChip
                              value={plan.credits.mailboxes}
                              label="Mailboxes"
                              sublabel={`${plan.credits.mailboxSub}`}
                            />
                            <StatChip
                              value={plan.credits.emails}
                              label="Emails"
                              sublabel="Sending Limit"
                            />
                            <StatChip
                              value={plan.credits.warmup}
                              label="Email Warmup"
                              sublabel="Deliverability"
                            />
                            <StatChip
                              value={plan.credits.workspaces}
                              label={
                                plan.credits.workspaces === "1"
                                  ? "Workspace"
                                  : "Workspaces"
                              }
                              sublabel="Team & Client Isolation"
                            />
                          </div>

                          <div className="h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05]" />

                          <div className="relative flex-1 mb-2">
                            <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-[#0A0A0C]/95 to-transparent z-10 pointer-events-none" />
                            <div className="grid sm:grid-cols-2 gap-x-6 gap-y-3.5 overflow-y-auto max-h-[320px] pr-2 custom-scrollbar pb-6">
                              {plan.features.map((f, j) => {
                                const isIncluded = f.included;
                                const isBadge = f.isBadge;
                                if (isBadge) {
                                  return (
                                    <div
                                      key={j}
                                      className={`sm:col-span-2 flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] -mx-1 text-sm font-bold ${s.label} mb-1`}
                                    >
                                      <LucideSparkles className="w-3.5 h-3.5 shrink-0" />
                                      <span className="leading-tight">
                                        {f.text}
                                      </span>
                                    </div>
                                  );
                                }
                                return (
                                  <div
                                    key={j}
                                    className={`flex items-start gap-3 text-sm font-medium transition-colors ${isIncluded ? "text-zinc-200" : "text-zinc-600 line-through decoration-zinc-700"}`}
                                  >
                                    {isIncluded ? (
                                      <CheckCircle2 className="w-4 h-4 shrink-0 text-indigo-400 mt-0.5 drop-shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                                    ) : (
                                      <MinusCircle className="w-4 h-4 shrink-0 text-zinc-700 mt-0.5" />
                                    )}
                                    <span className="leading-tight">
                                      {f.text}
                                    </span>
                                    {f.tooltip && isIncluded && (
                                      <FeatureTooltip text={f.tooltip} />
                                    )}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div
                        className={`relative z-10 p-6 flex flex-col flex-1 gap-5 ${isPopular ? "pt-10" : "pt-8"}`}
                      >
                        <div>
                          <div
                            className={`text-[10px] font-black uppercase tracking-widest ${s.label} mb-1.5`}
                          >
                            {plan.name}
                          </div>
                          <div className="text-xl font-black text-white mb-1">
                            {plan.tier}
                          </div>
                          <div className="text-xs text-zinc-500 leading-relaxed min-h-[32px]">
                            {plan.desc}
                          </div>
                        </div>

                        <div>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            <span className="text-5xl font-black tracking-tight leading-none">
                              <PriceTicker
                                value={getTotalPrice(plan)}
                                gradClass={s.priceGrad ? s.price : null}
                              />
                            </span>
                            {plan.price !== "0" && (
                              <>
                                {annual && (
                                  <span className="text-xs text-emerald-500/80 font-bold uppercase tracking-wider">
                                    Save 20%
                                  </span>
                                )}
                                <span className="text-sm text-zinc-500 font-bold">
                                  /mo
                                </span>
                              </>
                            )}
                          </div>
                          <AnimatePresence>
                            {(getLinkedinSeats(plan.name) > 0 ||
                              getMailboxes(plan.name) > 0) && (
                              <motion.div
                                initial={{
                                  opacity: 0,
                                  height: 0,
                                  marginTop: 0,
                                }}
                                animate={{
                                  opacity: 1,
                                  height: "auto",
                                  marginTop: 6,
                                }}
                                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                transition={{ duration: 0.2 }}
                                className="flex items-center gap-1.5 flex-wrap overflow-hidden"
                              >
                                <span className="text-[10px] text-zinc-500">
                                  Base ${getPrice(plan)}
                                </span>
                                {getLinkedinSeats(plan.name) > 0 && (
                                  <>
                                    <span className="text-[10px] text-zinc-600">
                                      +
                                    </span>
                                    <span className="text-[10px] font-bold text-[#4fa3d4]">
                                      ${getLinkedinSeats(plan.name) * 19}{" "}
                                      LinkedIn
                                    </span>
                                  </>
                                )}
                                {getMailboxes(plan.name) > 0 && (
                                  <>
                                    <span className="text-[10px] text-zinc-600">
                                      +
                                    </span>
                                    <span className="text-[10px] font-bold text-emerald-400">
                                      ${getMailboxes(plan.name) * 3} Mailboxes
                                    </span>
                                  </>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                          {plan.price !== "0" && annual && (
                            <p className="text-[10px] text-emerald-500/80 mt-1.5 font-bold uppercase tracking-wider">
                              Billed yearly
                            </p>
                          )}
                          {plan.price === "0" && (
                            <p className="text-[10px] text-zinc-600 mt-1.5 font-bold uppercase tracking-wider opacity-0">
                              Spacer
                            </p>
                          )}
                        </div>

                        <div className="h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05]" />

                        <div className="grid grid-cols-2 gap-2">
                          <StatChip
                            value={plan.credits.contacts}
                            label="Credits /mo"
                            sublabel="Engine Credits"
                          />
                          {/* <StatChip
                            value={`${plan.credits.linkedinSeats}`}
                            label="LinkedIn Add-ons"
                            sublabel={plan.credits.linkedinSub}
                            dim={plan.name === "Free"}
                          /> */}
                          <StatChip
                            value={plan.credits.agents}
                            label="AI Agents"
                            sublabel={plan.credits.agentsType}
                          />

                          <StatChip
                            value={plan.credits.teamSeats}
                            label="Team Seats"
                            sublabel="Collaborators"
                          />

                          {/* <StatChip
                            value={plan.credits.mailboxes}
                            label="Mailboxes"
                            sublabel={`${plan.credits.mailboxSub}`}
                          /> */}
                          <StatChip
                            value={plan.credits.emails}
                            label="Emails"
                            sublabel="Sending Limit"
                          />
                          <StatChip
                            value={plan.credits.warmup}
                            label="Email Warmup"
                            sublabel="Deliverability"
                          />
                          <StatChip
                            value={plan.credits.workspaces}
                            label={
                              plan.credits.workspaces === "1"
                                ? "Workspace"
                                : "Workspaces"
                            }
                            sublabel="Team & Client Isolation"
                          />
                        </div>

                        {getMaxSeats(plan) > 0 && (
                          <div className="rounded-xl border border-[#0077b5]/25 bg-[#0077b5]/[0.07] p-3.5 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="text-[8px] font-black text-white bg-[#0077b5] rounded px-1.5 py-[3px] tracking-wider leading-none">
                                  in
                                </span>
                                <span className="text-xs font-bold text-zinc-300">
                                  LinkedIn Seats
                                </span>
                              </div>
                              <span className="text-[10px] font-bold text-[#4fa3d4] uppercase tracking-widest">
                                $19 / seat
                              </span>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 bg-white/[0.05] rounded-lg p-1">
                                <button
                                  onClick={() =>
                                    updateLinkedinSeats(
                                      plan.name,
                                      -1,
                                      getMaxSeats(plan),
                                    )
                                  }
                                  disabled={getLinkedinSeats(plan.name) === 0}
                                  className="w-7 h-7 rounded-md bg-white/[0.08] hover:bg-white/[0.18] disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold text-base transition-all active:scale-90 select-none"
                                >
                                  −
                                </button>
                                <span className="text-sm font-black text-white w-6 text-center tabular-nums select-none">
                                  {getLinkedinSeats(plan.name)}
                                </span>
                                <button
                                  onClick={() =>
                                    updateLinkedinSeats(
                                      plan.name,
                                      1,
                                      getMaxSeats(plan),
                                    )
                                  }
                                  disabled={
                                    getLinkedinSeats(plan.name) >=
                                    getMaxSeats(plan)
                                  }
                                  className="w-7 h-7 rounded-md bg-[#0077b5]/50 hover:bg-[#0077b5]/75 disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold text-base transition-all active:scale-90 select-none"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-right h-5 flex items-center">
                                <AnimatePresence mode="wait">
                                  {getLinkedinSeats(plan.name) > 0 ? (
                                    <motion.span
                                      key="cost"
                                      initial={{ opacity: 0, y: -6 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 6 }}
                                      transition={{ duration: 0.15 }}
                                      className="text-xs font-bold text-[#4fa3d4]"
                                    >
                                      +${getLinkedinSeats(plan.name) * 19}/mo
                                    </motion.span>
                                  ) : (
                                    <motion.span
                                      key="hint"
                                      initial={{ opacity: 0, y: 6 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -6 }}
                                      transition={{ duration: 0.15 }}
                                      className="text-[10px] text-zinc-600 uppercase tracking-wider"
                                    >
                                      Max {getMaxSeats(plan)}
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                        )}

                        {plan.price !== "0" && (
                          <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/[0.06] p-3.5 space-y-2.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <svg
                                  className="w-3.5 h-3.5 text-emerald-400"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                >
                                  <rect
                                    x="2"
                                    y="4"
                                    width="20"
                                    height="16"
                                    rx="2"
                                  />
                                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                                </svg>
                                <span className="text-xs font-bold text-zinc-300">
                                  Native Mailboxes
                                </span>
                              </div>
                              <div className="text-right">
                                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">
                                  $3/mo · $36/yr
                                </span>
                              </div>
                            </div>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2 bg-white/[0.05] rounded-lg p-1">
                                <button
                                  onClick={() => updateMailboxes(plan.name, -1)}
                                  disabled={getMailboxes(plan.name) === 0}
                                  className="w-7 h-7 rounded-md bg-white/[0.08] hover:bg-white/[0.18] disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center text-white font-bold text-base transition-all active:scale-90 select-none"
                                >
                                  −
                                </button>
                                <span className="text-sm font-black text-white w-6 text-center tabular-nums select-none">
                                  {getMailboxes(plan.name)}
                                </span>
                                <button
                                  onClick={() => updateMailboxes(plan.name, 1)}
                                  className="w-7 h-7 rounded-md bg-emerald-500/40 hover:bg-emerald-500/65 flex items-center justify-center text-white font-bold text-base transition-all active:scale-90 select-none"
                                >
                                  +
                                </button>
                              </div>
                              <div className="text-right h-5 flex items-center">
                                <AnimatePresence mode="wait">
                                  {getMailboxes(plan.name) > 0 ? (
                                    <motion.div
                                      key="mbcost"
                                      initial={{ opacity: 0, y: -6 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: 6 }}
                                      transition={{ duration: 0.15 }}
                                      className="text-right"
                                    >
                                      <div className="text-xs font-bold text-emerald-400">
                                        +${getMailboxes(plan.name) * 3}/mo
                                      </div>
                                      <div className="text-[9px] text-emerald-600 font-semibold">
                                        ${getMailboxes(plan.name) * 36}/yr
                                      </div>
                                    </motion.div>
                                  ) : (
                                    <motion.span
                                      key="mbhint"
                                      initial={{ opacity: 0, y: 6 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      exit={{ opacity: 0, y: -6 }}
                                      transition={{ duration: 0.15 }}
                                      className="text-[10px] text-zinc-600 uppercase tracking-wider"
                                    >
                                      Unlimited
                                    </motion.span>
                                  )}
                                </AnimatePresence>
                              </div>
                            </div>
                          </div>
                        )}

                        <div className="h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05]" />

                        <CardFeatureList plan={plan} s={s} />

                        <div className="pt-2 mt-auto">
                          <Button
                            text={plan.cta}
                            variant={isPopular ? "brand" : "secondary"}
                            className="w-full py-3.5 text-sm"
                            onClick={() => {
                              if (
                                plan.cta.includes("Schedule Call") ||
                                plan.cta.includes("Demo")
                              ) {
                                window.open(
                                  "https://cal.com/kevin-nexuscale/15min",
                                  "_blank",
                                );
                              } else if (annual && plan.stripeAnnualUrl) {
                                window.open(plan.stripeAnnualUrl, "_blank");
                              } else if (!annual && plan.stripeMonthlyUrl) {
                                window.open(plan.stripeMonthlyUrl, "_blank");
                              } else {
                                window.open(
                                  "https://app.nexuscale.ai/users/register",
                                  "_blank",
                                );
                              }
                            }}
                          />
                          <div className="text-center mt-3">
                            <span
                              className={`text-[10px] font-semibold tracking-wide uppercase ${isPopular ? "text-indigo-400" : "text-zinc-500"}`}
                            >
                              {plan.microcopy}
                            </span>
                          </div>
                        </div>
                      </div>
                    )}
                  </motion.div>
                );
              })}
          </motion.div>

          <div className="relative mt-16 max-w-4xl mx-auto px-4">
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse pointer-events-none" />

            <div className="absolute top-0 right-1/4 w-[300px] h-[300px] bg-purple-600/10 blur-[100px] rounded-full pointer-events-none" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-[2.5rem] bg-zinc-900/40 backdrop-blur-2xl p-8 md:p-12 shadow-2xl"
            >
              {/* Top Highlight "Beam" */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-px bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent" />

              <div className="flex flex-col items-center text-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-6 group-hover:border-indigo-500/30 transition-colors">
                  <LucideSparkles className="w-3 h-3 text-indigo-400" />
                  <span className="text-[10px] uppercase tracking-[0.25em] font-bold text-zinc-400">
                    Agency Partners
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-semibold tracking-tight text-white mb-6">
                  Running an agency? <br />
                  <span className="text-zinc-500">We built something </span>
                  <span className="italic text-indigo-400">different</span>
                  <span className="text-zinc-500"> for you.</span>
                </h3>

                <p className="text-zinc-400 text-base md:text-lg mb-10 max-w-2xl leading-relaxed">
                  White-label infrastructure, multi-tenant management, and
                  margin-boosting automation—purpose-built for firms ready to
                  scale.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                  <a
                    href="https://cal.com/kevin-nexuscale/15min"
                    className="relative inline-flex h-12 items-center justify-center rounded-full bg-white px-8 text-sm font-bold text-black transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95"
                  >
                    Book a call
                  </a>
                </div>
              </div>

              <div className="absolute -bottom-12 -right-12 w-32 h-32 bg-indigo-500/10 blur-3xl rounded-full" />
            </motion.div>
          </div>

          <ScrollReveal delay={100}>
            <div className="my-20 w-full max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-300 mb-4 font-black text-5xl md:text-6xl lg:text-7xl">
                  Compare Plans
                </h3>
                <p className="text-zinc-400 text-base max-w-lg mx-auto">
                  Every feature, side by side — so you can pick with confidence.
                </p>
              </div>

              <div className="overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#0A0A0C]/60 backdrop-blur-xl shadow-[0_8px_60px_rgba(0,0,0,0.5)]">
                <div className="max-w-6xl w-full mx-auto">
                  <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr]">
                    <div className="px-8 py-8 flex items-end">
                      <span className="text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        Feature
                      </span>
                    </div>

                    {/* Start Up */}
                    <div className="px-4 py-8 flex flex-col items-center gap-3 border-l border-white/[0.05]">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-700 flex items-center justify-center shadow-lg shadow-blue-600/20 ring-1 ring-white/10">
                        <Zap className="w-6 h-6 text-white" strokeWidth={2.5} />
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-sm tracking-wide">
                          Start Up
                        </div>
                        <div className="text-zinc-500 text-xs mt-0.5 font-medium">
                          from $49/mo
                        </div>
                      </div>
                    </div>

                    <div className="px-4 py-8 flex flex-col items-center gap-3 relative border-l border-indigo-500/20">
                      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.08] to-indigo-500/[0.03] pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500" />
                      <div className="relative z-10 -mt-1 mb-1 flex justify-center">
                      </div>
                      <div className="relative z-10 w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center shadow-xl shadow-indigo-600/30 ring-1 ring-indigo-400/30">
                        <LucideSparkles
                          className="w-6 h-6 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div className="relative z-10 text-center">
                        <div className="text-white font-bold text-sm tracking-wide">
                          Growth
                        </div>
                        <div className="text-indigo-300/70 text-xs mt-0.5 font-medium">
                          from $83/mo
                        </div>
                      </div>
                        <span className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-md">
                          Most Popular
                        </span>
                    </div>

                    <div className="px-4 py-8 flex flex-col items-center gap-3 border-l border-white/[0.05]">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-600 to-purple-900 flex items-center justify-center shadow-lg shadow-violet-600/20 ring-1 ring-white/10">
                        <Rocket
                          className="w-6 h-6 text-white"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div className="text-center">
                        <div className="text-white font-bold text-sm tracking-wide">
                          Scale Up
                        </div>
                        <div className="text-zinc-500 text-xs mt-0.5 font-medium">
                          from $249/mo
                        </div>
                      </div>
                    </div>
                  </div>

                  {comparePlanData.map((section, si) => (
                    <div key={si}>
                      <button
                        onClick={() => toggleCategory(si)}
                        className="w-full grid grid-cols-[2.2fr_1fr_1fr_1fr] border-t border-white/[0.06] hover:bg-white/[0.04] transition-colors duration-150"
                      >
                        <div className="col-span-4 px-8 py-3 bg-white/[0.025] flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-[0.15em] text-zinc-400">
                            {section.category}
                          </span>
                          <ChevronDown
                            className={`w-3.5 h-3.5 text-zinc-500 transition-transform duration-300 mr-1 ${
                              openCategories[si] ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                      </button>

                      {openCategories[si] &&
                        section.rows.map((row, ri) => (
                          <div
                            key={ri}
                            className="grid grid-cols-[2.2fr_1fr_1fr_1fr] border-t border-white/[0.04] hover:bg-white/[0.025] transition-colors duration-150"
                          >
                            <div className="px-8 py-4 flex items-center gap-2">
                              <span className="text-sm text-zinc-300 font-medium leading-snug">
                                {row.feature}
                              </span>
                              {row.tooltip && (
                                <FeatureTooltip text={row.tooltip} />
                              )}
                            </div>

                            <div className="px-4 py-4 flex items-center justify-center border-l border-white/[0.04]">
                              <CellValue value={row.startup} />
                            </div>

                            <div className="px-4 py-4 flex items-center justify-center relative border-l border-indigo-500/10">
                              <div className="absolute inset-0 bg-indigo-500/[0.04] pointer-events-none" />
                              <div className="relative z-10">
                                <CellValue value={row.growth} highlight />
                              </div>
                            </div>

                            <div className="px-4 py-4 flex items-center justify-center border-l border-white/[0.04]">
                              <CellValue value={row.scale} />
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}

                  <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr] border-t border-white/[0.08]">
                    <div className="px-8 py-6" />

                    <div className="px-4 py-6 flex items-center justify-center border-l border-white/[0.05]">
                      <a
                        href="https://app.nexuscale.ai/users/register"
                        className="text-xs font-bold text-zinc-300 hover:text-white border border-white/[0.1] hover:border-white/[0.25] px-4 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap bg-white/[0.03] hover:bg-white/[0.07]"
                      >
                        Get Started
                      </a>
                    </div>
                    <div className="px-4 py-6 flex items-center justify-center relative border-l border-indigo-500/20">
                      <div className="absolute inset-0 bg-indigo-500/[0.06] pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500" />
                      <a
                        href="https://buy.stripe.com/dRmbJ14Xh9J2gwkc4Vb7y0c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 text-xs font-black text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 px-4 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40"
                      >
                        Get Started
                      </a>
                    </div>

                    <div className="px-4 py-6 flex items-center justify-center border-l border-white/[0.05]">
                      <a
                        href="https://buy.stripe.com/eVq6oH9dx3kE4NCc4Vb7y04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-zinc-300 hover:text-white border border-white/[0.1] hover:border-violet-500/50 px-4 py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap bg-white/[0.03] hover:bg-violet-500/[0.08]"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100}>
            <div className="max-w-7xl mx-auto mb-32 grid lg:grid-cols-12 gap-6">
              <div className="lg:col-span-8 relative rounded-[2.5rem] bg-[#0A0A0C] border border-white/[0.06] overflow-hidden p-8 md:p-12 group hover:border-white/[0.1] transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.05)]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -bottom-24 -left-24 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

                <div className="relative z-10 flex flex-col h-full justify-between">
                  <div>
                    <Quote className="w-12 h-12 text-indigo-500/30 mb-8 drop-shadow-lg" />
                    <p className="text-xl md:text-2xl lg:text-3xl font-medium text-zinc-400 leading-snug mb-10 max-w-3xl">
                      "We transitioned from manual search engines to NexuScale
                      to resolve our operational bottleneck. By automating our
                      discovery and outreach,{" "}
                      <span className="text-white drop-shadow-md">
                        we reclaimed 60 hours a week
                      </span>
                      . It's the ultimate lead finding platform."
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-8 border-t border-white/[0.05]">
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#1A1A24] to-[#0A0A0C] border border-white/[0.08] flex items-center justify-center font-black text-white text-lg shadow-inner">
                        CC
                      </div>
                      <div>
                        <div className="text-base font-bold text-white tracking-wide">
                          Catalyst Chiropractic
                        </div>
                        <div className="text-[11px] text-zinc-500 uppercase tracking-widest font-bold mt-1">
                          Wellness Sector
                        </div>
                      </div>
                    </div>
                    <a
                      href="https://www.nexuscale.ai/case-studies/how-nexuscale-ai-reclaimed-60-hours-weekly-through-automated-lead-intelligence"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.05] text-sm font-bold text-white transition-all duration-300 group/btn shrink-0"
                    >
                      Read Case Study{" "}
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-4 relative rounded-[2.5rem] bg-[#0A0A0C] border border-white/[0.06] overflow-hidden p-8 group hover:border-white/[0.1] transition-all duration-500 hover:shadow-[0_0_50px_rgba(16,185,129,0.05)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(16,185,129,0.05),transparent_50%)] pointer-events-none" />

                <div className="relative z-10 flex flex-col h-full">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
                      <ShieldCheck className="w-6 h-6 text-emerald-400" />
                    </div>
                    <div>
                      <h4 className="text-base font-bold text-white tracking-wide">
                        Enterprise Ready
                      </h4>
                      <p className="text-[10px] text-zinc-500 uppercase tracking-widest font-bold mt-1">
                        Bank-Grade Config
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1">
                    {[
                      {
                        icon: Lock,
                        title: "256-Bit Encryption",
                        desc: "Data secured at rest & transit",
                      },
                      {
                        icon: FileCheck,
                        title: "SOC 2 Certified",
                        desc: "Audited organizational controls",
                      },
                      {
                        icon: Shield,
                        title: "GDPR Compliant",
                        desc: "Strict EU data privacy standards",
                      },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/[0.03] hover:bg-white/[0.06] transition-colors"
                      >
                        <item.icon className="w-5 h-5 text-zinc-400 mt-0.5 shrink-0" />
                        <div>
                          <div className="text-sm font-bold text-zinc-200">
                            {item.title}
                          </div>
                          <div className="text-xs text-zinc-500 mt-1 leading-relaxed">
                            {item.desc}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={200}>
            <div className="max-w-7xl mx-auto mb-32">
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-7xl font-black text-white mb-4 tracking-tight">
                  The Full Platform Ecosystem
                </h3>
                <p className="text-base text-zinc-400 max-w-2xl mx-auto">
                  Every paid plan grants you access to the complete suite of
                  Nexus tools designed to scale your pipeline from end to end.
                </p>
              </div>

              <motion.div
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                {platformEcosystemData.map((module, idx) => (
                  <motion.div
                    key={idx}
                    variants={cardVariants}
                    whileHover={{ y: -8, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 320, damping: 25 }}
                    className="relative group bg-[#0A0A0C] border border-white/[0.06] hover:border-white/[0.15] rounded-[2rem] p-8 transition-all duration-500 overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)] cursor-default"
                  >
                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] ${module.bg} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                    />

                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${module.bg}/[0.02] pointer-events-none`}
                    />

                    <div
                      className={`absolute -top-8 -right-8 w-32 h-32 ${module.bg} blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full pointer-events-none`}
                    />

                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-[900ms] ease-in-out" />
                    </div>

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-[#111116] border border-white/[0.08] shadow-inner group-hover:scale-110 transition-transform duration-500">
                          <module.icon className={`w-6 h-6 ${module.color}`} />
                        </div>
                        <div
                          className={`text-[9px] font-black uppercase tracking-widest ${module.color} border border-white/[0.08] px-3.5 py-1.5 rounded-full bg-white/[0.02] backdrop-blur-md shadow-sm`}
                        >
                          {module.subtitle}
                        </div>
                      </div>

                      <h4 className="text-xl font-bold text-white mb-3 tracking-wide">
                        {module.title}
                      </h4>
                      <p className="text-sm text-zinc-400 mb-8 leading-relaxed font-medium">
                        {module.desc}
                      </p>

                      <div className="space-y-4 pt-6 mt-auto border-t border-white/[0.05]">
                        {module.features.map((item, i) => {
                          const [boldText, ...restTextArray] = item.split(": ");
                          const restText = restTextArray.join(": ");
                          return (
                            <div key={i} className="flex items-start gap-3">
                              <div
                                className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${module.color} opacity-80 shadow-[0_0_8px_currentColor]`}
                              />
                              <div className="text-[13px] leading-relaxed">
                                <span className="text-zinc-200 font-bold">
                                  {boldText}
                                </span>
                                {restText && (
                                  <span className="text-zinc-500 block sm:inline sm:ml-1">
                                    — {restText}
                                  </span>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </ScrollReveal>

          {/* <ScrollReveal delay={300}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
              className="max-w-4xl mx-auto relative group bg-[#0A0A0C]/80 backdrop-blur-xl border border-white/[0.07] 
                         hover:border-indigo-500/30 rounded-3xl p-8 flex flex-col md:flex-row items-center 
                         justify-between gap-6 overflow-hidden transition-all duration-500
                         hover:shadow-[0_8px_40px_rgba(99,102,241,0.1)] mb-24"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-indigo-500/10 to-transparent transition-transform duration-[1500ms] ease-in-out" />
              </div>
              <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-4 text-center md:text-left">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20 flex items-center justify-center border border-indigo-500/30 shrink-0">
                  <Zap className="w-6 h-6 text-indigo-400" />
                </div>
                <div>
                  <h3 className="text-lg font-black text-white mb-1.5">
                    Need an Enterprise custom solution?
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Unlimited volume, dedicated infrastructure, and custom AI
                    model training for your specific use-case.
                  </p>
                </div>
              </div>
              <Button
                text="Book Strategy Call"
                variant="secondary"
                className="px-8 py-3.5 shrink-0 relative z-10 text-sm"
                onClick={() =>
                  window.open("https://cal.com/kevin-nexuscale/15min", "_blank")
                }
              />
            </motion.div>
          </ScrollReveal> */}
        </div>
      </section>
    </div>
  );
}
