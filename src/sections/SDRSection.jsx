import React, { useRef, useState, useEffect, useMemo } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useSpring,
  useTransform,
  useInView,
} from "framer-motion";
import {
  Users,
  Target,
  Rocket,
  Briefcase,
  ChevronRight,
  Check,
  Sparkles,
  LayoutGrid,
  Globe,
  Zap,
  BarChart3,
  MousePointer2,
  ShieldCheck,
  Cpu,
  CalendarCheck,
  User,
  Bot,
  Mail,
  Send,
  MoreHorizontal,
  Clock,
  Activity,
  PieChart,
  TrendingUp,
  Filter,
  CheckCircle2,
  FileText,
  ArrowRight,
  BarChart,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

const ScrollReveal = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.4,
        delay: delay / 1000,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
};

const MagneticButton = ({ children, className }) => {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 15 });
  const springY = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    x.set((clientX - centerX) * 0.3);
    y.set((clientY - centerY) * 0.3);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.button
      onClick={() => {
        window.open("https://app.nexuscale.ai/users/register", "_blank");
      }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: springX, y: springY }}
      className={className}
    >
      {children}
    </motion.button>
  );
};

const useTilt = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x, { stiffness: 200, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 200, damping: 30 });
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);

  const onMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const onMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return { rotateX, rotateY, onMouseMove, onMouseLeave };
};

