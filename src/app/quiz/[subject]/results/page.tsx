'use client';

import { useQuiz } from '../../../context/QuizContext';
import { getSubjectDetails } from '@/lib/questions';
import React from 'react';

export default function ResultsPage({ params }: { params: { subject: string } }) {
  // Properly unwrap the params promise
  const subjectParam = React.use(params).subject;
  const { score, answeredQuestions, resetQuiz } = useQuiz();
  
  const subject = getSubjectDetails(subjectParam);
  const percentage = Math.round((score / answeredQuestions.length) * 100);
  const perfectScore = percentage === 100;
  const goodScore = percentage >= 70;
  const averageScore = percentage >= 50;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              {perfectScore ? 'Perfect Score! 🎉' : 
               goodScore ? 'Great Job! 👏' : 
               averageScore ? 'Good Effort! 👍' : 'Keep Practicing! 💪'}
            </h1>
            <p className="text-xl opacity-90">
              You scored {score} out of {answeredQuestions.length} ({percentage}%) in {subject?.title}
            </p>
          </div>
          
          {/* Results Card would go here */}
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-12">
            <button
              onClick={() => {
                resetQuiz();
                // Use the unwrapped subjectParam
                window.location.href = `/quiz/${subjectParam}/play`;
              }}
              className="px-8 py-3 text-lg bg-purple-600 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Try Again
            </button>
            <button
              onClick={resetQuiz}
              className="px-8 py-3 text-lg bg-white/10 rounded-lg hover:bg-white/20 transition-colors"
            >
              Choose Another Quiz
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}