'use client';

import { useQuiz } from '../../context/QuizContext';
import { motion } from 'framer-motion';

const difficultyLevels = [
  {
    id: 'easy',
    label: 'Easy',
    color: 'from-green-400 to-emerald-500',
    description: 'Great for beginners or casual practice',
  },
  {
    id: 'medium',
    label: 'Medium',
    color: 'from-amber-400 to-orange-500',
    description: 'Balanced challenge for most learners',
  },
  {
    id: 'hard',
    label: 'Hard',
    color: 'from-rose-500 to-red-600',
    description: 'For experts wanting a real challenge',
  },
];

export function DifficultySelector() {
  const { difficulty, setDifficulty } = useQuiz();

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-3">
        {difficultyLevels.map((level) => (
          <motion.button
            key={level.id}
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setDifficulty(level.id)}
            className={`relative rounded-xl p-4 text-center transition-all ${
              difficulty === level.id
                ? `bg-gradient-to-br ${level.color} text-white shadow-lg`
                : 'bg-white/10 text-white/80 hover:bg-white/20'
            }`}
          >
            {difficulty === level.id && (
              <motion.div
                layoutId="difficultyIndicator"
                className="absolute inset-0 rounded-xl border-2 border-white/30"
                initial={false}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
              />
            )}
            <span className="font-bold block text-lg">{level.label}</span>
            {difficulty === level.id && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-medium block mt-1"
              >
                {level.description}
              </motion.span>
            )}
          </motion.button>
        ))}
      </div>

    
      <div className="relative mt-6">
        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className={`h-full bg-gradient-to-r ${
              difficulty === 'easy'
                ? 'from-green-400 to-emerald-500'
                : difficulty === 'medium'
                ? 'from-amber-400 to-orange-500'
                : 'from-rose-500 to-red-600'
            }`}
            initial={{ width: '0%' }}
            animate={{
              width:
                difficulty === 'easy'
                  ? '33%'
                  : difficulty === 'medium'
                  ? '66%'
                  : '100%',
            }}
            transition={{ duration: 0.6, type: 'spring' }}
          />
        </div>
        <div className="flex justify-between mt-2 text-xs text-white/60">
          <span>Casual</span>
          <span>Balanced</span>
          <span>Challenging</span>
        </div>
      </div>
    </div>
  );
}