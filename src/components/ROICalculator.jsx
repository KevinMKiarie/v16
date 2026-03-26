import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion, useSpring, useTransform, useInView } from 'framer-motion';
import { TrendingUp, ArrowUpRight } from 'lucide-react';

// --- UTILITIES & LOCAL COMPONENTS ---

const cn = (...classes) => classes.filter(Boolean).join(' ');

// Local implementation of TextReveal
const TextReveal = ({ children, className, as: Component = 'h2', animation = 'slide-up' }) => {
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

// Local implementation of ScrollReveal
const ScrollReveal = ({ children, delay = 0, direction = 'up', className, scale = 1 }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  const directions = {
    up: { y: 40, x: 0 },
    down: { y: -40, x: 0 },
    left: { x: -40, y: 0 },
    right: { x: 40, y: 0 },
    none: { x: 0, y: 0 }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale, ...directions[direction] }}
      animate={isInView ? { opacity: 1, scale: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.8, delay: delay / 1000, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

function AnimatedNumber({ value, prefix = '', suffix = '', className = '' }) {
  const spring = useSpring(value, { stiffness: 80, damping: 20 });
  const display = useTransform(spring, (v) =>
    `${prefix}${Math.round(v).toLocaleString()}${suffix}`
  );
  useEffect(() => { spring.set(value); }, [value, spring]);
  return <motion.span className={className}>{display}</motion.span>;
}

const DIAL_TICKS = 60;
const START_ANGLE = 135;  // degrees – bottom-left
const END_ANGLE = 405;    // degrees – bottom-right (270° sweep)
const SWEEP = END_ANGLE - START_ANGLE;

function DialSlider({ label, value, min, max, step, onChange, format }) {
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
      // Normalize angle relative to start
      let rel = angle - START_ANGLE;
      if (rel < 0) rel += 360;
      if (rel > SWEEP + 30) return null; // dead zone at bottom
      const frac = Math.max(0, Math.min(1, rel / SWEEP));
      const raw = min + frac * (max - min);
      return Math.round(raw / step) * step;
    },
    [min, max, step]
  );

  const handlePointer = useCallback(
    (clientX, clientY) => {
      const newVal = angleFromPointer(clientX, clientY);
      if (newVal === null) return;
      const clamped = Math.max(min, Math.min(max, newVal));
      if (clamped !== value) onChange(clamped);
    },
    [angleFromPointer, min, max, value, onChange]
  );

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      e.preventDefault();
      const pt = 'touches' in e ? e.touches[0] : e;
      handlePointer(pt.clientX, pt.clientY);
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
    };
  }, [handlePointer]);

  const onDown = (e) => {
    dragging.current = true;
    const pt = 'touches' in e ? e.touches[0] : e;
    handlePointer(pt.clientX, pt.clientY);
  };

  // Build tick data
  const ticks = Array.from({ length: DIAL_TICKS }, (_, i) => {
    const tickFrac = i / (DIAL_TICKS - 1);
    const angleDeg = START_ANGLE + tickFrac * SWEEP;
    const angleRad = (angleDeg * Math.PI) / 180;
    const isMajor = i % 10 === 0;
    const isMedium = i % 5 === 0;
    const outerR = 50;
    const innerR = isMajor ? 40 : isMedium ? 42.5 : 45;
    return {
      tickFrac,
      x1: 50 + Math.cos(angleRad) * innerR,
      y1: 50 + Math.sin(angleRad) * innerR,
      x2: 50 + Math.cos(angleRad) * outerR,
      y2: 50 + Math.sin(angleRad) * outerR,
      width: isMajor ? 2 : isMedium ? 1.5 : 0.8,
    };
  });

  // Indicator dot position on the outer ring
  const indicatorAngleDeg = START_ANGLE + fraction * SWEEP;
  const indicatorAngleRad = (indicatorAngleDeg * Math.PI) / 180;
  const dotR = 50;
  const dotX = 50 + Math.cos(indicatorAngleRad) * dotR;
  const dotY = 50 + Math.sin(indicatorAngleRad) * dotR;

  // White → Blue color interpolation along the sweep
  const tickColor = (frac) => {
    const r = Math.round(255 - frac * (255 - 99));
    const g = Math.round(255 - frac * (255 - 102));
    const b = Math.round(255 - frac * (255 - 241));
    return `rgb(${r},${g},${b})`;
  };

  return (
    <div className='flex flex-col items-center gap-4 m-4'>
      <span className='text-xs font-bold uppercase tracking-[0.2em] text-white/70'>{label}</span>

      <div
        ref={dialRef}
        className='relative w-52 h-52 md:w-64 md:h-64 cursor-pointer touch-none select-none  rounded-full'
        onMouseDown={onDown}
        onTouchStart={onDown}
      >
        <div
          className='absolute inset-0 rounded-full p-2'
          style={{
            boxShadow: '8px 8px 20px rgba(0,0,0,0.6), -6px -6px 16px rgba(255,255,255,0.04), inset 1px 1px 2px rgba(255,255,255,0.05)',
          }}
        />

        <div
          className='absolute inset-2 rounded-full border border-white/[0.08]'
          style={{
            background: 'linear-gradient(135deg, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0.02) 100%)',
          }}
        />

        <div
          className='absolute inset-8 md:inset-10 rounded-full'
          style={{
            background: 'linear-gradient(145deg, rgba(9,9,11,0.9) 0%, rgba(24,24,27,0.7) 100%)',
            boxShadow: 'inset 4px 4px 10px rgba(0,0,0,0.5), inset -3px -3px 8px rgba(255,255,255,0.03), 0 0 30px rgba(59,130,246,0.04)',
          }}
        />

        <svg className='absolute inset-0 w-full h-full' viewBox='0 0 100 100'>
          <defs>
            <filter id='glow'>
              <feGaussianBlur stdDeviation='1' result='blur' />
              <feMerge>
                <feMergeNode in='blur' />
                <feMergeNode in='SourceGraphic' />
              </feMerge>
            </filter>
          </defs>

          {ticks.map((tick, i) => {
            const isActive = tick.tickFrac <= fraction + 0.008;
            return (
              <line
                key={i}
                x1={tick.x1}
                y1={tick.y1}
                x2={tick.x2}
                y2={tick.y2}
                stroke={isActive ? tickColor(tick.tickFrac) : 'rgba(255,255,255,0.12)'}
                strokeWidth={tick.width}
                strokeLinecap='round'
                style={{
                  transition: 'stroke 0.2s ease',
                  filter: isActive ? 'drop-shadow(0 0 2px rgba(255,255,255,0.15))' : 'none',
                }}
              />
            );
          })}

          <circle
            cx='50'
            cy='50'
            r='45'
            fill='none'
            stroke='url(#dialArcGrad)'
            strokeWidth='0.5'
            strokeOpacity='0.3'
            strokeDasharray={`${fraction * 283} ${283}`}
            strokeDashoffset='0'
            transform={`rotate(${START_ANGLE} 50 50)`}
            strokeLinecap='round'
          />

          <defs>
            <linearGradient id='dialArcGrad' x1='0' y1='0' x2='1' y2='1'>
              <stop offset='0%' stopColor='#ffffff' />
              <stop offset='100%' stopColor='#6366f1' />
            </linearGradient>
          </defs>

          <circle
            cx={dotX}
            cy={dotY}
            r='3'
            fill={tickColor(fraction)}
            filter='glow'
            style={{
              filter: `drop-shadow(0 0 6px ${tickColor(fraction)})`,
              transition: 'cx 0.3s ease, cy 0.3s ease',
            }}
          />
          <circle
            cx={dotX}
            cy={dotY}
            r='1.5'
            fill='white'
            style={{
              transition: 'cx 0.3s ease, cy 0.3s ease',
            }}
          />
        </svg>

        <div className='absolute inset-0 flex flex-col items-center justify-center pointer-events-none'>
          <div
            className='text-2xl md:text-3xl font-black tracking-tight tabular-nums text-blue-400'
          >
            {format(value)}
          </div>
        </div>
      </div>

      {/* Min / Max labels */}
      <div className='flex justify-between w-full max-w-[13rem] md:max-w-[15rem] text-[10px] text-zinc-500 font-medium px-2'>
        <span>{format(min)}</span>
        <span>{format(max)}</span>
      </div>
    </div>
  );
}

