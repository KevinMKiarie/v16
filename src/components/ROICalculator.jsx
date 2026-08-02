import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion, useSpring, useTransform, useInView } from "framer-motion";
import {
  TrendingUp,
  ArrowUpRight,
  Zap,
  Target,
  MousePointer2,
} from "lucide-react";

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- UTILITY COMPONENTS ---
const TextReveal = ({ children, className, as: Component = "h2" }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });
  return (
    <Component ref={ref} className={cn(className, "overflow-hidden")}>
      <motion.span
        initial={{ y: "100%", opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="block"
      >
        {children}
      </motion.span>
    </Component>
  );
};

const ScrollReveal = ({ children, delay = 0, className }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 15 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.8,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function AnimatedNumber({ value, prefix = "", suffix = "", className = "" }) {
  const spring = useSpring(value, { stiffness: 60, damping: 20 });
  const display = useTransform(
    spring,
    (v) => `${prefix}${Math.round(v).toLocaleString()}${suffix}`,
  );
  useEffect(() => {
    spring.set(value);
  }, [value, spring]);
  return <motion.span className={className}>{display}</motion.span>;
}

// --- DIAL SLIDER ---
const DIAL_TICKS = 40;
const START_ANGLE = 135;
const END_ANGLE = 405;
const SWEEP = END_ANGLE - START_ANGLE;

function DialSlider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  format,
  icon: Icon,
}) {
  const dialRef = useRef(null);
  const dragging = useRef(false);
  const fraction = (value - min) / (max - min);

  const angleFromPointer = useCallback(
    (clientX, clientY) => {
      if (!dialRef.current) return null;
      const rect = dialRef.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      let angle = Math.atan2(clientY - cy, clientX - cx) * (180 / Math.PI);
      angle = (angle + 360) % 360;
      let rel = angle - START_ANGLE;
      if (rel < 0) rel += 360;
      if (rel > SWEEP + 30) return null;
      const frac = Math.max(0, Math.min(1, rel / SWEEP));
      const raw = min + frac * (max - min);
      return Math.round(raw / step) * step;
    },
    [min, max, step],
  );

  const handlePointer = useCallback(
    (clientX, clientY) => {
      const newVal = angleFromPointer(clientX, clientY);
      if (newVal === null) return;
      const clamped = Math.max(min, Math.min(max, newVal));
      if (clamped !== value) onChange(clamped);
    },
    [angleFromPointer, min, max, value, onChange],
  );

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const pt = "touches" in e ? e.touches[0] : e;
      handlePointer(pt.clientX, pt.clientY);
    };
    const onUp = () => {
      dragging.current = false;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [handlePointer]);

  const ticks = Array.from({ length: DIAL_TICKS }, (_, i) => {
    const tickFrac = i / (DIAL_TICKS - 1);
    const angleRad = ((START_ANGLE + tickFrac * SWEEP) * Math.PI) / 180;
    const isActive = tickFrac <= fraction;
    return {
      x1: 50 + Math.cos(angleRad) * (isActive ? 42 : 46),
      y1: 50 + Math.sin(angleRad) * (isActive ? 42 : 46),
      x2: 50 + Math.cos(angleRad) * 50,
      y2: 50 + Math.sin(angleRad) * 50,
      active: isActive,
    };
  });

  return (
    <div className="flex flex-col items-center flex-1 py-4">
      <div className="flex items-center gap-2 mb-4 opacity-40">
        {Icon && <Icon className="w-3 h-3 text-indigo-400" />}
        <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-400">
          {label}
        </span>
      </div>

      <div
        ref={dialRef}
        className="relative w-40 h-40 md:w-48 md:h-48 cursor-pointer group"
        onMouseDown={(e) => {
          dragging.current = true;
          handlePointer(e.clientX, e.clientY);
        }}
      >
        <div className="absolute inset-8 rounded-full bg-zinc-950 border border-white/5 shadow-2xl flex items-center justify-center">
          <div className="text-center z-10">
            <div className="text-xl md:text-2xl font-black tracking-tighter text-white tabular-nums">
              {format(value)}
            </div>
          </div>
        </div>

        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {ticks.map((tick, i) => (
            <line
              key={i}
              x1={tick.x1}
              y1={tick.y1}
              x2={tick.x2}
              y2={tick.y2}
              stroke={tick.active ? "#818cf8" : "rgba(255,255,255,0.06)"}
              strokeWidth={tick.active ? 1.5 : 0.8}
              strokeLinecap="round"
            />
          ))}
        </svg>
      </div>
    </div>
  );
}

