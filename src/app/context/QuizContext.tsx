'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type QuizContextType = {
  subject: string;
  setSubject: (subject: string) => void;
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
  score: number;
  setScore: (score: number) => void;
  answeredQuestions: any[];
  setAnsweredQuestions: (questions: any[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  resetQuiz: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState('general');
  const [difficulty, setDifficulty] = useState('medium');
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  const resetQuiz = () => {
    setScore(0);
    setAnsweredQuestions([]);
    setCurrentQuestionIndex(0);
  };

  return (
    <QuizContext.Provider
      value={{
        subject,
        setSubject,
        difficulty,
        setDifficulty,
        score,
        setScore,
        answeredQuestions,
        setAnsweredQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        resetQuiz,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
}