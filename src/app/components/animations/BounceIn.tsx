'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface BounceInProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  bounce?: number;
  className?: string;
}

export function BounceIn({
  children,
  delay = 0,
  duration = 0.8,
  bounce = 0.5,
  className = ''
}: BounceInProps) {
  return (
    <motion.div
      initial={{ scale: 0.7, opacity: 0 }}
      animate={{ 
        scale: 1, 
        opacity: 1,
        transition: {
          delay,
          duration,
          type: 'spring',
          bounce,
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Pre-configured bounce animations
export function BounceInUp({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        transition: {
          delay,
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }
      }}
    >
      {children}
    </motion.div>
  );
}

export function BounceInDown({ children, delay = 0 }: { children: ReactNode, delay?: number }) {
  return (
    <motion.div
      initial={{ y: -100, opacity: 0 }}
      animate={{ 
        y: 0, 
        opacity: 1,
        transition: {
          delay,
          type: 'spring',
          stiffness: 400,
          damping: 10,
        }
      }}
    >
      {children}
    </motion.div>
  );
}