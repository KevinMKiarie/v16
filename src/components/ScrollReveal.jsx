import { useState, useEffect, useRef } from 'react';

export const ScrollReveal = ({ children, className = '', delay = 0, direction = 'up' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  const transforms = {
    up: 'translate-y-12',
    down: '-translate-y-12',
    left: '-translate-x-12',
    right: 'translate-x-12',
    scale: 'scale-95'
  };

  const initialClass = `${transforms[direction]} opacity-0`;
  const finalClass = `translate-y-0 translate-x-0 scale-100 opacity-100`;

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition-[transform,opacity] duration-400 ease-out ${isVisible ? finalClass : initialClass} ${className}`}
    >
      {children}
    </div>
  );
};

