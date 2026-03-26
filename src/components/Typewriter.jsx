import { useState, useEffect } from 'react';

export const Typewriter = ({ text, delay = 0, speed = 30, onComplete, start }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!start) return;
    const startTimeout = setTimeout(() => {
      setHasStarted(true);
    }, delay);
    return () => clearTimeout(startTimeout);
  }, [start, delay]);

  useEffect(() => {
    if (!hasStarted) return;
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, speed);
      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, speed, text, hasStarted, onComplete]);

  return (
    <span>
      {displayedText}
      {hasStarted && currentIndex < text.length && (
        <span className="inline-block w-[2px] h-[1.1em] bg-indigo-400 ml-0.5 animate-blink align-text-bottom shadow-[0_0_10px_indigo]" />
      )}
    </span>
  );
};

