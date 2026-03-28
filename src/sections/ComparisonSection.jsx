import { useRef, useState, useEffect, useId } from "react";
import { motion, useInView, useSpring, AnimatePresence } from "framer-motion";
import {
  Check,
  Zap,
  Database,
  Layers,
  Send,
  AlertTriangle,
  Workflow,
  Sparkles,
} from "lucide-react";

// --- UTILITIES ---
const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- SCROLL REVEAL ---
const bouncyEasing = [0.17, 0.67, 0.46, 0.99];

const ScrollReveal = ({ children, delay = 0, direction = "up", className = "" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const dirs = { up: { y: 40, x: 0 }, down: { y: -40, x: 0 }, left: { x: -40, y: 0 }, right: { x: 40, y: 0 } };
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirs[direction], filter: "blur(5px)" }}
      animate={isInView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.5, delay: delay / 1000, ease: bouncyEasing }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// --- NUMBER TICKER ---
const NumberTicker = ({ value, prefix = "", suffix = "" }) => {
  const ref = useRef(null);
  const motionValue = useSpring(0, { duration: 1500, bounce: 0 });
  const isInView = useInView(ref, { once: true, margin: "-20px" });
  const [display, setDisplay] = useState(0);
  useEffect(() => { if (isInView) motionValue.set(value); }, [isInView, value, motionValue]);
  useEffect(() => motionValue.on("change", (v) => setDisplay(Math.round(v))), [motionValue]);
  return <span ref={ref}>{prefix}{display.toLocaleString()}{suffix}</span>;
};

// --- SPOTLIGHT CARD ---
const SpotlightCard = ({ children, className = "", spotlightColor = "rgba(255,255,255,0.08)" }) => {
  const divRef = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const handleMouseMove = (e) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={cn("relative overflow-hidden transition-all duration-300", className)}
    >
      <div
        className="pointer-events-none absolute -inset-px transition-opacity duration-300 z-10"
        style={{ opacity, background: `radial-gradient(500px circle at ${pos.x}px ${pos.y}px, ${spotlightColor}, transparent 40%)` }}
      />
      <div className="relative z-20 h-full">{children}</div>
    </div>
  );
};

// --- ANIMATED BEAM ---
const AnimatedBeam = ({ containerRef, fromRef, toRef, curvature = 0, gradientStartColor, gradientStopColor, duration = 3 }) => {
  const [path, setPath] = useState("");
  const id = useId();
  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;
      const cr = containerRef.current.getBoundingClientRect();
      const fr = fromRef.current.getBoundingClientRect();
      const tr = toRef.current.getBoundingClientRect();
      const sx = fr.left - cr.left + fr.width / 2;
      const sy = fr.top - cr.top + fr.height / 2;
      const ex = tr.left - cr.left + tr.width / 2;
      const ey = tr.top - cr.top + tr.height / 2;
      const cx = (sx + ex) / 2, cy = (sy + ey) / 2 + curvature;
      setPath(`M ${sx},${sy} Q ${cx},${cy} ${ex},${ey}`);
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    window.addEventListener("resize", update);
    return () => { window.removeEventListener("resize", update); ro.disconnect(); };
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
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      <path d={path} fill="none" strokeWidth="1" stroke={gradientStartColor} strokeOpacity="0.12" />
      <motion.path
        d={path} fill="none" strokeWidth="2.5" stroke={`url(#${id})`} strokeLinecap="round"
        filter={`url(#glow-${id})`}
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration, repeat: Infinity, ease: "linear", repeatDelay: 0.2 }}
      />
    </svg>
  );
};

