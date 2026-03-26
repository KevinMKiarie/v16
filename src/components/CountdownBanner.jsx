import { useState, useEffect } from 'react';
import { AlertTriangle, ChevronRight } from 'lucide-react';

export default function CountdownBanner() {
  const [timeLeft, setTimeLeft] = useState({
    days: '00',
    hours: '00',
    minutes: '00',
    seconds: '00'
  });

  useEffect(() => {
    // LinkedIn outreach launch - fixed date (23 days from when set)
    const targetDate = new Date('2026-01-31T23:59:59.999');

    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = targetDate.getTime() - now;

      if (distance > 0) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft({
          days: days.toString().padStart(2, '0'),
          hours: hours.toString().padStart(2, '0'),
          minutes: minutes.toString().padStart(2, '0'),
          seconds: seconds.toString().padStart(2, '0')
        });
      } else {
        setTimeLeft({
          days: '00',
          hours: '00',
          minutes: '00',
          seconds: '00'
        });
      }
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // LinkedIn is now live - banner no longer needed
  return null;

  return (
    <div className="fixed top-0 left-0 right-0 bg-[#020203] border-b border-white/[0.06] text-center py-2 sm:py-3 z-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 flex items-center justify-center gap-1.5 sm:gap-4 text-[10px] sm:text-xs font-medium relative z-10 overflow-x-auto">
        {/* Mobile: Simplified single line */}
        <div className="flex items-center gap-1.5 sm:gap-3 flex-shrink-0">
          {/* COMING SOON badge - hidden on very small screens */}
          <div className="hidden xs:flex items-center gap-1 text-amber-400 bg-amber-400/20 border-2 border-amber-400 px-2 sm:px-3 py-0.5 sm:py-1 rounded-full uppercase tracking-wider font-bold">
            <AlertTriangle className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-amber-400 fill-amber-400" />
            <span className="text-[9px] sm:text-[10px]">COMING SOON</span>
          </div>
          
          {/* Offer text */}
          <span className="text-zinc-300 text-[10px] sm:text-xs whitespace-nowrap">
            LinkedIn Outreach Launch in
          </span>

          {/* Countdown timer */}
          <div className="flex items-center gap-0.5 sm:gap-1 font-mono text-zinc-300 tracking-wider bg-gray-800 px-2 sm:px-3 py-0.5 sm:py-1.5 rounded border border-gray-700 flex-shrink-0">
            <span className="text-white font-bold text-[10px] sm:text-xs">{timeLeft.days}</span>
            <span className="text-zinc-600 text-[8px] sm:text-[10px]">:</span>
            <span className="text-white font-bold text-[10px] sm:text-xs">{timeLeft.hours}</span>
            <span className="text-zinc-600 text-[8px] sm:text-[10px]">:</span>
            <span className="text-white font-bold text-[10px] sm:text-xs">{timeLeft.minutes}</span>
            <span className="text-zinc-600 text-[8px] sm:text-[10px]">:</span>
            <span className="text-white font-bold text-[10px] sm:text-xs">{timeLeft.seconds}</span>
          </div>

          {/* Secure button */}
          <button 
            onClick={() => window.open('https://buy.stripe.com/dRmbJ14Xh9J2gwkc4Vb7y0c', '_blank')}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 transition-colors group uppercase tracking-wider font-bold border-2 border-amber-400 bg-amber-400/20 px-2 sm:px-4 py-0.5 sm:py-1.5 rounded-full hover:bg-amber-400/30 text-[9px] sm:text-[10px] flex-shrink-0 whitespace-nowrap"
          >
            <span className="hidden sm:inline">SECURE SPOT</span>
            <span className="sm:hidden">SECURE</span>
            <ChevronRight className="w-2.5 h-2.5 sm:w-3 sm:h-3 group-hover:translate-x-0.5 transition-transform text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
}
