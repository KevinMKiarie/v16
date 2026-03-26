import { useState, useEffect } from "react";
import { Mail, Check, ArrowRight } from "lucide-react";

export default function HeroInput() {
  const [placeholder, setPlaceholder] = useState("Enter your email address");
  const personas = [
    "founder@startup.com",
    "sales@agency.com",
    "growth@tech.io",
    "name@company.com",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % personas.length;
      setPlaceholder(personas[index]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="max-w-2xl mx-auto mb-16 relative group z-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
      <form
        onSubmit={(e) => e.preventDefault()}
        className="relative flex items-center bg-[#09090B] rounded-xl p-1.5 border border-white/10 shadow-2xl focus-within:ring-1 focus-within:ring-indigo-500/50 transition-all"
      >
        <div className="pl-4 pr-3 text-zinc-500">
          <Mail className="w-5 h-5" />
        </div>
        <input
          type="email"
          placeholder={placeholder}
          className="flex-1 bg-transparent border-none text-white placeholder-zinc-500 focus:ring-0 text-base font-medium h-12 outline-none w-full transition-all"
        />
        <button
          onClick={() =>
            window.open("https://app.nexuscale.ai/users/register", "_blank")
          }
          className="hidden md:flex md:block bg-white text-black hover:bg-zinc-200 px-4 py-2  flex-row items-center justify-center space-x-3 md:px-6 md:py-3 rounded-lg font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <span> Replace your entire stack, Start Now</span>{" "}
          <ArrowRight class="w-4 h-4" />
        </button>
        <button
          onClick={() =>
            window.open("https://app.nexuscale.ai/users/register", "_blank")
          }
          className=" md:hidden bg-white text-black hover:bg-zinc-200 px-4 py-2 flex flex-row items-center justify-center space-x-3 md:px-6 md:py-3 rounded-lg font-bold text-sm transition-all hover:scale-[1.02] active:scale-95 whitespace-nowrap shadow-[0_0_20px_rgba(255,255,255,0.2)]"
        >
          <span> Start free</span>{" "}
        </button>
      </form>
      <div className="flex items-center justify-center gap-6 mt-6 text-[11px] font-bold uppercase tracking-widest text-zinc-500">
        <span className="flex items-center gap-2">
          <Check className="w-3 h-3 text-white" /> No Credit Card
        </span>
        <span className="flex items-center gap-2">
          <Check className="w-3 h-3 text-white" /> Start Now
        </span>
      </div>
    </div>
  );
}