// 3. MetricsCard: Minimalistic glassmorphic comparison display
const MetricRow = ({ label, nexus, legacy, prefix = '', suffix = '', highlight = false }) => {
  const advantage = legacy > 0 ? Math.round(((nexus - legacy) / legacy) * 100) : 0;

  return (
    <div className="group relative">
      {/* Row container */}
      <div className="relative flex items-center justify-between py-4 px-1">
        {/* Label */}
        <span className="text-xs font-medium uppercase tracking-[0.15em] text-zinc-500 w-[35%] md:w-[30%] shrink-0">
          {label}
        </span>

        {/* Values side by side */}
        <div className="flex items-center gap-3 md:gap-6 flex-1 justify-end">
          {/* NexuScale value */}
          <div className={cn(
            "text-right min-w-[80px] md:min-w-[100px]",
            highlight && "relative"
          )}>
            {highlight && (
              <div className="absolute -inset-2 bg-blue-500/[0.06] rounded-lg blur-sm pointer-events-none" />
            )}
            <span className={cn(
              "text-base md:text-lg font-bold tabular-nums relative",
              highlight ? "text-white" : "text-zinc-200"
            )}>
              <AnimatedNumber value={nexus} prefix={prefix} suffix={suffix} />
            </span>
          </div>

          {/* Divider dot */}
          <div className="w-px h-5 bg-white/[0.06]" />

          {/* Legacy value */}
          <div className="text-right min-w-[80px] md:min-w-[100px]">
            <span className="text-base md:text-lg font-bold tabular-nums text-zinc-600">
              <AnimatedNumber value={legacy} prefix={prefix} suffix={suffix} />
            </span>
          </div>

          {/* Advantage badge */}
          {advantage > 0 && (
            <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/[0.12] min-w-[52px] justify-center">
              <ArrowUpRight className="w-3 h-3 text-emerald-400" />
              <span className="text-[10px] font-bold text-emerald-400 tabular-nums">
                {advantage}%
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Subtle separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/[0.04] to-transparent" />
    </div>
  );
};

const MetricsCard = ({ meetings, revenue }) => {
  const legacyRevenue = Math.round(revenue * 0.55);
  const legacyMeetings = Math.round(meetings * 0.55);
  const annualRevenue = revenue * 12;
  const legacyAnnual = legacyRevenue * 12;
  const savings = annualRevenue - legacyAnnual;

  return (
    <div
      className="relative w-full rounded-2xl md:rounded-3xl overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, rgba(15,15,18,0.95) 0%, rgba(12,12,14,0.98) 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)',
      }}
    >
      {/* Glass border overlay */}
      <div className="absolute inset-0 rounded-2xl md:rounded-3xl border border-white/[0.06] pointer-events-none" />

      {/* Subtle top highlight */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-white/[0.1] to-transparent" />

      {/* Content */}
      <div className="relative z-10 p-6 md:p-8">
        {/* Column headers */}
        <div className="flex items-center justify-between mb-2 pb-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-600">Metric</span>
          <div className="flex items-center gap-3 md:gap-6">
            <div className="flex items-center gap-1.5 min-w-[80px] md:min-w-[100px] justify-end">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-blue-400">NexuScale</span>
            </div>
            <div className="w-px h-3 bg-transparent" />
            <div className="flex items-center gap-1.5 min-w-[80px] md:min-w-[100px] justify-end">
              <div className="w-1.5 h-1.5 rounded-full bg-zinc-600" />
              <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-600">Legacy</span>
            </div>
            <div className="hidden sm:block w-[52px]" />
          </div>
        </div>

        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent mb-1" />

        {/* Metric rows */}
        <MetricRow
          label="Monthly Meetings"
          nexus={meetings}
          legacy={legacyMeetings}
          highlight
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
          highlight
        />

        {/* Bottom summary */}
        <div className="mt-6 pt-5 border-t border-white/[0.04]">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(52,211,153,0.12) 0%, rgba(52,211,153,0.04) 100%)',
                  border: '1px solid rgba(52,211,153,0.1)',
                }}
              >
                <TrendingUp className="w-4 h-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">Additional Annual Revenue</p>
                <div className="flex items-baseline gap-1 mt-0.5">
                  <span className="text-emerald-400 font-bold text-sm">+$</span>
                  <AnimatedNumber value={savings} className="text-xl md:text-2xl font-black text-emerald-400 tracking-tight" />
                </div>
              </div>
            </div>

            <div
              className="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]"
              style={{
                background: 'linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.08) 100%)',
                border: '1px solid rgba(59,130,246,0.12)',
                color: 'rgba(147,197,253,0.9)',
              }}
            >
              {meetings > 0 ? `${Math.round(((meetings - legacyMeetings) / Math.max(legacyMeetings, 1)) * 100)}% more meetings booked` : 'Adjust dials above'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function ROICalculator() {
  const [leads, setLeads] = useState(2000);
  const [meetingRate, setMeetingRate] = useState(1.5);
  const meetingValue = 500;

  const meetings = Math.floor(leads * (meetingRate / 100));
  const revenue = meetings * meetingValue;

  return (
    <div className="dark bg-[#09090B] min-h-screen text-white flex items-center justify-center">
      <section className='py-24 px-6 relative overflow-hidden w-full'>
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-500/10 blur-[100px] pointer-events-none" />
        
        <div className='max-w-5xl mx-auto relative z-10'>
          <ScrollReveal>
            <div className='text-center mb-20 relative'>
              <span className='inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.2em] text-white mb-4 shadow-sm rounded-full bg-white/5 border border-white/10 px-3 py-2'>
                <TrendingUp className='w-3.5 h-3.5' />
                ROI Calculator
              </span>
               <TextReveal
            as='h2'
            className='text-4xl md:text-6xl lg:text-7xl font-semibold text-white tracking-tighter justify-center mb-8 md:leading-[0.9] max-w-4xl mx-auto '
          >
              Calculate your potential          
            </TextReveal>
              
              <p className='text-zinc-500 mt-4 max-w-lg mx-auto text-sm md:text-base'>
                Adjust the dials to see how NexuScale pays for itself in the first week.
              </p>
            </div>
            
          </ScrollReveal>

          <div className='grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-8 mb-20'>
            <ScrollReveal delay={100} direction='left' className='text-white'>
              <DialSlider
                label='Monthly Leads Contacted'
                value={leads}
                min={500}
                max={10000}
                step={500}
                className="text-white"
                onChange={setLeads}
                format={(v) => v.toLocaleString()}
              />
            </ScrollReveal>

            <ScrollReveal delay={200} direction='right'>
              <DialSlider
                label='Meeting Book Rate'
                value={meetingRate}
                min={0.5}
                max={5.0}
                step={0.1}
                onChange={setMeetingRate}
                format={(v) => `${v.toFixed(1)}%`}
              />
            </ScrollReveal>
          </div>

          <ScrollReveal delay={300} direction='none' scale={0.95}>
             <MetricsCard meetings={meetings} revenue={revenue} />
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}