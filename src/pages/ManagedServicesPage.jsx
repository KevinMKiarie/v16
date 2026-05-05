import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  TrendingUp,
  Building2,
  Star,
  ChevronDown,
  ArrowRight,
  Zap,
  MessageSquare,
  Users,
  Calendar,
  BarChart3,
  Shield,
  Mail,
  Search,
  FlaskConical,
  Headphones,
  FileText,
  Target,
} from "lucide-react";

const ScrollReveal = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{
      duration: 0.75,
      ease: [0.16, 1, 0.3, 1],
      delay: delay / 1000,
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const LitePattern = () => (
  <svg
    className="absolute bottom-0 right-0 w-44 h-44 opacity-[0.18]"
    viewBox="0 0 176 176"
    fill="none"
  >
    {[0, 14, 28, 42, 56, 70, 84].map((offset, i) => (
      <path
        key={i}
        d={`M${176 - offset},176 Q${88 - offset * 0.4},${88 + offset * 0.5} ${offset * 0.3},${176 - offset * 0.8}`}
        stroke="url(#liteWave)"
        strokeWidth="1.4"
        fill="none"
        opacity={1 - i * 0.1}
      />
    ))}
    <defs>
      <linearGradient id="liteWave" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stopColor="#06b6d4" />
        <stop offset="100%" stopColor="#3b82f6" />
      </linearGradient>
    </defs>
  </svg>
);

const FullPattern = () => (
  <svg
    className="absolute bottom-0 right-0 w-44 h-44 opacity-[0.22]"
    viewBox="0 0 176 176"
    fill="none"
  >
    <path
      d="M176,130 C140,110 120,60 96,80 C72,100 52,40 16,60"
      stroke="#10b981"
      strokeWidth="2"
      fill="none"
    />
    <path
      d="M176,110 C140,90 120,40 96,60 C72,80 52,20 16,40"
      stroke="#14b8a6"
      strokeWidth="1.4"
      fill="none"
      opacity="0.7"
    />
    <path
      d="M176,150 C140,130 120,80 96,100 C72,120 52,60 16,80"
      stroke="#6ee7b7"
      strokeWidth="1"
      fill="none"
      opacity="0.5"
    />
    {Array.from({ length: 14 }).map((_, i) => (
      <circle
        key={i}
        cx={i * 13 + 6}
        cy={176 - i * 7 - 14}
        r="2.8"
        fill="#10b981"
        opacity={Math.max(0.1, 0.7 - i * 0.05)}
      />
    ))}
  </svg>
);

const ScalePattern = () => (
  <svg
    className="absolute bottom-0 right-0 w-44 h-44 opacity-[0.2]"
    viewBox="0 0 176 176"
    fill="none"
  >
    {Array.from({ length: 9 }).map((_, i) => (
      <path
        key={i}
        d={`M${176 - i * 18},176 L176,${176 - i * 18}`}
        stroke={i % 2 === 0 ? "#a855f7" : "#ec4899"}
        strokeWidth="11"
        opacity={0.95 - i * 0.08}
      />
    ))}
  </svg>
);

const TIERS = [
  {
    id: "lite",
    label: "Managed · Lite",
    name: "Lite · $397 ",
    price: "$397",
    billing: "/month",
    hours: "~8 hrs / week",
    tagline: "For founders who want a hand, not a handoff.",
    accent: "from-cyan-500 to-blue-500",
    accentSolid: "#3b82f6",
    border: "border-white/[0.07] hover:border-blue-500/40",
    glow: "hover:shadow-[0_8px_50px_rgba(59,130,246,0.15)]",
    labelColor: "text-blue-400",
    priceGrad: "from-cyan-300 to-blue-400",
    icon: Clock,
    stripe: "https://cal.com/kevin-nexuscale/15min",
    Pattern: LitePattern,
    features: [
      { icon: Search, text: "List cleaning & enrichment" },
      { icon: Mail, text: "Campaign setup & copywriting" },
      { icon: BarChart3, text: "Basic performance monitoring" },
      { icon: FileText, text: "Monthly summary report" },
    ],
  },
  {
    id: "full",
    label: "Managed · Full",
    name: "Full · $697 ",
    price: "$697",
    billing: "/month",
    hours: "~15 hrs / week",
    tagline: "The complete operator. We run it, you close it.",
    accent: "from-emerald-500 to-teal-400",
    accentSolid: "#10b981",
    border: "border-emerald-500/40",
    glow: "shadow-[0_0_50px_rgba(16,185,129,0.12)] hover:shadow-[0_8px_60px_rgba(16,185,129,0.25)]",
    labelColor: "text-emerald-400",
    priceGrad: "from-emerald-300 to-teal-400",
    icon: TrendingUp,
    stripe: "https://cal.com/kevin-nexuscale/15min",
    popular: true,
    Pattern: FullPattern,
    features: [
      { icon: Search, text: "Everything in Lite" },
      { icon: FlaskConical, text: "Ongoing A/B testing & optimization" },
      { icon: MessageSquare, text: "Dedicated Slack channel" },
      { icon: FileText, text: "Weekly performance reports" },
      { icon: Target, text: "Custom ICP refinement" },
    ],
  },
  {
    id: "scale",
    label: "Managed · Scale",
    name: "Scale · Custom",
    price: "Custom",
    billing: "",
    hours: "Dedicated team",
    tagline: "Enterprise-grade. Full white-glove treatment.",
    accent: "from-purple-500 to-pink-500",
    accentSolid: "#a855f7",
    border: "border-white/[0.07] hover:border-purple-500/40",
    glow: "hover:shadow-[0_8px_50px_rgba(168,85,247,0.18)]",
    labelColor: "text-purple-400",
    priceGrad: "from-purple-300 to-pink-400",
    icon: Building2,
    stripe: "https://cal.com/kevin-nexuscale/15min",
    isCustom: true,
    Pattern: ScalePattern,
    features: [
      { icon: Users, text: "Dedicated Account Manager" },
      { icon: Calendar, text: "Weekly strategy calls" },
      { icon: Search, text: "Custom lead sourcing & research" },
      { icon: Headphones, text: "Priority support & SLAs" },
      { icon: Shield, text: "Enterprise security & compliance" },
    ],
  },
];

const FAQS = [
  {
    q: "What happens after I sign up?",
    a: "Within 24 hours you'll get a kickoff form. We map your ICP, review your current stack, and have your first campaign live within 14 business days. No long onboarding call marathons.",
  },
  {
    q: "Who actually does the work?",
    a: "A dedicated Nexuscale operator — a trained human strategist — runs your account. They use the Nexuscale platform daily to build lists, write sequences, monitor deliverability, and iterate on what's working.",
  },
  {
    q: "How long before I see results?",
    a: "Most accounts see positive reply rates within the first 2–3 weeks. Full campaign momentum typically builds over 60 days as we warm domains, refine copy, and tune targeting.",
  },
  {
    q: "Can I cancel anytime?",
    a: "Yes. Monthly rolling contracts, no lock-in. We'd rather earn your business every month than trap you into one.",
  },
  {
    q: "Do I need a Nexuscale subscription on top of this?",
    a: "No — your managed service plan includes platform access. Your operator works inside a Nexuscale workspace set up for you. Nothing extra to buy.",
  },
];

const TRUST_STATS = [
  { value: "14-day", label: "Setup to live campaign" },
  { value: "4.2×", label: "Avg reply rate lift" },
  { value: "Monthly", label: "Rolling contracts" },
  { value: "100%", label: "Human operators" },
];

function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-white/[0.06] bg-white/[0.02] rounded-2xl overflow-hidden hover:border-white/[0.1] transition-colors">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
      >
        <span className="text-[15px] font-semibold text-white pr-6">{q}</span>
        <ChevronDown
          className={`w-5 h-5 text-zinc-500 shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            <div className="px-6 pb-6 text-sm text-zinc-400 leading-relaxed border-t border-white/[0.05] pt-4">
              {a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ManagedServicesPage() {
  return (
    <div className="min-h-screen bg-[#020204] font-sans selection:bg-indigo-500/30 text-zinc-200 overflow-hidden relative">
      {/* Noise texture */}
      <div
        className="fixed inset-0 opacity-[0.025] pointer-events-none z-[100]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      <section className="relative pt-20 pb-24 md:pt-28 md:pb-36 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-indigo-600/8 blur-[160px] rounded-full pointer-events-none" />
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-5xl h-px bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent" />

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-8 hover:border-indigo-500/30 transition-colors">
              <Zap className="w-3 h-3 text-indigo-400" />
              <span className="text-[11px] uppercase tracking-[0.22em] font-bold text-zinc-400">
                Done-For-You
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            className="text-4xl sm:text-6xl md:text-7xl font-black text-white tracking-tight leading-[1.04] mb-6"
          >
            We run your outbound.
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-400">
              You close the deals.
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="text-base md:text-lg text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-10"
          >
            Real operators running Nexuscale on your behalf — building lists,
            writing sequences, monitoring deliverability, and optimizing every
            week. You stay in your lane. We handle the machine.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <a
              href="#pricing"
              className="group relative inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-bold hover:shadow-[0_0_28px_rgba(99,102,241,0.45)] transition-all duration-300 overflow-hidden"
            >
              <span className="relative z-10">See Plans</span>
              <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
            </a>
            <a
              href="https://cal.com/kevin-nexuscale/15min"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/[0.05] border border-white/[0.08] text-white text-sm font-bold hover:bg-white/[0.09] hover:border-white/[0.15] transition-all duration-300"
            >
              <Calendar className="w-4 h-4 text-zinc-400" />
              Book a Call
            </a>
          </motion.div>
        </div>
      </section>

      <ScrollReveal delay={0}>
        <div className="border-y border-white/[0.05] bg-white/[0.015] py-8 px-6">
          <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-0 md:divide-x divide-white/[0.06]">
            {TRUST_STATS.map(({ value, label }, i) => (
              <div
                key={i}
                className="flex flex-col items-center text-center px-6"
              >
                <div className="text-2xl md:text-3xl font-black text-white mb-1 tracking-tight">
                  {value}
                </div>
                <div className="text-[11px] uppercase tracking-widest text-zinc-600 font-bold">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </ScrollReveal>

      <section id="pricing" className="py-24 px-6 relative">
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-[800px] h-[600px] bg-indigo-600/[0.07] blur-[150px] rounded-full pointer-events-none" />
        <div className="max-w-5xl mx-auto relative z-10">
          <ScrollReveal>
            <div className="text-center mb-14">
              <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 mb-3">
                Pricing
              </p>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                Pick your operator tier.
              </h2>
              <p className="text-zinc-500 text-sm max-w-lg mx-auto">
                Monthly rolling contracts. Cancel anytime. Setup within 14 days.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {TIERS.map((tier, i) => {
              const TierIcon = tier.icon;
              const Pattern = tier.Pattern;
              return (
                <ScrollReveal key={tier.id} delay={i * 120}>
                  <motion.div
                    whileHover={{ y: -6, scale: 1.015 }}
                    transition={{ type: "spring", stiffness: 320, damping: 26 }}
                    className={`relative group bg-[#0D0D11] border ${tier.border} rounded-2xl overflow-hidden flex flex-col cursor-default transition-all duration-500 ${tier.glow} ${tier.popular ? "ring-1 ring-emerald-500/40 md:scale-[1.03] z-10" : ""}`}
                  >
                    {tier.popular && (
                      <div className="absolute top-0 left-0 right-0 flex justify-center z-20">
                        <div className="bg-gradient-to-r from-emerald-500 to-teal-400 text-white text-[9px] font-black px-4 py-1.5 rounded-b-xl uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                          <Star className="w-2.5 h-2.5 text-white" /> Most
                          Popular
                        </div>
                      </div>
                    )}

                    <div
                      className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${tier.accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                    />

                    <div className="absolute top-0 right-0 w-full h-44 overflow-hidden pointer-events-none">
                      <Pattern />
                    </div>

                    {/* ── HEADER: icon + price ── */}
                    <div
                      className={`relative z-10 flex items-start justify-between px-6 pb-0 ${tier.popular ? "pt-10" : "pt-6"}`}
                    >
                      <div
                        className={`w-11 h-11 rounded-xl bg-gradient-to-br ${tier.accent} flex items-center justify-center shadow-lg shrink-0`}
                      >
                        <TierIcon className="w-5 h-5 text-white" />
                      </div>
                    </div>

                    <div className="relative z-10 px-6 pt-4">
                      <div
                        className={`text-[9px] font-black uppercase tracking-widest ${tier.labelColor} mb-1`}
                      >
                        {tier.label}
                      </div>
                      <h4 className="text-2xl font-black text-white leading-tight mb-1">
                        {tier.name}
                      </h4>
                      <p className="text-sm text-zinc-500 leading-relaxed mb-4">
                        {tier.tagline}
                      </p>
                      <div
                        className={`inline-flex items-center gap-1.5 text-[11px] font-bold px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.07] ${tier.labelColor}`}
                      >
                        <Clock className="w-3 h-3" />
                        {tier.hours}
                      </div>
                    </div>

                    <div className="relative z-10 px-6 pt-5 pb-0 w-full ">
                      <div className="h-px w-full flex items-center justify-center bg-gradient-to-r from-white/[0.06] via-white/[0.1] to-white/[0.06] mb-5" />
                      <ul className="space-y-3">
                        {tier.features.map((feat, j) => {
                          const FeatIcon = feat.icon;
                          return (
                            <li
                              key={j}
                              className="flex items-start gap-3 text-sm text-zinc-300"
                            >
                              <div
                                className={`w-5 h-5 rounded-md bg-gradient-to-br ${tier.accent} flex items-center justify-center shrink-0 mt-0.5 opacity-75`}
                              >
                                <FeatIcon className="w-3 h-3 text-white" />
                              </div>
                              {feat.text}
                            </li>
                          );
                        })}
                      </ul>
                    </div>

                    <div className="relative z-10 p-6 pt-5 mt-auto">
                      <div className="h-px bg-gradient-to-r from-white/[0.06] via-white/[0.1] to-white/[0.06] mb-5" />
                      {tier.isCustom ? (
                        <div className="flex flex-col gap-2.5">
                          <a
                            href="https://cal.com/kevin-nexuscale/15min"
                            target="_blank"
                            rel="noreferrer"
                            className="w-full py-3 rounded-xl text-[12px] font-black text-zinc-300 text-center bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.09] hover:border-white/[0.14] transition-all duration-300"
                          >
                            Buy now
                          </a>
                        </div>
                      ) : (
                        <a
                          href={tier.stripe}
                          target="_blank"
                          rel="noreferrer"
                          className={`block w-full py-3 rounded-xl text-[12px] font-black text-white text-center bg-gradient-to-r ${tier.accent} hover:opacity-90 transition-all duration-300`}
                        >
                          Get Started — {tier.price}
                          {tier.billing}
                        </a>
                      )}
                    </div>
                  </motion.div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 relative">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal>
            <div className="text-center mb-12">
              <p className="text-4xl md:text-7xl font-black uppercase tracking-widest text-white mb-3">
                FAQ
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight">
                Common questions.
              </h2>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 60}>
                <FAQItem q={faq.q} a={faq.a} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <ScrollReveal>
        <section className="py-24 px-6">
          <div className="max-w-4xl mx-auto relative">
            <div className="absolute inset-0 -top-8 bg-indigo-600/10 blur-[80px] rounded-full pointer-events-none" />
            <motion.div
              whileHover={{ scale: 1.005 }}
              transition={{ type: "spring", stiffness: 300, damping: 28 }}
              className="relative group overflow-hidden rounded-3xl bg-zinc-900/50 backdrop-blur-2xl border border-white/[0.07] hover:border-indigo-500/30 p-10 md:p-16 text-center transition-all duration-500 hover:shadow-[0_8px_60px_rgba(99,102,241,0.12)]"
            >
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-indigo-500/[0.04] to-transparent transition-transform duration-[1400ms] ease-in-out pointer-events-none" />

              <div className="relative z-10">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] mb-6">
                  <MessageSquare className="w-3 h-3 text-indigo-400" />
                  <span className="text-[10px] uppercase tracking-widest font-bold text-zinc-400">
                    Let's talk
                  </span>
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4">
                  Ready to hand off
                  <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                    your outbound?
                  </span>
                </h2>
                <p className="text-zinc-400 text-base max-w-lg mx-auto mb-10 leading-relaxed">
                  Book a 15-minute call. We'll scope your ICP, recommend the
                  right tier, and get you live within the week.
                </p>
                <a
                  href="https://cal.com/kevin-nexuscale/15min"
                  target="_blank"
                  rel="noreferrer"
                  className="group/btn relative inline-flex items-center gap-2.5 px-10 py-4 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white text-sm font-black hover:shadow-[0_0_32px_rgba(99,102,241,0.5)] transition-all duration-300 overflow-hidden"
                >
                  <span className="relative z-10">Book a Call</span>
                  <ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 skew-x-12" />
                </a>
              </div>

              <div className="absolute -bottom-12 -right-12 w-36 h-36 bg-violet-500/10 blur-3xl rounded-full pointer-events-none" />
              <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-indigo-500/10 blur-2xl rounded-full pointer-events-none" />
            </motion.div>
          </div>
        </section>
      </ScrollReveal>
    </div>
  );
}
