'use client';

import { motion } from 'framer-motion';

type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export function ProgressBar({
  current,
  total,
  score,
  difficulty,
  initialDifficulty,
}: {
  current: number;
  total: number;
  score: number;
  difficulty: Difficulty;
  initialDifficulty: Difficulty;
}) {
  const progress = (current / total) * 100;
  const scorePercentage = Math.round((score / current) * 100) || 0;

  const difficultyColors = {
    beginner: 'from-green-400 to-emerald-500',
    intermediate: 'from-amber-400 to-orange-500',
    advanced: 'from-rose-500 to-pink-600',
    expert: 'from-purple-500 to-indigo-600',
  };

  const difficultyLabels = {
    beginner: 'BEGINNER',
    intermediate: 'INTERMEDIATE',
    advanced: 'ADVANCED',
    expert: 'EXPERT'
  };

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center space-x-4">
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            key={current}
            className="bg-purple-500 text-white font-bold rounded-full w-8 h-8 flex items-center justify-center"
          >
            {current}
          </motion.div>
          <span className="text-white/70">of {total}</span>
          
          <div className="flex items-center">
            <div className={`px-3 py-1 text-xs font-bold rounded-full bg-gradient-to-r ${difficultyColors[difficulty]}`}>
              {difficultyLabels[difficulty]}
            </div>
            {current === 1 && difficulty !== initialDifficulty && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-white/60 ml-2"
              >
                (Started at: {difficultyLabels[initialDifficulty]})
              </motion.div>
            )}
          </div>
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
          className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
        />
      </div>
    </div>
  );
}