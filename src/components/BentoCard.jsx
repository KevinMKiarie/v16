import { neu } from '../utils/styles';

export const BentoCard = ({ title, desc, icon: Icon, className = "", step }) => (
    <div className={`group relative rounded-3xl ${neu.surface} p-1 hover:border-indigo-500/30 transition-all duration-500 hover:shadow-[0_0_40px_-10px_rgba(99,102,241,0.15)] ${className}`}>
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
        <div className="p-10 relative z-10 h-full flex flex-col bg-[#0C0C0E] rounded-[22px]">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-white/5 to-white/[0.02] border border-white/10 flex items-center justify-center mb-8 text-zinc-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-all duration-500 group-hover:scale-110 shadow-lg`}>
                <Icon className="w-7 h-7" />
            </div>
            <div className="flex items-baseline gap-3 mb-4">
                {step && (<div className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest border border-indigo-500/20 px-2 py-1 rounded bg-indigo-500/5 shadow-[0_0_10px_rgba(99,102,241,0.2)]">{step}</div>)}
                <h3 className="text-xl font-bold text-gray-100 leading-tight tracking-tight">{title}</h3>
            </div>
            <p className="text-[15px] text-zinc-400 leading-relaxed max-w-[90%] font-medium">{desc}</p>
        </div>
    </div>
);

