'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { ReactNode } from 'react';

type SlideDirection = 'left' | 'right' | 'up' | 'down';

interface SlideTransitionProps {
  children: ReactNode;
  direction?: SlideDirection;
  transitionKey?: string | number; // Changed from 'key' to 'transitionKey'
  duration?: number;
  delay?: number;
  className?: string;
}

export function SlideTransition({
  children,
  direction = 'right',
  transitionKey, // Now using transitionKey instead of key
  duration = 0.5,
  delay = 0,
  className = '',
}: SlideTransitionProps) {
  const variants = {
    enter: (customDirection: SlideDirection) => ({
      x: customDirection === 'left' ? 100 : customDirection === 'right' ? -100 : 0,
      y: customDirection === 'up' ? 100 : customDirection === 'down' ? -100 : 0,
      opacity: 0,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      },
    },
    exit: (customDirection: SlideDirection) => ({
      x: customDirection === 'left' ? -100 : customDirection === 'right' ? 100 : 0,
      y: customDirection === 'up' ? -100 : customDirection === 'down' ? 100 : 0,
      opacity: 0,
      transition: {
        duration,
        ease: [0.25, 0.1, 0.25, 1],
      },
    }),
  };

  return (
    <AnimatePresence mode="wait" custom={direction}>
      <motion.div
        key={transitionKey} // Using transitionKey here
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        exit="exit"
        className={className}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}