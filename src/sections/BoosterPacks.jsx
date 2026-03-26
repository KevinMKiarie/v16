import { motion } from "framer-motion"; 
import { ScrollReveal } from "../components/ScrollReveal";
import { Button } from "../components/Button";
import { boosterPacksData } from "../data/pricing";

const targetStyles = {
  Startup: {
    badge: "bg-blue-500/15 text-blue-300 border-blue-500/30",
    price: "from-cyan-300 to-blue-400",
    accent: "from-blue-500 to-cyan-400",
    film: "from-blue-600/30 via-cyan-700/15 to-transparent",
    orb: "bg-blue-500/20",
    border: "border-white/[0.06] hover:border-blue-500/50",
    glow: "hover:shadow-[0_8px_40px_rgba(59,130,246,0.18)]",
  },
  "Scale up": {
    badge: "bg-violet-500/15 text-violet-300 border-violet-500/30",
    price: "from-violet-300 to-purple-400",
    accent: "from-violet-500 to-purple-400",
    film: "from-violet-600/30 via-purple-700/15 to-transparent",
    orb: "bg-violet-500/20",
    border: "border-white/[0.06] hover:border-violet-500/50",
    glow: "hover:shadow-[0_8px_40px_rgba(139,92,246,0.18)]",
  },
  "Org +": {
    badge: "bg-amber-500/15 text-amber-300 border-amber-500/30",
    price: "from-amber-300 to-orange-400",
    accent: "from-amber-500 to-orange-400",
    film: "from-amber-600/30 via-orange-700/15 to-transparent",
    orb: "bg-amber-500/20",
    border: "border-white/[0.06] hover:border-amber-500/50",
    glow: "hover:shadow-[0_8px_40px_rgba(245,158,11,0.18)]",
  },
};

const packBanners = [
  {
    label: "Quick Win",
    sub: "Great place to start",
    wrap: "bg-blue-500/10 border border-blue-500/20",
    text: "text-blue-300",
    sub2: "text-blue-400/60",
    type: "friendly",
  },
  {
    label: "Build Momentum",
    sub: "Double your outreach",
    wrap: "bg-violet-500/10 border border-violet-500/20",
    text: "text-violet-300",
    sub2: "text-violet-400/60",
    type: "friendly",
  },
  {
    label: "Go Harder",
    sub: "5× the leads flow",
    wrap: "bg-purple-500/10 border border-purple-500/20",
    text: "text-purple-300",
    sub2: "text-purple-400/60",
    type: "friendly",
  },
  {
    label: "Best Value",
    sub: "Most bang for your buck",
    wrap: "bg-gradient-to-r from-amber-500/20 via-yellow-500/10 to-amber-500/20 border border-amber-400/40",
    text: "text-amber-200",
    sub2: "text-amber-400/70",
    type: "bestvalue",
  },
  {
    label: "Unleash It All",
    sub: "Dominate at full scale",
    wrap: "bg-gradient-to-r from-indigo-600/25 via-violet-600/15 to-purple-600/25 border border-indigo-400/30",
    text: "text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 to-violet-300",
    sub2: "text-indigo-400/60",
    type: "premium",
  },
  {
    label: "Enterprise",
    sub: "Tailored to your needs",
    wrap: "bg-gradient-to-r from-zinc-700/30 via-zinc-600/15 to-zinc-700/30 border border-zinc-500/30",
    text: "text-transparent bg-clip-text bg-gradient-to-r from-zinc-200 to-zinc-400",
    sub2: "text-zinc-500/70",
    type: "friendly",
  },
];

