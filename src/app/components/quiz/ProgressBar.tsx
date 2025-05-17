'use client';

import { motion } from 'framer-motion';

export function ProgressBar({
  current,
  total,
  score,
}: {
  current: number;
  total: number;
  score: number;
}) {
  const progress = (current / total) * 100;
  const scorePercentage = Math.round((score / current) * 100) || 0;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-2">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            key={current}
            className="bg-purple-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center"
          >
            {current}
          </motion.div>
          <span className="text-white/70">of {total}</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="text-sm font-medium text-white/70">Score:</div>
          <motion.div 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            key={score}
            className="bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-bold rounded-full px-3 py-1 text-sm"
          >
            {score} ({scorePercentage}%)
          </motion.div>
        </div>
      </div>
      
      <div className="relative h-3 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-cyan-400 to-purple-500 rounded-full"
        />
        
        {/* Animated dots along the progress bar */}
        {Array.from({ length: total }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: i < current ? 1 : 0.3,
              scale: i < current ? 1.2 : 1
            }}
            transition={{ delay: i * 0.05 }}
            className={`absolute top-0 h-3 w-3 rounded-full ${
              i < current ? 'bg-white' : 'bg-white/30'
            }`}
            style={{ left: `${(i / (total - 1)) * 100}%`, transform: 'translateX(-50%)' }}
          />
        ))}
      </div>
    </div>
  );
}