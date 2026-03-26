import { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import {
  X,
  Mail,
  Check,
  Sparkles,
  Bot,
  DollarSign,
  Briefcase,
  MousePointer2,
  Radio,
  ArrowRight,
} from "lucide-react";

const STORAGE_KEY = "nexuscale_promo_v1";

export function MiniBanner() {
  return (
    <motion.div
      initial={{ y: -52, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 py-2 w-full items-center justify-center"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-[#05051a] via-indigo-950/90 to-[#05051a]" />

      <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.06)_50%,transparent_100%)] bg-[length:400%_100%] animate-shimmer pointer-events-none" />

      <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-indigo-600/20 to-transparent pointer-events-none" />

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent" />

      <div className="relative h-full mx-auto max-w-[95%] flex items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-3 min-w-0 overflow-hidden">
          <span className="relative flex h-1.5 w-1.5 shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-indigo-500" />
          </span>
          <p className="text-[10px] md:text-[12px] font-medium text-zinc-300 truncate">
            <span className="font-bold text-white">
              Unlimited Mailboxes · Zero workspace fees
            </span>
            <span className="hidden sm:inline text-zinc-400">
              {" "}
              — Stop paying{" "}
              <span className="font-bold text-white line-through decoration-red-500/60">
                $11 per inbox
              </span>
              . Scale inside Nexuscale instantly.
            </span>
          </p>
        </div>

        <div className="flex items-center shrink-0 ">
          <a
            href="/pricing"
            className="group relative overflow-hidden flex items-center gap-1.5 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-lg transition-all duration-300 shadow-md shadow-indigo-500/20 hover:shadow-indigo-500/40 whitespace-nowrap"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none uppercase" />
            <Mail size={12} />
            Get Mailboxes
            <ArrowRight
              size={11}
              className="transition-transform duration-200 group-hover:translate-x-0.5"
            />
          </a>
        </div>
      </div>
    </motion.div>
  );
}

