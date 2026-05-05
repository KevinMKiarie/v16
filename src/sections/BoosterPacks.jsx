import { motion } from "framer-motion";
import { ScrollReveal } from "../components/ScrollReveal";

const mailboxPacks = [
  { size: "Single", price: "$5", meta: "$5 / mo" },
  { size: "10 Pack", price: "$4.50", meta: "$45 / mo" },
  { size: "25 Pack", price: "$4.00", meta: "$100 / mo" },
  { size: "50 Pack", price: "$3.50", meta: "$175 / mo" },
  { size: "100 Pack", price: "$3.00", meta: "$300 / mo", best: true },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function BoosterPacks() {
  return (
    <section className="p-2 md:p-8">
      <div className="md:max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-zinc-950/70 p-6 backdrop-blur-xl md:p-10">
            {/* Subtle vertical grid lines */}
            <div
              className="absolute inset-0 pointer-events-none opacity-40"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px)",
                backgroundSize: "96px 100%",
              }}
            />

            {/* Header row */}
            <div className="relative z-10 flex flex-wrap items-center justify-between gap-3 mb-8">
              <h2 className="flex flex-wrap items-center gap-3 text-2xl font-bold tracking-tight text-zinc-50">
                Mailbox packs
                <span className="rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-indigo-300">
                  Stacks on any plan
                </span>
              </h2>
              <span className="font-mono text-[11px] font-medium uppercase tracking-[0.12em] text-zinc-500">
                $ per mailbox / month
              </span>
            </div>

            {/* Pack cards */}
            <motion.div
              className="relative z-10 grid gap-2 sm:grid-cols-2 lg:grid-cols-5"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {mailboxPacks.map((pack) => (
                <motion.div
                  key={pack.size}
                  variants={cardVariants}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 320, damping: 25 }}
                  className={`rounded-2xl border p-5 text-center cursor-default transition-all duration-300 ${
                    pack.best
                      ? "border-indigo-500/50 bg-gradient-to-br from-indigo-500/15 to-violet-500/10 shadow-[0_0_30px_rgba(99,102,241,0.15)] hover:border-indigo-400/60 hover:shadow-[0_8px_40px_rgba(99,102,241,0.25)]"
                      : "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.14] hover:bg-white/[0.05]"
                  }`}
                >
                  <div
                    className={`mb-3 font-mono text-[10px] font-bold uppercase tracking-[0.14em] ${
                      pack.best ? "text-indigo-300" : "text-zinc-500"
                    }`}
                  >
                    {pack.size}
                  </div>
                  <div
                    className={`mb-1 text-3xl font-bold tracking-tight leading-none ${
                      pack.best
                        ? "bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent"
                        : "text-zinc-50"
                    }`}
                  >
                    {pack.price}
                  </div>
                  <div className="font-mono text-[11px] font-medium tracking-wide text-zinc-500">
                    {pack.meta}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
