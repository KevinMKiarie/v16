import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { cn } from '@/lib/utils';

export function TextReveal({
  children,
  as = 'span',
  className,
  delay = 0,
  by = 'word',
  animation = 'fade-up',
  once = true,
  stagger = 0.025,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, margin: '-60px' });
  
  const tokens = by === 'word' ? children.split(' ') : children.split('');
  
  const animations = {
    'fade-up': {
      hidden: { opacity: 0, y: 12 },
      visible: { opacity: 1, y: 0 },
    },
    'blur-in': {
      hidden: { opacity: 0, filter: 'blur(8px)', y: 4 },
      visible: { opacity: 1, filter: 'blur(0px)', y: 0 },
    },
    'slide-up': {
      hidden: { opacity: 0, y: 24, rotateX: 40 },
      visible: { opacity: 1, y: 0, rotateX: 0 },
    },
    scale: {
      hidden: { opacity: 0, scale: 0.85 },
      visible: { opacity: 1, scale: 1 },
    },
  };

  const { hidden, visible } = animations[animation];

  return (
    <span ref={ref} className={cn('flex flex-wrap', className)}>
      {tokens.map((token, i) => (
        <motion.span
          key={`${token}-${i}`}
          initial={hidden}
          animate={isInView ? visible : hidden}
          transition={{
            duration: 0.3,
            delay: delay / 1000 + i * stagger,
            ease: [0.25, 0.4, 0, 1],
          }}
          className='inline-block will-change-transform'
          style={{ perspective: animation === 'slide-up' ? 400 : undefined }}
        >
          {token}
          {by === 'word' && i < tokens.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </span>
  );
}
