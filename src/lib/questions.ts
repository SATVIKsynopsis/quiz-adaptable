type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: 'easy' | 'medium' | 'hard';
  subject: string;
};

export const questionPool: Question[] = [
  // ================== GENERAL KNOWLEDGE ==================
  {
    id: 'gk-e1',
    text: 'What is the capital of France?',
    options: ['London', 'Paris', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
    explanation: 'Paris has been the capital of France since the 5th century.',
    difficulty: 'easy',
    subject: 'general',
  },
  {
    id: 'gk-e2',
    text: 'Which planet is known as the Red Planet?',
    options: ['Venus', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
    explanation: 'Mars appears red due to iron oxide (rust) on its surface.',
    difficulty: 'easy',
    subject: 'general',
  },
  {
    id: 'gk-m1',
    text: 'Which country is home to the kangaroo?',
    options: ['South Africa', 'Brazil', 'Australia', 'New Zealand'],
    correctAnswer: 'Australia',
    explanation: 'Kangaroos are marsupials native to Australia.',
    difficulty: 'medium',
    subject: 'general',
  },
  {
    id: 'gk-h1',
    text: 'What is the smallest country in the world by land area?',
    options: ['Monaco', 'Vatican City', 'San Marino', 'Liechtenstein'],
    correctAnswer: 'Vatican City',
    explanation: 'Vatican City covers just 0.49 square kilometers.',
    difficulty: 'hard',
    subject: 'general',
  },
  // Add 11 more general knowledge questions...

  // ================== SCIENCE ==================
  {
    id: 'sc-e1',
    text: 'What is H₂O more commonly known as?',
    options: ['Hydrogen', 'Oxygen', 'Water', 'Carbon Dioxide'],
    correctAnswer: 'Water',
    explanation: 'H₂O is the chemical formula for water.',
    difficulty: 'easy',
    subject: 'science',
  },
  {
    id: 'sc-m1',
    text: 'Which gas do plants absorb from the atmosphere?',
    options: ['Oxygen', 'Nitrogen', 'Carbon Dioxide', 'Hydrogen'],
    correctAnswer: 'Carbon Dioxide',
    explanation: 'Plants use CO₂ for photosynthesis.',
    difficulty: 'medium',
    subject: 'science',
  },
  {
    id: 'sc-h1',
    text: 'What is the atomic number of Gold?',
    options: ['47', '79', '82', '118'],
    correctAnswer: '79',
    explanation: 'Gold has 79 protons in its nucleus.',
    difficulty: 'hard',
    subject: 'science',
  },
  // Add 12 more science questions...

  // ================== HISTORY ==================
  {
    id: 'hi-e1',
    text: 'In which year did World War II end?',
    options: ['1943', '1945', '1947', '1950'],
    correctAnswer: '1945',
    explanation: 'WWII ended on September 2, 1945.',
    difficulty: 'easy',
    subject: 'history',
  },
  {
    id: 'hi-m1',
    text: 'Who was the first President of the United States?',
    options: ['Thomas Jefferson', 'John Adams', 'George Washington', 'Benjamin Franklin'],
    correctAnswer: 'George Washington',
    explanation: 'Washington served from 1789 to 1797.',
    difficulty: 'medium',
    subject: 'history',
  },
  {
    id: 'hi-h1',
    text: 'Which ancient civilization built the Machu Picchu complex?',
    options: ['Aztec', 'Maya', 'Inca', 'Olmec'],
    correctAnswer: 'Inca',
    explanation: 'Machu Picchu was built by the Inca Empire in the 15th century.',
    difficulty: 'hard',
    subject: 'history',
  },
  // Add 12 more history questions...

  // ================== TECHNOLOGY ==================
  {
    id: 'te-e1',
    text: 'What does "CPU" stand for?',
    options: ['Central Processing Unit', 'Computer Processing Unit', 'Central Process Unit', 'Core Processing Unit'],
    correctAnswer: 'Central Processing Unit',
    explanation: 'CPU is the brain of the computer.',
    difficulty: 'easy',
    subject: 'technology',
  },
  {
    id: 'te-m1',
    text: 'Which company developed the Android operating system?',
    options: ['Apple', 'Microsoft', 'Google', 'Amazon'],
    correctAnswer: 'Google',
    explanation: 'Google acquired Android Inc. in 2005.',
    difficulty: 'medium',
    subject: 'technology',
  },
  {
    id: 'te-h1',
    text: 'What does the "S" in HTTPS stand for?',
    options: ['Secure', 'System', 'Standard', 'Service'],
    correctAnswer: 'Secure',
    explanation: 'HTTPS is the secure version of HTTP.',
    difficulty: 'hard',
    subject: 'technology',
  },
  // Add 12 more technology questions...

  // ================== ARTS & CULTURE ==================
  {
    id: 'ar-e1',
    text: 'Who painted the Mona Lisa?',
    options: ['Vincent van Gogh', 'Pablo Picasso', 'Leonardo da Vinci', 'Michelangelo'],
    correctAnswer: 'Leonardo da Vinci',
    explanation: 'Painted between 1503-1519, now in the Louvre.',
    difficulty: 'easy',
    subject: 'arts',
  },
  {
    id: 'ar-m1',
    text: 'Which Shakespeare play features the character Ophelia?',
    options: ['Macbeth', 'Hamlet', 'Romeo and Juliet', 'Othello'],
    correctAnswer: 'Hamlet',
    explanation: 'Ophelia is Hamlet\'s love interest.',
    difficulty: 'medium',
    subject: 'arts',
  },
  {
    id: 'ar-h1',
    text: 'In which year did The Beatles release their album "Sgt. Pepper\'s Lonely Hearts Club Band"?',
    options: ['1965', '1967', '1969', '1971'],
    correctAnswer: '1967',
    explanation: 'Considered one of the greatest albums of all time.',
    difficulty: 'hard',
    subject: 'arts',
  },
  // Add 12 more arts questions...

  // ================== SPORTS ==================
  {
    id: 'sp-e1',
    text: 'How many players are on a soccer team during a match?',
    options: ['9', '10', '11', '12'],
    correctAnswer: '11',
    explanation: 'Soccer teams have 11 players including the goalkeeper.',
    difficulty: 'easy',
    subject: 'sports',
  },
  {
    id: 'sp-m1',
    text: 'Which country won the 2018 FIFA World Cup?',
    options: ['Germany', 'Brazil', 'France', 'Croatia'],
    correctAnswer: 'France',
    explanation: 'France defeated Croatia 4-2 in the final.',
    difficulty: 'medium',
    subject: 'sports',
  },
  {
    id: 'sp-h1',
    text: 'Who is the only boxer to remain undefeated throughout his professional career?',
    options: ['Muhammad Ali', 'Mike Tyson', 'Rocky Marciano', 'Floyd Mayweather'],
    correctAnswer: 'Rocky Marciano',
    explanation: 'Marciano retired with a 49-0 record in 1956.',
    difficulty: 'hard',
    subject: 'sports',
  },
  // Add 12 more sports questions...
];

export function getQuestionsBySubject(subject: string, difficulty: string) {
  return questionPool
    .filter(q => q.subject === subject && (difficulty === 'all' || q.difficulty === difficulty))
    .sort(() => 0.5 - Math.random())
    .slice(0, 15); // Return 15 questions
}

export function getSubjectDetails(subject: string) {
  const subjects: Record<string, { title: string; description: string; icon: string }> = {
    general: {
      title: 'General Knowledge',
      description: 'Test your knowledge across various topics',
      icon: '🌍',
    },
    science: {
      title: 'Science',
      description: 'Explore questions about the natural world',
      icon: '🔬',
    },
    history: {
      title: 'History',
      description: 'Journey through time with historical questions',
      icon: '🏛️',
    },
    technology: {
      title: 'Technology',
      description: 'Digital age and computing knowledge',
      icon: '💻',
    },
    arts: {
      title: 'Arts & Culture',
      description: 'Creative expressions and cultural knowledge',
      icon: '🎨',
    },
    sports: {
      title: 'Sports',
      description: 'Test your athletic knowledge',
      icon: '⚽',
    },
  };
  
  return subjects[subject];
}