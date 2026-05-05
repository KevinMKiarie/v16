import React, { useRef, useState, useEffect, useId, useMemo } from "react";
import {
  motion,
  useInView,
  AnimatePresence,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
} from "framer-motion";
import {
  ShieldCheck,
  Zap,
  Globe,
  Mail,
  Server,
  ArrowRight,
  Activity,
  Lock,
  Layers,
  CheckCircle2,
  Crosshair,
  Network,
  Fingerprint,
  FileCode,
  Shield,
  Bot,
  MessageSquare,
  RefreshCw,
  XCircle,
  CheckCircle,
  Plus,
  Minus,
  ChevronRight,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const useMousePosition = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const updateMousePosition = (ev) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY });
    };
    window.addEventListener("mousemove", updateMousePosition);
    return () => window.removeEventListener("mousemove", updateMousePosition);
  }, []);
  return mousePosition;
};

const ScrollReveal = ({
  children,
  delay = 0,
  direction = "up",
  className,
  scale = 1,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: -60, y: 0 },
    right: { x: 60, y: 0 },
    none: { x: 0, y: 0 },
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale, ...directions[direction] }}
      animate={isInView ? { opacity: 1, scale: 1, x: 0, y: 0 } : {}}
      transition={{
        duration: 1.4,
        delay: delay / 1000,
        ease: [0.19, 1, 0.22, 1],
      }}
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
    <Component ref={ref} className={cn(className, "overflow-hidden")}>
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="block bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40 leading-tight"
      >
        {children}
      </motion.span>
    </Component>
  );
};

