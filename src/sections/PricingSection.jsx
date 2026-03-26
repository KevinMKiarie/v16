import React, { useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
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
} from "lucide-react";
import {
  pricingPlansData,
  platformEcosystemData,
  faqData,
  planStyles,
} from "../data/pricing";

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
                <Sparkles className="w-3.5 h-3.5 shrink-0" />
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

  const savingsHighlight = annual
    ? "opacity-100 translate-y-0"
    : "opacity-0 -translate-y-1 pointer-events-none";

  const getPrice = (plan) => {
    if (plan.price === "0") return "0";
    return annual && plan.annualPrice ? plan.annualPrice : plan.price;
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
        {/* Background Gradients */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] opacity-20 pointer-events-none blur-[120px] bg-gradient-to-b from-indigo-500/30 to-transparent" />

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

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight">
                Enterprise Power. <br className="hidden sm:block" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">
                  Total Flexibility.
                </span>
              </h2>
              <p className="text-zinc-400 text-base max-w-xl mx-auto mb-10 leading-relaxed">
                Every plan includes the full Autonomous OS, unlimited seats, and
                all core AI capabilities to scale your pipeline.
              </p>

              {/* Pricing Toggle */}
              <div className="flex flex-col items-center gap-3">
                <div className="flex items-center gap-1 bg-white/[0.03] p-1.5 rounded-full border border-white/[0.08] backdrop-blur-md">
                  <button
                    onClick={() => setAnnual(false)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 ${
                      !annual
                        ? "bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setAnnual(true)}
                    className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all duration-300 flex items-center gap-2 ${
                      annual
                        ? "bg-white text-black shadow-[0_4px_20px_rgba(255,255,255,0.15)]"
                        : "text-zinc-400 hover:text-white"
                    }`}
                  >
                    Yearly
                    <span
                      className={`text-[10px] px-2 py-0.5 rounded-full border transition-colors ${
                        annual
                          ? "bg-emerald-500 text-white border-emerald-600 shadow-sm"
                          : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                      }`}
                    >
                      2months Free
                    </span>
                  </button>
                </div>
                <div className="flex items-center gap-4 mt-2">
                  <div
                    className={`text-emerald-400 text-xs font-bold tracking-widest uppercase transition-all duration-500 ${savingsHighlight}`}
                  >
                    <Sparkles className="w-3.5 h-3.5 inline-block mr-1.5 mb-0.5" />
                    Save up to $2,397 a year
                  </div>
                  <div className="text-[10px] text-zinc-500 uppercase tracking-widest font-semibold">
                    • Cancel Anytime
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Not ready to commit */}
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

          {/* Pricing Cards */}
          <motion.div
            class="grid md:grid-cols-2 lg:grid-cols-3 gap-3 max-w-[95%] mx-auto mb-16 justify-center place-items-center"
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

                    {/* Top accent bar */}
                    <div
                      className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${s.accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                    />

                    {isLastAlone ? (
                      /* Agency Plan — horizontal layout */
                      <div
                        className={`relative z-10 p-6 flex flex-col md:flex-row flex-1 gap-6 md:gap-8 ${isPopular ? "pt-10" : "pt-8"}`}
                      >
                        {/* Left: header + pricing + CTA */}
                        <div className="flex flex-col gap-5 md:w-[280px] md:shrink-0 md:border-r md:border-white/[0.06] md:pr-8">
                          {/* Header */}
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

                          {/* Pricing */}
                          <div>
                            <div className="flex items-baseline gap-1.5 flex-wrap">
                              {s.priceGrad ? (
                                <span
                                  className={`text-5xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r ${s.price}`}
                                >
                                  ${getPrice(plan)}
                                </span>
                              ) : (
                                <span className="text-5xl font-black tracking-tight leading-none text-white">
                                  ${getPrice(plan)}
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

                          {/* CTA */}
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

                        {/* Right: stat chips + features */}
                        <div className="flex flex-col gap-5 flex-1 min-w-0">
                          <div className="h-px md:hidden bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05]" />

                          {/* Hard Limits Grid */}
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

                          {/* Features List */}
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
                                      <Sparkles className="w-3.5 h-3.5 shrink-0" />
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
                        {/* Header */}
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

                        {/* Pricing */}
                        <div>
                          <div className="flex items-baseline gap-1.5 flex-wrap">
                            {s.priceGrad ? (
                              <span
                                className={`text-5xl font-black tracking-tight leading-none text-transparent bg-clip-text bg-gradient-to-r ${s.price}`}
                              >
                                ${getPrice(plan)}
                              </span>
                            ) : (
                              <span className="text-5xl font-black tracking-tight leading-none text-white">
                                ${getPrice(plan)}
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
                          {plan.price === "0" && (
                            <p className="text-[10px] text-zinc-600 mt-1.5 font-bold uppercase tracking-wider opacity-0">
                              Spacer
                            </p>
                          )}
                        </div>

                        <div className="h-px bg-gradient-to-r from-white/[0.05] via-white/[0.1] to-white/[0.05]" />

                        {/* Hard Limits Grid */}
                        <div className="grid grid-cols-2 gap-2">
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

                        {/* Features List */}
                        <CardFeatureList plan={plan} s={s} />

                        {/* CTA Section */}
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

          {/* Agency Section */}
          <div className="mt-12 p-8 rounded-2xl border border-indigo-500/20 bg-indigo-500/5 text-center max-w-2xl mx-auto">
            <p className="text-zinc-400 text-sm mb-1 uppercase tracking-widest font-bold">
              For agencies
            </p>
            <h3 className="text-2xl font-bold text-white mb-2">
              Running an agency? We built something different for you.
            </h3>
            <p className="text-zinc-400 text-sm mb-6">
              White-label infrastructure, multi-tenant management, and
              margin-boosting automation — purpose-built for agency scale.
            </p>
            <a
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-indigo-600 text-white font-bold text-sm hover:bg-indigo-500 transition-colors"
            >
              Book a call →
            </a>
          </div>

          {/* Compare Plans Table */}
          <div className="my-20">
            <h3 className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-400 mb-8 font-black text-center text-7xl">
              Compare plans
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b font-semibold border-white/10">
                    <th className="text-left py-4 px-4 text-zinc-400 font-bold uppercase tracking-wider text-xs ">
                      Feature
                    </th>
                    <th className="text-center py-4 px-4 text-zinc-400 font-bold uppercase tracking-wider text-xs">
                      Start Up
                    </th>
                    <th className="text-center py-4 px-4 text-zinc-400 font-bold uppercase tracking-wider text-xs">
                      Growth
                    </th>
                    <th className="text-center py-4 px-4 text-zinc-400 font-bold uppercase tracking-wider text-xs">
                      Scale Up
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    {
                      feature: "AI Agents",
                      startup: "2",
                      growth: "10",
                      scale: "50",
                    },
                    {
                      feature: "Workspaces",
                      startup: "1",
                      growth: "3",
                      scale: "10",
                    },
                    {
                      feature: "Credits/mo",
                      startup: "2,500",
                      growth: "4,000",
                      scale: "15,000",
                    },
                    {
                      feature: "LinkedIn seats",
                      startup: "Add-on (max 2)",
                      growth: "Add-on (max 10)",
                      scale: "Unlimited",
                    },
                    {
                      feature: "Lead scoring",
                      startup: "Basic",
                      growth: "Advanced",
                      scale: "Advanced",
                    },
                    {
                      feature: "Support",
                      startup: "Live chat",
                      growth: "Priority",
                      scale: "Priority",
                    },
                  ].map((row) => (
                    <tr
                      key={row.feature}
                      className="hover:bg-white/[0.02] transition-colors"
                    >
                      <td className="py-4 px-4 text-white font-medium">
                        {row.feature}
                      </td>
                      <td className="py-4 px-4 text-zinc-400 text-center">
                        {row.startup}
                      </td>
                      <td className="py-4 px-4 text-zinc-400 text-center">
                        {row.growth}
                      </td>
                      <td className="py-4 px-4 text-zinc-400 text-center">
                        {row.scale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Enterprise Trust & ROI Section */}
          <ScrollReveal delay={100}>
            <div className="max-w-7xl mx-auto mb-32 grid lg:grid-cols-12 gap-6">
              {/* Epic ROI Testimonial */}
              <div className="lg:col-span-8 relative rounded-[2.5rem] bg-[#0A0A0C] border border-white/[0.06] overflow-hidden p-8 md:p-12 group hover:border-white/[0.1] transition-all duration-500 hover:shadow-[0_0_50px_rgba(99,102,241,0.05)]">
                {/* Ambient Background Glows */}
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

              {/* Security Vault */}
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

          {/* Feature Deep Dive Ecosystem */}
          <ScrollReveal delay={200}>
            <div className="max-w-7xl mx-auto mb-32">
              <div className="text-center mb-16">
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
                  The Full Platform Ecosystem
                </h3>
                <p className="text-base text-zinc-400 max-w-2xl mx-auto">
                  Every paid plan grants you access to the complete suite of
                  Nexus tools designed to scale your pipeline from end to end.
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {platformEcosystemData.map((module, idx) => (
                  <div
                    key={idx}
                    className="relative group bg-[#0A0A0C] border border-white/[0.06] hover:border-white/[0.15] rounded-[2rem] p-8 transition-all duration-500 overflow-hidden hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]"
                  >
                    {/* Ambient Inner Glow */}
                    <div
                      className={`absolute inset-0 bg-gradient-to-br ${module.bg}/[0.02] pointer-events-none`}
                    />

                    {/* Interactive Hover Aura */}
                    <div
                      className={`absolute -top-24 -right-24 w-64 h-64 bg-gradient-to-br ${module.bg} blur-[80px] opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full pointer-events-none`}
                    />

                    <div className="relative z-10 flex flex-col h-full">
                      <div className="flex items-center justify-between mb-8">
                        <div
                          className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-[#111116] border border-white/[0.08] shadow-inner group-hover:scale-110 transition-transform duration-500`}
                        >
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
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* Custom Enterprise Banner */}
          <ScrollReveal delay={300}>
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
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
