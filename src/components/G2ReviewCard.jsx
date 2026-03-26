import React, { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

const BRANDFETCH_LOGO_URLS = [
  'https://cdn.brandfetch.io/g2.com/icon?type=png',
  'https://cdn.brandfetch.io/g2.com/logo?type=png',
  'https://cdn.brandfetch.io/g2.com/icon',
  'https://cdn.brandfetch.io/g2.com/logo',
];

export const G2ReviewCard = ({ className = '' }) => {
  const [logoUrl, setLogoUrl] = useState(null);

  useEffect(() => {
    let index = 0;
    const tryNext = () => {
      if (index >= BRANDFETCH_LOGO_URLS.length) return;
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.onload = () => setLogoUrl(BRANDFETCH_LOGO_URLS[index]);
      img.onerror = () => {
        index += 1;
        tryNext();
      };
      img.src = BRANDFETCH_LOGO_URLS[index];
    };
    tryNext();
  }, []);

  return (
    <div className={`group inline-flex items-center gap-3.5 p-2 pr-5 rounded-2xl bg-[#020202] backdrop-blur-xl border border-transparent hover:border-transparent hover:bg-[#020202] transition-all duration-500 cursor-pointer shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${className}`}>
      <div className="w-11 h-11 rounded-lg bg-white flex items-center justify-center shrink-0 p-1">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt="G2"
            className="h-full w-full object-contain"
            onError={() => setLogoUrl(null)}
          />
        ) : (
          <span className="font-bold text-black text-base tracking-tighter">G2</span>
        )}
      </div>

      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-bold text-white tracking-tight">4.9</span>
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((i) => (
              <Star 
                key={i} 
                size={11} 
                className="fill-[#FFB321] text-[#FFB321]" 
                strokeWidth={0}
              />
            ))}
          </div>
        </div>
        <span className="text-[11px] text-zinc-500 font-medium group-hover:text-zinc-400 transition-colors tracking-wide">
          (76 reviews)
        </span>
      </div>
    </div>
  );
};

export default G2ReviewCard;
