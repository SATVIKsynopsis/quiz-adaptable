'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useQuiz } from '../../../context/QuizContext';
import { getQuestionsBySubject } from '@/lib/questions';
import { SlideTransition } from '@/components/animations/SlideTransition';
import { QuestionCard } from '../../../components/quiz/QuestionCard';
import { ProgressBar } from '../../../components/quiz/ProgressBar';
import { DifficultyChangeNotification } from '../../../components/quiz/DifficultyChange';
import { Sparkles, Loader2 } from 'lucide-react';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  subject: string;
  areaTested?: string;
};

export default function QuizPage({ params }: { params: { subject: string } }) {
  const router = useRouter();
  const subject = params.subject as 'math' | 'science' | 'history' | 'literature' | 'geography' | 'coding';

  const {
    score,
    setScore,
    answeredQuestions,
    setAnsweredQuestions,
    currentQuestionIndex,
    setCurrentQuestionIndex,
    currentDifficulty,
    difficulty,
    adjustDifficulty,
    showDifficultyChange,
    difficultyChangeMessage,
  } = useQuiz();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | null>(null);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const questionStartTime = useRef<Date>(new Date());

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

  console.log('Environment variables:', {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    baseUrl,
    subject,
  });

  useEffect(() => {
    console.log('Initializing quiz for subject:', subject, 'difficulty:', difficulty);
    const loadedQuestions = getQuestionsBySubject(subject, difficulty);
    if (loadedQuestions.length === 0) {
      console.error('No questions available for subject:', subject);
      router.push('/error?message=No questions available');
      return;
    }
    setQuestions(loadedQuestions);
    setCurrentQuestion(loadedQuestions[0]);
    questionStartTime.current = new Date();
  }, [subject, difficulty, router]);

  const generateAIQuestion = useCallback(async () => {
    setIsGenerating(true);
    setGenerationError(null);
    setSuccessMessage(null);

    try {
      const incorrectAnswers = answeredQuestions.filter((q) => !q.isCorrect);
      const weakAreas = [...new Set(incorrectAnswers.map((q) => q.areaTested || q.subject))];
      const payload = {
        topic: subject,
        difficulty: currentDifficulty,
        userWeakAreas: weakAreas.slice(0, 3),
      };

      console.log('Fetching AI questions for subject:', subject, 'from:', `${baseUrl}/api/generate-question`);
      console.log('Request payload:', payload);

      const response = await fetch(`${baseUrl}/api/generate-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      console.log('API response status for subject:', subject, 'status:', response.status, response.statusText);

      if (!response.ok) {
        const text = await response.text();
        console.error('API Response Error for subject:', subject, 'response:', text);
        throw new Error(`API request failed for ${subject} with status ${response.status}: ${text.substring(0, 200)}`);
      }

      const data = await response.json();
      console.log('API response data for subject:', subject, JSON.stringify(data, null, 2));

      if (!data.success) throw new Error(data.error || `Failed to generate questions for ${subject}`);

      const newQuestions = data.questions;
      if (!Array.isArray(newQuestions) || newQuestions.length === 0) {
        console.error('No questions in response for subject:', subject, 'data:', data);
        throw new Error(`No questions returned from API for ${subject}`);
      }

      setQuestions((prev) => [...prev, ...newQuestions]);
      setCurrentQuestionIndex(questions.length);
      setCurrentQuestion(newQuestions[0]);
      setSelectedOption(null);
      setHasAnswered(false);
      setShowFeedback(false);
      setSuccessMessage(`${newQuestions.length} new question${newQuestions.length > 1 ? 's' : ''} added for ${subject}!`);
      questionStartTime.current = new Date();
    } catch (err) {
      console.error('Generation Error for subject:', subject, 'error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate questions';
      setGenerationError(`Error generating questions for ${subject}: ${errorMessage}`);
    } finally {
      setIsGenerating(false);
    }
  }, [subject, currentDifficulty, answeredQuestions, questions.length, baseUrl]);

  const handleAnswer = (option: string) => {
    if (hasAnswered) return;

    const timeTaken = (new Date().getTime() - questionStartTime.current.getTime()) / 1000;
    const correct = option === currentQuestion?.correctAnswer;

    if (currentQuestion) {
      adjustDifficulty(correct, timeTaken);
      setSelectedOption(option);
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
          responseTime: timeTaken,
        },
      ]);
    }
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
        questionStartTime.current = new Date();
      } else {
        router.push(`/quiz/${subject}/results`);
      }
    }, 500);
  };

  const handleTryAgain = () => {
    setSelectedOption(null);
    setHasAnswered(false);
    setShowFeedback(false);
    questionStartTime.current = new Date();
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold capitalize">{subject} Quiz</h1>

          <div className="flex gap-4">
            <button
              onClick={generateAIQuestion}
              disabled={isGenerating}
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-500 px-4 py-2 rounded-lg disabled:opacity-50"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin" size={18} />
                  <span>Generating Questions...</span>
                </>
              ) : (
                <>
                  <Sparkles size={18} />
                  <span>Add AI Questions</span>
                </>
              )}
            </button>
          </div>
        </div>

        {successMessage && (
          <div className="bg-green-500/20 border border-green-400/30 p-3 rounded-lg mb-4">
            {successMessage}
          </div>
        )}

        {generationError && (
          <div className="bg-red-500/20 border border-red-400/30 p-3 rounded-lg mb-4">
            {generationError}
          </div>
        )}

        <ProgressBar
          current={currentQuestionIndex + 1}
          total={questions.length}
          score={score}
          difficulty={currentDifficulty}
          initialDifficulty={difficulty}
        />

        <SlideTransition direction={isTransitioning ? 'out' : 'in'} transitionKey={currentQuestion.id}>
          <div className="max-w-3xl mx-auto mt-12">
            {currentQuestion.areaTested && (
              <div className="text-sm text-purple-300 mb-2">Testing: {currentQuestion.areaTested}</div>
            )}

            <QuestionCard
              question={currentQuestion}
              selectedOption={selectedOption}
              onSelect={handleAnswer}
              showFeedback={showFeedback}
              isCorrect={isCorrect}
            />

            {showFeedback && (
              <div
                className={`mt-6 p-4 rounded-xl ${
                  isCorrect ? 'bg-green-500/20' : 'bg-red-500/20'
                } border ${isCorrect ? 'border-green-400/30' : 'border-red-400/30'}`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-lg">{isCorrect ? 'Correct!' : 'Incorrect'}</h3>
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

      {showDifficultyChange && (
        <DifficultyChangeNotification
          message={difficultyChangeMessage}
          isIncreasing={
            difficultyChangeMessage.includes('Moving') ||
            difficultyChangeMessage.includes('Advancing') ||
            difficultyChangeMessage.includes('Progressing')
          }
        />
      )}
    </div>
  );
}