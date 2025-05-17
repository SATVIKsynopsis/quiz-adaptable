'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from './context/QuizContext';
import { FadeIn } from './components/animations/FadeIn';
import { BounceIn } from './components/animations/BounceIn';
import { DifficultySelector } from './components/quiz/DifficultySelector';
import { SubjectSelector } from './components/quiz/SubjectSelector';

export default function Home() {
  const router = useRouter();
  const { subject, difficulty, resetQuiz } = useQuiz();

  const handleStartQuiz = () => {
    if (!subject) {
      alert('Please select a subject first');
      return;
    }
    resetQuiz(); // Reset previous quiz state
    router.push(`/quiz/${subject}/play`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 text-white">
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center">
        {/* Animated Title */}
        <FadeIn delay={0.2}>
          <h1 className="text-5xl md:text-7xl font-bold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-300">
            Adaptive Quiz Master
          </h1>
        </FadeIn>
        
        {/* Animated Subtitle */}
        <BounceIn delay={0.5}>
          <p className="text-xl md:text-2xl text-center mb-12 max-w-3xl opacity-90">
            Test your knowledge with our smart quiz that adapts to your skill level.
            Choose your subject and difficulty to begin!
          </p>
        </BounceIn>
        
        <div className="w-full max-w-2xl space-y-12">
          {/* Subject Selection Card */}
          <FadeIn delay={0.8}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-semibold mb-6 text-center">Select Your Subject</h2>
              <SubjectSelector />
              {subject && (
                <p className="mt-4 text-center text-sm text-purple-200">
                  Selected: <span className="font-medium">{subject}</span>
                </p>
              )}
            </div>
          </FadeIn>
          
          {/* Difficulty Selection Card */}
          <FadeIn delay={1.1}>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20">
              <h2 className="text-2xl font-semibold mb-6 text-center">Choose Difficulty</h2>
              <DifficultySelector />
              {difficulty && (
                <p className="mt-4 text-center text-sm text-purple-200">
                  Selected: <span className="font-medium capitalize">{difficulty}</span>
                </p>
              )}
              
              {/* Start Quiz Button */}
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleStartQuiz}
                  disabled={!subject}
                  className={`px-8 py-4 text-lg font-bold rounded-lg transition-all ${
                    subject 
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 transform hover:scale-105 shadow-lg hover:shadow-xl'
                      : 'bg-gray-500 cursor-not-allowed opacity-70'
                  }`}
                >
                  {subject ? `Start ${subject} Quiz` : 'Select a Subject'}
                </button>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </div>
  );
}