import { useState } from 'react';

type QuestionDifficulty = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface AIGeneratedQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty?: QuestionDifficulty;
  topic?: string;
  id?: string;
  subject?: string;
  areaTested?: string;
}

export function useAIQuestionGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateQuestion = async (
    topic: string,
    difficulty: QuestionDifficulty,
    userWeakAreas: string[] = []
  ): Promise<AIGeneratedQuestion[] | null> => {
    setIsGenerating(true);
    setError(null);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');
      console.log('Hook fetching AI questions from:', `${baseUrl}/api/generate-question`);
      const response = await fetch(`${baseUrl}/api/generate-question`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, difficulty, userWeakAreas }),
      });

      console.log('Hook API response status:', response.status, response.statusText);

      if (!response.ok) {
        const text = await response.text();
        console.error('Hook API Response Error:', text);
        throw new Error(`API request failed with status ${response.status}: ${text.substring(0, 200)}`);
      }

      const data = await response.json();
      console.log('Hook API response data:', JSON.stringify(data, null, 2));

      if (!data.success) throw new Error(data.error || 'Failed to generate questions');

      const questions = data.questions;
      if (!Array.isArray(questions) || questions.length === 0) {
        console.error('No questions in response:', data);
        throw new Error('No questions returned from API');
      }

      return questions;
    } catch (err) {
      console.error('Hook AI Generation Error:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to generate questions';
      setError(errorMessage);
      return null;
    } finally {
      setIsGenerating(false);
    }
  };

  return {
    generateQuestion,
    isGenerating,
    error,
    resetError: () => setError(null),
  };
}