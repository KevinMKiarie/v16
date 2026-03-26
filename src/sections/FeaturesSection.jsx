import { useRef } from 'react';
import { ScanEye, Globe, Sparkles, Clock, Check } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AnimatedBeam } from '@/components/ui/animated-beam';
import { Ripple } from '@/components/ui/ripple';
import { BorderBeam } from '@/components/ui/border-beam';
import { ScrollReveal } from '@/components/ScrollReveal';
import { TextReveal } from '@/components/TextReveal';


function SignalVisual() {
  const containerRef = useRef(null);
  const centerRef = useRef(null);
  const topLeftRef = useRef(null);
  const topRightRef = useRef(null);
  const bottomLeftRef = useRef(null);
  const bottomRightRef = useRef(null);

  return (
    <div ref={containerRef} className='relative w-full h-full flex items-center justify-center overflow-hidden'>
      <Ripple mainCircleSize={60} mainCircleOpacity={0.12} numCircles={4} className='mask-[linear-gradient(to_bottom,white_50%,transparent)]' />

      <div ref={topLeftRef} className='absolute top-3 left-5 w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-[9px] font-bold text-emerald-400'>$</div>
      <div ref={topRightRef} className='absolute top-3 right-5 w-7 h-7 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-[9px] font-bold text-blue-400'>H</div>
      <div ref={bottomLeftRef} className='absolute bottom-3 left-5 w-7 h-7 rounded-full bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-[9px] font-bold text-violet-400'>T</div>
      <div ref={bottomRightRef} className='absolute bottom-3 right-5 w-7 h-7 rounded-full bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[9px] font-bold text-amber-400'>R</div>

      <div ref={centerRef} className='relative z-10 w-10 h-10 rounded-full bg-blue-600/30 border border-blue-500/40 flex items-center justify-center shadow-[0_0_25px_rgba(59,130,246,0.3)]'>
        <Globe className='w-4 h-4 text-blue-400' />
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={topLeftRef} toRef={centerRef} gradientStartColor='#10b981' gradientStopColor='#3b82f6' curvature={-20} duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={topRightRef} toRef={centerRef} gradientStartColor='#3b82f6' gradientStopColor='#8b5cf6' curvature={20} duration={5} />
      <AnimatedBeam containerRef={containerRef} fromRef={bottomLeftRef} toRef={centerRef} gradientStartColor='#8b5cf6' gradientStopColor='#3b82f6' curvature={20} duration={4.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={bottomRightRef} toRef={centerRef} gradientStartColor='#f59e0b' gradientStopColor='#3b82f6' curvature={-20} duration={5.5} />
    </div>
  );
}

function PersonalizeVisual() {
  return (
    <div className='relative w-full h-full flex flex-col gap-2 p-4 overflow-hidden'>
      <div className='relative z-10 space-y-2'>
        <div className='flex items-center gap-2'>
          <div className='w-5 h-5 rounded-full bg-indigo-600 flex items-center justify-center text-[8px] font-bold text-white'>AI</div>
          <span className='text-[10px] text-zinc-500'>NexuScale Autopilot</span>
        </div>
        <div className='bg-white/4 border border-white/8 rounded-lg p-2.5 text-[11px] text-zinc-300 leading-relaxed'>
          Hi Sarah, congrats on your promotion to{' '}
          <span className='text-indigo-400 bg-indigo-500/10 px-1 rounded font-medium'>Head of AI</span>
          ! With TechFlow&apos;s recent{' '}
          <span className='text-emerald-400 bg-emerald-500/10 px-1 rounded font-medium'>Series A</span>
          , I imagine you&apos;re scaling fast...
        </div>
        <div className='flex gap-1.5 flex-wrap'>
          <span className='text-[8px] bg-indigo-500/10 text-indigo-300 px-1.5 py-0.5 rounded-full border border-indigo-500/20'>Role Change</span>
          <span className='text-[8px] bg-emerald-500/10 text-emerald-300 px-1.5 py-0.5 rounded-full border border-emerald-500/20'>Funding</span>
          <span className='text-[8px] bg-amber-500/10 text-amber-300 px-1.5 py-0.5 rounded-full border border-amber-500/20'>Hiring</span>
        </div>
      </div>
    </div>
  );
}

function BookingVisual() {
  const containerRef = useRef(null);
  const autopilotRef = useRef(null);
  const emailRef = useRef(null);
  const linkedinRef = useRef(null);
  const calendarRef = useRef(null);

  return (
    <div ref={containerRef} className='relative w-full h-full flex items-center justify-center overflow-hidden'>
      <div ref={autopilotRef} className='absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-blue-600/25 border border-blue-500/40 flex items-center justify-center shadow-[0_0_15px_rgba(59,130,246,0.2)]'>
        <Sparkles className='w-3.5 h-3.5 text-blue-400' />
      </div>

      <div className='flex flex-col gap-3'>
        <div ref={emailRef} className='w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[11px]'>📧</div>
        <div ref={linkedinRef} className='w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[11px]'>💼</div>
      </div>

      <div ref={calendarRef} className='absolute right-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-lg bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center'>
        <Clock className='w-3.5 h-3.5 text-emerald-400' />
      </div>

      <AnimatedBeam containerRef={containerRef} fromRef={autopilotRef} toRef={emailRef} gradientStartColor='#3b82f6' gradientStopColor='#8b5cf6' curvature={-12} duration={3} />
      <AnimatedBeam containerRef={containerRef} fromRef={autopilotRef} toRef={linkedinRef} gradientStartColor='#3b82f6' gradientStopColor='#0077b5' curvature={12} duration={3.5} />
      <AnimatedBeam containerRef={containerRef} fromRef={emailRef} toRef={calendarRef} gradientStartColor='#8b5cf6' gradientStopColor='#10b981' curvature={-12} duration={4} />
      <AnimatedBeam containerRef={containerRef} fromRef={linkedinRef} toRef={calendarRef} gradientStartColor='#0077b5' gradientStopColor='#10b981' curvature={12} duration={4.5} />
    </div>
  );
}

const powers = [
  {
    icon: Globe,
    step: '01',
    title: 'Find the Right Buyers.',
    desc: 'Scans millions of live buying signals to surface prospects who are ready to buy now.',
    checks: [
      'Monitors funding, hiring & tech-install signals',
      'Surfaces ready-to-buy prospects in real time',
      'Filters noise — only high-intent leads',
    ],
    visual: SignalVisual,
  },
  {
    icon: Sparkles,
    step: '02',
    title: 'Hyper-Personalized Content.',
    desc: 'Uses funding, hiring, and role changes to write outreach that feels human.',
    checks: [
      'References real events — promotions, funding',
      'Unique copy per prospect, not templates',
      'Optimized for Email & LinkedIn',
    ],
    visual: PersonalizeVisual,
  },
  {
    icon: Clock,
    step: '03',
    title: 'Book Meetings for You.',
    desc: 'Executes entire campaigns, follows up persistently, and books meetings 24/7.',
    checks: [
      'Runs multi-channel cadences autonomously',
      'Follows up persistently on your behalf',
      'Books directly on your calendar 24/7',
    ],
    visual: BookingVisual,
  },
];

export default function FeaturesSection() {
  const sectionRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const rocketY = useTransform(scrollYProgress, [0.2, 0.6], [0, -300]);
  const rocketOpacity = useTransform(scrollYProgress, [0.2, 0.45, 0.6], [1, 1, 0]);
  const rocketScale = useTransform(scrollYProgress, [0.2, 0.6], [1, 0.6]);
  const rocketBlur = useTransform(scrollYProgress, [0.45, 0.6], [0, 12]);

  return (
    <div ref={sectionRef} className='w-full mt-12 md:my-24'>
      <div className='w-full flex flex-col space-y-12 my-12 md:my-24'>
        <div>
          <span className='flex w-full md:max-w-[40%] lg:max-w-[20%] px-2 mx-auto flex-row gap-2 rounded-full items-center justify-center shadow-sm shadow-white/20 b py-1 text-blue-700 text-xs md:text-sm font-semibold'>
            <motion.div
              initial={{ scale: 1, x: 0 }}
              animate={{
                scaleY: [1, 1, 0.1, 1],
                x: [0, 1, -1, 0, 1, -1, 0],
              }}
              transition={{
                delay: 3,
                duration: 1.5,
                times: [0, 0.6, 0.7, 0.8, 0.85, 0.9, 0.95, 1],
                ease: 'easeInOut',
                repeat: Infinity,
                repeatDelay: 5,
              }}
            >
              <ScanEye className='w-3 h-3 md:w-4 md:h-4 text-white' />
            </motion.div>
            <p className='text-[10px] md:text-sm text-white'>Instant Sales Lead</p>
          </span>
        </div>

        <div className=''>
          <div className='flex flex-col items-center justify-center w-full uppercase relative'>
            <motion.span
              className='absolute text-5xl md:text-7xl lg:text-8xl z-0 pointer-events-none will-change-transform'
              style={{
                y: rocketY,
                opacity: rocketOpacity,
                scale: rocketScale,
                filter: useTransform(rocketBlur, (v) => `blur(${v}px)`),
              }}
              aria-hidden
            >
              🚀
            </motion.span>

            <TextReveal
              as='h1'
              animation='blur-in'
              className='text-center text-2xl md:text-5xl lg:text-7xl font-black relative z-10 justify-center'
            >
              One Autopilot
            </TextReveal>
            <TextReveal
              as='h1'
              animation='slide-up'
              delay={200}
              className='text-center text-lg md:text-4xl lg:text-6xl font-black text-blue-700 relative z-10 justify-center'
            >
              three core powers
            </TextReveal>
          </div>
        </div>

        <div className='w-full max-w-5xl mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-6 gap-3'>
            {powers.map((power, i) => {
              const spanClass = i === 0
                ? 'md:col-span-4'
                : i === 1
                  ? 'md:col-span-2'
                  : 'md:col-span-6';

              const dir = i === 0 ? 'left' : i === 1 ? 'right' : 'up';
              return (
                <ScrollReveal key={power.step} delay={(i + 1) * 100} direction={dir} className={`h-full ${spanClass}`}>
                  <div className='relative h-full overflow-hidden rounded-2xl border border-white/8 bg-[#09090B] group hover:border-white/15 transition-colors'>
                    <BorderBeam size={60} duration={8 + i * 2} colorFrom='#3b82f6' colorTo='#06b6d4' borderWidth={1} />

                    <div className={`flex h-full ${i === 2 ? 'flex-col md:flex-row' : 'flex-col'}`}>
                      {/* Visual area */}
                      <div className={`relative bg-white/[0.02] border-b border-white/6 ${
                        i === 2 ? 'h-48 md:h-auto md:w-1/2 md:border-b-0 md:border-r' : 'h-44'
                      } overflow-hidden`}>
                        <power.visual />
                      </div>

                      {/* Content area */}
                      <div className={`flex flex-col gap-4 p-5 md:p-6 ${i === 2 ? 'md:w-1/2 md:justify-center' : ''}`}>
                        <div className='flex items-center gap-3'>
                          <div className='flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-600/10 border border-blue-500/20 text-blue-400'>
                            <power.icon className='w-4 h-4' />
                          </div>
                          <span className='text-[10px] font-bold text-blue-400/50 tracking-widest uppercase'>
                            Step {power.step}
                          </span>
                        </div>

                        <div>
                          <h3 className='text-base font-bold text-white'>{power.title}</h3>
                          <p className='text-sm text-zinc-500 leading-relaxed mt-1'>{power.desc}</p>
                        </div>

                        <ul className='flex flex-col gap-2 mt-auto'>
                          {power.checks.map((check) => (
                            <li key={check} className='flex items-start gap-2'>
                              <div className='mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white'>
                                <Check className='w-2.5 h-2.5' strokeWidth={3} />
                              </div>
                              <span className='text-xs text-zinc-400 leading-snug'>{check}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </div>
      
    </div>
  );
}
