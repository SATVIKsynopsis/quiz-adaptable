type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
};

const questionPool: Question[] = [
  // Easy questions
  {
    id: 'e1',
    text: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
    explanation: 'Paris has been the capital of France since the 5th century.',
    difficulty: 'easy',
    subject: 'general',
  },
  // More questions...
];

export function getQuestionsBySubject(subject: string, difficulty: string) {
  const filtered = questionPool.filter(
    q => q.subject === subject && (difficulty === 'all' || q.difficulty === difficulty)
  );
  
  // Return 10 random questions
  return filtered.sort(() => 0.5 - Math.random()).slice(0, 10);
}

export function getSubjectDetails(subject: string) {
  const subjects: Record<string, { title: string; description: string; icon: string; topics: string[]; recommendedFor: string }> = {
    general: {
      title: 'General Knowledge',
      description: 'Test your knowledge across a wide range of topics including history, geography, science and more.',
      icon: '🌍',
      topics: ['History', 'Geography', 'Science', 'Arts'],
      recommendedFor: 'Everyone looking to test their general knowledge',
    },
    // More subjects...
  };
  
  return subjects[subject];
}