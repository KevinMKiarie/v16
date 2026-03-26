import { useCountUp } from '../hooks/useCountUp';
import { neu } from '../utils/styles';

export default function StatsSection() {
  const [count1, ref1] = useCountUp(42, 2000);
  const [count2, ref2] = useCountUp(2856, 2500);
  const [count3, ref3] = useCountUp(3, 1000);

  return (
    <div className={`py-32 bg-[#050505] border-y border-white/[0.03] shadow-inner`}>
        <div className="max-w-5xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-16 text-center relative z-10">
            <div ref={ref1}>
                <div className={`text-7xl font-bold ${neu.textVibrant} tracking-tighter mb-4 drop-shadow-2xl`}>{count1}</div>
                <div className="text-zinc-500 font-bold uppercase text-xs tracking-[0.2em] mb-2">Meetings Booked</div>
                <div className="text-xs text-zinc-600 font-bold">(per team/mo)</div>
            </div>
            <div ref={ref2}>
                <div className={`text-7xl font-bold ${neu.textVibrant} tracking-tighter mb-4 drop-shadow-2xl`}>${count2}</div>
                <div className="text-zinc-500 font-bold uppercase text-xs tracking-[0.2em] mb-2">Saved per Year</div>
                <div className="text-xs text-zinc-600 font-bold">vs Old Stack</div>
            </div>
            <div ref={ref3}>
                <div className={`text-7xl font-bold ${neu.textVibrant} tracking-tighter mb-4 drop-shadow-2xl`}>{count3}</div>
                <div className="text-zinc-500 font-bold uppercase text-xs tracking-[0.2em] mb-2">Minute Setup</div>
                <div className="text-xs text-zinc-600 font-bold">Connect & Go</div>
            </div>
        </div>
    </div>
  );
}

