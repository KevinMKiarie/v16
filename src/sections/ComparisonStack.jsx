import { ScrollReveal } from "../components/ScrollReveal";
import { SpotlightCard } from "../components/SpotlightCard";
import { neu } from "../utils/styles";
import { comparisonStackData } from "../data/pricing";

export default function ComparisonStack() {
  return (
    <section
      className={`py-32 px-6 mx-6 mb-24 rounded-[3rem] border border-white/10 relative overflow-hidden ${neu.inset}`}
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
            <div className="space-y-4">
              {comparisonStackData.map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between items-center p-4 rounded-xl bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.04] transition-colors"
                >
                  <span className="text-zinc-300 font-medium">{item.name}</span>
                  <span className="font-mono text-zinc-400">
                    ${item.price}/mo
                  </span>
                </div>
              ))}
              <div className="flex justify-between items-center p-4 rounded-xl bg-red-500/5 border border-red-500/20 mt-4">
                <span className="font-bold text-red-400">
                  Total Monthly Cost
                </span>
                <span className="font-mono font-bold text-red-400 line-through">
                  $665/mo
                </span>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal direction="right" delay={400}>
            <SpotlightCard
              spotlightColor="rgba(120,127,246,0.2)"
              className="relative p-10 rounded-3xl w-full h-full bg-[#09090B] border border-indigo-500/50 flex flex-col items-center justify-center text-center shadow-[0_0_60px_-10px_rgba(120,127,246,0.4)]"
            >
              <div className="text-white/90 font-bold text-lg mb-2">
                With Nexuscale
              </div>
              <div className="text-4xl font-bold text-white mb-4">
                Everything Included
              </div>
              {/* recent change */}
              <div className="text-white/90 font-medium text-xl">
                From $99/mo
              </div>
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
