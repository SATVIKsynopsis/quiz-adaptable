'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

export function SlideTransition({
  children,
  direction = 'in',
  key,
}: {
  children: ReactNode;
  direction?: 'in' | 'out';
  key?: string | number;
}) {
  const variants = {
    in: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: 'easeOut' },
    },
    out: {
      opacity: 0,
      y: direction === 'out' ? -50 : 50,
      transition: { duration: 0.5, ease: 'easeIn' },
    },
  };

  return (
    <motion.div
      key={key}
      initial="out"
      animate="in"
      exit="out"
      variants={variants}
    >
      {children}
    </motion.div>
  );
}