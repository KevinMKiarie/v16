import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Clock, Users, Zap } from "lucide-react";
import { GridPattern } from "@/components/ui/grid-pattern";
import { cn } from "@/lib/utils";

const features = [
  { icon: Clock, label: "Start Today" },
  { icon: Users, label: "100 Leads" },
  { icon: Zap, label: "No Card required" },
];

export default function CTASection() {
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const buttonRef = useRef(null);
  const chipsRef = useRef(null);

  const badgeInView = useInView(badgeRef, { once: true, margin: "-80px" });
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const buttonInView = useInView(buttonRef, { once: true, margin: "-80px" });
  const chipsInView = useInView(chipsRef, { once: true, margin: "-80px" });

  return (
    <section className="relative overflow-hidden py-28 md:py-40 flex items-center justify-center">
      <GridPattern
        width={28}
        height={28}
        x={-1}
        y={-1}
        className={cn(
          "absolute inset-0 h-full w-full",
          "fill-transparent stroke-white/[0.1]",
          "[mask-image:radial-gradient(ellipse_85%_70%_at_50%_50%,white_40%,transparent_100%)]",
        )}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(20,5,60,0.55) 100%)",
        }}
      />

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6 flex flex-col items-center text-center gap-8">
        <motion.div
          ref={badgeRef}
          initial={{ opacity: 0, y: -12 }}
          animate={badgeInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-3 w-full max-w-xs mx-auto"
        >
          <div className="flex-1 h-px bg-white/25" />
          <span
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-medium text-white/90 border border-white/25 whitespace-nowrap"
            style={{
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(6px)",
            }}
          >
            <span className="text-white/60">⠿</span>
            Scale Your Outreach
          </span>
          <div className="flex-1 h-px bg-white/25" />
        </motion.div>

        <motion.h2
          ref={headingRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] tracking-tight max-w-3xl"
        >
          Start Today. Scale when you're ready
        </motion.h2>

        <motion.div
          ref={buttonRef}
          initial={{ opacity: 0, y: 16 }}
          animate={buttonInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <button
            onClick={() =>
              window.open("https://app.nexuscale.ai/users/register", "_blank")
            }
            className="group relative overflow-hidden flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-sm font-bold px-4 py-2 md:px-6 md:py-3 justify-center rounded-lg transition-all duration-300 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 whitespace-nowrap"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </motion.div>

        <motion.div
          ref={chipsRef}
          initial={{ opacity: 0, y: 16 }}
          animate={chipsInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2"
        >
          {features.map(({ icon: Icon, label }) => (
            <span
              key={label}
              className="flex items-center gap-2.5 text-sm font-medium text-white/85"
            >
              <span
                className="w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                <Icon className="w-4 h-4 text-white/80" />
              </span>
              {label}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
