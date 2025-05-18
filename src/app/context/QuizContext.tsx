"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';


type Difficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';
type Subject = 'math' | 'science' | 'history' | 'literature' | 'geography' | 'coding';
type UserAnswer = { isCorrect: boolean; timeTaken: number };


interface Question {
  id: number | string;
  text: string;
  options: string[];
  correctAnswer: string;
}

type QuizContextType = {
  subject: Subject;
  setSubject: (subject: Subject) => void;
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  score: number;
  setScore: (score: number) => void;
  answeredQuestions: Question[];
  setAnsweredQuestions: (questions: Question[]) => void;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
  userAnswers: UserAnswer[];
  addUserAnswer: (answer: UserAnswer) => void;
  currentDifficulty: Difficulty;
  adjustDifficulty: (isCorrect: boolean, timeTaken: number) => void;
  resetQuiz: () => void;
  showDifficultyChange: boolean;
  difficultyChangeMessage: string;
  triggerDifficultyChange: (isIncrease: boolean) => void;
  clearDifficultyChange: () => void;
};

const QuizContext = createContext<QuizContextType | undefined>(undefined);

export function QuizProvider({ children }: { children: ReactNode }) {
  const [subject, setSubject] = useState<Subject>('math');
  const [difficulty, setDifficulty] = useState<Difficulty>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('quizDifficulty');
      return saved ? JSON.parse(saved) as Difficulty : 'beginner';
    }
    return 'beginner';
  });
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<UserAnswer[]>([]);
  const [currentDifficulty, setCurrentDifficulty] = useState<Difficulty>(difficulty);
  const [showDifficultyChange, setShowDifficultyChange] = useState(false);
  const [difficultyChangeMessage, setDifficultyChangeMessage] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('quizDifficulty', JSON.stringify(difficulty));
    }
  }, [difficulty]);

  const updateDifficulty = (newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setCurrentDifficulty(newDifficulty);
    if (typeof window !== 'undefined') {

      localStorage.setItem('quizDifficulty', JSON.stringify(newDifficulty));
    }
  };

  const addUserAnswer = (answer: UserAnswer) => {
    setUserAnswers(prev => [...prev, answer]);
  };

  const getIncreasedDifficulty = (current: Difficulty): Difficulty => {
    switch (current) {
      case 'beginner':
        return 'intermediate';
      case 'intermediate':
        return 'advanced';
      case 'advanced':
        return 'expert';
      default:
        return current;
    }
  };

  const getDecreasedDifficulty = (current: Difficulty): Difficulty => {
    switch (current) {
      case 'expert':
        return 'advanced';
      case 'advanced':
        return 'intermediate';
      case 'intermediate':
        return 'beginner';
      default:
        return current;
    }
  };

  const triggerDifficultyChange = (isIncrease: boolean) => {
    const messages = {
      increase: {
        beginner: `Moving from Beginner to Intermediate`,
        intermediate: `Advancing from Intermediate to Advanced`,
        advanced: `Progressing to Expert level`,
      },
      decrease: {
        intermediate: `Adjusting down to Beginner`,
        advanced: `Adjusting down to Intermediate`,
        expert: `Adjusting down to Advanced`,
      },
    };

    if (isIncrease) {
      setDifficultyChangeMessage(messages.increase[currentDifficulty]);
    } else {
      setDifficultyChangeMessage(messages.decrease[currentDifficulty]);
    }

    setShowDifficultyChange(true);
    setTimeout(clearDifficultyChange, 3000);
  };

  const clearDifficultyChange = () => {
    setShowDifficultyChange(false);
    setDifficultyChangeMessage('');
  };

  const adjustDifficulty = (isCorrect: boolean, timeTaken: number) => {
    const newAnswers = [...userAnswers, { isCorrect, timeTaken }];
    setUserAnswers(newAnswers);

    if (newAnswers.length % 3 === 0) {
      const lastThree = newAnswers.slice(-3);
      const correctCount = lastThree.filter(a => a.isCorrect).length;
      const avgTime = lastThree.reduce((sum, a) => sum + a.timeTaken, 0) / 3;

      if (correctCount === 3 && avgTime < 15) {
        const newDifficulty = getIncreasedDifficulty(currentDifficulty);
        if (newDifficulty !== currentDifficulty) {
          setCurrentDifficulty(newDifficulty);
          triggerDifficultyChange(true);
        }
      } else if (correctCount === 0) {
        const newDifficulty = getDecreasedDifficulty(currentDifficulty);
        if (newDifficulty !== currentDifficulty) {
          setCurrentDifficulty(newDifficulty);
          triggerDifficultyChange(false);
        }
      }
    }
  };

  const resetQuiz = () => {
    setScore(0);
    setAnsweredQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setCurrentDifficulty(difficulty);
    clearDifficultyChange();
  };

  return (
    <QuizContext.Provider
      value={{
        subject,
        setSubject,
        difficulty,
        setDifficulty: świeży
        updateDifficulty,
        score,
        setScore,
        answeredQuestions,
        setAnsweredQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        userAnswers,
        addUserAnswer,
        currentDifficulty,
        adjustDifficulty,
        resetQuiz,
        showDifficultyChange,
        difficultyChangeMessage,
        triggerDifficultyChange,
        clearDifficultyChange,
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