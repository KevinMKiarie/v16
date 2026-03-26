import { Star } from 'lucide-react';
import { neu } from '../utils/styles';

export const ReviewCard = ({ r }) => (
    <div className={`w-full p-8 rounded-3xl mb-6 break-inside-avoid transition-all duration-300 ${neu.glass} hover:-translate-y-1 hover:border-white/20 group`}>
        <div className="flex justify-between items-start mb-6">
            <div className="flex gap-0.5 text-indigo-400">{[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}</div>
            {r.source === 'g2' && (
                <div className="opacity-60 group-hover:opacity-100 transition-opacity" title="Verified G2 Review">
                    <div className="flex items-center justify-center w-7 h-7 rounded bg-white/5 text-white font-bold text-[9px] border border-white/10 shadow-inner font-sans tracking-tighter">
                        G2
                    </div>
                </div>
            )}
        </div>
        <p className="text-zinc-300 text-[15px] leading-relaxed mb-6 font-normal tracking-wide group-hover:text-zinc-100 transition-colors">"{r.quote}"</p>
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 flex items-center justify-center font-bold text-zinc-400 text-xs shrink-0 border border-white/10 shadow-inner">{r.name[0]}</div>
            <div><div className="text-white text-xs font-bold">{r.name}</div><div className="text-zinc-500 text-[10px] font-bold uppercase tracking-wide mt-0.5">{r.role}</div></div>
        </div>
    </div>
);