// --- COMPACT METRIC ROW ---
const MetricRow = ({ label, nexus, legacy, prefix = "" }) => {
  const advantage =
    legacy > 0 ? Math.round(((nexus - legacy) / legacy) * 100) : 0;
  return (
    <div className="grid grid-cols-12 items-center py-3 border-b border-white/[0.04] group transition-colors hover:bg-white/[0.01]">
      <div className="col-span-5 md:col-span-6">
        <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">
          {label}
        </span>
      </div>
      <div className="col-span-3 text-right">
        <span className="text-sm md:text-lg font-bold tabular-nums text-white">
          <AnimatedNumber value={nexus} prefix={prefix} />
        </span>
      </div>
      <div className="col-span-2 text-right">
        <span className="text-sm md:text-base font-medium tabular-nums text-zinc-600">
          <AnimatedNumber value={legacy} prefix={prefix} />
        </span>
      </div>
      <div className="col-span-2 flex justify-end">
        <span className="text-[9px] font-black text-emerald-400/80 bg-emerald-500/[0.05] px-1.5 py-0.5 rounded border border-emerald-500/10">
          +{advantage}%
        </span>
      </div>
    </div>
  );
};

export default function ROICalculator() {
  const [leads, setLeads] = useState(2500);
  const [meetingRate, setMeetingRate] = useState(2.0);
  const meetingValue = 500;

  const meetings = Math.floor(leads * (meetingRate / 100));
  const revenue = meetings * meetingValue;
  const legacyMeetings = Math.round(meetings * 0.55);
  const legacyRevenue = Math.round(revenue * 0.55);
  const annualRevenue = revenue * 12;
  const legacyAnnual = legacyRevenue * 12;
  const savings = annualRevenue - legacyAnnual;

  return (
    <section className="bg-black py-20 px-6 text-start">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 px-2 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/20 mb-4">
              <Zap className="w-2.5 h-2.5 text-indigo-400" />
              <span className="text-[9px] font-black uppercase tracking-[.2em] text-indigo-300">
                ROI calculater
              </span>
            </div>
            <h2 className="text-3xl md:text-6xl font-bold tracking-tighter text-white mb-4">
              Calculate your potential
            </h2>
            <p className="text-zinc-500 text-sm max-w-lg leading-relaxed">
              Adjust the dials to see how NexuScale pays for itself in the first
              week.
            </p>
          </div>
        </ScrollReveal>

        {/* COMPACT DIAL SECTION */}
        <div className="flex flex-row gap-4 mb-8 bg-zinc-950/40 p-6 rounded-3xl border border-white/[0.03]">
          <DialSlider
            label="Monthly Reach"
            value={leads}
            min={500}
            max={10000}
            step={500}
            icon={Target}
            onChange={setLeads}
            format={(v) => v.toLocaleString()}
          />
          <div className="w-px h-auto bg-white/5 my-4" />
          <DialSlider
            label="Perf. Rate"
            value={meetingRate}
            min={0.5}
            max={10.0}
            step={0.1}
            icon={Zap}
            onChange={setMeetingRate}
            format={(v) => `${v.toFixed(1)}%`}
          />
        </div>

        {/* HIGH-DENSITY METRICS TABLE */}
        <ScrollReveal delay={50}>
          <div className="bg-zinc-900/30 border border-white/5 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-12 mb-4 pb-2 border-b border-white/10">
              <span className="col-span-5 md:col-span-6 text-[8px] font-black uppercase tracking-widest text-zinc-600">
                Primary KPIs
              </span>
              <span className="col-span-3 text-right text-[8px] font-black uppercase tracking-widest text-indigo-400">
                NexuScale
              </span>
              <span className="col-span-2 text-right text-[8px] font-black uppercase tracking-widest text-zinc-600">
                Legacy
              </span>
              <span className="col-span-2 text-right text-[8px] font-black uppercase tracking-widest text-zinc-600">
                Lift
              </span>
            </div>

            <div className="space-y-1">
              <MetricRow
                label="Monthly Meetings"
                nexus={meetings}
                legacy={legacyMeetings}
              />
              <MetricRow
                label="Monthly Revenue"
                nexus={revenue}
                legacy={legacyRevenue}
                prefix="$"
              />
              <MetricRow
                label="Annual Revenue"
                nexus={annualRevenue}
                legacy={legacyAnnual}
                prefix="$"
              />
            </div>

            {/* THE FOOTER ROI */}
            <div className="mt-8 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/5 border border-emerald-500/10 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-emerald-500/60" />
                </div>
                <div>
                  <p className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-500">
                    Incremental Annualized Revenue
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-emerald-400 font-bold text-sm">
                      +$
                    </span>
                    <AnimatedNumber
                      value={savings}
                      className="text-2xl md:text-3xl font-black text-emerald-400 tracking-tighter"
                    />
                  </div>
                </div>
              </div>

              <button className="px-6 py-3 bg-white text-black rounded-xl font-bold text-xs hover:bg-indigo-50 transition-all flex items-center gap-2 group">
                Access Engine
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