function MiniDemo() {
  const cycles = useMemo(
    () => [
      {
        signal: {
          label: "Series A · $12M Raised",
          badge: "FUNDING",
          color: "text-emerald-400",
          bg: "bg-emerald-500/20",
          icon: <DollarSign size={11} />,
        },
        company: "TechFlow",
        name: "Sarah",
        output:
          '"Hi Sarah, saw TechFlow just closed your Series A — congrats. Curious if outbound is on the roadmap?"',
        spamScore: "0.3%",
      },
      {
        signal: {
          label: "Hiring: VP of Sales",
          badge: "HIRING",
          color: "text-blue-400",
          bg: "bg-blue-500/20",
          icon: <Briefcase size={11} />,
        },
        company: "Retool",
        name: "Marcus",
        output:
          '"Hey Marcus, noticed Retool just opened a VP Sales role. We help teams your size 3x pipeline from day one."',
        spamScore: "0.2%",
      },
      {
        signal: {
          label: "12 Pricing Page Visits",
          badge: "INTENT",
          color: "text-yellow-400",
          bg: "bg-yellow-500/20",
          icon: <MousePointer2 size={11} />,
        },
        company: "Figma",
        name: "Jordan",
        output:
          '"Hi Jordan, looks like Figma\'s been evaluating outbound tools — we helped a team your size book 40 meetings in week one."',
        spamScore: "0.1%",
      },
    ],
    [],
  );

  const [idx, setIdx] = useState(0);
  const [stage, setStage] = useState("signal");
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    const cycle = cycles[idx];
    setStage("signal");
    setDisplayText("");

    const t1 = setTimeout(() => setStage("processing"), 1600);
    let typeInterval;
    const t2 = setTimeout(() => {
      setStage("output");
      let i = 0;
      typeInterval = setInterval(() => {
        if (i <= cycle.output.length) {
          setDisplayText(cycle.output.slice(0, i));
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 20);
    }, 3100);

    const t3 = setTimeout(
      () => setIdx((prev) => (prev + 1) % cycles.length),
      7800,
    );

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearInterval(typeInterval);
    };
  }, [idx, cycles]);

  const cycle = cycles[idx];

  return (
    <div className="flex flex-col gap-3  w-full">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2 w-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
            Live Engine
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <Radio size={8} className="text-indigo-400 animate-pulse" />
          <span className="text-[8px] font-mono text-zinc-600">
            nexuscale.ai
          </span>
        </div>
      </div>

      <motion.div
        animate={{
          opacity: stage === "signal" ? 1 : 0.4,
          scale: stage === "signal" ? 1.01 : 1,
          boxShadow:
            stage === "signal"
              ? "0 0 20px rgba(59,130,246,0.1)"
              : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 bg-zinc-900/70 border border-white/10 rounded-xl px-4 py-3 w-full"
      >
        <div
          className={`p-2 ${cycle.signal.bg} rounded-lg shrink-0 ${cycle.signal.color}`}
        >
          {cycle.signal.icon}
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">
            {cycle.signal.badge}
          </div>
          <div className="text-[12px] font-semibold text-white truncate">
            {cycle.company} · {cycle.signal.label}
          </div>
        </div>
        <AnimatePresence mode="wait">
          {stage === "signal" && (
            <motion.div
              key="new"
              initial={{ opacity: 0, scale: 0.8, x: 6 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2 }}
              className="text-[8px] font-bold text-indigo-400 border border-indigo-500/40 px-2 py-1 rounded-full shrink-0"
            >
              NEW
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Connector */}
      <div className="flex items-center justify-center h-5 w-full">
        <motion.div
          animate={{ opacity: stage !== "signal" ? 1 : 0.2 }}
          className="w-px h-full bg-gradient-to-b from-indigo-500 to-transparent"
        />
      </div>

      {/* Step 2 — AI Processing */}
      <motion.div
        animate={{
          opacity: stage === "processing" ? 1 : stage === "output" ? 0.4 : 0.2,
          borderColor:
            stage === "processing"
              ? "rgba(99,102,241,0.5)"
              : "rgba(255,255,255,0.08)",
          boxShadow:
            stage === "processing"
              ? "0 0 24px rgba(99,102,241,0.18)"
              : "0 0 0px transparent",
        }}
        transition={{ duration: 0.3 }}
        className="flex items-center gap-3 bg-zinc-900/70 border border-white/10 rounded-xl px-4 py-3 w-full"
      >
        <div className="p-2 bg-indigo-500/20 rounded-lg shrink-0">
          <Bot
            size={11}
            className={
              stage === "processing"
                ? "text-indigo-400 animate-pulse"
                : "text-zinc-600"
            }
          />
        </div>
        <div className="min-w-0 flex-1">
          <div className="text-[9px] font-bold text-zinc-500 uppercase tracking-wider mb-0.5">
            AI Writing
          </div>
          <AnimatePresence mode="wait">
            {stage === "processing" ? (
              <motion.div
                key="writing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[12px] font-medium text-indigo-300"
              >
                Personalizing for {cycle.name}...
              </motion.div>
            ) : (
              <motion.div
                key="idle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-[12px] font-medium text-zinc-500"
              >
                Ready to personalize
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        {stage === "processing" && (
          <div className="flex items-center gap-1 shrink-0">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.1, 0.8] }}
                transition={{
                  duration: 0.7,
                  repeat: Infinity,
                  delay: i * 0.18,
                }}
                className="w-1.5 h-1.5 rounded-full bg-indigo-400"
              />
            ))}
          </div>
        )}
      </motion.div>

      <div className="flex items-center justify-center h-5 w-full">
        <motion.div
          animate={{ opacity: stage === "output" ? 1 : 0.2 }}
          className="w-px h-full bg-gradient-to-b from-indigo-500 to-transparent"
        />
      </div>

      <motion.div
        animate={{ opacity: stage === "output" ? 1 : 0.2 }}
        transition={{ duration: 0.4 }}
        className="bg-[#121214] border border-indigo-500/30 rounded-xl p-4 w-full"
      >
        <div className="flex items-center justify-between mb-2.5">
          <div className="flex items-center gap-2">
            <div className="p-1 bg-indigo-500/20 rounded-md">
              <Mail size={10} className="text-indigo-400" />
            </div>
            <span className="text-[9px] font-bold text-indigo-300 uppercase tracking-widest">
              Outbound Draft
            </span>
          </div>
          <AnimatePresence mode="wait">
            {stage === "output" &&
              displayText.length >= cycle.output.length && (
                <motion.div
                  key="sent"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-1 text-[9px] text-emerald-400 font-bold"
                >
                  <Check size={10} />
                  <span>{cycle.spamScore} spam</span>
                </motion.div>
              )}
          </AnimatePresence>
        </div>
        <p className="text-[11px] text-zinc-300 font-mono leading-relaxed min-h-[3rem]">
          {displayText}
          {stage === "output" && displayText.length < cycle.output.length && (
            <span className="inline-block w-0.5 h-3.5 bg-indigo-400 ml-0.5 animate-pulse align-middle" />
          )}
        </p>
      </motion.div>
    </div>
  );
}

const PromoBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef(null);
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname !== "/") return;
    const seen = sessionStorage.getItem(STORAGE_KEY);
    if (!seen) {
      const t = setTimeout(() => setIsVisible(true), 20000);
      return () => clearTimeout(t);
    }
  }, [pathname]);

  const handleClose = () => {
    sessionStorage.setItem(STORAGE_KEY, "true");
    setIsVisible(false);
  };

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={handleClose}
              className="fixed inset-0 z-[100] bg-black/75 backdrop-blur-sm flex items-center justify-center h-full"
            />

            <div className="fixed inset-0 z-[101] flex items-center justify-center pt-[116px] lg:pt-[124px] px-3 pb-3 pointer-events-none w-full overflow-y-auto">
              <motion.div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                initial={{ opacity: 0, y: 48, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.97 }}
                transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-auto relative w-full max-w-[95%] md:max-w-[520px] lg:max-w-[80%] mx-auto bg-[#09090b] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_40px_140px_rgba(0,0,0,0.95)] flex flex-col lg:flex-row max-h-[calc(100vh-124px)] lg:max-h-[calc(100vh-136px)] overflow-y-auto"
              >
                <div
                  className="pointer-events-none absolute inset-0 z-20 rounded-[2rem] transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(800px circle at ${mousePos.x}px ${mousePos.y}px, rgba(139,92,246,0.1), transparent 40%)`,
                  }}
                />

                <div className="relative flex flex-col justify-between lg:w-1/2 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-[#07071a] to-[#09090b]" />

                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:400%_100%] animate-shimmer pointer-events-none" />

                  <div
                    className="absolute inset-0 opacity-[0.15] pointer-events-none mix-blend-overlay"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                    }}
                  />

                  <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-600/20 blur-[90px] rounded-full pointer-events-none" />
                  <div className="absolute -bottom-20 right-0 w-56 h-56 bg-violet-600/15 blur-[80px] rounded-full pointer-events-none" />

                  <button
                    onClick={handleClose}
                    className="absolute top-5 right-3 md:top-5 md:right-5 z-30 w-4 h-4 md:w-8 md:h-8 rounded-full bg-white/[0.08] hover:bg-white/15 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white transition-all duration-200"
                  >
                    <X size={14} />
                  </button>

                  <div className="relative z-10 p-4 lg:p-6 flex flex-col gap-6 h-full">
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.15, duration: 0.5 }}
                      className="inline-flex items-center gap-2 self-start px-3 py-1.5 rounded-full bg-black/50 border border-indigo-500/30 text-[8px] md:text-[9px] font-black uppercase tracking-[0.18em] text-indigo-300"
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      Startup Offer · Limited Spots
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.25,
                        duration: 0.6,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white tracking-tight leading-[1.1] mb-4">
                        Unlimited Mailboxes.{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
                          Zero Extra Cost.
                        </span>
                      </h2>
                      <p className="text-[10px] md:text-[15px] text-zinc-400 leading-relaxed max-w-sm">
                        Stop paying{" "}
                        <span className="font-bold text-white line-through decoration-red-500/60">
                          $11 per inbox
                        </span>
                        . Launch your entire sending infrastructure directly
                        inside{" "}
                        <span className="font-bold text-white">Nexuscale</span>{" "}
                        and scale instantly.
                      </p>
                    </motion.div>

                    <motion.ul
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.35, duration: 0.5 }}
                      className="flex flex-col gap-2"
                    >
                      {[
                        "Unlimited sending mailboxes included",
                        "Full workspace — zero per-inbox fees",
                        "Launch infrastructure in one click",
                        "Scale outbound instantly with AI",
                      ].map((item) => (
                        <li
                          key={item}
                          className="flex items-center gap-3 text-[10px] md:text-[13px] text-zinc-300"
                        >
                          <span className="flex items-center justify-center w-4 h-4 rounded-full bg-indigo-500/20 border border-indigo-500/30 shrink-0">
                            <Check size={9} className="text-indigo-400" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </motion.ul>

                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.42, duration: 0.5 }}
                      className="flex  md:flex-wrap items-center gap-x-2 gap-y-3 sm:gap-x-6 pt-2 border-t border-white/[0.07] w-full"
                    >
                      <div
                        className="flex flex-row gap-2
                      "
                      >
                        {[
                          ["∞", "Mailboxes"],
                          ["$0", "Per Inbox"],
                          ["1Click", "Setup"],
                        ].map(([val, label]) => (
                          <div
                            key={label}
                            className="flex flex-col items-center justify-evenly "
                          >
                            <span className="text-[8px] md:text-xl font-black text-white leading-tight">
                              {val}
                            </span>
                            <span className="text-[8px] md:text-[9px] text-zinc-500 font-semibold uppercase tracking-wider">
                              {label}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="ml-auto flex items-center gap-2 text-[9px] text-zinc-500 font-semibold">
                        <div className="flex -space-x-1.5">
                          {[
                            "bg-indigo-500",
                            "bg-violet-500",
                            "bg-blue-500",
                          ].map((c, i) => (
                            <div
                              key={i}
                              className={`w-5 h-5 rounded-full ${c} border-2 border-[#07071a]`}
                            />
                          ))}
                        </div>
                        <span>4,000+ teams scaling</span>
                      </div>
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                      className="flex items-center gap-4 mt-auto"
                    >
                      <a
                        href="/pricing"
                        onClick={handleClose}
                        className="group relative overflow-hidden bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-sm px-4 py-2 md:py-3.5 md:px-7 rounded-full flex items-center gap-2.5 transition-all duration-300 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/45 hover:scale-[1.03]"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none" />
                        <Mail size={15} />
                        Unlock Mailboxes
                        <ArrowRight
                          size={14}
                          className="transition-transform duration-300 group-hover:translate-x-1"
                        />
                      </a>
                      <button
                        onClick={handleClose}
                        className="text-zinc-600 hover:text-zinc-400 text-[12px] font-semibold transition-colors"
                      >
                        Maybe later
                      </button>
                    </motion.div>
                  </div>
                </div>

                <div className="relative lg:w-1/2 bg-[#08080a] border-t lg:border-t-0 lg:border-l border-white/[0.07] overflow-hidden hidden lg:flex">
                  <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:28px_28px] pointer-events-none" />

                  <div className="absolute bottom-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none" />

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.35,
                      duration: 0.65,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="relative z-10 h-full p-5 lg:p-8 flex flex-col w-full"
                  >
                    <div className="flex items-center gap-2 mb-6">
                      <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-600">
                        See it in action
                      </span>
                      <div className="h-px  bg-white/[0.05]" />
                    </div>
                    <div className="w-full">
                      <MiniDemo />
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default PromoBanner;
