import { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';

export const PersonalizedSpan = ({ text, delay = 0, start }) => {
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    if (start) {
      const timer = setTimeout(() => setVisible(true), delay);
      return () => clearTimeout(timer);
    }
  }, [start, delay]);

  return (
    <span className={`inline-flex items-center mx-1 px-2.5 py-0.5 rounded-md bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-medium text-[13px] transition-all duration-500 transform ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-1'} shadow-[0_0_15px_rgba(99,102,241,0.15)]`}>
      <Sparkles className="w-3 h-3 mr-1.5" />
      {text}
    </span>
  );
};

