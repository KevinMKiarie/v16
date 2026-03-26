import { ArrowRight } from 'lucide-react';

export default function StickyActionBar({ visible }) {
  return (
    <div className={`fixed bottom-8 left-0 right-0 z-50 flex justify-center transition-all duration-700 cubic-bezier(0.2, 0.8, 0.2, 1) ${visible ? 'translate-y-0 opacity-100' : 'translate-y-24 opacity-0 pointer-events-none'}`}>
      <div className="bg-[#050505]/80 backdrop-blur-2xl border border-white/10 rounded-full p-2 pl-6 shadow-[0_0_40px_rgba(0,0,0,0.6)] flex items-center gap-6 ring-1 ring-white/5">
          <div className="flex items-center gap-3">
               <div className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </div>
              <span className="text-sm font-medium text-zinc-300 hidden sm:block">
                  Start with <span className="text-white font-bold">100 free leads</span> on us.
              </span>
          </div>
          <button 
            onClick={() => window.open('https://app.nexuscale.ai/users/register', '_blank')}
            className="bg-white text-black hover:bg-zinc-200 px-6 py-2.5 rounded-full font-bold text-sm transition-all hover:scale-105 active:scale-95 flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
          >
              Create Free Account <ArrowRight className="w-3.5 h-3.5" />
          </button>
      </div>
    </div>
  );
}
