import { useState } from "react";
import { ChevronDown, Plus } from "lucide-react";
import { ScrollReveal } from "../components/ScrollReveal";
import { faqData } from "../data/pricing";
import { AnimatePresence,motion } from "framer-motion";

export default function FAQSection() {
  const FAQItem = ({ question, answer }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="border border-white/[0.05] bg-[#0A0A0C]/50 rounded-2xl overflow-hidden hover:border-white/[0.1] transition-colors">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-full flex items-center justify-between p-5 text-left focus:outline-none"
        >
          <span className="text-[15px] font-bold text-white">{question}</span>
          <ChevronDown
            className={`w-5 h-5 text-zinc-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <div className="px-5 pb-5 text-sm text-zinc-400 leading-relaxed border-t border-white/[0.05] pt-4">
                {answer}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <section className="py-32 px-6">
      <div className="max-w-3xl mx-auto">
        <div className="space-y-4">
          <ScrollReveal delay={400}>
            <div className="max-w-3xl mx-auto mt-10">
              <div className="text-center mb-8">
                <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
                  Frequently Asked Questions
                </h2>
                <p className="text-base text-zinc-400 mt-3">
                  Everything you need to know about billing and limits.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                {faqData.map((faq, idx) => (
                  <FAQItem
                    key={idx}
                    question={faq.question}
                    answer={faq.answer}
                  />
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
