'use client';

import { motion, AnimatePresence } from 'framer-motion';

export function DifficultyChangeNotification({ 
  message,
  isIncreasing 
}: {
  message: string;
  isIncreasing: boolean;
}) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.9 }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1,
          transition: { type: 'spring', stiffness: 300, damping: 20 }
        }}
        exit={{ 
          opacity: 0, 
          y: -20,
          transition: { duration: 0.2 } 
        }}
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-xl ${
          isIncreasing 
            ? 'bg-gradient-to-r from-green-500 to-emerald-600' 
            : 'bg-gradient-to-r from-amber-500 to-orange-600'
        } text-white font-medium flex items-center`}
      >
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            transition: { duration: 0.6, repeat: Infinity }
          }}
          className="mr-3 text-xl"
        >
          {isIncreasing ? '🚀' : '⚠️'}
        </motion.div>
        <div>
          {message}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}