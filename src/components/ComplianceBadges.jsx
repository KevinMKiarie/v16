export default function ComplianceBadges() {
    return (
        <div className="flex gap-4 mb-8 opacity-60 hover:opacity-100 transition-opacity duration-500">
            {[{l:"SOC2",s:"TYPE II"},{l:"GDPR",s:"READY"}].map((b,i) => (
                <div key={i} className={`flex flex-col items-center justify-center w-14 h-14 rounded-2xl border border-white/10 bg-white/[0.02] p-2 hover:bg-white/[0.05] transition-colors cursor-help group hover:shadow-[0_0_15px_rgba(99,102,241,0.2)] hover:border-indigo-500/30`}>
                    <div className="text-[10px] font-bold text-zinc-300 group-hover:text-white transition-colors tracking-widest">{b.l}</div>
                    <div className="text-[8px] text-zinc-600 group-hover:text-zinc-400 font-bold tracking-wider">{b.s}</div>
                </div>
            ))}
        </div>
    );
}