// --- NEXUS STACK VISUAL ---
function StackVisual() {
  const containerRef = useRef(null);
  const apolloRef = useRef(null);
  const clayRef = useRef(null);
  const instantlyRef = useRef(null);
  const nexusRef = useRef(null);
  return (
    <div ref={containerRef} className="relative w-full h-full min-h-[180px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808010_1px,transparent_1px),linear-gradient(to_bottom,#80808010_1px,transparent_1px)] bg-[size:20px_20px]" />
      <AnimatedBeam containerRef={containerRef} fromRef={apolloRef} toRef={nexusRef} gradientStartColor="#ef4444" gradientStopColor="#6366f1" curvature={-45} duration={2.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={clayRef} toRef={nexusRef} gradientStartColor="#f59e0b" gradientStopColor="#6366f1" curvature={0} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={instantlyRef} toRef={nexusRef} gradientStartColor="#f97316" gradientStopColor="#6366f1" curvature={45} duration={3.5} />
      <div className="absolute left-4 sm:left-8 flex flex-col gap-4 top-1/2 -translate-y-1/2 z-10">
        {[
          { ref: apolloRef, colorClass: "red", IconComp: Database },
          { ref: clayRef, colorClass: "amber", IconComp: Layers },
          { ref: instantlyRef, colorClass: "orange", IconComp: Send },
        ].map(({ ref, colorClass, IconComp }, i) => (
          <div key={i} ref={ref}
            className={`w-9 h-9 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-${colorClass}-400 shadow-[0_0_16px_rgba(239,68,68,0.15)] relative z-10 hover:scale-110 transition-transform`}
          >
            <IconComp className="w-4 h-4" />
          </div>
        ))}
      </div>
      <div ref={nexusRef} className="absolute right-4 sm:right-10 top-1/2 -translate-y-1/2 z-20 w-14 h-14 rounded-2xl bg-zinc-900 border-2 border-indigo-400/50 flex flex-col items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.4)]">
        <img src="https://cdn.brandfetch.io/nexuscale.ai/w/40/h/40" alt="Nexuscale" className="w-5 h-5 rounded-full" />
        <span className="text-[7px] font-black text-white/90 uppercase tracking-widest mt-0.5">NEXUS</span>
      </div>
      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-zinc-500 font-mono uppercase tracking-widest flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-white/5 backdrop-blur-md">
        <Workflow size={11} className="text-indigo-400" /> Unified Workflow
      </div>
    </div>
  );
}

// --- OLD STACK DATA ---
const oldStack = [
  { name: "Apollo", purpose: "Leads", price: "$1,188/yr", pain: "Export CSV, import to Clay", Icon: Database, color: "#ef4444", glow: "rgba(239,68,68,0.25)" },
  { name: "Clay", purpose: "Enrichment", price: "$1,788/yr", pain: "Build the table, hope it maps right", Icon: Layers, color: "#f59e0b", glow: "rgba(245,158,11,0.25)" },
  { name: "Instantly", purpose: "Sending", price: "$1,068/yr", pain: "Paste it in, pray for deliverability", Icon: Send, color: "#f97316", glow: "rgba(249,115,22,0.25)" },
];

const nexusFeatures = [
  "AI Writer", "Database", "Sending Infrastructure",
  "One Platform. One Price.", "LinkedIn Outreach (Beta)",
  "Database. AI Writer. Sending Infrastructure. All built together from scratch.",
];

// --- 3D CAROUSEL POSITIONS ---
// Stacked forward-rolling deck: front card at top, others stacked behind rotated on X axis
const carouselPositions = [
  { y: 0,  scale: 1,    opacity: 1,    zIndex: 20, rotateX: 0   }, // front
  { y: 9,  scale: 0.94, opacity: 0.42, zIndex: 10, rotateX: -9  }, // middle (behind)
  { y: 16, scale: 0.88, opacity: 0.18, zIndex: 5,  rotateX: -17 }, // back (furthest)
];

function OldStackCarousel() {
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setActive((p) => (p + 1) % oldStack.length), 4000);
    return () => clearInterval(timer);
  }, []);

  const getPosition = (itemIdx) => {
    const slot = (itemIdx - active + oldStack.length) % oldStack.length;
    return carouselPositions[slot];
  };

  return (
    <div
      className="relative w-full"
      style={{ perspective: "700px", height: "72px" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {oldStack.map((tool, i) => {
        const pos = getPosition(i);
        const isActive = i === active;
        return (
          <motion.div
            key={tool.name}
            animate={{
              y: pos.y,
              scale: pos.scale,
              opacity: pos.opacity,
              rotateX: pos.rotateX,
              zIndex: pos.zIndex,
            }}
            transition={{ duration: 0.72, ease: [0.32, 0.72, 0, 1] }}
            className="absolute inset-x-0 top-0"
            style={{ transformStyle: "preserve-3d", transformOrigin: "center bottom" }}
          >
            <div
              className={cn(
                "relative flex items-center justify-between px-4 py-3 rounded-2xl border overflow-hidden",
                isActive ? "border-white/10 bg-zinc-900/90" : "border-white/5 bg-zinc-900/60"
              )}
              style={{ boxShadow: isActive ? `0 4px 28px ${tool.glow}` : "none" }}
            >
              {/* Animated pain-point banner — slides down from top on hover */}
              <AnimatePresence>
                {isActive && hovered && (
                  <motion.div
                    initial={{ y: "-100%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    exit={{ y: "-100%", opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="absolute inset-x-0 top-0 z-30 flex items-center justify-center gap-1.5 py-1.5 bg-red-950/95 border-b border-red-500/30 backdrop-blur-md"
                  >
                    <AlertTriangle size={10} className="text-red-400 shrink-0" />
                    <span className="text-[10px] font-bold text-red-300 leading-none">{tool.pain}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Glow orb behind active card */}
              {isActive && (
                <div
                  className="absolute -top-6 -left-6 w-24 h-24 rounded-full blur-2xl pointer-events-none"
                  style={{ background: tool.color, opacity: 0.1 }}
                />
              )}

              <div className="flex items-center gap-3 z-10">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center border border-white/[0.06] flex-shrink-0"
                  style={{ background: `${tool.color}18`, color: tool.color }}
                >
                  <tool.Icon className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">{tool.name}</p>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-bold">{tool.purpose}</p>
                </div>
              </div>

              <span className="text-sm font-bold text-zinc-400 z-10">{tool.price}</span>
            </div>
          </motion.div>
        );
      })}

      {/* Dot indicators */}
      <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
        {oldStack.map((_, i) => (
          <button key={i} onClick={() => setActive(i)} className="transition-all duration-300">
            <motion.div
              animate={{ width: i === active ? 16 : 5, opacity: i === active ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="h-1 rounded-full bg-red-400"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

// --- MAIN EXPORT ---
export default function App() {
  return (
    <div className="py-16 md:py-20 text-zinc-100 overflow-hidden relative font-sans">
      {/* Subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none z-0 opacity-[0.18]"
        style={{
          backgroundImage: `linear-gradient(to right, #ffffff0a 1px, transparent 1px), linear-gradient(to bottom, #ffffff0a 1px, transparent 1px)`,
          backgroundSize: "56px 56px",
          maskImage: "radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 100%)",
        }}
      />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-indigo-900/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/15 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">

        {/* Header */}
        <div className="flex flex-col gap-3 mb-10 md:mb-14 items-center text-center">
          <ScrollReveal direction="down">
            <div className="inline-flex px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 items-center gap-2 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">ROI Analysis</span>
            </div>
          </ScrollReveal>

          <ScrollReveal>
            <h2 className="text-3xl md:text-5xl font-black text-white tracking-tighter leading-[1.05] max-w-3xl mx-auto mt-2 drop-shadow-xl">
              The hidden cost of your current stack
            </h2>
            <p className="mt-3 text-sm sm:text-base text-zinc-400 max-w-xl mx-auto font-medium leading-relaxed">
              Apollo finds leads. Clay enriches them. Instantly sends them.
              You're the one making them talk — and paying three invoices to do it.
            </p>
          </ScrollReveal>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">

          {/* ── OLD STACK CARD ── */}
          <ScrollReveal delay={100} direction="left" className="h-full">
            <SpotlightCard
              className="h-full flex flex-col p-5 rounded-2xl border border-red-900/25 bg-zinc-950/80 backdrop-blur-xl shadow-[0_0_40px_rgba(239,68,68,0.04)]"
              spotlightColor="rgba(239,68,68,0.12)"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-950/15 to-transparent pointer-events-none rounded-2xl" />

              {/* Card header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)] animate-pulse" />
                  <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">Legacy Approach</span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono">3 tools · 3 invoices</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-1 tracking-tight relative z-10">The Old Stack</h3>
              <p className="text-xs text-zinc-500 mb-6 font-medium relative z-10">You're the integration layer.</p>

              {/* 3D Carousel */}
              <div className="relative z-10 mb-10">
                <OldStackCarousel />
              </div>

              {/* Divider + Total */}
              <div className="mt-auto pt-4 border-t border-white/[0.06] flex items-end justify-between relative z-10">
                <span className="text-[10px] text-zinc-600 uppercase tracking-widest font-bold">Total Cost</span>
                <div className="flex flex-col items-end">
                  <span className="text-3xl font-black text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.35)]">
                    $4,044<span className="text-base font-bold text-red-500/50 ml-0.5">/yr</span>
                  </span>
                  <span className="text-[10px] text-red-400/70 font-bold mt-0.5">+ Hidden integration costs</span>
                </div>
              </div>
            </SpotlightCard>
          </ScrollReveal>

          {/* ── NEXUSCALE CARD ── */}
          <ScrollReveal delay={200} direction="right" className="h-full">
            <SpotlightCard
              className="h-full flex flex-col p-5 rounded-2xl border border-indigo-500/25 bg-zinc-950/80 backdrop-blur-xl shadow-[0_0_50px_rgba(99,102,241,0.1)]"
              spotlightColor="rgba(99,102,241,0.18)"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/15 via-transparent to-transparent pointer-events-none rounded-2xl" />

              {/* Card header */}
              <div className="flex items-center justify-between mb-4 relative z-10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)] animate-pulse" />
                  <span className="text-[10px] font-black text-emerald-400 uppercase tracking-widest">All-in-One</span>
                </div>
                <span className="text-[10px] text-zinc-600 font-mono">1 platform · 1 invoice</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-black text-white mb-1 tracking-tight relative z-10">Nexuscale</h3>
              <p className="text-xs text-zinc-500 mb-4 font-medium relative z-10">The Intelligent Autopilot. Everything unified.</p>

              {/* Stack Visual */}
              <div className="relative rounded-xl border border-white/8 bg-black/40 mb-4 overflow-hidden min-h-[180px] shadow-[inset_0_0_40px_rgba(0,0,0,0.5)] hover:border-indigo-500/30 transition-colors duration-500 relative z-10">
                <StackVisual />
              </div>

              {/* Feature chips */}
              <div className="flex flex-wrap gap-1.5 mb-4 relative z-10">
                {nexusFeatures.slice(0, 5).map((f) => (
                  <div
                    key={f}
                    className="flex items-center gap-1.5 bg-indigo-500/8 px-3 py-1.5 rounded-lg border border-indigo-500/20 text-[10px] font-bold text-indigo-200"
                  >
                    <Check className="w-3 h-3 text-indigo-400 flex-shrink-0" strokeWidth={3} />
                    {f}
                  </div>
                ))}
                <div className="flex items-center gap-1.5 bg-indigo-500/8 px-3 py-1.5 rounded-lg border border-indigo-500/20 text-[10px] font-bold text-indigo-200/60 col-span-full w-full">
                  <Sparkles className="w-3 h-3 text-indigo-400/60 flex-shrink-0" />
                  {nexusFeatures[5]}
                </div>
              </div>

              {/* Pricing row */}
              <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mt-auto relative z-10">
                <div>
                  <div className="text-3xl font-black text-white tracking-tight flex items-baseline drop-shadow-lg">
                    $<NumberTicker value={1188} />
                    <span className="text-base text-zinc-500 font-bold ml-1">/yr</span>
                  </div>
                  <div className="text-emerald-300 text-[9px] font-bold bg-emerald-500/15 inline-flex items-center px-2.5 py-1 rounded-md border border-emerald-500/25 mt-2 uppercase tracking-wider">
                    <Sparkles className="w-2.5 h-2.5 mr-1.5" /> You save $2,856 every year.
                  </div>
                </div>
                <button
                  onClick={() => window.open("https://app.nexuscale.ai/users/register", "_blank")}
                  className="w-full sm:w-auto inline-flex px-5 py-2.5 items-center justify-center rounded-xl bg-white font-black text-zinc-900 text-sm hover:bg-zinc-100 hover:scale-105 active:scale-95 transition-all shadow-[0_0_25px_rgba(255,255,255,0.15)] gap-2"
                >
                  <Zap className="w-3.5 h-3.5 fill-blue-900" />
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
