'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '../../../context/QuizContext';
import { getQuestionsBySubject } from '@/lib/questions';
import { SlideTransition } from '@/components/animations/SlideTransition';
import { QuestionCard } from '../../../components/quiz/QuestionCard';
import { ProgressBar } from '../../../components/quiz/ProgressBar';
import React from 'react';

export default function QuizPage({ params }: { params: { subject: string } }) {
  const router = useRouter();
  const {
    difficulty,
    score,
    setScore,
    answeredQuestions,
    setAnsweredQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
  } = useQuiz();
  
  // Properly unwrap the params promise
  const subject = React.use(params).subject;
  
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<any>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const loadedQuestions = getQuestionsBySubject(subject, difficulty);
    setQuestions(loadedQuestions);
    setCurrentQuestion(loadedQuestions[0]);
  }, [subject, difficulty]);

  const handleAnswer = (option: string) => {
    if (hasAnswered) return;
    
    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);
    setShowFeedback(true);
    setHasAnswered(true);

    if (correct) {
      setScore(score + 1);
    }

    setAnsweredQuestions([
      ...answeredQuestions,
      {
        ...currentQuestion,
        userAnswer: option,
        isCorrect: correct,
      }
    ]);
  };

  const handleNextQuestion = () => {
    setIsTransitioning(true);
    
    setTimeout(() => {
      const nextIndex = currentQuestionIndex + 1;
      if (nextIndex < questions.length) {
        setCurrentQuestionIndex(nextIndex);
        setCurrentQuestion(questions[nextIndex]);
        setSelectedOption(null);
        setHasAnswered(false);
        setShowFeedback(false);
        setIsTransitioning(false);
      } else {
        router.push(`/quiz/${subject}/results`);
      }
    }, 500);
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setShowFeedback(false);
  };

  if (!currentQuestion) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800">
        <div className="text-white text-2xl">Loading questions...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <ProgressBar 
          current={currentQuestionIndex + 1} 
          total={questions.length} 
          score={score}
        />
        
        <SlideTransition key={currentQuestionIndex} direction={isTransitioning ? 'out' : 'in'}>
          <div className="max-w-3xl mx-auto mt-12">
            <QuestionCard
              question={currentQuestion}
              selectedOption={selectedOption}
              onSelect={handleAnswer}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
            />
            
            {showFeedback && (
              <div className={`mt-6 p-4 rounded-xl ${isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'} border ${isCorrect ? 'border-green-400/30' : 'border-red-400/30'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">
                      {isCorrect ? 'Correct!' : 'Incorrect'}
                    </h3>
                    <p className="opacity-90">{currentQuestion.explanation}</p>
                  </div>
                  {!isCorrect ? (
                    <button
                      onClick={handleTryAgain}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      Try Again
                    </button>
                  ) : (
                    <button
                      onClick={handleNextQuestion}
                      className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      Continue
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </SlideTransition>
      </div>
    </div>
  );
}