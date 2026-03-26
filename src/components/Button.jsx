import { ArrowRight } from 'lucide-react';
import { neu } from '../utils/styles';

export const Button = ({ text, variant = 'primary', className = "", icon = true, onClick }) => {
  const base = "group relative inline-flex items-center justify-center px-8 py-3.5 text-sm font-bold tracking-wide rounded-xl overflow-hidden focus:outline-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto transition-all duration-300";
  const styles = {
    primary: "bg-white text-black hover:bg-zinc-200 border border-transparent active:scale-95",
    brand: neu.btnBrand,
    secondary: `text-zinc-300 bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/20 active:scale-95 backdrop-blur-md shadow-[0_4px_12px_rgba(0,0,0,0.2)]`,
    reactor: "bg-white text-black hover:bg-zinc-100 border border-white/20 active:scale-95 shadow-[0_0_25px_rgba(255,255,255,0.4)]"
  };
  
  return (
    <button onClick={onClick} className={`${base} ${styles[variant]} ${className}`}>
      {variant === 'reactor' && <div className="absolute inset-0 -translate-x-[150%] group-hover:animate-[shimmer_1.2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent z-20 pointer-events-none" />}
      <span className="relative z-10 flex items-center justify-center gap-2">{text}{icon && <ArrowRight className="w-4 h-4 opacity-60 transition-transform duration-300 group-hover:translate-x-1 group-hover:opacity-100" />}</span>
    </button>
  );
};

