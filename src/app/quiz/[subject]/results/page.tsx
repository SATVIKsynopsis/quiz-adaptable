'use client';

import { useQuiz } from '../../../context/QuizContext';
import { getSubjectDetails } from '@/lib/questions';
import React from 'react';
import Link from 'next/link';
import { CheckCircle, XCircle, Award, BookOpen, BarChart2, TrendingUp, Zap, Flame, Sparkles } from 'lucide-react';

export default function ResultsPage({ params }: { params: { subject: string } }) {

  const subjectParam = React.use(params).subject;
  const { score, answeredQuestions, resetQuiz } = useQuiz();
  
  const subject = getSubjectDetails(subjectParam);
  const percentage = Math.round((score / answeredQuestions.length) * 100);
  const perfectScore = percentage === 100;
  const goodScore = percentage >= 70;
  const averageScore = percentage >= 50;
  
 
  const difficultyStats = {
    beginner: { correct: 0, incorrect: 0, total: 0 },
    intermediate: { correct: 0, incorrect: 0, total: 0 },
    advanced: { correct: 0, incorrect: 0, total: 0 },
    expert: { correct: 0, incorrect: 0, total: 0 }
  };
  
  
  answeredQuestions.forEach((q) => {
    
    const difficulty = q.difficulty?.toLowerCase() || "beginner";
    
   
    if (!difficultyStats[difficulty] && ["beginner", "intermediate", "advanced", "expert"].includes(difficulty)) {
      difficultyStats[difficulty] = { correct: 0, incorrect: 0, total: 0 };
    }
    
    
    if (difficultyStats[difficulty]) {
      difficultyStats[difficulty].total++;
      
      
      const isCorrect = q.userAnswerCorrect || 
                        (q.isCorrect === true) || 
                        (typeof q.correct === 'boolean' && q.correct) ||
                        (q.selectedAnswer && q.selectedAnswer === q.correctAnswer);
      
      if (isCorrect) {
        difficultyStats[difficulty].correct++;
      } else {
        difficultyStats[difficulty].incorrect++;
      }
    }
  });
  
  const getBackgroundClass = () => {
    if (perfectScore) return "bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500";
    if (goodScore) return "bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-600";
    if (averageScore) return "bg-gradient-to-br from-cyan-600 via-blue-700 to-indigo-700";
    return "bg-gradient-to-br from-slate-700 via-blue-900 to-indigo-900";
  };
  
 
  const getDifficultyIcon = (difficulty) => {
    switch(difficulty) {
      case 'beginner':
        return <Zap size={20} className="mr-2 text-green-400" />;
      case 'intermediate':
        return <TrendingUp size={20} className="mr-2 text-blue-400" />;
      case 'advanced':
        return <Flame size={20} className="mr-2 text-orange-400" />;
      case 'expert':
        return <Sparkles size={20} className="mr-2 text-yellow-400" />;
      default:
        return null;
    }
  };
  
  const getEmoji = () => {
    if (perfectScore) return "🏆";
    if (goodScore) return "🌟";
    if (averageScore) return "👍";
    return "💪";
  };
  
  return (
    <div className={`min-h-screen ${getBackgroundClass()} text-white`}>
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
         
          <div className="text-center mb-10">
            <div className="inline-block mb-6 text-6xl md:text-7xl animate-bounce">
              {getEmoji()}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200">
              {perfectScore ? 'Perfect Score!' :
                goodScore ? 'Great Job!' :
                averageScore ? 'Good Effort!' : 'Keep Practicing!'}
            </h1>
            <p className="text-xl opacity-90">
              You scored <span className="font-bold">{score}</span> out of <span className="font-bold">{answeredQuestions.length}</span> in <span className="italic font-medium">{subject?.title}</span>
            </p>
          </div>
          
         
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-xl border border-white/20 mb-10">
           
            <div className="flex flex-col md:flex-row items-center mb-8">
              <div className="relative mb-6 md:mb-0 md:mr-8">
                <div className="w-40 h-40 rounded-full flex items-center justify-center border-8 border-white/20 bg-white/10">
                  <div className="text-4xl font-bold">{percentage}%</div>
                </div>
                <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-2 shadow-lg">
                  <Award size={28} />
                </div>
              </div>
              
            
              <div className="flex-1">
                <h2 className="text-2xl font-semibold mb-4">Performance Summary</h2>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <CheckCircle className="text-green-400 mr-3" size={24} />
                    <span>Correct Answers: <span className="font-bold">{score}</span></span>
                  </div>
                  <div className="flex items-center">
                    <XCircle className="text-red-400 mr-3" size={24} />
                    <span>Incorrect Answers: <span className="font-bold">{answeredQuestions.length - score}</span></span>
                  </div>
                  <div className="flex items-center">
                    <BookOpen className="text-blue-400 mr-3" size={24} />
                    <span>Subject: <span className="font-bold">{subject?.title}</span></span>
                  </div>
                </div>
              </div>
            </div>
            
            
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3">Performance by Difficulty</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Object.entries(difficultyStats).map(([difficulty, stats]) => (
                  stats.total > 0 && (
                    <div key={difficulty} className="bg-white/5 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center mb-3">
                        {getDifficultyIcon(difficulty)}
                        <h4 className="text-lg font-medium capitalize">{difficulty}</h4>
                      </div>
                      
                      <div className="ml-7 space-y-2">
                        <div className="flex justify-between">
                          <span>Correct:</span>
                          <span className="font-bold text-green-400">{stats.correct}/{stats.total}</span>
                        </div>
                        <div className="flex justify-between mb-3">
                          <span>Incorrect:</span>
                          <span className="font-bold text-red-400">{stats.incorrect}/{stats.total}</span>
                        </div>
                        
                      
                        <div className="h-3 bg-white/10 rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-green-400 to-green-500"
                            style={{ width: `${Math.max(Math.min((stats.correct / stats.total) * 100, 100), 0)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
            
            
            <div className="p-4 rounded-xl bg-white/5 border border-white/10">
              <p className="text-lg">
                {perfectScore ? 'Incredible work! You\'ve mastered this subject completely!' :
                 goodScore ? 'Excellent performance! You have a strong grasp of this material.' :
                 averageScore ? 'Good effort! With a bit more practice, you\'ll master this content.' :
                 'Keep going! Every attempt brings you closer to mastering this subject.'}
              </p>
            </div>
          </div>
          
          
          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
            <button
              onClick={() => {
                resetQuiz();
                window.location.href = `/quiz/${subjectParam}/play`;
              }}
              className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-colors shadow-lg flex items-center justify-center"
            >
              <BarChart2 size={20} className="mr-2" />
              Try Again
            </button>
            <Link
              onClick={resetQuiz}
              href={"/"}
              className="px-8 py-4 text-lg font-medium bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-colors shadow-lg border border-white/10 flex items-center justify-center"
            >
              <BookOpen size={20} className="mr-2" />
              Choose Another Quiz
            </Link>
          </div>
          
          
          {perfectScore && (
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-10">
             
              <div className="absolute top-10 left-1/4 w-2 h-10 bg-yellow-300 rounded-full animate-fall-slow"></div>
              <div className="absolute top-0 left-1/3 w-3 h-3 bg-green-400 rounded-full animate-fall-medium"></div>
              <div className="absolute top-5 left-1/2 w-4 h-4 bg-pink-400 rounded-full animate-fall-fast"></div>
              <div className="absolute top-0 left-2/3 w-2 h-8 bg-blue-400 rounded-full animate-fall-slow"></div>
              <div className="absolute top-8 left-3/4 w-3 h-3 bg-purple-400 rounded-full animate-fall-medium"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}