function AgencyVisual() {
  return (
    <div className="relative h-full w-full p-6 flex flex-col justify-center bg-[#050505]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#6366f108_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="space-y-3 relative z-10">
        {[
          { name: "Acme Global", agents: 12, health: "Optimal" },
          { name: "Stellar Labs", agents: 8, health: "Optimal" },
          { name: "Vector AI", agents: 15, health: "Optimal" },
        ].map((client, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-3 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-between"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/10 flex items-center justify-center text-[10px] font-mono text-indigo-400">
                0{i + 1}
              </div>
              <div className="space-y-0.5">
                <div className="text-[11px] font-bold text-white tracking-tight">
                  {client.name}
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1 h-1 rounded-full bg-indigo-500 animate-pulse" />
                  <div className="text-[8px] text-zinc-500 uppercase tracking-widest">
                    {client.agents} Active Agents
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[8px] font-bold text-emerald-500 uppercase tracking-widest">
              {client.health}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="absolute bottom-4 left-6 flex items-center gap-2">
        <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_#6366f1]" />
        <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
          Multi-Tenant Orchestration
        </span>
      </div>
    </div>
  );
}

function SalesTeamVisual() {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-6 bg-[#050505] overflow-hidden">
      <div className="relative w-full max-w-[240px] space-y-6 z-10">
        <div className="flex items-center justify-between px-2">
          <div className="flex flex-col gap-1">
            <span className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">
              Ingested Signals
            </span>
            <span className="text-sm font-bold text-white tracking-tighter">
              842 / hour
            </span>
          </div>
          <BarChart size={16} className="text-indigo-500 opacity-50" />
        </div>

        <div className="relative h-20 bg-zinc-900/50 border border-white/5 rounded-2xl overflow-hidden p-4">
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4, 5].map((i) => (
              <motion.div
                key={i}
                animate={{ x: [-20, 200], opacity: [0, 1, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: i * 0.6,
                  ease: "linear",
                }}
                className="w-8 h-8 rounded-lg bg-indigo-600/10 border border-indigo-500/20 flex items-center justify-center shrink-0"
              >
                <Zap size={14} className="text-indigo-400" />
              </motion.div>
            ))}
          </div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-[#050505] pointer-events-none" />
        </div>

        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={12} className="text-emerald-500" />
            <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
              Automatic Quota Fill
            </span>
          </div>
          <span className="text-xs font-mono text-emerald-500">+12%</span>
        </div>
      </div>
    </div>
  );
}

function FoundersVisual() {
  return (
    <div className="relative h-full w-full flex flex-col items-center justify-center p-8 bg-[#050505]">
      <div className="flex flex-col gap-3 w-full max-w-[200px] relative z-10">
        <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-between opacity-50">
          <span className="text-[10px] text-zinc-400 font-medium">
            Manual Prospecting
          </span>
          <span className="text-[9px] font-bold text-rose-500 uppercase">
            Offloaded
          </span>
        </div>
        <div className="p-3 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-between opacity-50">
          <span className="text-[10px] text-zinc-400 font-medium">
            CRM Data Entry
          </span>
          <span className="text-[9px] font-bold text-rose-500 uppercase">
            Offloaded
          </span>
        </div>
        <motion.div
          animate={{
            borderColor: [
              "rgba(255,255,255,0.1)",
              "rgba(99,102,241,0.5)",
              "rgba(255,255,255,0.1)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
          className="p-3 rounded-xl bg-indigo-500/5 border border-indigo-500/30 flex items-center justify-between shadow-[0_0_20px_rgba(99,102,241,0.1)]"
        >
          <span className="text-[10px] text-indigo-200 font-bold">
            Scaling Growth
          </span>
          <span className="text-[9px] font-bold text-indigo-400 uppercase animate-pulse">
            Running
          </span>
        </motion.div>
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.05)_0%,transparent_70%)] pointer-events-none" />
    </div>
  );
}

const UseCaseCard = ({
  name,
  outcome,
  description,
  visual: Visual,
  icon: Icon,
  details,
  delay,
}) => {
  const { rotateX, rotateY, onMouseMove, onMouseLeave } = useTilt();
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handlePointerMove = (e) => {
    onMouseMove(e);
    const rect = e.currentTarget.getBoundingClientRect();
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <ScrollReveal delay={delay}>
      <motion.div
        onMouseMove={handlePointerMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative col-span-3 flex flex-col overflow-hidden rounded-[2.5rem] bg-[#0a0a0a] border border-white/10 shadow-2xl transition-all duration-500"
      >
        <div
          className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300 group-hover:opacity-100 rounded-[2.5rem] z-30"
          style={{
            background: `radial-gradient(800px circle at ${position.x}px ${position.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
          }}
        />

        <div className="relative h-[260px] w-full overflow-hidden bg-[#050505] border-b border-white/5">
          <Visual />
          <motion.div
            animate={{ left: ["-100%", "200%"] }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-y-0 w-24 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-12 z-20 pointer-events-none"
          />
        </div>

        <div className="relative z-20 p-10 flex flex-col flex-1 bg-[#0a0a0a]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-indigo-600 group-hover:border-indigo-500 transition-all duration-500 shadow-xl">
                <Icon
                  size={20}
                  className="text-zinc-400 group-hover:text-white transition-colors"
                />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white tracking-tighter group-hover:text-indigo-200 transition-colors leading-tight">
                  {name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">
                    {outcome}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <p className="text-zinc-400 text-sm leading-relaxed mb-8 font-light min-h-[48px]">
            {description}
          </p>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {details.map((tag, i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={12} className="text-indigo-500" />
                  <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                    {tag}
                  </span>
                </div>
              ))}
            </div>

            <MagneticButton className="w-full relative inline-flex h-12 overflow-hidden rounded-xl p-[1px] focus:outline-none group/btn">
              <span className="absolute inset-[-1000%] animate-[spin_4s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#818cf8_0%,#4338ca_50%,#818cf8_100%)] opacity-0 group-hover/btn:opacity-100 transition-opacity" />
              <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-xl bg-[#0a0a0a] px-8 py-1 text-xs font-bold uppercase tracking-[0.2em] text-white backdrop-blur-3xl transition-all group-hover/btn:bg-zinc-900">
                Start Now
              </span>
            </MagneticButton>
          </div>
        </div>
      </motion.div>
    </ScrollReveal>
  );
};

export default function UseCasesSection() {
  return (
    <section className="py-32 px-6 bg-[#020204] relative overflow-hidden font-sans selection:bg-indigo-500/30">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.03)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-28 flex flex-col items-center">
          <h2 className="text-4xl md:text-6xl  lg:text-6xl font-bold text-white tracking-tighter mb-8 leading-[0.85] max-w-4xl">
            Built for founders, sales teams, and agencies.
          </h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-xl font-light leading-relaxed flex space-x-2 items-center justify-center">
            One platform. Three use cases.{" "}
            <a
              href="/use-cases"
              className="text-indigo-400 underline underline-offset-2 flex flex-row space-x-2"
            >
              <p>See how</p>
              <ArrowRight className="w-4 h-4" />
            </a>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <UseCaseCard
            delay={100}
            name="Agencies"
            outcome="Scale Margin"
            description="Replace manual outreach teams with autonomous agents. Manage your entire client portfolio from a single dashboard."
            icon={Globe}
            visual={AgencyVisual}
            details={[
              "70% Margin Boost",
              "White-Label Ready",
              "Multi-Tenant HUD",
            ]}
          />
          <UseCaseCard
            delay={200}
            name="Sales Teams"
            outcome="Crush Quota"
            description="Automate 100% of top-of-funnel prospecting. Let your AEs focus exclusively on closing high-intent demos."
            icon={Zap}
            visual={SalesTeamVisual}
            details={["Pipeline Velocity", "Signal Locking", "Zero Data Gaps"]}
          />
          <UseCaseCard
            delay={300}
            name="Founders"
            outcome="Reclaim Time"
            description="Deploy a world-class sales operation as a solo founder. Automate your first SDR hire before you even scale the team."
            icon={Rocket}
            visual={FoundersVisual}
            details={["Lean Scaling", "Agent Support", "Founder-First AI"]}
          />
        </div>

        <div className="mt-32 pt-16 border-t border-white/5 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex items-center gap-8 group">
            <div className="p-5 rounded-3xl bg-[#0a0a0a] border border-white/10 group-hover:border-indigo-500/30 transition-all duration-700 shadow-2xl relative">
              <ShieldCheck className="text-indigo-500" size={40} />
              <div className="absolute inset-0 rounded-3xl bg-indigo-500/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="text-left">
              <div className="text-xs font-bold text-white uppercase tracking-[0.2em] mb-1">
                Bank-Grade Infrastructure
              </div>
              <div className="text-sm text-zinc-500 font-light max-w-[340px]">
                Nexuscale is SOC2 Type II compliant and utilizes AES-256
                encryption. Your client data stays private and secure.
              </div>
            </div>
          </div>

          <div className="flex gap-16 md:gap-24">
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-1">
                Daily Signals
              </span>
              <div className="text-4xl font-bold text-white tracking-tighter">
                100k+{" "}
                <span className="text-indigo-500/80 italic font-medium">
                  processed
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-[0.2em] mb-1">
                Active Agents
              </span>
              <div className="text-4xl font-bold text-white tracking-tighter">
                2.4k{" "}
                <span className="text-purple-500/80 italic font-medium">
                  live
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
