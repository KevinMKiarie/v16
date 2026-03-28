import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const defaultVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { delay: i * 0.4, duration: 0.5 },
  }),
};

export function TimelineContent({
  as: _as,
  children,
  animationNum = 0,
  timelineRef,
  customVariants,
  className,
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const variants = customVariants || defaultVariants;

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      custom={animationNum}
    >
      {children}
    </motion.div>
  );
}
