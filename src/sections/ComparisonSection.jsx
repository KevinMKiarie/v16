import React, { useRef, useState, useEffect, useId } from "react";
import { motion, useInView, useSpring } from "framer-motion";
import {
  Check,
  ArrowRight,
  Zap,
  Database,
  Layers,
  Send,
  AlertTriangle,
  Workflow,
  Puzzle,
  Sparkles,
} from "lucide-react";

// --- UTILITIES ---

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- ANIMATION COMPONENTS ---

// Smooth but energetic easing
const bouncyEasing = [0.17, 0.67, 0.46, 0.99];

const ScrollReveal = ({
  children,
  delay = 0,
  direction = "up",
  className = "",
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...directions[direction], filter: "blur(5px)" }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{
        duration: 0.5,
        delay: delay / 1000,
        ease: bouncyEasing,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const NumberTicker = ({ value, className = "", prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const motionValue = useSpring(0, { duration: 1500, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return motionValue.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });
  }, [motionValue]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString()}
      {suffix}
    </span>
  );
};

// Vibrant Spotlight Effect Wrapper
const SpotlightCard = ({
  children,
  className = "",
  spotlightColor = "rgba(255, 255, 255, 0.1)",
}) => {
  const divRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn(
        "relative overflow-hidden rounded-[2rem] border border-white/10 bg-zinc-950 transition-all duration-300 shadow-2xl",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{
          opacity,
          background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

// Glowing Animated Beam
const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  gradientStartColor = "#ff0000",
  gradientStopColor = "#0000ff",
  duration = 3,
}) => {
  const [path, setPath] = useState("");
  const id = useId();

  useEffect(() => {
    const updatePath = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const fromRect = fromRef.current.getBoundingClientRect();
      const toRect = toRef.current.getBoundingClientRect();

      const startX = fromRect.left - containerRect.left + fromRect.width / 2;
      const startY = fromRect.top - containerRect.top + fromRect.height / 2;
      const endX = toRect.left - containerRect.left + toRect.width / 2;
      const endY = toRect.top - containerRect.top + toRect.height / 2;

      const controlX = (startX + endX) / 2;
      const controlY = (startY + endY) / 2 + curvature;

      setPath(
        `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`,
      );
    };

    updatePath();
    const resizeObserver = new ResizeObserver(updatePath);
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    window.addEventListener("resize", updatePath);

    return () => {
      window.removeEventListener("resize", updatePath);
      resizeObserver.disconnect();
    };
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg className="pointer-events-none absolute inset-0 h-full w-full z-0 overflow-visible">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="50%" stopColor={gradientStartColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
        <filter id={`glow-${id}`} x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path
        d={path}
        fill="none"
        strokeWidth="1.5"
        stroke={gradientStartColor}
        strokeOpacity="0.15"
      />
      <motion.path
        d={path}
        fill="none"
        strokeWidth="3"
        stroke={`url(#${id})`}
        strokeLinecap="round"
        filter={`url(#glow-${id})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 0.2,
        }}
      />
    </svg>
  );
};

function StackVisual() {
  const containerRef = useRef(null);
  const apolloRef = useRef(null);
  const clayRef = useRef(null);
  const instantlyRef = useRef(null);
  const nexusRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[260px] flex items-center justify-center overflow-hidden bg-zinc-950/50"
    >
      {/* Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={apolloRef}
        toRef={nexusRef}
        gradientStartColor="#ef4444" // Red
        gradientStopColor="#6366f1" // Indigo
        curvature={-55}
        duration={2.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={clayRef}
        toRef={nexusRef}
        gradientStartColor="#f59e0b" // Amber
        gradientStopColor="#6366f1"
        curvature={0}
        duration={3}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={instantlyRef}
        toRef={nexusRef}
        gradientStartColor="#f97316" // Orange
        gradientStopColor="#6366f1"
        curvature={55}
        duration={3.5}
      />

      {/* Input Nodes (Left) */}
      <div className="absolute left-4 sm:left-6 md:left-12 flex flex-col gap-5 sm:gap-8 top-1/2 -translate-y-1/2 z-10">
        <div
          ref={apolloRef}
          className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-400 shadow-[0_0_20px_rgba(239,68,68,0.2)] relative group hover:scale-110 transition-transform cursor-default z-10"
        >
          <div className="absolute inset-0 bg-red-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Database className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
        </div>
        <div
          ref={clayRef}
          className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)] relative group hover:scale-110 transition-transform cursor-default z-10"
        >
          <div className="absolute inset-0 bg-amber-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Layers className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
        </div>
        <div
          ref={instantlyRef}
          className="w-9 h-9 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-orange-400 shadow-[0_0_20px_rgba(249,115,22,0.2)] relative group hover:scale-110 transition-transform cursor-default z-10"
        >
          <div className="absolute inset-0 bg-orange-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
          <Send className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
        </div>
      </div>

      {/* Central Hub (Right) */}
      <div
        ref={nexusRef}
        className="absolute right-4 sm:right-6 md:right-16 top-1/2 -translate-y-1/2 z-20 rounded-[1.5rem] sm:rounded-[2rem] bg-zinc-900 border-2 border-indigo-400/50 flex flex-col items-center justify-center shadow-[0_0_60px_rgba(99,102,241,0.5)] group hover:scale-105 transition-transform"
        style={{
          width: "clamp(4rem, 10vw, 6rem)",
          height: "clamp(4rem, 10vw, 6rem)",
        }}
      >
        <div className="absolute inset-0 bg-white/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <img
          src="https://cdn.brandfetch.io/nexuscale.ai/w/40/h/40"
          alt="Nexuscale"
          className="w-6 h-6 sm:w-8 sm:h-8 rounded-full mx-auto"
        />
        <span className="text-[8px] sm:text-[10px] font-black text-white/90 uppercase tracking-widest relative z-10">
          NEXUS
        </span>
      </div>

      {/* Footer Label */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-2 bg-black/60 px-4 py-2 rounded-full border border-white/5 backdrop-blur-md">
        <Workflow size={14} className="text-indigo-400" /> Unified Workflow
      </div>
    </div>
  );
}

const oldStack = [
  { name: "Apollo", purpose: "Leads", price: "$1,188/yr", pain: "Export CSV, import to Clay" },
  {
    name: "Clay",
    purpose: "Enrichment",
    price: "$1,788/yr",
    pain: "Build the table, hope it maps right",
  },
  {
    name: "Instantly",
    purpose: "Sending",
    price: "$1,068/yr",
    pain: "Paste it in, pray for deliverability",
  },
];

const nexusFeatures = [
  "One Platform. One Price.",
  "Database. AI Writer. Sending Infrastructure. All built together from scratch.",
  "Database ",
  "AI Writer ",
  "Sending Infrastructure ",
  "LinkedIn Outreach (Beta)",
];

export default function App() {
  return (
    <div className="min-h-screen py-16 md:py-24 lg:py-32 bg-transparent text-zinc-100 overflow-hidden relative font-sans selection:bg-indigo-500/30">
      {/* Background Decor - Vibrant Gradients */}
      <div
        className="absolute inset-0 pointer-events-none z-[0] opacity-[0.25]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)`,
          backgroundSize: "64px 64px",
          maskImage:
            "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-indigo-900/30 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header Section */}
        <div className="w-full flex flex-col gap-4 sm:gap-6 mb-12 md:mb-20 lg:mb-28 items-center text-center">
          <ScrollReveal direction="down">
            <div className="inline-flex px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/30 items-center justify-center backdrop-blur-md shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:bg-indigo-500/20 transition-colors cursor-default">
              <div className="w-2.5 h-2.5 rounded-full bg-indigo-400 animate-pulse mr-2.5 shadow-[0_0_10px_rgba(99,102,241,0.8)]" />
              <span className="text-[11px] font-black text-indigo-300 uppercase tracking-widest">
                ROI Analysis
              </span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h1 className="text-4xl md:text-6xl  font-black text-white tracking-tighter leading-[1.1] max-w-4xl mx-auto mt-4 drop-shadow-xl">
              The hidden cost of your current stack
            </h1>
            <p className="mt-4 sm:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto font-medium leading-relaxed px-2 sm:px-0">
              Apollo finds leads. Clay enriches them. Instantly sends them. You're the one making them talk to each other — and paying three invoices to do it.
            </p>
          </ScrollReveal>
        </div>

        {/* Comparison Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-12">
          {/* Column 1: The Old Stack */}
          <ScrollReveal delay={100} direction="left" className="h-full">
            <SpotlightCard
              className="h-full flex flex-col p-5 sm:p-7 md:p-10 group bg-zinc-950/80 backdrop-blur-xl border-red-900/20"
              spotlightColor="rgba(239, 68, 68, 0.15)"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 to-transparent pointer-events-none opacity-70" />

              <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-black text-red-500 uppercase tracking-widest">
                  Legacy Approach
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                The Old Stack
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 sm:mb-10 font-medium leading-relaxed">
                3 separate tools. 3 separate invoices. You're the integration layer.
              </p>

              <div className="space-y-4 flex-grow relative z-10">
                {oldStack.map((tool) => (
                  <div
                    key={tool.name}
                    className="relative flex items-center justify-between p-3 sm:p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-red-500/10 hover:border-red-500/30 transition-all duration-300 group/item overflow-hidden shadow-lg"
                  >
                    <div className="flex items-center gap-3 sm:gap-4 z-10">
                      <div className="flex h-9 w-9 sm:h-12 sm:w-12 items-center justify-center rounded-xl bg-zinc-900 text-red-400 border border-red-500/20 group-hover/item:bg-red-500/20 group-hover/item:text-red-300 transition-colors flex-shrink-0">
                        <Puzzle
                          className="w-4 h-4 sm:w-5 sm:h-5"
                          strokeWidth={2.5}
                        />
                      </div>
                      <div>
                        <p className="text-sm sm:text-lg font-bold text-white mb-0.5">
                          {tool.name}
                        </p>
                        <p className="text-[10px] sm:text-[11px] text-zinc-500 uppercase tracking-wider font-bold group-hover/item:text-red-400/80 transition-colors">
                          {tool.purpose}
                        </p>
                      </div>
                    </div>
                    <span className="text-sm sm:text-base font-bold text-zinc-500 group-hover/item:text-red-400 transition-colors z-10 flex-shrink-0">
                      {tool.price}
                    </span>

                    <div className="absolute right-20 sm:right-24 top-1/2 -translate-y-1/2 opacity-0 group-hover/item:opacity-100 group-hover/item:translate-x-0 translate-x-4 transition-all duration-300 text-[10px] sm:text-xs text-red-300 font-bold bg-red-950/90 px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-red-500/40 hidden sm:flex items-center gap-1.5 shadow-2xl backdrop-blur-md">
                      <AlertTriangle size={12} /> {tool.pain}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 sm:mt-10 pt-6 sm:pt-8 border-t border-white/10 flex items-end justify-between relative z-10">
                <span className="text-[10px] sm:text-xs text-zinc-500 uppercase tracking-widest font-bold mb-1">
                  Total Cost
                </span>
                <div className="flex flex-col items-end">
                  <span className="text-3xl sm:text-4xl font-black text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                    $4,044
                    <span className="text-base sm:text-lg font-bold text-red-500/60 ml-1">
                      /yr
                    </span>
                  </span>
                  <span className="text-[10px] sm:text-xs text-red-400/80 font-bold mt-1">
                    + Hidden integration costs
                  </span>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* Column 2: Nexuscale */}
          <ScrollReveal delay={200} direction="right" className="h-full">
            <SpotlightCard
              className="h-full flex flex-col p-5 sm:p-7 md:p-10 group bg-zinc-950/80 backdrop-blur-xl border-indigo-500/30 shadow-[0_0_50px_rgba(99,102,241,0.15)] hover:border-indigo-500/50"
              spotlightColor="rgba(99, 102, 241, 0.2)"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-transparent pointer-events-none opacity-80" />

              <div className="flex items-center gap-3 mb-6 sm:mb-8 relative z-10">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.8)] animate-pulse" />
                <span className="text-[10px] sm:text-xs font-black text-emerald-400 uppercase tracking-widest">
                  All-in-One
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl md:text-4xl font-black text-white mb-2 sm:mb-3 tracking-tight">
                Nexuscale
              </h3>
              <p className="text-xs sm:text-sm text-zinc-400 mb-6 sm:mb-10 font-medium leading-relaxed">
                The Intelligent Autopilot. Everything you need unified in one
                seamless platform.
              </p>

              <div className="relative rounded-2xl border border-white/10 bg-black/50 mb-6 sm:mb-8 overflow-hidden min-h-[200px] sm:min-h-[260px] shadow-[inset_0_0_50px_rgba(0,0,0,0.5)] group-hover:border-indigo-500/40 transition-colors duration-500">
                <StackVisual />
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3 mb-6 sm:mb-10 relative z-10">
                {nexusFeatures.map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-1.5 sm:gap-2 bg-indigo-500/10 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-indigo-500/30 text-[10px] sm:text-xs font-bold text-indigo-200 shadow-[0_0_15px_rgba(99,102,241,0.15)] backdrop-blur-sm"
                  >
                    <Check
                      className="w-3 h-3 sm:w-4 sm:h-4 text-indigo-400 flex-shrink-0"
                      strokeWidth={3}
                    />
                    {f}
                  </div>
                ))}
              </div>

              <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mt-auto relative z-10">
                <div className="flex flex-col">
                  <div className="text-4xl sm:text-5xl font-black text-white tracking-tight flex items-baseline drop-shadow-lg">
                    $<NumberTicker value={1188} />
                    <span className="text-lg sm:text-xl text-zinc-500 font-bold ml-1">
                      /yr
                    </span>
                  </div>
                  <div className="text-emerald-300 text-[10px] sm:text-xs font-bold bg-emerald-500/20 inline-flex items-center px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-lg border border-emerald-500/30 mt-2 sm:mt-3 uppercase tracking-wider shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 mr-1.5" />{" "}
                    You save $2,856 every year.
                  </div>
                </div>

                <button
                  onClick={() =>
                    window.open(
                      "https://app.nexuscale.ai/users/register",
                      "_blank",
                    )
                  }
                  className="w-full sm:w-auto inline-flex px-4 py-2 md:px-6 md:py-3 items-center justify-center rounded-xl bg-white  font-black text-zinc-900 transition-all hover:bg-zinc-200 hover:scale-105 active:scale-95 shadow-[0_0_30px_rgba(255,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-zinc-900 text-sm sm:text-base"
                >
                  <Zap className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-2.5 fill-zinc-900" />
                  Start Now
                </button>
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>

    
      </div>
    </div>
  );
}

// Vibrant Stat Card
function StatCard({
  icon,
  value,
  prefix = "",
  suffix = "",
  label,
  colorClass,
  delay,
}) {
  const colorMap = {
    blue: "hover:border-blue-500/40 hover:shadow-[0_0_50px_rgba(59,130,246,0.15)] bg-blue-500/5 group-hover:bg-blue-500/10",
    emerald:
      "hover:border-emerald-500/40 hover:shadow-[0_0_50px_rgba(16,185,129,0.15)] bg-emerald-500/5 group-hover:bg-emerald-500/10",
    indigo:
      "hover:border-indigo-500/40 hover:shadow-[0_0_50px_rgba(99,102,241,0.15)] bg-indigo-500/5 group-hover:bg-indigo-500/10",
  };

  const iconBgMap = {
    blue: "bg-blue-500/10 border-blue-500/20 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]",
    emerald:
      "bg-emerald-500/10 border-emerald-500/20 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]",
    indigo:
      "bg-indigo-500/10 border-indigo-500/20 group-hover:shadow-[0_0_20px_rgba(99,102,241,0.4)]",
  };

  return (
    <ScrollReveal delay={delay} direction="up">
      <div
        className={`p-5 sm:p-7 md:p-10 rounded-[1.5rem] sm:rounded-[2rem] bg-zinc-900/40 border border-white/5 flex flex-col items-center justify-center text-center transition-all duration-500 group backdrop-blur-md ${colorMap[colorClass]}`}
      >
        <div
          className={`mb-4 sm:mb-6 p-3 sm:p-4 rounded-2xl border transition-all duration-500 group-hover:scale-110 ${iconBgMap[colorClass]}`}
        >
          {icon}
        </div>
        <div className="text-4xl sm:text-5xl md:text-6xl font-black text-white mb-2 sm:mb-3 tracking-tighter drop-shadow-xl">
          {prefix}
          <NumberTicker value={value} />
          {suffix}
        </div>
        <p className="text-[10px] sm:text-xs md:text-sm text-zinc-400 font-bold uppercase tracking-widest group-hover:text-zinc-200 transition-colors">
          {label}
        </p>
      </div>
    </ScrollReveal>
  );
}
