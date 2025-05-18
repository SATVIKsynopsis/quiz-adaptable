'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, Award, BookOpen, TrendingUp, Star, RotateCcw } from 'lucide-react';

interface ResultsCardProps {
  questions: {
    text: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
    userAnswer: string;
    isCorrect: boolean;
  }[];
}

export function ResultsCard({ questions }: ResultsCardProps) {
  const correctCount = questions.filter(q => q.isCorrect).length;
  const percentage = Math.round((correctCount / questions.length) * 100);

  const getPerformanceLevel = () => {
    if (percentage >= 90) return { text: 'Outstanding!', icon: <Award size={24} />, color: 'text-indigo-300' };
    if (percentage >= 80) return { text: 'Excellent Work!', icon: <Star size={24} />, color: 'text-green-300' };
    if (percentage >= 70) return { text: 'Great Job!', icon: <TrendingUp size={24} />, color: 'text-cyan-300' };
    if (percentage >= 50) return { text: 'Good Effort!', icon: <BookOpen size={24} />, color: 'text-amber-300' };
    return { text: 'Keep Practicing!', icon: <RotateCcw size={24} />, color: 'text-rose-300' };
  };
  
  const performance = getPerformanceLevel();


  const showConfetti = percentage >= 80;

  return (
    <div className="relative">
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                y: -50, 
                x: Math.random() * window.innerWidth,
                rotate: Math.random() * 360,
                scale: 0
              }}
              animate={{ 
                y: window.innerHeight + 100,
                rotate: Math.random() * 720,
                scale: Math.random() * 0.5 + 0.5
              }}
              transition={{ 
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5,
                repeat: Infinity,
                repeatDelay: Math.random() * 3 + 3
              }}
              className={`absolute w-4 h-4 rounded-sm ${
                ['bg-pink-500', 'bg-blue-500', 'bg-yellow-500', 'bg-green-500', 'bg-purple-500'][Math.floor(Math.random() * 5)]
              }`}
            />
          ))}
        </div>
      )}

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20 relative overflow-hidden"
      >
       
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className={`absolute -top-40 -right-40 w-80 h-80 rounded-full blur-3xl opacity-20 ${
            percentage >= 80 ? 'bg-green-500' : percentage >= 50 ? 'bg-amber-500' : 'bg-rose-500'
          }`}></div>
          <div className={`absolute -bottom-40 -left-40 w-80 h-80 rounded-full blur-3xl opacity-10 ${
            percentage >= 80 ? 'bg-blue-500' : percentage >= 50 ? 'bg-orange-500' : 'bg-purple-500'
          }`}></div>
        </div>

      
        <div className="text-center mb-8 relative">
          <div className="flex justify-center mb-4">
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.8, type: 'spring', stiffness: 300, damping: 15 }}
              className={`relative flex items-center justify-center w-32 h-32 rounded-full ${
                percentage >= 80
                  ? 'bg-green-500/10 border-green-400/30'
                  : percentage >= 50
                  ? 'bg-amber-500/10 border-amber-400/30'
                  : 'bg-rose-500/10 border-rose-400/30'
              } border-2`}
            >
              <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full">
                <motion.circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={percentage >= 80 ? 'rgb(74, 222, 128)' : percentage >= 50 ? 'rgb(251, 191, 36)' : 'rgb(244, 63, 94)'}
                  strokeWidth="6"
                  strokeDasharray={Math.PI * 2 * 45}
                  strokeDashoffset={Math.PI * 2 * 45 * (1 - percentage / 100)}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                  initial={{ strokeDashoffset: Math.PI * 2 * 45 }}
                  animate={{ strokeDashoffset: Math.PI * 2 * 45 * (1 - percentage / 100) }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </svg>
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className={`text-5xl font-bold ${
                  percentage >= 80
                    ? 'text-green-400'
                    : percentage >= 50
                    ? 'text-amber-400'
                    : 'text-rose-400'
                }`}
              >
                {percentage}%
              </motion.div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-white mb-2">Quiz Results</h2>
            <p className="text-white/80 mb-4">
              You answered <span className="font-bold">{correctCount}</span> out of <span className="font-bold">{questions.length}</span> questions correctly
            </p>
          </motion.div>

          <motion.div
            initial={{ width: '0%' }}
            animate={{ width: '100%' }}
            transition={{ duration: 0.8 }}
            className="w-full bg-white/10 h-2 rounded-full overflow-hidden mt-2 mb-6"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.2 }}
              className={`h-full ${
                percentage >= 80
                  ? 'bg-green-500'
                  : percentage >= 50
                  ? 'bg-amber-500'
                  : 'bg-rose-500'
              }`}
            />
          </motion.div>

      
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className={`flex items-center justify-center gap-2 px-4 py-2 rounded-full ${
              percentage >= 80
                ? 'bg-green-500/20 border-green-500/30'
                : percentage >= 50
                ? 'bg-amber-500/20 border-amber-500/30'
                : 'bg-rose-500/20 border-rose-500/30'
            } border inline-flex mx-auto`}
          >
            <span className={performance.color}>{performance.icon}</span>
            <span className="font-medium text-white">{performance.text}</span>
          </motion.div>
        </div>
       
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="mb-4 flex items-center"
        >
          <div className="w-10 h-px bg-white/30"></div>
          <h3 className="mx-3 text-white text-lg font-medium">Question Details</h3>
          <div className="flex-1 h-px bg-white/30"></div>
        </motion.div>

        
        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent">
          {questions.map((question, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 + index * 0.1, duration: 0.5 }}
              className={`p-4 rounded-xl border ${
                question.isCorrect
                  ? 'bg-green-500/10 border-green-400/20'
                  : 'bg-rose-500/10 border-rose-400/20'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="pt-1">
                  {question.isCorrect ? (
                    <div className="p-1.5 bg-green-500/20 rounded-full">
                      <CheckCircle2 className="text-green-400" size={18} />
                    </div>
                  ) : (
                    <div className="p-1.5 bg-rose-500/20 rounded-full">
                      <XCircle className="text-rose-400" size={18} />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-white">{question.text}</h3>
                  <div className="mt-2 text-sm grid grid-cols-1 gap-1.5">
                    <div className={`p-2 rounded-lg ${
                      question.isCorrect ? 'bg-green-500/10' : 'bg-rose-500/10'
                    } flex items-center gap-2`}>
                      <span className="font-medium">Your answer:</span>
                      <span className={`${question.isCorrect ? 'text-green-300' : 'text-rose-300'} font-medium`}>
                        {question.userAnswer}
                      </span>
                    </div>
                    
                    {!question.isCorrect && (
                      <div className="p-2 rounded-lg bg-green-500/10 flex items-center gap-2">
                        <span className="font-medium">Correct answer:</span>
                        <span className="text-green-300 font-medium">{question.correctAnswer}</span>
                      </div>
                    )}
                  </div>
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ delay: 1 + index * 0.1 + 0.2, duration: 0.3 }}
                    className="mt-3 p-3 bg-black/30 backdrop-blur-sm rounded-lg text-sm text-white/90 border border-white/5"
                  >
                    <p className="font-medium mb-1 text-white/80 flex items-center gap-1.5">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 12L11 14L15 10M12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21Z" 
                          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      Explanation:
                    </p>
                    <p>{question.explanation}</p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

       
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: questions.length * 0.1 + 1.2, duration: 0.5 }}
          className="mt-8 text-center relative"
        >
          <div className="py-4 px-6 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10">
            <h3 className="text-xl font-medium mb-3 flex items-center justify-center gap-2">
              <span>{
                percentage >= 80
                  ? '🎉'
                  : percentage >= 50
                  ? '👍'
                  : '💪'
              }</span>
              <span>Performance Feedback</span>
            </h3>
            <p className="text-white/80">
              {percentage >= 80
                ? 'You have mastered this topic! Your understanding is excellent and you\'re ready to move on to more advanced concepts.'
                : percentage >= 50
                ? 'You have a good understanding of this topic. A bit more practice would help reinforce some concepts.'
                : 'Review the explanations to improve your knowledge. Don\'t worry, with practice you\'ll improve your score!'}
            </p>
            
            <div className="mt-4 flex justify-center gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-4 py-2 rounded-lg ${
                  percentage >= 80
                    ? 'bg-green-500/20 hover:bg-green-500/30 text-green-300'
                    : percentage >= 50
                    ? 'bg-amber-500/20 hover:bg-amber-500/30 text-amber-300'
                    : 'bg-rose-500/20 hover:bg-rose-500/30 text-rose-300'
                } border border-white/10 flex items-center gap-2 transition-colors`}
              >
                <RotateCcw size={16} />
                <span>Try Again</span>
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white border border-white/10 flex items-center gap-2 transition-colors"
              >
                <BookOpen size={16} />
                <span>Study Materials</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}