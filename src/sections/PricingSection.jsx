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
import { pricingPlansData } from "../data/pricing";
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
      <div className="text-[12px] text-zinc-500 uppercase tracking-wider font-bold leading-tight">
        {label}
      </div>
      {sublabel && (
        <div className="text-[11px] text-zinc-600 font-semibold mt-1 leading-tight">
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

// --- INSIGHT BAND ---
// Unique value-math panel per plan; Start Up has an interactive LinkedIn toggle

const InsightBand = ({ plan, annual }) => {
  const [includeLinkedIn, setIncludeLinkedIn] = useState(false);
  const basePrice =
    annual && plan.annualPrice ? Number(plan.annualPrice) : Number(plan.price);

  if (plan.name === "Start Up") {
    const total = basePrice + (includeLinkedIn ? 29 : 0);
    const growthPrice = annual ? 83 : 99;
    const diff = growthPrice - total;

    return (
      <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-4 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-500">
            Cost Breakdown
          </span>
          <label className="flex items-center gap-2 cursor-pointer">
            <span className="text-[10px] text-zinc-500">+ LinkedIn seat</span>
            <div
              onClick={() => setIncludeLinkedIn((v) => !v)}
              className={`relative w-7 h-[15px] rounded-full border transition-all duration-300 cursor-pointer flex-shrink-0 ${
                includeLinkedIn
                  ? "bg-[#0077b5] border-[#0077b5]"
                  : "bg-white/[0.06] border-white/[0.18]"
              }`}
            >
              <div
                className={`absolute top-[1px] w-[11px] h-[11px] rounded-full bg-white shadow-sm transition-all duration-300 ${
                  includeLinkedIn ? "left-[calc(100%-12px)]" : "left-[1px]"
                }`}
              />
            </div>
          </label>
        </div>

        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-xs">
            <span className="text-zinc-400">Start Up plan</span>
            <span className="font-mono font-bold text-zinc-200">
              ${basePrice}
            </span>
          </div>
          <AnimatePresence>
            {includeLinkedIn && (
              <motion.div
                key="li-line"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden"
              >
                <div className="flex justify-between items-center text-xs text-zinc-500 pb-1.5">
                  <span>+ LinkedIn seat (add-on)</span>
                  <span className="font-mono text-[#4fa3d4]">+$29</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          <div className="flex justify-between items-center pt-1.5 border-t border-white/[0.07]">
            <span className="text-xs font-bold text-zinc-300">
              Your monthly cost
            </span>
            <AnimatePresence mode="wait">
              <motion.span
                key={total}
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 8 }}
                transition={{ duration: 0.2 }}
                className="font-mono font-black text-sm text-white"
              >
                ${total}/mo
              </motion.span>
            </AnimatePresence>
          </div>
        </div>

        <AnimatePresence>
          {includeLinkedIn && (
            <motion.div
              key="growth-tip"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{
                duration: 0.28,
                delay: 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="overflow-hidden"
            >
              <div className="text-[11px] text-indigo-300/90 bg-indigo-500/[0.08] rounded-xl px-3 py-2 border border-indigo-500/15 leading-relaxed">
                Growth at ${growthPrice}/mo adds{" "}
                <span className="text-white font-bold">3× AI agents</span> +{" "}
                <span className="text-white font-bold">AI Meeting Agent</span>{" "}
                for only{" "}
                <span className="text-indigo-300 font-black">
                  +${diff}/mo more
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }

  if (plan.name === "Growth") {
    const startUpBase = annual ? 49 : 59;
    const withLinkedIn = startUpBase + 29;
    const diff = basePrice - withLinkedIn;

    return (
      <div className="rounded-2xl bg-indigo-500/[0.07] border border-indigo-500/20 p-4 space-y-3">
        <div className="text-[9px] font-black uppercase tracking-[0.15em] text-indigo-400/80">
          vs Start Up + LinkedIn seat
        </div>
        <div className="flex items-start justify-between gap-3">
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-zinc-600 line-through font-mono">
                ${withLinkedIn}/mo
              </span>
              <span className="text-zinc-600">Start Up configured</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-indigo-300 font-black text-base font-mono">
                ${basePrice}/mo
              </span>
              <span className="text-[10px] text-zinc-500">this plan</span>
            </div>
          </div>
          <div className="flex flex-col items-end gap-1">
            <div className="text-[9px] font-black text-zinc-500 uppercase tracking-wider mb-0.5">
              +${diff}/mo, you get
            </div>
            <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> 3× AI agents
            </div>
            <div className="text-[10px] font-bold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" /> AI Meeting Agent
            </div>
          </div>
        </div>
        <p className="text-[11px] text-zinc-400 leading-relaxed border-t border-indigo-500/10 pt-2.5">
          5 agents · 3 workspaces · Advanced scoring · Premium deliverability —
          fully unlocked.
        </p>
      </div>
    );
  }

  if (plan.name === "Scale Up") {
    return (
      <div className="rounded-2xl bg-white/[0.025] border border-white/[0.07] p-4 space-y-2.5">
        <div className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-500">
          Built for
        </div>
        <p className="text-sm leading-relaxed text-zinc-300">
          High-volume teams sending{" "}
          <span className="text-white font-bold">100k+</span> emails/mo across{" "}
          <span className="text-white font-bold">10 isolated workspaces</span>.
        </p>
        <div className="flex flex-wrap gap-1.5 pt-0.5">
          {[
            "10 Workspaces",
            "50 Seats",
            "10 AI Agents",
            "Unlimited LinkedIn",
          ].map((tag, i) => (
            <span
              key={i}
              className="text-[9px] font-bold text-violet-400/80 bg-violet-500/[0.09] border border-violet-500/20 px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

// --- PLAN FEATURE LIST ---
// Feature list with "Overview / +vs Prev / All N" view-mode tabs

const PlanFeatureList = ({ plan, prevPlanName }) => {
  const [viewMode, setViewMode] = useState("key"); // 'key' | 'diff' | 'all'

  const keyFeatures = plan.keyFeatures || [];
  const allFeatures = plan.features.filter((f) => !f.isBadge);

  const activeDiffStyle =
    plan.name === "Growth"
      ? "bg-indigo-500/[0.12] text-indigo-400 border-indigo-500/20"
      : "bg-violet-500/[0.12] text-violet-400 border-violet-500/20";

  const checkColor =
    plan.name === "Start Up"
      ? "text-blue-400 drop-shadow-[0_0_6px_rgba(59,130,246,0.5)]"
      : plan.name === "Growth"
        ? "text-indigo-400 drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]"
        : "text-violet-400 drop-shadow-[0_0_6px_rgba(139,92,246,0.5)]";

  const plusIconColor =
    plan.name === "Growth"
      ? "bg-indigo-500/20 text-indigo-400"
      : "bg-violet-500/20 text-violet-400";

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* View-mode tab bar */}
      <div className="flex items-center gap-1.5 mb-3">
        <span className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-600 mr-1 shrink-0">
          Features
        </span>
        <button
          onClick={() => setViewMode("key")}
          className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider transition-all border ${
            viewMode === "key"
              ? "bg-white/[0.08] text-zinc-200 border-white/[0.12]"
              : "text-zinc-600 border-transparent hover:text-zinc-400"
          }`}
        >
          Overview
        </button>
        {prevPlanName && (
          <button
            onClick={() => setViewMode(viewMode === "diff" ? "key" : "diff")}
            className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider transition-all border flex items-center gap-0.5 ${
              viewMode === "diff"
                ? activeDiffStyle
                : "text-zinc-600 border-transparent hover:text-zinc-400"
            }`}
          >
            <span>+</span> vs {prevPlanName}
          </button>
        )}
        {allFeatures.length > keyFeatures.length && (
          <button
            onClick={() => setViewMode(viewMode === "all" ? "key" : "all")}
            className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider transition-all border ml-auto ${
              viewMode === "all"
                ? "bg-white/[0.08] text-zinc-200 border-white/[0.12]"
                : "text-zinc-600 border-transparent hover:text-zinc-400"
            }`}
          >
            {viewMode === "all" ? "Less" : `All ${allFeatures.length}`}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-2.5"
        >
          {viewMode === "diff" ? (
            <>
              <div className="text-[9px] text-zinc-600 mb-2 leading-relaxed">
                What {plan.name} adds on top of {prevPlanName}
              </div>
              {keyFeatures.map((f, i) => (
                <div key={i} className="flex items-center gap-2.5">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 ${plusIconColor}`}
                  >
                    <svg
                      className="w-2.5 h-2.5"
                      viewBox="0 0 10 10"
                      fill="none"
                    >
                      <path
                        d="M5 2v6M2 5h6"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <span className="text-xs font-medium text-zinc-200 leading-tight">
                    {f}
                  </span>
                </div>
              ))}
            </>
          ) : viewMode === "all" ? (
            allFeatures.map((f, i) => (
              <div
                key={i}
                className={`flex items-start gap-2.5 text-xs font-medium ${
                  f.included ? "text-zinc-300" : "text-zinc-600 line-through"
                }`}
              >
                {f.included ? (
                  <CheckCircle2
                    className={`w-3.5 h-3.5 shrink-0 mt-0.5 ${checkColor}`}
                  />
                ) : (
                  <MinusCircle className="w-3.5 h-3.5 shrink-0 mt-0.5 text-zinc-700" />
                )}
                <span className="leading-tight">{f.text}</span>
                {f.tooltip && f.included && <FeatureTooltip text={f.tooltip} />}
              </div>
            ))
          ) : (
            keyFeatures.map((f, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <CheckCircle2
                  className={`w-3.5 h-3.5 shrink-0 ${checkColor}`}
                />
                <span className="text-xs font-medium text-zinc-200 leading-tight">
                  {f}
                </span>
              </div>
            ))
          )}
        </motion.div>
      </AnimatePresence>
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
        tooltip: "Real-time verification  1 credit per email",
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
          "Identify companies actively raising or hiring  prime buying signals",
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
        tooltip: "+$29/mo per additional seat",
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

// --- AWARD CARD HELPERS ---

const PlanIcon = ({ name }) => {
  switch (name) {
    case "Start Up":
      return <Rocket className="w-5 h-5 text-white" />;
    case "Growth":
      return <TrendingUp className="w-5 h-5 text-white" />;
    case "Scale Up":
      return <Zap className="w-5 h-5 text-white" />;
    case "Agency":
      return <Star className="w-5 h-5 text-white" />;
    default:
      return <LucideSparkles className="w-5 h-5 text-white" />;
  }
};

const PlanDecorativePattern = ({ name }) => {
  switch (name) {
    case "Free":
      return (
        <svg
          className="absolute bottom-0 right-0 w-36 h-36 opacity-10"
          viewBox="0 0 144 144"
          fill="none"
        >
          {[20, 36, 52, 68, 84, 100, 116].map((r, i) => (
            <circle
              key={i}
              cx="144"
              cy="144"
              r={r}
              stroke="#a1a1aa"
              strokeWidth="1.2"
            />
          ))}
        </svg>
      );
    case "Start Up":
      return (
        <svg
          className="absolute bottom-0 right-0 w-40 h-40 opacity-20"
          viewBox="0 0 160 160"
          fill="none"
        >
          {[0, 12, 24, 36, 48, 60, 72].map((offset, i) => (
            <path
              key={i}
              d={`M${160 - offset},160 Q${80 - offset / 2},${80 + offset} ${offset},${160 - offset}`}
              stroke={`url(#blueGrad${i})`}
              strokeWidth="1.5"
              fill="none"
            />
          ))}
          <defs>
            {[0, 12, 24, 36, 48, 60, 72].map((_, i) => (
              <linearGradient
                key={i}
                id={`blueGrad${i}`}
                x1="0"
                y1="0"
                x2="1"
                y2="0"
              >
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            ))}
          </defs>
        </svg>
      );
    case "Growth":
      return (
        <svg
          className="absolute bottom-0 right-0 w-40 h-40 opacity-20"
          viewBox="0 0 160 160"
          fill="none"
        >
          <path
            d="M160,120 C120,100 100,60 80,80 C60,100 40,40 0,60"
            stroke="#10b981"
            strokeWidth="2"
            fill="none"
          />
          <path
            d="M160,100 C120,80 100,40 80,60 C60,80 40,20 0,40"
            stroke="#14b8a6"
            strokeWidth="1.5"
            fill="none"
            opacity="0.7"
          />
          <path
            d="M160,140 C120,120 100,80 80,100 C60,120 40,60 0,80"
            stroke="#6ee7b7"
            strokeWidth="1"
            fill="none"
            opacity="0.5"
          />
          {Array.from({ length: 12 }).map((_, i) => (
            <circle
              key={i}
              cx={i * 14 + 4}
              cy={160 - i * 8 - 10}
              r="2.5"
              fill="#10b981"
              opacity={0.6 - i * 0.04}
            />
          ))}
        </svg>
      );
    case "Scale Up":
      return (
        <svg
          className="absolute bottom-0 right-0 w-40 h-40 opacity-15"
          viewBox="0 0 160 160"
          fill="none"
        >
          {Array.from({ length: 6 }).map((_, row) =>
            Array.from({ length: 6 }).map((_, col) => (
              <circle
                key={`${row}-${col}`}
                cx={col * 22 + 18 + row * 4}
                cy={row * 22 + 18}
                r="3"
                fill="#818cf8"
                opacity={0.8 - (row + col) * 0.06}
              />
            )),
          )}
          <path
            d="M160,160 L80,80 L160,0"
            stroke="#6366f1"
            strokeWidth="1"
            opacity="0.3"
          />
          <path
            d="M160,160 L40,80 L160,0"
            stroke="#8b5cf6"
            strokeWidth="1"
            opacity="0.2"
          />
        </svg>
      );
    case "Agency":
      return (
        <svg
          className="absolute bottom-0 right-0 w-40 h-40 opacity-20"
          viewBox="0 0 160 160"
          fill="none"
        >
          {Array.from({ length: 8 }).map((_, i) => (
            <path
              key={i}
              d={`M${160 - i * 18},160 L160,${160 - i * 18}`}
              stroke={i % 2 === 0 ? "#a855f7" : "#ec4899"}
              strokeWidth="10"
              opacity={0.9 - i * 0.08}
            />
          ))}
        </svg>
      );
    default:
      return null;
  }
};

// --- MAIN SECTION COMPONENT ---

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function PricingSection() {
  const [annual, setAnnual] = useState(true);
  const [openCategories, setOpenCategories] = useState({});

  const toggleCategory = (i) =>
    setOpenCategories((prev) => ({ ...prev, [i]: !prev[i] }));

  const displayPlans = pricingPlansData.filter(
    (p) => p.name !== "Free" && p.name !== "Agency",
  );

  return (
    <div className="min-h-screen bg-[#050505] selection:bg-indigo-500/30 text-zinc-200">
      <style>{`
        @keyframes shimmer { 100% { transform: translateX(100%); } }
        @keyframes aurora {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(40px, -25px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.95); }
        }
      `}</style>

      <section className="py-24 relative px-4 md:px-6 overflow-hidden">
        {/* Ruled vertical lines */}
        <div
          className="absolute inset-0 pointer-events-none [mask-image:radial-gradient(65%_55%_at_50%_0%,white,transparent)]"
          style={{
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)",
            backgroundSize: "96px 100%",
          }}
        />

        {/* Aurora animated blobs */}
        <div className="absolute left-0 top-[-114px] w-full h-[113.625vh] overflow-hidden pointer-events-none z-0">
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] rounded-full"
            style={{
              border: "200px solid #3131f5",
              filter: "blur(92px)",
              animation: "aurora 20s ease-in-out infinite",
            }}
          />
          <div
            className="absolute left-[-568px] right-[-568px] top-0 h-[2053px] rounded-full"
            style={{
              border: "200px solid #3131f5",
              filter: "blur(92px)",
              animation: "aurora 20s ease-in-out infinite reverse",
            }}
          />
        </div>

        <div className="md:max-w-7xl mx-auto relative z-10 w-full">
          <ScrollReveal>
            <div className="mb-12">
              {/* Pricing label */}
              <div className="mb-10 flex items-center gap-3 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                <span className="h-px w-7 shrink-0 bg-gradient-to-r from-indigo-500 to-transparent" />
                Pricing
              </div>

              {/* Headline + $575 side panel */}
              <div className="grid items-end gap-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:gap-16 pb-12 mb-10 border-b border-white/[0.06]">
                <div>
                  <h1 className="text-[clamp(3.5rem,9vw,7.5rem)] font-bold leading-[0.94] tracking-[-0.035em] text-zinc-50">
                    Run outbound,
                    <br />
                    <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                      not infrastructure.
                    </span>
                  </h1>
                  <p className="mt-6 max-w-xl text-base md:text-lg leading-8 text-zinc-400">
                    Email and LinkedIn, fully provisioned in one platform. Pick
                    a plan, connect your accounts, send today. No
                    stitched-together stack, no infrastructure tax.
                  </p>
                </div>

                <aside className="border-t border-white/[0.06] pt-6 text-left lg:border-l lg:border-t-0 lg:pl-10 lg:text-right">
                  <div className="text-[5.5rem] font-bold leading-none tracking-[-0.04em] bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    $575
                  </div>
                  <p className="mt-4 font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500 max-w-[18ch] lg:ml-auto">
                    Replaced monthly. Apollo + HeyReach + Instantly, in one
                    bill.
                  </p>
                </aside>
              </div>

              {/* Billing toggle */}
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
                <AnimatePresence>
                  {annual && (
                    <motion.div
                      initial={{ opacity: 0, y: -6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="text-emerald-400 text-xs font-bold tracking-widest uppercase mt-2"
                    >
                      <LucideSparkles className="w-3.5 h-3.5 inline-block mr-1.5 mb-0.5" />
                      Save up to $2,397 a year
                    </motion.div>
                  )}
                </AnimatePresence>
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

          {/* ── Connected 3-Card Pricing Grid ── */}
          <motion.div
            className="grid grid-cols-1 lg:grid-cols-[1fr_1.08fr_1fr] gap-4 lg:gap-5 max-w-[98%] md:max-w-[94%] mx-auto mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {displayPlans.map((plan, i) => {
              const isFeatured = plan.name === "Growth";
              const price =
                annual && plan.annualPrice ? plan.annualPrice : plan.price;

              const accentFrom = isFeatured
                ? "#6366f1"
                : plan.name === "Start Up"
                  ? "#3b82f6"
                  : "#8b5cf6";
              const accentTo = isFeatured
                ? "#8b5cf6"
                : plan.name === "Start Up"
                  ? "#06b6d4"
                  : "#6366f1";

              const cardShape = isFeatured
                ? "rounded-3xl border border-indigo-500/40"
                : "rounded-3xl border border-white/[0.08]";

              const cardElevation = isFeatured
                ? "lg:-translate-y-4 lg:scale-[1.025] z-10 shadow-[0_30px_80px_-20px_rgba(99,102,241,0.35)] ring-1 ring-indigo-500/30"
                : "z-0";

              const tierMeta = {
                "Start Up": {
                  num: "01",
                  tag: "Bring your own",
                  displayName: "Starter",
                  featLabel: "Includes",
                },
                Growth: {
                  num: "02",
                  tag: "For serious outbound",
                  displayName: "Omnichannel",
                  featLabel: "Everything in Starter, plus provisioned",
                },
                "Scale Up": {
                  num: "03",
                  tag: "Teams & agencies",
                  displayName: "Scale-Up",
                  featLabel: "Everything in Omnichannel, plus",
                },
              }[plan.name];

              const keyFeats =
                {
                  "Start Up": [
                    { text: "2,500 credits / month", included: true },
                    { text: "2 AI agents, 2 seats", included: true },
                    { text: "Unlimited sending and warmup", included: true },
                    { text: "Mailboxes", meta: "from $5/mo", included: false },
                    {
                      text: "LinkedIn seats",
                      meta: "$29/seat",
                      included: false,
                    },
                    { text: "Domain", meta: "bring your own", included: false },
                  ],
                  Growth: [
                    {
                      text: "3 native mailboxes",
                      meta: "included",
                      included: true,
                    },
                    {
                      text: "1 sending domain",
                      meta: "year one on us",
                      included: true,
                    },
                    {
                      text: "1 LinkedIn seat",
                      meta: "swappable",
                      included: true,
                    },
                    {
                      text: "DNS, DKIM, SPF, DMARC configured for you",
                      included: true,
                    },
                    {
                      text: "Dedicated proxy per LinkedIn account",
                      included: true,
                    },
                    { text: "Stack more mailboxes from $3/mo", included: true },
                  ],
                  "Scale Up": [
                    { text: "15,000 credits / month", included: true },
                    {
                      text: "10 agents, 50 seats, 10 workspaces",
                      included: true,
                    },
                    { text: "Advanced lead scoring", included: true },
                    { text: "AI Meeting Agent", included: true },
                    { text: "Premium deliverability routing", included: true },
                    { text: "Priority support, dedicated CSM", included: true },
                  ],
                }[plan.name] || [];

              return (
                <motion.div
                  key={plan.name}
                  variants={cardVariants}
                  className={`relative w-full flex flex-col bg-[#0A0A0C] overflow-hidden transition-all duration-500 ${cardShape} ${cardElevation}`}
                >
                  {/* Featured radial glow */}
                  {isFeatured && (
                    <div
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(600px 350px at 50% 0%, rgba(99,102,241,0.16) 0%, transparent 70%)",
                      }}
                    />
                  )}

                  {/* Top accent line */}
                  {/* <div
                    className="h-[2px] w-full shrink-0"
                    style={{ background: `linear-gradient(to right, ${accentFrom}, ${accentTo})`, opacity: isFeatured ? 1 : 0.45 }}
                  /> */}

                  {/* Featured ribbon */}
                  {isFeatured && (
                    <div className="absolute top-0 left-0 right-0 flex justify-center z-20 pointer-events-none">
                      <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[10px] font-black px-5 py-1.5 rounded-b-2xl uppercase tracking-widest flex items-center gap-1.5 shadow-lg shadow-indigo-500/40">
                        ★ Built for outbound
                      </div>
                    </div>
                  )}

                  <div
                    className={`relative z-10 flex flex-col gap-7 p-7 md:p-9 ${isFeatured ? "pt-14" : "pt-8"}`}
                  >
                    {/* ── Tier Meta ── */}
                    <div className="flex justify-between items-baseline">
                      <span className="font-mono text-[11px] text-zinc-500 tracking-[0.1em] font-semibold uppercase">
                        {tierMeta.num} · {tierMeta.displayName}
                      </span>
                      <span
                        className={`font-mono text-[10px] uppercase tracking-[0.12em] px-2.5 py-1 rounded-full font-bold border ${
                          isFeatured
                            ? "text-indigo-300 bg-indigo-500/[0.2] border-indigo-500/40"
                            : "text-indigo-300 bg-indigo-500/[0.12] border-indigo-500/[0.18]"
                        }`}
                      >
                        {tierMeta.tag}
                      </span>
                    </div>

                    {/* ── Tier Name + Desc ── */}
                    <div>
                      <h3 className="text-[36px] font-bold tracking-tight leading-none text-white mb-2">
                        {tierMeta.displayName}
                      </h3>
                      <p className="text-sm text-zinc-400 leading-snug min-h-[42px]">
                        {plan.desc}
                      </p>
                    </div>

                    {/* ── Price Block ── */}
                    <div>
                      <div className="flex items-baseline gap-1 mb-1.5">
                        <span className="text-3xl font-semibold text-zinc-400 leading-none">
                          $
                        </span>
                        <span className="text-[76px] font-bold leading-[0.9] tracking-[-0.04em] text-white">
                          {price}
                        </span>
                        <span className="text-sm text-zinc-400 font-medium ml-2">
                          / mo
                        </span>
                      </div>
                      <span className="font-mono text-[11px] text-zinc-400 uppercase tracking-[0.08em] font-medium">
                        {annual ? "Billed yearly" : "Billed monthly"}
                      </span>
                    </div>

                    {plan.name === "Start Up" && (
                      <div className="p-4 bg-white/[0.025] rounded-2xl border border-white/[0.08] space-y-1">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 font-bold block mb-3">
                          Real cost calculator
                        </span>
                        <div className="flex justify-between items-center text-xs py-2 border-b border-dashed border-white/[0.07]">
                          <span className="text-zinc-400">Starter plan</span>
                          <span className="font-mono font-semibold text-zinc-200">
                            ${price}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs py-2 border-b border-dashed border-white/[0.07]">
                          <span className="text-zinc-400">+ 3 mailboxes</span>
                          <span className="font-mono font-semibold text-zinc-200">
                            $15
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-xs py-2">
                          <span className="text-zinc-400">+ LinkedIn seat</span>
                          <span className="font-mono font-semibold text-zinc-200">
                            $29
                          </span>
                        </div>
                        <div className="flex justify-between items-baseline pt-3 mt-1 border-t-2 border-zinc-700/50">
                          <span className="text-sm font-semibold text-zinc-200 uppercase tracking-[0.06em]">
                            Real cost
                          </span>
                          <span className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                            ${Number(price) + 44}
                          </span>
                        </div>
                      </div>
                    )}

                    {plan.name === "Growth" && (
                      <div
                        className="p-4 rounded-2xl border border-indigo-500/30 relative overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(99,102,241,0.14) 0%, rgba(139,92,246,0.10) 100%)",
                        }}
                      >
                        <div
                          className="absolute inset-0 pointer-events-none"
                          style={{
                            background:
                              "radial-gradient(circle at 80% 20%, rgba(139,92,246,0.25), transparent 70%)",
                          }}
                        />
                        <div className="relative z-10 space-y-1.5 mb-3">
                          <div className="flex justify-between items-baseline">
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-indigo-300 font-bold">
                              vs DIY Starter + add-ons
                            </span>
                            <span className="font-mono text-[13px] text-zinc-400 line-through font-medium">
                              $93/mo
                            </span>
                          </div>
                          <div className="flex justify-between items-baseline">
                            <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-indigo-300 font-bold">
                              vs Clay + Apollo + Instantly
                            </span>
                            <span className="font-mono text-[13px] text-zinc-400 line-through font-medium">
                              $645/mo
                            </span>
                          </div>
                        </div>
                        <div className="relative z-10 text-xl font-bold text-white tracking-tight leading-snug">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-violet-300">
                            ${price} replaces both.
                          </span>{" "}
                          One bill, zero stitching.
                        </div>
                      </div>
                    )}

                    {plan.name === "Scale Up" && (
                      <div
                        className="p-4 rounded-2xl border border-violet-500/25 relative overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(139,92,246,0.10) 0%, rgba(99,102,241,0.07) 100%)",
                        }}
                      >
                        <div className="flex justify-between items-baseline mb-3">
                          <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-400 font-bold">
                            vs stitched outbound stack
                          </span>
                          <span className="font-mono text-[13px] text-zinc-400 line-through font-medium">
                            $1,500+/mo
                          </span>
                        </div>
                        <div className="text-xl font-bold text-white tracking-tight leading-snug">
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-indigo-300">
                            ${price} covers all of it.
                          </span>{" "}
                          100k+ emails, 10 workspaces, one bill.
                        </div>
                      </div>
                    )}

                    {/* ── CTA ── */}
                    <div>
                      <button
                        onClick={() => {
                          if (annual && plan.stripeAnnualUrl)
                            window.open(plan.stripeAnnualUrl, "_blank");
                          else if (!annual && plan.stripeMonthlyUrl)
                            window.open(plan.stripeMonthlyUrl, "_blank");
                          else
                            window.open(
                              "https://app.nexuscale.ai/users/register",
                              "_blank",
                            );
                        }}
                        className={`relative w-full py-4 rounded-xl font-bold text-sm overflow-hidden group transition-all duration-300 flex items-center justify-center gap-2 ${
                          isFeatured
                            ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white border border-indigo-400/50 hover:shadow-[0_0_30px_rgba(99,102,241,0.45)] hover:-translate-y-px"
                            : "bg-white/[0.05] text-white border border-white/[0.1] hover:bg-white/[0.09] hover:border-white/[0.18]"
                        }`}
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          {plan.cta}
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                        {isFeatured && (
                          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.18] to-transparent transition-transform duration-700 ease-in-out skew-x-12" />
                        )}
                      </button>
                      <p
                        className={`text-center mt-2.5 text-[10px] font-semibold uppercase tracking-wider ${isFeatured ? "text-indigo-400" : "text-zinc-600"}`}
                      >
                        {plan.microcopy}
                      </p>
                    </div>

                    {/* ── Features ── */}
                    <div>
                      <div className="pt-5 border-t border-white/[0.05] mb-5">
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 font-bold">
                          {tierMeta.featLabel}
                        </span>
                      </div>
                      <ul className="space-y-3.5">
                        {keyFeats.map((f, fi) => (
                          <li
                            key={fi}
                            className="flex items-start gap-3 text-sm leading-snug"
                          >
                            {f.included ? (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                className="shrink-0 mt-0.5 drop-shadow-[0_0_6px_rgba(99,102,241,0.5)]"
                              >
                                <path
                                  d="M2 7.5L5.5 11L12 3.5"
                                  stroke="#818CF8"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                            ) : (
                              <svg
                                width="14"
                                height="14"
                                viewBox="0 0 14 14"
                                fill="none"
                                className="shrink-0 mt-0.5"
                              >
                                <circle
                                  cx="7"
                                  cy="7"
                                  r="5"
                                  stroke="#3F3F46"
                                  strokeWidth="1.5"
                                />
                              </svg>
                            )}
                            <span
                              className={
                                f.included ? "text-zinc-300" : "text-zinc-400"
                              }
                            >
                              {f.text}
                              {f.meta && (
                                <span className="font-mono text-[11px] text-zinc-500 ml-1.5">
                                  {f.meta}
                                </span>
                              )}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* ── Stat Chips (commented out) ── */}
                    {/* <div className="grid grid-cols-2 gap-2">
                      <StatChip value={creditsMap[plan.name]} label="Credits /mo" sublabel="Engine Credits" />
                      <StatChip value={plan.credits.agents} label="AI Agents" sublabel={plan.credits.agentsType || ""} />
                      <StatChip value={plan.credits.teamSeats} label="Team Seats" sublabel="Collaborators" />
                      <StatChip
                        value={plan.credits.workspaces}
                        label={plan.credits.workspaces === "1" ? "Workspace" : "Workspaces"}
                        sublabel="Isolation"
                      />
                    </div> */}
                  </div>
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
                  margin-boosting automationpurpose-built for firms ready to
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
            <div className="my-16 w-full md:max-w-7xl mx-auto px-4 sm:px-6">
              <div className="text-start mb-10">
                <h3 className="flex  mb-4 font-black text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-spline space-x-2">
                  Compare
                  <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                    Plans
                  </span>
                </h3>
                <p className="text-zinc-400 text-sm sm:text-base ">
                  Every feature, side by side so you can pick with confidence.
                </p>
              </div>

              <div className="w-full overflow-x-auto rounded-2xl border border-white/[0.07] bg-[#0A0A0C]/60 backdrop-blur-xl shadow-[0_8px_60px_rgba(0,0,0,0.5)]">
                <div className="min-w-[600px] max-w-none sm:max-w-[700px] md:max-w-full w-full mx-auto">
                  <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] gap-0">
                    {/* Header row */}
                    <div className="px-4 py-6 sm:px-6 sm:py-8 flex items-end">
                      <span className="text-[9px] sm:text-[10px] font-black uppercase tracking-widest text-zinc-600">
                        Feature
                      </span>
                    </div>

                    {/* Start Up */}
                    <div className="px-3 py-6 sm:px-4 flex flex-col items-center gap-2 border-l border-white/[0.05]">
                      <div className="text-center">
                        <div className="text-white font-bold text-xs sm:text-sm tracking-wide">
                          Start Up
                        </div>
                        <div className="text-zinc-500 text-[10px] sm:text-xs mt-0.5 font-medium">
                          from $49/mo
                        </div>
                      </div>
                    </div>

                    {/* Growth */}
                    <div className="px-3 py-6 sm:px-4  flex flex-col items-center gap-2 relative border-l border-indigo-500/20">
                      <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/[0.08] to-indigo-500/[0.03] pointer-events-none" />
                      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500" />
                      <div className="relative z-10 -mt-1 mb-1 flex justify-center" />

                      <div className="relative z-10 text-center">
                        <div className="text-white font-bold text-xs sm:text-sm tracking-wide">
                          Growth
                        </div>
                        <div className="text-indigo-300/70 text-[10px] sm:text-xs mt-0.5 font-medium">
                          from $83/mo
                        </div>
                      </div>
                      <span className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-[8px] sm:text-[9px] font-black uppercase tracking-widest px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md">
                        Most Popular
                      </span>
                    </div>

                    {/* Scale Up */}
                    <div className="px-3 py-6 sm:px-4  flex flex-col items-center gap-2 border-l border-white/[0.05]">
                      <div className="text-center">
                        <div className="text-white font-bold text-xs sm:text-sm tracking-wide">
                          Scale Up
                        </div>
                        <div className="text-zinc-500 text-[10px] sm:text-xs mt-0.5 font-medium">
                          from $249/mo
                        </div>
                      </div>
                    </div>
                  </div>

                  {comparePlanData.map((section, si) => (
                    <div key={si}>
                      <button
                        onClick={() => toggleCategory(si)}
                        className="w-full grid grid-cols-[2.2fr_1fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] border-t border-white/[0.06] hover:bg-white/[0.04] transition-colors duration-150 text-left relative overflow-hidden group"
                      >
                        <div className="col-span-4 px-4 py-3 sm:px-8 sm:py-3 bg-white/[0.025] flex items-center justify-between relative z-10">
                          <span className="text-[9px] sm:text-lg font-semibold uppercase tracking-[0.12em] sm:tracking-[0.15em] text-white">
                            {section.category}
                          </span>
                          <ChevronDown
                            className={`w-3 sm:w-3.5 h-3 sm:h-3.5 text-zinc-500 transition-transform duration-300 mr-1 ${
                              openCategories[si] ? "rotate-180" : ""
                            }`}
                          />
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-900/80 to-transparent opacity-85 animate-shimmer -skew-x-12 origin-center group-hover:opacity-100 transition-opacity duration-700" />
                      </button>

                      {openCategories[si] &&
                        section.rows.map((row, ri) => (
                          <div
                            key={ri}
                            className="grid grid-cols-[2.2fr_1fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] border-t border-white/[0.04] hover:bg-white/[0.025] transition-colors duration-150"
                          >
                            <div className="px-4 py-3 sm:px-8 sm:py-4 flex items-center gap-2">
                              <span className="text-xs sm:text-sm text-zinc-300 font-medium leading-snug">
                                {row.feature}
                              </span>
                              {row.tooltip && (
                                <FeatureTooltip text={row.tooltip} />
                              )}
                            </div>

                            <div className="px-3 py-3 sm:px-4 sm:py-4 flex items-center justify-center border-l border-white/[0.04]">
                              <CellValue value={row.startup} />
                            </div>

                            <div className="px-3 py-3 sm:px-4 sm:py-4 flex items-center justify-center relative border-l border-indigo-500/10">
                              <div className="absolute inset-0 bg-indigo-500/[0.04] pointer-events-none" />
                              <div className="relative z-10">
                                <CellValue value={row.growth} highlight />
                              </div>
                            </div>

                            <div className="px-3 py-3 sm:px-4 sm:py-4 flex items-center justify-center border-l border-white/[0.04]">
                              <CellValue value={row.scale} />
                            </div>
                          </div>
                        ))}
                    </div>
                  ))}

                  <div className="grid grid-cols-[2.2fr_1fr_1fr_1fr] sm:grid-cols-[2fr_1fr_1fr_1fr] border-t border-white/[0.08]">
                    <div className="px-4 py-4 sm:px-8 sm:py-6" />

                    <div className="px-3 py-4 sm:px-4 sm:py-6 flex items-center justify-center border-l border-white/[0.05]">
                      <a
                        href="https://app.nexuscale.ai/users/register"
                        className="text-[11px] sm:text-xs font-bold text-zinc-300 hover:text-white border border-white/[0.1] hover:border-white/[0.25] px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap bg-white/[0.03] hover:bg-white/[0.07]"
                      >
                        Get Started
                      </a>
                    </div>

                    <div className="px-3 py-4 sm:px-4 sm:py-6 flex items-center justify-center relative border-l border-indigo-500/20">
                      <div className="absolute inset-0 bg-indigo-500/[0.06] pointer-events-none" />
                      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-500 to-violet-500" />
                      <a
                        href="https://buy.stripe.com/dRmbJ14Xh9J2gwkc4Vb7y0c"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="relative z-10 text-[11px] sm:text-xs font-black text-white bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-400 hover:to-violet-400 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap shadow-lg shadow-indigo-600/30 hover:shadow-indigo-500/40"
                      >
                        Get Started
                      </a>
                    </div>

                    <div className="px-3 py-4 sm:px-4 sm:py-6 flex items-center justify-center border-l border-white/[0.05]">
                      <a
                        href="https://buy.stripe.com/eVq6oH9dx3kE4NCc4Vb7y04"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] sm:text-xs font-bold text-zinc-300 hover:text-white border border-white/[0.1] hover:border-violet-500/50 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-200 whitespace-nowrap bg-white/[0.03] hover:bg-violet-500/[0.08]"
                      >
                        Get Started
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={100} className="hidden">
            <div className="max-w-7xl mx-auto mb-32 grid lg:grid-cols-12 gap-6 hidden">
              <div className="lg:col-span-8 relative rounded-[2.5rem] bg-[#0A0A0C] border border-white/[0.06] overflow-hidden p-8 md:p-12 group hover:border-white/[0.1] transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.05)]">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700" />
                <div className="absolute -bottom-24 -left-24 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[100px] pointer-events-none opacity-40 group-hover:opacity-100 transition-opacity duration-700" />

                <div className=" relative z-10 flex flex-col h-full justify-between">
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
            <div className="max-w-7xl mx-auto my-32">
              <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
                {/* Left: heading + description */}
                <div>
                  <h2 className="text-4xl font-bold leading-none tracking-[-0.035em] text-zinc-50 md:text-6xl">
                    What $83{" "}
                    <span className="bg-gradient-to-r from-indigo-400 to-violet-400 bg-clip-text text-transparent">
                      replaces.
                    </span>
                  </h2>
                  <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-400">
                    Most teams running outbound today pay Apollo for data,
                    HeyReach for LinkedIn, and Instantly for cold email. Three
                    subscriptions, three logins, three places where things
                    break.
                  </p>
                  <p className="mt-4 max-w-xl text-lg leading-8 text-zinc-400">
                    Omnichannel absorbs the entire stack at less than 15% of the
                    combined bill. One bill, one login, one place where things
                    break.
                  </p>
                </div>

                {/* Right: receipt card */}
                <div className="rounded-2xl border border-white/[0.12] bg-zinc-950/70 p-6 font-mono text-sm shadow-[0_12px_40px_-16px_rgba(0,0,0,0.7)] backdrop-blur-xl md:p-9">
                  <h3 className="font-sans text-xl font-bold tracking-tight text-zinc-50">
                    Your typical outbound stack
                  </h3>
                  <div className="mb-7 mt-2 border-b border-dashed border-white/[0.12] pb-3 text-[10px] font-semibold uppercase tracking-[0.14em] text-zinc-500">
                    Monthly · Tools you'd otherwise stitch
                  </div>

                  {[
                    {
                      name: "Apollo",
                      role: "B2B data + sequencing",
                      price: "$399.00",
                    },
                    {
                      name: "HeyReach",
                      role: "LinkedIn outreach automation",
                      price: "$79.00",
                    },
                    {
                      name: "Instantly",
                      role: "Cold email sending + warmup",
                      price: "$97.00",
                    },
                  ].map(({ name, role, price: p }) => (
                    <div
                      key={name}
                      className="flex justify-between gap-4 py-2.5"
                    >
                      <div className="flex flex-col gap-1">
                        <span className="font-sans text-sm font-bold tracking-tight text-zinc-50">
                          {name}
                        </span>
                        <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                          {role}
                        </span>
                      </div>
                      <span className="self-center font-semibold text-zinc-300">
                        {p}
                      </span>
                    </div>
                  ))}

                  <div className="mt-3 flex items-baseline justify-between border-t-2 border-zinc-600 pt-4">
                    <span className="font-sans text-sm font-semibold uppercase tracking-wide text-zinc-300">
                      Stitched stack total
                    </span>
                    <span className="font-sans text-3xl font-bold tracking-tight text-zinc-50">
                      $575
                    </span>
                  </div>

                  <div className="my-6 flex items-center gap-4">
                    <div className="h-px flex-1 bg-white/[0.12]" />
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                      vs
                    </span>
                    <div className="h-px flex-1 bg-white/[0.12]" />
                  </div>

                  <div className="flex justify-between gap-4 py-2.5">
                    <div className="flex flex-col gap-1">
                      <span className="font-sans text-sm font-bold tracking-tight bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                        Nexuscale Omnichannel
                      </span>
                      <span className="text-[10px] font-medium uppercase tracking-wide text-zinc-500">
                        Everything above + hosted mailboxes
                      </span>
                    </div>
                    <span className="self-center font-semibold bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                      $83.00
                    </span>
                  </div>

                  <div className="mt-3 flex items-baseline justify-between border-t-2 border-zinc-600 pt-4">
                    <span className="font-sans text-sm font-semibold uppercase tracking-wide text-zinc-300">
                      Nexuscale, all in
                    </span>
                    <span className="font-sans text-3xl font-bold tracking-tight bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
                      $83
                    </span>
                  </div>

                  <div className="mt-5 rounded-xl border border-indigo-500/25 bg-gradient-to-br from-indigo-500/10 to-violet-500/10 p-4 font-sans text-sm leading-6 text-zinc-300">
                    <strong className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text font-bold text-transparent">
                      $492 saved every month.
                    </strong>{" "}
                    That's $5,904/year back to your bottom line, plus mailbox
                    infrastructure included with no tool in the stack above to
                    match it.
                  </div>
                </div>
              </div>
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
