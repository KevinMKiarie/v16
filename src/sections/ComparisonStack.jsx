import { useState } from "react";
import { ScrollReveal } from "../components/ScrollReveal";
import { SpotlightCard } from "../components/SpotlightCard";
import { neu } from "../utils/styles";
import { comparisonStackData } from "../data/pricing";

function ChevronIcon({ open }) {
  return (
    <svg
      className={`w-4 h-4 text-zinc-500 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

export default function ComparisonStack() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (i) => setOpenIndex((prev) => (prev === i ? null : i));

  return (
    <section
      className={`py-12 px-6 mx-6 rounded-[3rem] border border-white/10 relative overflow-hidden ${neu.inset}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#030304] to-[#030304] opacity-50" />
      <div className="max-w-4xl mx-auto relative z-10">
        <ScrollReveal>
          <div className="text-center mb-8">
            <p className="text-zinc-400 text-base">
              The choice is clear. Command more. Spend less.
            </p>
          </div>
        </ScrollReveal>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <ScrollReveal direction="left" delay={200}>
            <div className="space-y-2">
              {comparisonStackData.map((group, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-white/[0.06]">
                  {/* Category header — always visible, clickable */}
                  <button
                    onClick={() => toggle(i)}
                    className="w-full flex justify-between items-center p-4 bg-white/[0.02] hover:bg-white/[0.05] transition-colors text-left"
                  >
                    <span className="text-zinc-300 font-medium">{group.category}</span>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-zinc-400">${group.totalPrice}/mo</span>
                      <ChevronIcon open={openIndex === i} />
                    </div>
                  </button>

                  <div
                    className={`transition-all duration-300 ease-in-out overflow-hidden ${
                      openIndex === i ? "max-h-60 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {group.items.map((item, j) => (
                      <div
                        key={j}
                        className="flex justify-between items-center px-5 py-3 border-t border-white/[0.04] bg-white/[0.01]"
                      >
                        <div>
                          <span className="text-zinc-300 text-sm">{item.name}</span>
                          {item.description && (
                            <p className="text-zinc-500 text-xs mt-0.5">{item.description}</p>
                          )}
                        </div>
                        <span className="font-mono text-zinc-500 text-sm">${item.price}/mo</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center p-4 rounded-xl bg-red-500/5 border border-red-500/20 mt-4">
                <span className="font-bold text-red-400">Total Monthly Cost</span>
                <span className="font-mono font-bold text-red-400 line-through">$665/mo</span>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right" delay={400}>
            <SpotlightCard
              spotlightColor="rgba(120,127,246,0.2)"
              className="relative p-10 rounded-3xl w-full h-full bg-[#09090B] border border-indigo-500/50 flex flex-col items-center justify-center text-center shadow-[0_0_60px_-10px_rgba(120,127,246,0.4)]"
            >
              <div className="text-white/90 font-bold text-lg mb-2">With Nexuscale</div>
              <div className="text-4xl font-bold text-white mb-4">Everything Included</div>
              <div className="text-white/90 font-medium text-xl">From $99/mo</div>
              <div className="mt-6 text-emerald-400 text-xs font-bold bg-emerald-500/10 inline-block px-3 py-1.5 rounded-lg border border-emerald-500/20 shadow-[0_0_15px_-4px_rgba(16,185,129,0.5)]">
                Save $2,856 / year
              </div>
            </SpotlightCard>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
