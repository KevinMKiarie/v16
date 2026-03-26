import React, { useRef, useState, useEffect, useId, useMemo } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  Radar,
  Sparkles,
  Calendar,
  ArrowRight,
  Check,
  Clock,
  BarChart3,
  Zap,
  Mic,
  Play,
  Bot,
  Target,
  DollarSign,
  Briefcase,
  Cpu,
  Search,
  Terminal,
  MessageSquare,
  User,
  Mail,
  CalendarCheck,
  RefreshCw,
  Activity,
  MousePointer2,
  Network,
  Radio,
  FileText,
  Lock,
  Globe,
  Plus,
  ChevronRight,
} from "lucide-react";

// --- UTILITIES ---

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- ANIMATION HELPERS ---

const ScrollReveal = ({
  children,
  delay = 0,
  direction = "up",
  className,
  scale = 1,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 30 : direction === "down" ? -30 : 0,
      scale: scale * 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const TextReveal = ({ children, className, as: Component = "h2" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <Component ref={ref} className={cn(className, "overflow-hidden relative")}>
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/60"
      >
        {children}
      </motion.span>
    </Component>
  );
};

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  gradientStartColor = "#ff0000",
  gradientStopColor = "#0000ff",
  duration = 3,
  delay = 0,
  reverse = false,
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

      const midX = (startX + endX) / 2;
      const midY = (startY + endY) / 2;

      const controlX = midX + curvature * 0.5;
      const controlY = midY + curvature * 0.5;

      setPath(
        `M ${startX},${startY} Q ${controlX},${controlY} ${endX},${endY}`,
      );
    };

    updatePath();
    const observer = new ResizeObserver(updatePath);
    if (containerRef.current) observer.observe(containerRef.current);
    window.addEventListener("resize", updatePath);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePath);
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
      </defs>
      <path
        d={path}
        fill="none"
        strokeWidth="1"
        stroke={gradientStartColor}
        strokeOpacity="0.2"
      />
      <motion.path
        d={path}
        fill="none"
        strokeWidth="2"
        stroke={`url(#${id})`}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
          repeatDelay: 0.5,
          delay,
        }}
      />
    </svg>
  );
};

// --- BENTO GRID COMPONENTS ---

