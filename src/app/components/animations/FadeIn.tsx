'use client';

import { motion, Variants } from 'framer-motion';
import { ReactNode } from 'react';

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  yOffset?: number;
  className?: string;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.25, 0.1, 0.25, 1]
    }
  }
};

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  yOffset = 20,
  className = ''
}: FadeInProps) {
  const customVariants: Variants = {
    hidden: { opacity: 0, y: yOffset },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        delay,
        duration,
        ease: [0.25, 0.1, 0.25, 1]
      }
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={customVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Optional: Export a pre-configured version
export function FadeInUp({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <FadeIn yOffset={20} delay={delay}>
      {children}
    </FadeIn>
  );
}

export function FadeInDown({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <FadeIn yOffset={-20} delay={delay}>
      {children}
    </FadeIn>
  );
}