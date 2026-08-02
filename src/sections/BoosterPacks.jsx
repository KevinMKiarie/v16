import { motion, useMotionValue, useTransform } from "framer-motion";
import { ScrollReveal } from "../components/ScrollReveal";

const mailboxPacks = [
  {
    size: "Starter",
    quantity: "Single",
    price: "$5",
    meta: "$5 / mo",
    link: "https://buy.stripe.com/dRmdR99dx3kEfsg4Ctb7y0R",
  },
  {
    size: "Expansion",
    quantity: "10 Pack",
    price: "$4.50",
    meta: "$45 / mo",
    link: "https://buy.stripe.com/eVq4gz4XhcVebc0b0Rb7y0T",
  },
  {
    size: "Growth",
    quantity: "25 Pack",
    price: "$4.00",
    meta: "$100 / mo",
    link: "https://buy.stripe.com/fZu00jexRg7qbc0ed3b7y0U",
  },
  {
    size: "Scale",
    quantity: "50 Pack",
    price: "$3.50",
    meta: "$175 / mo",
    link: "https://buy.stripe.com/00w9AT3Td4oI7ZOd8Zb7y0V",
  },
  {
    size: "Enterprise",
    quantity: "100 Pack",
    price: "$3.00",
    meta: "$300 / mo",
    best: true,
    link: "https://buy.stripe.com/7sYaEX0H1dZi93S6KBb7y0W",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 200, damping: 25 },
  },
};

function PricingCard({ pack }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  // Purplish-blue spotlight (Low saturation)
  const spotlight = useTransform(
    [mouseX, mouseY],
    ([x, y]) =>
      `radial-gradient(400px circle at ${x}px ${y}px, rgba(99, 102, 241, 0.08), rgba(168, 85, 247, 0.03), transparent 70%)`,
  );

  return (
    <motion.a
      href={pack.link}
      target="_blank"
      rel="noopener noreferrer"
      variants={cardVariants}
      onMouseMove={handleMouseMove}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col justify-between rounded-3xl border p-7 transition-all duration-500 ease-out text-start ${
        pack.best
          ? "border-indigo-500/20 bg-zinc-900/40 shadow-[0_0_40px_rgba(79,70,229,0.05)]"
          : "border-white/[0.06] bg-zinc-950/60 hover:border-indigo-500/30"
      }`}
    >
      {/* Seamless Purplish-Blue Spotlight */}
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ background: spotlight }}
      />

      <div className="relative z-10">
        <div className="flex justify-between items-center mb-6">
          <span
            className={`text-[10px] font-bold uppercase tracking-[0.2em] ${pack.best ? "text-indigo-400" : "text-zinc-500 group-hover:text-zinc-400"}`}
          >
            {pack.size}
          </span>
          {pack.best && (
            <span className="bg-indigo-500/10 text-indigo-400 text-[9px] font-bold px-2 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-tighter">
              Most Popular
            </span>
          )}
        </div>

        <h3 className="text-xl font-medium text-zinc-200 mb-2">
          {pack.quantity}
        </h3>

        <div className="flex items-baseline gap-1">
          <span className="text-4xl font-bold tracking-tighter text-white">
            {pack.price}
          </span>
          <span className="text-zinc-500 text-xs">/mailbox</span>
        </div>
      </div>

      <div className="relative z-10 mt-10 pt-6 border-t border-white/[0.04]">
        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[11px] font-medium text-zinc-500">
              Total Billed
            </span>
            <span className="text-sm font-semibold text-zinc-300">
              {pack.meta.split(" /")[0]}
            </span>
          </div>

          {/* Rounded Arrow Link */}
          <div className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-white group-hover:border-white group-hover:text-black">
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7 17L17 7M17 7H7M17 7V17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.a>
  );
}

export default function BoosterPacks() {
  return (
    <section className="bg-black py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <ScrollReveal>
          <div className="text-start mb-16">
            <h2 className="text-4xl font-bold tracking-tighter text-white mb-4">
              Expand your reach.
            </h2>
            <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
              Add more mailboxes to your workspace in seconds. All packs are
              billed monthly and stack on top of your existing subscription.
            </p>
          </div>

          <motion.div
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {mailboxPacks.map((pack) => (
              <PricingCard key={pack.quantity} pack={pack} />
            ))}
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
