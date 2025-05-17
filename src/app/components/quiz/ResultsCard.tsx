'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, XCircle } from 'lucide-react';

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

  return (
    <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
      {/* Summary Section */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={`text-5xl font-bold mb-2 ${
            percentage >= 80
              ? 'text-green-400'
              : percentage >= 50
              ? 'text-amber-400'
              : 'text-rose-400'
          }`}
        >
          {percentage}%
        </motion.div>
        <p className="text-white/80 mb-4">
          You answered {correctCount} out of {questions.length} questions correctly
        </p>
        <div className="w-full bg-white/10 h-4 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className={`h-full ${
              percentage >= 80
                ? 'bg-green-500'
                : percentage >= 50
                ? 'bg-amber-500'
                : 'bg-rose-500'
            }`}
          />
        </div>
      </div>

      {/* Detailed Results */}
      <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2">
        {questions.map((question, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`p-4 rounded-lg border ${
              question.isCorrect
                ? 'bg-green-500/10 border-green-400/20'
                : 'bg-rose-500/10 border-rose-400/20'
            }`}
          >
            <div className="flex items-start gap-3">
              <div className="pt-1">
                {question.isCorrect ? (
                  <CheckCircle2 className="text-green-400" size={20} />
                ) : (
                  <XCircle className="text-rose-400" size={20} />
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{question.text}</h3>
                <div className="mt-2 text-sm">
                  <p className="text-white/70">
                    Your answer: <span className={`font-medium ${question.isCorrect ? 'text-green-300' : 'text-rose-300'}`}>
                      {question.userAnswer}
                    </span>
                  </p>
                  {!question.isCorrect && (
                    <p className="text-white/70">
                      Correct answer: <span className="font-medium text-green-300">{question.correctAnswer}</span>
                    </p>
                  )}
                </div>
                <div className="mt-3 p-3 bg-black/20 rounded text-sm text-white/80">
                  <p className="font-medium mb-1">Explanation:</p>
                  <p>{question.explanation}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Performance Feedback */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: questions.length * 0.05 + 0.5 }}
        className="mt-8 text-center"
      >
        <h3 className="text-xl font-medium mb-2">
          {percentage >= 80
            ? '🎉 Excellent Work!'
            : percentage >= 50
            ? '👍 Good Job!'
            : '💪 Keep Practicing!'}
        </h3>
        <p className="text-white/70">
          {percentage >= 80
            ? 'You have mastered this topic!'
            : percentage >= 50
            ? 'You have a good understanding of this topic'
            : 'Review the explanations to improve your knowledge'}
        </p>
      </motion.div>
    </div>
  );
}