function AnimatedNumber({ value, suffix = "", className = "", decimals = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const spring = useSpring(0, { stiffness: 40, damping: 20 });
  const display = useTransform(
    spring,
    (v) => `${v.toFixed(decimals)}${suffix}`,
  );

  useEffect(() => {
    if (isInView) spring.set(value);
  }, [isInView, value, spring]);

  return (
    <motion.span ref={ref} className={className}>
      {display}
    </motion.span>
  );
}

const AnimatedBeam = ({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  color = "#6366f1",
  delay = 0,
  duration = 3,
}) => {
  const [path, setPath] = useState("");
  const id = useId();

  useEffect(() => {
    const update = () => {
      if (!containerRef.current || !fromRef.current || !toRef.current) return;
      const c = containerRef.current.getBoundingClientRect();
      const f = fromRef.current.getBoundingClientRect();
      const t = toRef.current.getBoundingClientRect();
      const startX = f.left - c.left + f.width / 2;
      const startY = f.top - c.top + f.height / 2;
      const endX = t.left - c.left + t.width / 2;
      const endY = t.top - c.top + t.height / 2;
      setPath(
        `M ${startX} ${startY} Q ${(startX + endX) / 2 + curvature} ${(startY + endY) / 2 + curvature} ${endX} ${endY}`,
      );
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [containerRef, fromRef, toRef, curvature]);

  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
      <defs>
        <linearGradient id={id} gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor={color} stopOpacity="0" />
          <stop offset="50%" stopColor={color} stopOpacity="1" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={path}
        fill="none"
        stroke="white"
        strokeOpacity="0.05"
        strokeWidth="1"
        strokeDasharray="2 4"
      />
      <motion.path
        d={path}
        fill="none"
        stroke={`url(#${id})`}
        strokeWidth="2"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      />
    </svg>
  );
};

const BentoGrid = ({ children, className }) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[28rem] grid-cols-1 md:grid-cols-3 gap-6",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  delay = 0,
}) => {
  const divRef = useRef(null);
  const mouse = useMousePosition();
  const [isHovered, setIsHovered] = useState(false);

  const spotlightStyle = useMemo(() => {
    if (!divRef.current || !isHovered) return {};
    const rect = divRef.current.getBoundingClientRect();
    const x = mouse.x - rect.left;
    const y = mouse.y - rect.top;
    return {
      background: `radial-gradient(450px circle at ${x}px ${y}px, rgba(255,255,255,0.08), transparent 80%)`,
    };
  }, [mouse, isHovered]);

  return (
    <motion.div
      ref={divRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: delay / 1000 }}
      className={cn(
        "group relative flex flex-col justify-between overflow-hidden rounded-[2rem]",
        "bg-[#0a0a0c] border border-white/[0.06] hover:border-white/[0.15] transition-colors duration-500",
        className,
      )}
    >
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-500"
        style={spotlightStyle}
      />
      <div
        className="absolute inset-0 opacity-[0.02] pointer-events-none z-[1]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="absolute inset-0 z-0 opacity-40 group-hover:opacity-100 transition-all duration-1000 scale-100 group-hover:scale-[1.02]">
        {background}
      </div>

      <div className="relative z-10 flex flex-col justify-end h-full p-8 md:p-10 pointer-events-none">
        <div className="absolute inset-x-0 bottom-0 h-[70%] bg-gradient-to-t from-[#0a0a0c] via-[#0a0a0c]/95 to-transparent -z-10" />

        <div className="space-y-4 transform-gpu transition-all duration-700 group-hover:-translate-y-2">
          <div className="w-12 h-12 rounded-xl bg-white/[0.03] backdrop-blur-xl border border-white/[0.08] flex items-center justify-center group-hover:bg-white group-hover:text-black transition-all duration-500 shadow-2xl">
            <Icon className="w-6 h-6 text-zinc-400 group-hover:text-black transition-colors" />
          </div>
          <h3 className="text-2xl font-medium tracking-tight text-white">
            {name}
          </h3>
          <p className="max-w-xs text-zinc-400 text-sm leading-relaxed font-light">
            {description}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

function EliteInfrastructureVisual() {
  const containerRef = useRef(null);
  const sourceRef = useRef(null);
  const routerRef = useRef(null);
  const out1Ref = useRef(null);
  const out2Ref = useRef(null);
  const out3Ref = useRef(null);
  const blockRef = useRef(null);

  return (
    <div
      ref={containerRef}
      className="relative h-[480px] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0c] rounded-[2rem] border border-white/[0.06] shadow-2xl group"
    >
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 right-12 -translate-y-1/2 w-48 h-80 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_90%_90%_at_50%_50%,#000_40%,transparent_100%)]" />

      <div
        ref={sourceRef}
        className="absolute left-8 md:left-12 w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.03] flex items-center justify-center z-10 shadow-2xl backdrop-blur-xl"
      >
        <Network className="w-5 h-5 text-white/80" />
        <div className="absolute -bottom-8 text-[9px] font-bold text-zinc-500 uppercase tracking-widest whitespace-nowrap">
          Init Source
        </div>
      </div>

      <div
        ref={routerRef}
        className="absolute left-[35%] w-20 h-20 rounded-3xl border border-indigo-500/30 bg-indigo-500/10 flex items-center justify-center z-10 backdrop-blur-xl shadow-[0_0_40px_rgba(99,102,241,0.15)] ring-4 ring-indigo-500/5"
      >
        <div className="absolute inset-0 rounded-3xl border border-indigo-500/40 animate-[spin_4s_linear_infinite] border-t-transparent border-b-transparent" />
        <ShieldCheck className="w-8 h-8 text-indigo-400" />
        <div className="absolute -bottom-8 text-[9px] font-bold text-indigo-400 uppercase tracking-widest whitespace-nowrap">
          Nexus Core
        </div>
      </div>

      {[out1Ref, out2Ref, out3Ref].map((ref, i) => (
        <div
          key={i}
          ref={ref}
          className={`absolute right-12 md:right-24 w-12 h-12 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 flex items-center justify-center z-10 shadow-[0_0_20px_rgba(16,185,129,0.1)] backdrop-blur-md ${i === 0 ? "top-20" : i === 1 ? "top-1/2 -translate-y-1/2" : "bottom-20"}`}
        >
          <Mail className="w-5 h-5 text-emerald-400" />
          <div className="absolute -right-16 text-[9px] font-bold text-zinc-500 uppercase tracking-widest hidden md:block">
            Inbox
          </div>
        </div>
      ))}

      <div
        ref={blockRef}
        className="absolute left-[65%] bottom-16 w-12 h-12 rounded-2xl border border-rose-500/30 bg-rose-500/10 flex items-center justify-center z-10 backdrop-blur-md"
      >
        <Lock className="w-4 h-4 text-rose-400" />
        <div className="absolute -bottom-8 text-[9px] font-bold text-rose-500/70 uppercase tracking-widest whitespace-nowrap">
          Spam Trap
        </div>
      </div>

      <AnimatedBeam
        containerRef={containerRef}
        fromRef={sourceRef}
        toRef={routerRef}
        color="#6366f1"
        duration={1.5}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={routerRef}
        toRef={out1Ref}
        color="#10b981"
        curvature={-30}
        duration={2}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={routerRef}
        toRef={out2Ref}
        color="#10b981"
        curvature={0}
        duration={1.5}
        delay={0.4}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={routerRef}
        toRef={out3Ref}
        color="#10b981"
        curvature={30}
        duration={2.5}
        delay={0.2}
      />
    </div>
  );
}

function WarmupMatrixVisual() {
  const messages = [
    {
      sender: "AI-Node-082",
      text: "Generating contextual B2B inquiry regarding Q3 scaling...",
      time: "0.02s",
    },
    {
      sender: "AI-Node-145",
      text: "Received. Drafting positive industry-specific response.",
      time: "1.45s",
      reply: true,
    },
    {
      sender: "System",
      text: "Spam Rescue Protocol Initiated. Flag resolved.",
      time: "0.01s",
      system: true,
    },
    {
      sender: "AI-Node-003",
      text: 'Marking thread as "Important". Categorizing to Primary.',
      time: "2.10s",
    },
  ];

  return (
    <div className="relative h-[480px] w-full flex items-center justify-center overflow-hidden bg-[#0a0a0c] rounded-[2rem] border border-white/[0.06] shadow-2xl p-8">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none" />
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="w-full flex flex-col gap-4 relative z-10">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: msg.reply ? 10 : -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.5,
              delay: i * 0.8,
              repeat: Infinity,
              repeatType: "reverse",
              repeatDelay: 5,
            }}
            className={`flex flex-col gap-2 p-5 rounded-2xl border ${msg.system ? "border-emerald-500/20 bg-emerald-500/5" : "border-white/5 bg-white/[0.02]"} backdrop-blur-xl shadow-lg ${msg.reply ? "ml-8" : "mr-8"}`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {msg.system ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Bot className="w-4 h-4 text-indigo-400" />
                )}
                <span
                  className={`text-[10px] font-bold uppercase tracking-widest ${msg.system ? "text-emerald-400" : "text-indigo-400"}`}
                >
                  {msg.sender}
                </span>
              </div>
              <span className="text-[10px] font-mono text-zinc-500">
                {msg.time}
              </span>
            </div>
            <p className="text-sm text-zinc-300 font-light tracking-wide">
              {msg.text}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-white/5">
      <button
        onClick={onClick}
        className="w-full py-6 flex items-center justify-between text-left group focus:outline-none"
      >
        <span className="text-base md:text-lg font-medium text-white tracking-tight group-hover:text-indigo-400 transition-colors">
          {question}
        </span>
        <div className="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center bg-white/[0.02] group-hover:bg-indigo-500/10 group-hover:border-indigo-500/30 transition-all">
          {isOpen ? (
            <Minus className="w-4 h-4 text-indigo-400" />
          ) : (
            <Plus className="w-4 h-4 text-zinc-500 group-hover:text-indigo-400" />
          )}
        </div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-zinc-400 text-sm leading-relaxed font-light pr-12">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function MailboxesPage() {
  const [openFaqIndex, setOpenFaqIndex] = useState(0);

  const faqs = [
    {
      q: "Are these mailboxes really bare-metal?",
      a: "Yes. Unlike competitors who resell shared Google or Outlook sub-accounts, we provision dedicated, isolated bare-metal servers. You own the IP reputation entirely, ensuring no neighboring bad actors can affect your deliverability.",
    },
    {
      q: "How does the AI Warmup work?",
      a: "We don't just ping emails back and forth. Our warmup network uses advanced LLMs to generate highly contextual, industry-specific threads. This simulates genuine human B2B conversation, which is the exact behavior strict spam algorithms look for to grant 'Primary Inbox' status.",
    },
    {
      q: "Do I need technical knowledge to configure DNS?",
      a: "Absolutely zero. When you acquire a domain through NexuScale, our engine programmatically injects perfect SPF, DKIM, DMARC, and custom tracking records instantly. It's truly a 1-click deployment.",
    },
    {
      q: "How many mailboxes can I provision?",
      a: "There's no hard cap. Our infrastructure scales horizontally on demand. Whether you need 10 or 10,000 mailboxes, provisioning happens in minutes, not days.",
    },
    {
      q: "What happens if a mailbox gets flagged?",
      a: "Our Spam Rescue Protocol detects reputation degradation in real-time and automatically rotates affected mailboxes out of active sending pools, replacing them with warmed alternatives — zero downtime for your campaigns.",
    },
  ];

  const bentoCards = [
    {
      name: "Bare-Metal Isolation",
      description:
        "Every mailbox runs on dedicated infrastructure. Zero shared tenancy, zero IP crossover — your reputation is yours alone.",
      Icon: Server,
      className: "md:col-span-1",
      delay: 0,
      background: <EliteInfrastructureVisual />,
    },
    {
      name: "AI-Powered Warmup",
      description:
        "Our LLM network simulates genuine B2B threads — not bot pings. Algorithms recognize real conversation patterns and grant Primary Inbox placement.",
      Icon: Bot,
      className: "md:col-span-2",
      delay: 100,
      background: <WarmupMatrixVisual />,
    },
    {
      name: "1-Click DNS Deployment",
      description:
        "SPF, DKIM, DMARC, and custom tracking records injected programmatically at provisioning. Zero technical knowledge required.",
      Icon: FileCode,
      className: "md:col-span-2",
      delay: 200,
      background: (
        <div className="h-full w-full flex items-center justify-center p-8">
          <div className="w-full font-mono text-xs space-y-2 text-left">
            {[
              {
                key: "SPF",
                val: "v=spf1 include:nexuscale.ai ~all",
                color: "text-emerald-400",
              },
              {
                key: "DKIM",
                val: "v=DKIM1; k=rsa; p=MIIBIjANBg...",
                color: "text-indigo-400",
              },
              {
                key: "DMARC",
                val: "v=DMARC1; p=quarantine; rua=...",
                color: "text-violet-400",
              },
              { key: "MX", val: "10 mail.nexuscale.ai", color: "text-sky-400" },
            ].map((record, i) => (
              <motion.div
                key={record.key}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.02] border border-white/[0.04]"
              >
                <span className="text-zinc-500 w-12 shrink-0">
                  {record.key}
                </span>
                <span className={record.color + " truncate"}>{record.val}</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 ml-auto" />
              </motion.div>
            ))}
          </div>
        </div>
      ),
    },
    {
      name: "Real-Time Reputation Guard",
      description:
        "Continuous inbox monitoring with automated spam rescue. Degraded mailboxes rotate out instantly, keeping your sending reputation pristine.",
      Icon: Shield,
      className: "md:col-span-1",
      delay: 300,
      background: (
        <div className="h-full w-full flex items-center justify-center p-8">
          <div className="relative w-40 h-40">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="8"
              />
              <motion.circle
                cx="50"
                cy="50"
                r="40"
                fill="none"
                stroke="url(#scoreGrad)"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray="251.2"
                initial={{ strokeDashoffset: 251.2 }}
                animate={{ strokeDashoffset: 251.2 * 0.05 }}
                transition={{ duration: 2, delay: 0.5, ease: "easeOut" }}
              />
              <defs>
                <linearGradient
                  id="scoreGrad"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <AnimatedNumber
                value={98}
                suffix="%"
                className="text-3xl font-bold text-white"
              />
              <span className="text-[10px] text-zinc-500 uppercase tracking-widest mt-1">
                Rep. Score
              </span>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const stats = [
    { value: 98, suffix: "%", label: "Primary Inbox Rate", decimals: 0 },
    { value: 4, suffix: "min", label: "Avg. Provisioning Time", decimals: 0 },
    { value: 99.9, suffix: "%", label: "Uptime SLA", decimals: 1 },
    { value: 10, suffix: "K+", label: "Active Mailboxes", decimals: 0 },
  ];

  return (
    <main className="bg-[#020204] text-white selection:bg-indigo-500/30 selection:text-white min-h-screen">
      {/* Global Background */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.15]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='32' height='32' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='1.5' cy='1.5' r='1.5' fill='%23ffffff' fill-opacity='0.1'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Hero */}
      <section className="relative z-10 pt-32 pb-24 px-6 lg:px-12 max-w-screen-2xl mx-auto flex flex-col items-center text-center">
        <div className="max-w-4xl w-full">
          <ScrollReveal direction="up">
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="h-px w-12 bg-white/20" />
              <span className="text-xs font-bold uppercase tracking-[0.4em] text-zinc-500">
                Bare-Metal Infrastructure
              </span>
              <div className="h-px w-12 bg-white/20" />
            </div>
          </ScrollReveal>

          <TextReveal
            as="h1"
            className="text-4xl md:text-9xl font-semibold tracking-tighter mb-12 leading-[0.9]"
          >
            Absolute
            <br />
            Deliverability.
          </TextReveal>

          <ScrollReveal direction="up" delay={200}>
            <p className="text-lg md:text-xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto mb-14">
              Dedicated bare-metal mailboxes with AI-powered warmup, autonomous
              reputation management, and 1-click DNS deployment. Built for teams
              that can't afford to land in spam.
            </p>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={350}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() =>
                  window.open(
                    "https://app.nexuscale.ai/users/register",
                    "_blank",
                  )
                }
                className="group flex items-center gap-3 px-8 py-4 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold rounded-xl transition-all duration-300 shadow-[0_0_30px_rgba(99,102,241,0.3)] hover:shadow-[0_0_50px_rgba(99,102,241,0.5)] hover:scale-[1.02] active:scale-[0.98]"
              >
                Provision Mailboxes
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a href="/pricing">
                <button className="flex items-center gap-2 px-8 py-4 text-sm font-medium text-zinc-400 hover:text-white border border-white/[0.08] hover:border-white/[0.2] rounded-xl transition-all duration-300 hover:bg-white/[0.03]">
                  View Pricing
                  <ChevronRight className="w-4 h-4" />
                </button>
              </a>
            </div>
          </ScrollReveal>
        </div>

        {/* Stats */}
        <div className="mt-24 w-full max-w-5xl grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04] rounded-2xl overflow-hidden border border-white/[0.04]">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-[#020204] px-8 py-8 flex flex-col items-center gap-2"
            >
              <div className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                <AnimatedNumber
                  value={stat.value}
                  suffix={stat.suffix}
                  decimals={stat.decimals}
                />
              </div>
              <div className="text-xs text-zinc-500 uppercase tracking-widest text-center">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bento Grid */}
      <section className="relative z-10 px-6 lg:px-12 max-w-screen-2xl mx-auto pb-32">
        <ScrollReveal direction="up">
          <div className="text-center mb-16">
            <TextReveal
              as="h2"
              className="text-4xl md:text-6xl font-semibold tracking-tighter mb-6"
            >
              Infrastructure built
              <br />
              to win.
            </TextReveal>
            <p className="text-zinc-500 text-base max-w-xl mx-auto font-light">
              Every component engineered for maximum deliverability — from the
              bare-metal layer up.
            </p>
          </div>
        </ScrollReveal>

        <BentoGrid>
          {bentoCards.map((card, i) => (
            <BentoCard key={i} {...card} />
          ))}
        </BentoGrid>
      </section>

      {/* How It Works */}
      <section className="relative z-10 px-6 lg:px-12 max-w-screen-xl mx-auto pb-32">
        <ScrollReveal direction="up">
          <div className="text-center mb-20">
            <TextReveal
              as="h2"
              className="text-4xl md:text-6xl font-semibold tracking-tighter mb-6"
            >
              From zero to
              <br />
              Primary Inbox.
            </TextReveal>
            <p className="text-zinc-500 text-base max-w-xl mx-auto font-light">
              Three steps. Minutes, not weeks.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              step: "01",
              title: "Provision & Configure",
              desc: "Choose your mailbox count, connect your domain, and our engine auto-injects all DNS records. Live in under 5 minutes.",
              icon: Globe,
              color: "indigo",
            },
            {
              step: "02",
              title: "AI Warmup Network",
              desc: "Your mailboxes enter our LLM warmup matrix — exchanging contextual, human-like threads that build genuine inbox reputation.",
              icon: Bot,
              color: "violet",
            },
            {
              step: "03",
              title: "Launch & Monitor",
              desc: "Send with confidence. Real-time reputation dashboards and automated spam rescue keep your deliverability at peak performance.",
              icon: Activity,
              color: "emerald",
            },
          ].map((item, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 100}>
              <div className="relative p-8 rounded-[2rem] bg-[#0a0a0c] border border-white/[0.06] hover:border-white/[0.12] transition-colors duration-500 group h-full">
                <div
                  className={`absolute top-8 right-8 text-7xl font-black tracking-tighter opacity-[0.04] text-${item.color}-400 select-none`}
                >
                  {item.step}
                </div>
                <div
                  className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 border border-${item.color}-500/20 flex items-center justify-center mb-8 group-hover:bg-${item.color}-500/20 transition-colors`}
                >
                  <item.icon className={`w-5 h-5 text-${item.color}-400`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3 tracking-tight">
                  {item.title}
                </h3>
                <p className="text-zinc-500 text-sm leading-relaxed font-light">
                  {item.desc}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="relative z-10 px-6 lg:px-12 max-w-screen-xl mx-auto pb-32">
        <div className="max-w-3xl mx-auto">
          <ScrollReveal direction="up">
            <div className="text-center mb-16">
              <TextReveal
                as="h2"
                className="text-4xl md:text-6xl font-semibold tracking-tighter mb-6"
              >
                Common questions.
              </TextReveal>
            </div>
          </ScrollReveal>

          <div>
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                question={faq.q}
                answer={faq.a}
                isOpen={openFaqIndex === i}
                onClick={() => setOpenFaqIndex(openFaqIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 px-6 lg:px-12 max-w-screen-xl mx-auto pb-32">
        <ScrollReveal direction="up">
          <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0a0a0c] border border-white/[0.06] p-16 md:p-24 text-center">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-indigo-500/10 blur-[100px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <TextReveal
                as="h2"
                className="text-4xl md:text-6xl font-semibold tracking-tighter mb-6"
              >
                Ready to own
                <br />
                your inbox?
              </TextReveal>
              <p className="text-zinc-400 text-base font-light mb-12 max-w-md mx-auto">
                Provision your first dedicated mailbox infrastructure in under 5
                minutes.
              </p>
              <button
                onClick={() =>
                  window.open(
                    "https://app.nexuscale.ai/users/register",
                    "_blank",
                  )
                }
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-black text-sm font-bold rounded-xl transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] shadow-2xl"
              >
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>
    </main>
  );
}
