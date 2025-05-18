'use client';

import { useQuiz } from '../../context/QuizContext';
import { motion, AnimatePresence } from 'framer-motion';

const subjects = [
  {
    id: 'general',
    name: 'General Knowledge',
    icon: '🌍',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: 'science',
    name: 'Science',
    icon: '🔬',
    color: 'from-purple-500 to-fuchsia-600',
  },
  {
    id: 'history',
    name: 'History',
    icon: '🏛️',
    color: 'from-amber-500 to-orange-600',
  },
  {
    id: 'technology',
    name: 'Technology',
    icon: '💻',
    color: 'from-emerald-500 to-teal-600',
  },
  {
    id: 'arts',
    name: 'Arts & Culture',
    icon: '🎨',
    color: 'from-rose-500 to-pink-600',
  },
  {
    id: 'sports',
    name: 'Sports',
    icon: '⚽',
    color: 'from-lime-500 to-green-600',
  },
];

export function SubjectSelector() {
  const { setSubject } = useQuiz();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <AnimatePresence>
          {subjects.map((subject) => (
            <motion.button
              key={subject.id}
              whileHover={{ y: -5, scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              onClick={() => setSubject(subject.id)}
              className={`relative overflow-hidden rounded-2xl aspect-square p-6 text-center shadow-lg transition-all bg-gradient-to-br ${subject.color}`}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="text-4xl mb-3"
              >
                {subject.icon}
              </motion.div>
              <h3 className="font-bold text-white text-lg">{subject.name}</h3>
              
           
              <motion.span
                className="absolute top-0 left-0 w-full h-full bg-white/10 opacity-0"
                whileHover={{ opacity: 0.2, scale: 1.5 }}
                transition={{ duration: 0.6 }}
              />
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

     
      <div className="flex justify-center">
        <motion.div 
          className="h-1 bg-white/20 rounded-full overflow-hidden"
          style={{ width: '80%' }}
        >
          <motion.div
            className="h-full bg-white rounded-full"
            initial={{ width: 0 }}
            animate={{ 
              width: '100%',
              transition: { 
                duration: 1.5,
                repeat: Infinity,
                repeatType: 'reverse',
                ease: 'easeInOut'
              }
            }}
          />
        </motion.div>
      </div>
    </div>
  );
}