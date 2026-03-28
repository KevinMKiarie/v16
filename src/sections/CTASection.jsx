import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Shield, Check, ArrowRight, Zap } from "lucide-react";

// --- UTILITIES ---

const cn = (...classes) => classes.filter(Boolean).join(" ");

// --- LOCAL COMPONENTS ---

const ScrollReveal = ({
  children,
  delay = 0,
  direction = "scale",
  className,
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 50 : 0,
      scale: direction === "scale" ? 0.9 : 1,
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

const GlowButton = ({ text, onClick, className }) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group relative inline-flex items-center justify-center lg:px-8 lg:py-4  md:px-6 md:py-3 px-4 py-2 xl:px-12 xl:py-6 text-lg font-bold text-white transition-all duration-200 bg-indigo-600 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 focus:ring-offset-zinc-900",
        "hover:scale-105 active:scale-95",
        className,
      )}
    >
      <div className="absolute inset-0 rounded-full bg-indigo-400 blur-[20px] opacity-40 group-hover:opacity-60 transition-opacity" />
      <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-blue-600" />
      <span className="relative flex items-center gap-3">
        <p className="text-sm">{text}</p>
        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </span>
    </button>
  );
};

// --- MAIN SECTION ---

export default function CTASection() {
  return (
    <section className="py-32 md:py-48 relative overflow-hidden bg-[#09090B] flex items-center justify-center">
      {/* Ambient Background Effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none mix-blend-soft-light" />

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
        <ScrollReveal direction="scale">
          <div className="flex justify-center mb-8">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[11px] font-bold uppercase tracking-[0.2em]">
              <Zap className="w-3.5 h-3.5" />
              Start Free
            </span>
          </div>

          <h2 className="text-5xl  md:text-6xl lg:text-6xl font-black text-white mb-12 tracking-tighter leading-[0.9] drop-shadow-2xl select-none">
            Free plan included.
            <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-white/50 leading-4">
              No card, no expiry.
            </span>
          </h2>

          <div className="flex justify-center text-sm  mb-16 md:mb-24">
            <GlowButton
              text="Start free. Upgrade when it pays for itself."
              onClick={() =>
                window.open("https://app.nexuscale.ai/users/register", "_blank")
              }
              className="text-lg font-semibold shadow-[0_0_50px_-10px_rgba(79,70,229,0.5)]"
            />
          </div>

          <div className="flex justify-center mb-12 -mt-8">
            <a
              href="/contact"
              className="text-sm text-zinc-500 hover:text-zinc-300 underline underline-offset-2 transition-colors"
            >
              Talk to the team
            </a>
          </div>

          <div className="flex flex-col md:flex-row flex-wrap justify-center items-center gap-4 md:gap-12 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            <span className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-default">
              <Check className="w-4 h-4 text-emerald-500" />
              <span className="text-zinc-400">
                Start Free. 100 leads included.
              </span>
            </span>

            <span className="hidden md:inline-block w-1 h-1 rounded-full bg-zinc-800" />

            <span className="flex items-center gap-3 px-4 py-2 rounded-full border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-default">
              <Check className="w-4 h-4 text-blue-500" />
              <span className="text-zinc-400">No card required.</span>
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