function CardBanner({ meta, targetBadge }) {
  const base = `w-full flex items-center justify-between px-3 py-2 rounded-xl relative overflow-hidden`;

  if (meta.type === "bestvalue") {
    return (
      <>
        <div className="flex items-center justify-center">{targetBadge}</div>

        <div
          className={`${base} ${meta.wrap} shadow-[0_0_16px_rgba(245,158,11,0.15)]`}
        >
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-amber-300/10 to-transparent pointer-events-none" />
          <div className="relative flex flex-col items-center justify-center w-full">
            <div className="flex items-center w-full justify-center gap-1.5">
              <span className="text-amber-400 text-[10px] animate-pulse leading-none">
                ★
              </span>
              <span
                className={`text-[8px] font-black uppercase tracking-widest ${meta.text}`}
              >
                {meta.label}
              </span>
              <span className="text-amber-400 text-[10px] animate-pulse leading-none">
                ★
              </span>
            </div>
            <span className={`text-[9px] font-semibold w-full items-center justify-center ${meta.sub2}`}>
              {meta.sub}
            </span>
          </div>
        </div>
      </>
    );
  }

  if (meta.type === "premium") {
    return (
      <>
        <div className="flex items-center justify-center w-full">{targetBadge}</div>
        <div className={`${base} ${meta.wrap}`}>
          <div className="flex flex-col">
            <span
              className={`text-[8px] font-black uppercase tracking-widest ${meta.text}`}
            >
              {meta.label}
            </span>
            <span className={`text-[9px] font-semibold ${meta.sub2}`}>
              {meta.sub}
            </span>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center justify-center w-full">{targetBadge}</div>
      <div className={`${base} ${meta.wrap}`}>
        <div className="flex flex-col">
          <span
            className={`text-[8px] font-black uppercase tracking-wider ${meta.text}`}
          >
            {meta.label}
          </span>
          <span className={`text-[9px] font-semibold ${meta.sub2}`}>
            {meta.sub}
          </span>
        </div>
      </div>
    </>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BoosterPacks() {
  return (
    <section className="py-24 px-6 bg-[#030304]  overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/10 rounded-full px-4 py-1.5 mb-5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
              <span className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                Add-ons
              </span>
            </motion.div>

            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 tracking-tight"
            >
              Need More{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-violet-400 to-cyan-400">
                Firepower?
              </span>
            </motion.h3>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-zinc-400 text-base"
            >
              Add a{" "}
              <span className="text-white font-semibold">"Booster Pack"</span>{" "}
              to your plan.
            </motion.p>
          </div>
        </ScrollReveal>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {boosterPacksData.map((pack, i) => {
            const s = targetStyles[pack.target] || targetStyles["Startup"];
            const meta = packBanners[i];

            const targetBadge = (
              <span
                className={`text-[9px] border ${s.badge} px-2 py-0.5 rounded-md font-black uppercase tracking-wider shrink-0`}
              >
                {pack.target}
              </span>
            );

            return (
              <motion.div
                key={i}
                variants={cardVariants}
                whileHover={{ y: -10, scale: 1.04 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
                className={`relative group rounded-2xl border bg-[#0A0A0C] overflow-hidden cursor-pointer
                                    transition-all duration-300 ${s.border} ${s.glow}`}
              >
                <div
                  className={`absolute -top-8 -right-8 w-24 h-24 rounded-full blur-2xl ${s.orb} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                />

                <div
                  className={`absolute inset-0 bg-gradient-to-br ${s.film} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                />

                <div
                  className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${s.accent} origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500`}
                />

                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full bg-gradient-to-r from-transparent via-white/[0.05] to-transparent transition-transform duration-[900ms] ease-in-out" />
                </div>

                <div className="relative z-10 p-5 flex flex-col gap-4">
                  <CardBanner meta={meta} targetBadge={targetBadge} />

                  <div>
                    <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1 font-bold">
                      Monthly Leads + Emails
                    </p>
                    <span className="text-[2rem] font-black text-white tracking-tight leading-none tabular-nums">
                      {pack.leads}
                    </span>
                  </div>

                  <div className="h-px bg-white/[0.05] group-hover:bg-white/[0.12] transition-colors duration-300" />

                  <div>
                    <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1 font-bold">
                      Price
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span
                        className={`text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r ${s.price} leading-none`}
                      >
                        {pack.price === "Contact Us" ? pack.price : `$${pack.price}`}
                      </span>
                      {pack.price !== "Contact Us" && (
                        <span className="text-zinc-500 text-xs font-semibold">
                          / mo
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.05] group-hover:bg-white/[0.12] transition-colors duration-300" />

                  <div>
                    <p className="text-[9px] text-zinc-600 uppercase tracking-widest mb-1 font-bold">
                      Extra Mailbox
                    </p>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xl font-black text-white leading-none">
                        +{pack.mailboxes}
                      </span>
                      <span className="text-zinc-500 text-xs">
                        mailbox{pack.mailboxes > 1 ? "es" : ""}
                      </span>
                    </div>
                  </div>

                  <div className="h-px bg-white/[0.05] group-hover:bg-white/[0.12] transition-colors duration-300" />

                  <Button
                    text="Add to Plan"
                    variant="secondary"
                    className="w-full text-xs py-2.5"
                    onClick={() => window.open(pack.href, "_blank")}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <ScrollReveal delay={300}>
          <p className="text-center text-xs text-zinc-600 mt-10">
            Booster packs are add-ons — stack multiples on any plan, anytime.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