const BentoGrid = ({ children, className, ...props }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[32rem] grid-cols-1 md:grid-cols-3 gap-6",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

// Spotlight Card - Refactored for Split Layout
const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  details,
  href,
  cta,
  ...props
}) => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ref = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -4 }}
      key={name}
      className={cn(
        "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-[2rem]",
        "bg-[#09090b] border border-white/10",
        "shadow-2xl shadow-black/80",
        className,
      )}
      {...props}
    >
      {/* Spotlight Effect */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[2rem]"
        style={{
          background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.1), transparent 40%)`,
        }}
      />

      {/* Grain Texture */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-10" />

      {/* --- TOP SECTION: VISUALS (Fixed Height) --- */}
      <div className="relative h-[280px] w-full overflow-hidden bg-[#080808] border-b border-white/5">
        {/* Live Indicator */}
        <div className="absolute top-4 right-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/80 border border-white/10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
          </span>
          <span className="text-[10px] font-bold text-white/80 uppercase tracking-wider">
            System Live
          </span>
        </div>
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-[#09090b]/20 to-[#09090b]/80 pointer-events-none" />
        {background}
      </div>

      {/* --- BOTTOM SECTION: CONTENT (Flex) --- */}
      <div className="relative z-20 flex flex-col justify-between flex-1 p-8 bg-[#0a0a0a]">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-white/10 group-hover:bg-indigo-600/10 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all duration-500">
              <Icon className="h-5 w-5 text-zinc-400 group-hover:text-indigo-300 transition-colors" />
            </div>

            {cta && (
              <a
                href={href}
                className="group/btn flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-zinc-500 hover:text-white transition-colors"
              >
                {cta}{" "}
                <ChevronRight className="w-3 h-3 transition-transform group-hover/btn:translate-x-1" />
              </a>
            )}
          </div>

          <h3 className="text-2xl font-semibold text-white tracking-tight mb-2 group-hover:text-indigo-100 transition-colors">
            {name}
          </h3>
          <p className="max-w-[95%] text-zinc-400 text-sm leading-relaxed">
            {description}
          </p>
        </div>

        {/* Detail List */}
        {details && (
          <div className="mt-6 pt-6 border-t border-white/5">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {details.map((text, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 text-xs text-zinc-500 font-medium"
                >
                  <Check size={12} className="text-indigo-500" />
                  <span className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                    {text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
};

function LiveBuyerVisual() {
  const items = useMemo(
    () => [
      {
        name: "TechFlow",
        detail: "Series A • $15M raised via Crunchbase",
        icon: (
          <img
            src="/svg/techflow.png"
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
        ),
        color: "#34d399",
        badge: "FUNDING",
        score: 94,
      },
      {
        name: "Linear",
        detail: "Hiring: VP Sales — 3 open roles",
        icon: (
          <img
            src="/svg/linear.jpeg"
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
        ),
        color: "#60a5fa",
        badge: "HIRING",
        score: 87,
      },
      {
        name: "Vercel",
        detail: "HubSpot installed • Migrated from Pipedrive",
        icon: (
          <img
            src="/svg/vercel.png"
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
        ),
        color: "#facc15",
        badge: "TECH",
        score: 91,
      },
      {
        name: "Ramp",
        detail: "Series C • $150M — Expanding sales team",
        icon: (
          <img
            src="/svg/techflow.png"
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
        ),
        color: "#34d399",
        badge: "FUNDING",
        score: 96,
      },
      {
        name: "Notion",
        detail: "Job post: Head of Revenue Ops",
        icon: <img src="/svg/notion.png" alt="" className="w-3.5 h-3.5 " />,
        color: "#60a5fa",
        badge: "HIRING",
        score: 82,
      },
      {
        name: "Retool",
        detail: "Switched to Outreach.io — new stack",
        icon: (
          <img
            src="/svg/retool.png"
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
        ),
        color: "#facc15",
        badge: "TECH",
        score: 78,
      },
      {
        name: "Loom",
        detail: "Acquired by Atlassian • Leadership shift",
        icon: (
          <img
            src="/svg/loom.jpeg"
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
        ),
        color: "#c084fc",
        badge: "NEWS",
        score: 88,
      },
      {
        name: "Figma",
        detail: "12 pricing page visits this week",
        icon: (
          <img
            src="/svg/figma.png"
            alt=""
            className="w-3.5 h-3.5 object-contain"
          />
        ),
        color: "#fb923c",
        badge: "INTENT",
        score: 93,
      },
    ],
    [],
  );

  const [visibleItems, setVisibleItems] = useState(() =>
    items.slice(0, 3).map((it, i) => ({ ...it, id: `init-${i}` })),
  );
  const [signalCount, setSignalCount] = useState(2847);

  useEffect(() => {
    let idx = 3;
    const interval = setInterval(() => {
      const newItem = { ...items[idx % items.length], id: Date.now() };
      idx++;
      setVisibleItems((prev) => [newItem, ...prev.slice(0, 2)]);
      setSignalCount((c) => c + Math.floor(Math.random() * 12) + 3);
    }, 2400);
    return () => clearInterval(interval);
  }, [items]);

  return (
    <div className="relative h-full w-full overflow-hidden p-6 pt-8">
      {/* Scanner Beam - Radar Sweep */}
      <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(99,102,241,0.1)_90deg,transparent_91deg)] animate-spin [animation-duration:4s] pointer-events-none z-0 opacity-50" />

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />

      {/* Live signal counter */}
      <div className="relative z-10 flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-2">
          <Radio size={10} className="text-emerald-400 animate-pulse" />
          <span className="text-[9px] font-bold uppercase tracking-widest text-emerald-400/80">
            Scanning live
          </span>
        </div>
        <span className="text-[10px] font-mono text-zinc-500">
          {signalCount.toLocaleString()} signals
        </span>
      </div>

      <div className="flex flex-col gap-2.5 relative z-10">
        <AnimatePresence initial={false}>
          {visibleItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, x: 10 }}
              transition={{ duration: 0.4, ease: "circOut" }}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-[#121214] px-3 py-2.5 shadow-xl relative overflow-hidden group/item"
            >
              {/* Flash on new item */}
              <motion.div
                initial={{ opacity: 0.5 }}
                animate={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-indigo-500/10 pointer-events-none"
              />

              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-black">
                <div style={{ color: item.color }}>{item.icon}</div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center mb-0.5">
                  <p className="text-[11px] font-bold text-white truncate">
                    {item.name}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`text-[8px] font-bold px-1.5 py-0.5 rounded-full border border-white/10 bg-white/5 text-zinc-300 font-mono`}
                    >
                      {item.badge}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between gap-2">
                  <p className="text-[9px] text-zinc-500 truncate">
                    {item.detail}
                  </p>
                  {/* Intent score bar */}
                  <div className="flex items-center gap-1.5 shrink-0">
                    <div className="w-12 h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.score}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="h-full rounded-full"
                        style={{
                          background:
                            item.score >= 90
                              ? "#34d399"
                              : item.score >= 80
                                ? "#facc15"
                                : "#fb923c",
                        }}
                      />
                    </div>
                    <span
                      className="text-[8px] font-mono font-bold"
                      style={{
                        color:
                          item.score >= 90
                            ? "#34d399"
                            : item.score >= 80
                              ? "#facc15"
                              : "#fb923c",
                      }}
                    >
                      {item.score}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Visual 2: Hyper-Personalized AI (Neural Network)
function PersonalizationVisual() {
  const sequences = useMemo(
    () => [
      {
        inputs: [
          {
            icon: <DollarSign size={11} />,
            color: "text-emerald-400",
            bg: "bg-emerald-500/20",
            label: "Funding",
            value: "Series A • $15M",
          },
          {
            icon: <Briefcase size={11} />,
            color: "text-blue-400",
            bg: "bg-blue-500/20",
            label: "Hiring",
            value: "VP of Sales posted",
          },
        ],
        variables: [
          "{{first_name}}",
          "{{company}}",
          "{{funding_round}}",
          "{{role_title}}",
        ],
        output:
          '"Hi Sarah, saw TechFlow just closed your Series A — congrats. With the VP Sales role open, curious if outbound is on the roadmap?"',
        spamScore: 0.3,
      },
      {
        inputs: [
          {
            icon: <Cpu size={11} />,
            color: "text-yellow-400",
            bg: "bg-yellow-500/20",
            label: "Tech Stack",
            value: "Migrated to HubSpot",
          },
          {
            icon: <Globe size={11} />,
            color: "text-purple-400",
            bg: "bg-purple-500/20",
            label: "News",
            value: "Featured on TechCrunch",
          },
        ],
        variables: [
          "{{first_name}}",
          "{{company}}",
          "{{tool_name}}",
          "{{news_headline}}",
        ],
        output:
          '"Hey Mike, noticed Retool just switched to HubSpot — the TechCrunch feature was well-deserved. We help teams like yours 3x pipeline post-migration."',
        spamScore: 0.2,
      },
      {
        inputs: [
          {
            icon: <MousePointer2 size={11} />,
            color: "text-orange-400",
            bg: "bg-orange-500/20",
            label: "Intent",
            value: "8 pricing page visits",
          },
          {
            icon: <Search size={11} />,
            color: "text-cyan-400",
            bg: "bg-cyan-500/20",
            label: "Research",
            value: "Compared 3 competitors",
          },
        ],
        variables: [
          "{{first_name}}",
          "{{company}}",
          "{{page_visits}}",
          "{{competitor}}",
        ],
        output:
          '"Hi Jordan, looks like Loom has been evaluating outbound tools — we just helped a team your size book 40 meetings in week one. Worth a quick look?"',
        spamScore: 0.1,
      },
    ],
    [],
  );

  const [seqIdx, setSeqIdx] = useState(0);
  const [stage, setStage] = useState("input");
  const [displayText, setDisplayText] = useState("");
  const [activeVars, setActiveVars] = useState([]);

  useEffect(() => {
    let typeTimer;
    const seq = sequences[seqIdx];

    const runCycle = () => {
      setStage("input");
      setDisplayText("");
      setActiveVars([]);

      setTimeout(() => {
        setStage("processing");
        // Light up variables one by one
        seq.variables.forEach((v, i) => {
          setTimeout(() => setActiveVars((prev) => [...prev, v]), i * 300);
        });
      }, 1800);

      setTimeout(() => {
        setStage("output");
        let i = 0;
        typeTimer = setInterval(() => {
          if (i <= seq.output.length) {
            setDisplayText(seq.output.slice(0, i));
            i++;
          } else {
            clearInterval(typeTimer);
          }
        }, 18);
      }, 3200);
    };

    runCycle();
    const loop = setInterval(() => {
      setSeqIdx((prev) => (prev + 1) % sequences.length);
    }, 8000);

    return () => {
      clearInterval(loop);
      clearInterval(typeTimer);
    };
  }, [seqIdx, sequences]);

  const seq = sequences[seqIdx];

  return (
    <div className="relative h-full w-full overflow-hidden p-6 flex flex-col justify-center gap-3">
      {/* Binary matrix background */}
      <div className="absolute inset-0 opacity-[0.03] font-mono text-[8px] text-indigo-500 overflow-hidden leading-none z-0 pointer-events-none">
        {Array(20)
          .fill(0)
          .map((_, i) => (
            <div
              key={i}
              className="whitespace-nowrap animate-pulse"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {Array(40)
                .fill(0)
                .map(() => (Math.random() > 0.5 ? "1" : "0"))
                .join("")}
            </div>
          ))}
      </div>

      {/* 1. Multiple input signals */}
      <div className="flex gap-2 relative z-10">
        {seq.inputs.map((inp, i) => (
          <motion.div
            key={`${seqIdx}-${i}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: stage === "input" || stage === "processing" ? 1 : 0.3,
              y: 0,
              scale: stage === "input" ? 1.02 : 1,
              boxShadow:
                stage === "input" ? "0 0 16px rgba(59,130,246,0.15)" : "none",
            }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="flex items-center gap-2 bg-zinc-900/80 border border-white/10 rounded-lg px-2.5 py-2 shadow-lg flex-1 min-w-0"
          >
            <div className={`p-1 ${inp.bg} rounded-md ${inp.color} shrink-0`}>
              {inp.icon}
            </div>
            <div className="min-w-0">
              <div className="text-[8px] font-bold text-zinc-500 uppercase">
                {inp.label}
              </div>
              <div className="text-[10px] font-medium text-white truncate">
                {inp.value}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Connection Line 1 */}
      <div className="h-4 w-0.5 bg-zinc-800 self-center relative overflow-hidden z-10">
        <motion.div
          className="absolute top-0 left-0 w-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
          initial={{ height: "0%" }}
          animate={{
            height:
              stage === "processing" || stage === "output" ? "100%" : "0%",
          }}
          transition={{ duration: 0.4 }}
        />
      </div>

      {/* 2. AI Brain + variable extraction */}
      <div className="flex items-center gap-3 self-center relative z-10">
        <motion.div
          animate={{
            scale: stage === "processing" ? 1.15 : 1,
            borderColor:
              stage === "processing"
                ? "rgba(99,102,241,0.8)"
                : "rgba(255,255,255,0.1)",
            boxShadow:
              stage === "processing" ? "0 0 30px rgba(99,102,241,0.5)" : "none",
            backgroundColor: stage === "processing" ? "#1e1b4b" : "#000000",
          }}
          className="w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center relative shrink-0"
        >
          <Bot
            size={18}
            className={
              stage === "processing"
                ? "text-indigo-400 animate-pulse"
                : "text-zinc-600"
            }
          />
        </motion.div>
        {/* Variable pills */}
        <div className="flex flex-wrap gap-1">
          {seq.variables.map((v, i) => (
            <motion.span
              key={v}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{
                opacity: activeVars.includes(v) ? 1 : 0.2,
                scale: activeVars.includes(v) ? 1 : 0.9,
              }}
              transition={{ duration: 0.3 }}
              className="text-[8px] font-mono px-1.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 text-indigo-300"
            >
              {v}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Connection Line 2 */}
      <div className="h-4 w-0.5 bg-zinc-800 self-center relative overflow-hidden z-10">
        <motion.div
          className="absolute top-0 left-0 w-full bg-indigo-500 shadow-[0_0_10px_#6366f1]"
          initial={{ height: "0%" }}
          animate={{ height: stage === "output" ? "100%" : "0%" }}
          transition={{ duration: 0.3, delay: 0.1 }}
        />
      </div>

      {/* 3. Generated Copy */}
      <motion.div
        animate={{
          opacity: stage === "output" ? 1 : 0.25,
          y: stage === "output" ? 0 : 4,
        }}
        className="bg-[#121214] border border-indigo-500/30 rounded-xl p-3.5 shadow-xl relative z-10"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-indigo-500/20 rounded-md">
              <FileText size={9} className="text-indigo-400" />
            </div>
            <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-wider">
              Generated Copy
            </span>
          </div>
          {/* Spam score indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: stage === "output" ? 1 : 0 }}
            className="flex items-center gap-1.5"
          >
            <div className="w-8 h-1 bg-zinc-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-400 rounded-full"
                style={{ width: `${(1 - seq.spamScore) * 100}%` }}
              />
            </div>
            <span className="text-[7px] font-mono font-bold text-emerald-400">
              {seq.spamScore}% spam
            </span>
          </motion.div>
        </div>
        <p className="text-[10px] text-zinc-300 font-mono leading-relaxed">
          {displayText}
          {stage === "output" && displayText.length < seq.output.length && (
            <span className="inline-block w-1 h-3 bg-indigo-400 ml-0.5 animate-pulse align-middle" />
          )}
        </p>
      </motion.div>
    </div>
  );
}

function MultiChannelVisual() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const n1 = useRef(null);
  const n2 = useRef(null);
  const n3 = useRef(null);
  const n4 = useRef(null);

  const channels = useMemo(
    () => [
      {
        ref: n1,
        icon: <Mail size={14} />,
        label: "Email",
        position: "top-10 left-10",
      },
      {
        ref: n2,
        icon: (
          <img
            src="/svg/linkedin-svgrepo-com.svg"
            alt="LinkedIn"
            className="w-3.5 h-3.5"
          />
        ),
        label: "LinkedIn",
        position: "top-10 right-10",
      },
      {
        ref: n3,
        icon: <MessageSquare size={14} />,
        label: "SMS",
        position: "bottom-14 left-10",
      },
      {
        ref: n4,
        icon: <CalendarCheck size={14} />,
        label: "CRM Sync",
        position: "bottom-14 right-10",
      },
    ],
    [],
  );

  const [statuses, setStatuses] = useState(["idle", "idle", "idle", "idle"]);
  const statusColors = {
    idle: "border-white/10 text-zinc-500",
    sending: "border-indigo-500/50 text-indigo-400",
    sent: "border-emerald-500/40 text-emerald-400",
    opened: "border-yellow-500/40 text-yellow-400",
    replied: "border-violet-500/40 text-violet-400",
  };
  const statusLabels = {
    idle: "",
    sending: "Sending...",
    sent: "Delivered",
    opened: "Opened",
    replied: "Replied",
  };

  useEffect(() => {
    const flow = [
      [["sending", "idle", "idle", "idle"], 600],
      [["sent", "idle", "idle", "idle"], 1200],
      [["opened", "idle", "idle", "idle"], 800],
      [["opened", "sending", "idle", "idle"], 500],
      [["opened", "sent", "idle", "idle"], 1000],
      [["opened", "sent", "sending", "idle"], 600],
      [["opened", "sent", "sent", "idle"], 800],
      [["opened", "replied", "sent", "sending"], 700],
      [["replied", "replied", "sent", "sent"], 1200],
      [["idle", "idle", "idle", "idle"], 2000],
    ];

    let timeout;
    let idx = 0;
    const run = () => {
      const [state, delay] = flow[idx % flow.length];
      setStatuses(state);
      idx++;
      timeout = setTimeout(run, delay);
    };
    run();
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full flex items-center justify-center overflow-hidden bg-[#0D0D0F]"
    >
      <div className="absolute inset-0 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:32px_32px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_30%,transparent_100%)] opacity-[0.15]" />

      {channels.map((ch, i) => (
        <div
          key={i}
          ref={ch.ref}
          className={`absolute ${ch.position} flex flex-col items-center gap-1.5 z-10`}
        >
          <motion.div
            animate={{
              borderColor:
                statuses[i] === "idle" ? "rgba(255,255,255,0.1)" : undefined,
              boxShadow:
                statuses[i] !== "idle"
                  ? `0 0 20px ${statuses[i] === "sending" ? "rgba(99,102,241,0.3)" : statuses[i] === "replied" ? "rgba(139,92,246,0.3)" : "rgba(52,211,153,0.2)"}`
                  : "none",
            }}
            className={`w-10 h-10 rounded-xl bg-zinc-900 border flex items-center justify-center shadow-2xl transition-colors duration-300 ${statusColors[statuses[i]]}`}
          >
            {ch.icon}
          </motion.div>
          <span className="text-[8px] font-bold uppercase tracking-wider text-zinc-600">
            {ch.label}
          </span>
          <AnimatePresence mode="wait">
            {statuses[i] !== "idle" && (
              <motion.span
                key={statuses[i]}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className={`text-[7px] font-bold uppercase tracking-wider ${statusColors[statuses[i]].split(" ").pop()}`}
              >
                {statusLabels[statuses[i]]}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      ))}

      <div
        ref={centerRef}
        className="relative z-20 w-24 h-24 rounded-3xl bg-[#0a0a0a] flex flex-col items-center justify-center shadow-[0_0_80px_rgba(139,92,246,0.15)] border border-white/10 group"
      >
        <div className="absolute inset-0 rounded-3xl border border-indigo-500/20 animate-pulse" />
        <Target className="w-7 h-7 text-white mb-1.5" />
        <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">
          Command
        </span>
        <motion.div
          animate={{ opacity: statuses.some((s) => s !== "idle") ? 1 : 0.3 }}
          className="mt-1 flex items-center gap-1"
        >
          {statuses.map((s, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${s === "idle" ? "bg-zinc-700" : s === "sending" ? "bg-indigo-400 animate-pulse" : s === "replied" ? "bg-violet-400" : "bg-emerald-400"}`}
            />
          ))}
        </motion.div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={n1}
        toRef={centerRef}
        gradientStartColor="#60a5fa"
        gradientStopColor="#ffffff"
        curvature={-30}
        duration={2}
        delay={0}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={n2}
        toRef={centerRef}
        gradientStartColor="#0a66c2"
        gradientStopColor="#ffffff"
        curvature={30}
        duration={2.5}
        delay={0.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={n3}
        gradientStartColor="#ffffff"
        gradientStopColor="#a78bfa"
        curvature={30}
        duration={2}
        delay={1}
        reverse={true}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={centerRef}
        toRef={n4}
        gradientStartColor="#ffffff"
        gradientStopColor="#fbbf24"
        curvature={-30}
        duration={2.5}
        delay={1.5}
        reverse={true}
      />
    </div>
  );
}

function ClosingVisual() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 3);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center px-8 pb-4 bg-[#0D0D0F] overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-violet-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="w-full bg-[#161618] border border-white/10 rounded-2xl p-5 shadow-2xl relative z-10">
        <div className="flex justify-between items-center mb-5 border-b border-white/5 pb-3">
          <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
            Calendar
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex gap-4 items-center p-2 rounded-lg border border-white/5 opacity-40 grayscale">
            <div className="w-12 h-8 rounded-md bg-zinc-900 flex items-center justify-center text-zinc-500 text-[10px] font-bold border border-white/5">
              09:00
            </div>
            <div className="h-1.5 w-16 bg-zinc-800 rounded-full" />
          </div>

          <motion.div
            animate={{
              borderColor:
                step === 2
                  ? "rgba(139, 92, 246, 0.4)"
                  : "rgba(255, 255, 255, 0.1)",
              backgroundColor:
                step === 2 ? "rgba(139, 92, 246, 0.1)" : "transparent",
            }}
            className="flex gap-4 items-center p-2 rounded-lg border transition-colors duration-500 relative overflow-hidden"
          >
            {step === 2 && (
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{ duration: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none"
              />
            )}

            <div className="w-12 h-8 rounded-md bg-zinc-900 flex items-center justify-center text-zinc-500 text-[10px] font-bold border border-white/5">
              10:00
            </div>
            <div className="flex-1">
              <AnimatePresence mode="wait">
                {step === 0 && (
                  <motion.span
                    key="s"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-zinc-500 flex items-center gap-2"
                  >
                    <RefreshCw size={10} className="animate-spin" /> Negotiating
                    time...
                  </motion.span>
                )}
                {step === 1 && (
                  <motion.span
                    key="n"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-[10px] text-indigo-400 font-medium"
                  >
                    Proposing 10:00 AM...
                  </motion.span>
                )}
                {step === 2 && (
                  <motion.div
                    key="b"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <span className="text-[10px] font-bold text-white tracking-wide">
                      TechFlow Demo
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500 text-white text-[8px] uppercase font-bold tracking-wider shadow-lg shadow-indigo-500/20">
                      Booked
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            <div
              className={`w-5 h-5 rounded-full flex items-center justify-center transition-all duration-500 ${step === 2 ? "bg-indigo-500 text-white scale-110" : "bg-transparent border border-zinc-800"}`}
            >
              {step === 2 && <Check size={10} />}
            </div>
          </motion.div>

          <div className="flex gap-4 items-center p-2 rounded-lg border border-white/5 opacity-40 grayscale">
            <div className="w-12 h-8 rounded-md bg-zinc-900 flex items-center justify-center text-zinc-500 text-[10px] font-bold border border-white/5">
              11:00
            </div>
            <div className="h-1.5 w-16 bg-zinc-800 rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}

const features = [
  {
    Icon: Radar,
    name: "Live Buyer Detection",
    description:
      "Scans millions of live buying signals (Funding, Hiring, Tech-Installs) to surface prospects who are ready to buy now. Filters out the noise.",
    href: "#",
    cta: "View Live Feed",
    background: <LiveBuyerVisual />,
    className: "col-span-3 lg:col-span-1",
    details: ["Funding Rounds", "Tech-Installs", "Hiring Spikes"],
  },
  {
    Icon: Bot,
    name: "Hyper-Personalized AI",
    description:
      'Uses those funding and role changes to write "Human-Grade" copy. No templates. It references real news events so you never look like a bot.',
    href: "#",
    cta: "View Strategy",
    background: <PersonalizationVisual />,
    className: "col-span-3 lg:col-span-2",
    details: ["News References", "Role Specifics", "Zero Spam Score"],
  },
  {
    Icon: Target,
    name: "Multi-Channel Command",
    description:
      "Optimized for Email & LinkedIn in one timeline. It seamlessly connects and engages prospects on both channels without you switching tabs.",
    href: "#",
    cta: "See Integration",
    background: <MultiChannelVisual />,
    className: "col-span-3 lg:col-span-2",
    details: ["Cross-Channel", "Auto-Followups", "Inbox Sync"],
  },
  {
    Icon: Calendar,
    name: "Autonomous Closing",
    description:
      "Executes the entire campaign 24/7. It follows up persistently on your behalf and books meetings directly to your calendar.",
    href: "#",
    cta: "View Results",
    background: <ClosingVisual />,
    className: "col-span-3 lg:col-span-1",
    details: ["24/7 Active", "Direct Booking", "Hands-Free"],
  },
];

export default function AutopilotSequence() {
  return (
    <section className="py-32 px-4 bg-[#020204] text-white min-h-screen relative overflow-hidden font-sans selection:bg-indigo-500/30">
      <div
        className="fixed inset-0 opacity-[0.03] pointer-events-none z-[0]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>
      <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-500/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-40">
          <TextReveal
            as="h2"
            className="text-4xl md:text-6xl lg:text-6xl font-bold text-white md:tracking-tighter justify-center mb-8 md:leading-[0.8] max-w-4xl mx-auto"
          >
            How it works
          </TextReveal>

          <ScrollReveal delay={200}>
            <p className="text-zinc-400 max-w-2xl mx-auto text-xl md:text-2xl leading-relaxed font-light">
              Three steps that used to be three tools.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={150} scale={0.98}>
          <BentoGrid className="auto-rows-[36rem]">
            {features.map((feature, i) => (
              <BentoCard key={i} {...feature} />
            ))}
          </BentoGrid>
        </ScrollReveal>
      </div>
    </section>
  );
}
