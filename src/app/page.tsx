'use client';

import { useRouter } from 'next/navigation';
import { useQuiz } from './context/QuizContext';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Brain, ArrowRight, Layers, Award } from 'lucide-react';

export default function Home() {
  const router = useRouter();
  const { subject, difficulty, setSubject, setDifficulty, resetQuiz } = useQuiz();
  const [isHovering, setIsHovering] = useState(false);
  const [backgroundPosition, setBackgroundPosition] = useState({ x: 0, y: 0 });


  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;
      setBackgroundPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleStartQuiz = () => {
    if (!subject) {
      alert('Please select a subject first');
      return;
    }
    resetQuiz();
    router.push(`/quiz/${subject}/play`);
  };

  const subjects = [
    { id: 'math', label: 'Mathematics', icon: '∑' },
    { id: 'science', label: 'Science', icon: '⚗️' },
    { id: 'history', label: 'History', icon: '🏛️' },
    { id: 'literature', label: 'Literature', icon: '📚' },
    { id: 'geography', label: 'Geography', icon: '🌍' },
    { id: 'coding', label: 'Coding', icon: '💻' },
  ];

  const difficulties = [
    { id: 'beginner', label: 'Beginner', description: 'Perfect for starters' },
    { id: 'intermediate', label: 'Intermediate', description: 'For those with some knowledge' },
    { id: 'advanced', label: 'Advanced', description: 'Challenge your expertise' },
    { id: 'expert', label: 'Expert', description: 'For true masters' },
  ];

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-fuchsia-700 text-white overflow-hidden relative"
      style={{
        backgroundPosition: `${backgroundPosition.x * 10}% ${backgroundPosition.y * 10}%`,
      }}
    >
    
   
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full bg-white opacity-20 pointer-events-none"
          style={{
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${Math.random() * 10 + 10}s linear infinite`,
            animationDelay: `${Math.random() * 10}s`,
          }}
        />
      ))}
      
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center relative z-10">
       
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center mb-4"
        >
          <div className="relative">
            <Brain size={48} className="text-purple-300" />
            <motion.div
              animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <Sparkles size={64} className="text-cyan-300 opacity-70" />
            </motion.div>
          </div>
        </motion.div>

      
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-purple-300 to-pink-300"
        >
          Adaptive Quiz Master
        </motion.h1>

  
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-500 border border-white/20">
            <Award size={14} className="mr-1" />
            Premium Experience
          </span>
        </motion.div>

      
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.9 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-xl md:text-2xl text-center mb-12 max-w-2xl font-light"
        >
          Challenge yourself with our intelligent quiz system that adapts to your knowledge level in real-time
        </motion.p>

        <div className="w-full max-w-4xl grid md:grid-cols-2 gap-6 px-4">
         
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 overflow-hidden relative group"
          >
          
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-purple-500/20 rounded-full filter blur-2xl group-hover:bg-purple-400/30 transition-all duration-700"></div>
            
            <div className="flex items-center mb-6">
              <Layers className="w-6 h-6 mr-3 text-cyan-300" />
              <h2 className="text-2xl font-semibold">Choose Your Subject</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {subjects.map((subjectOption) => (
                <motion.button
                  key={subjectOption.id}
                  whileHover={{ scale: 1.03, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSubject(subjectOption.id)}
                  className={`flex items-center px-4 py-3 rounded-xl transition-all ${
                    subject === subjectOption.id
                      ? 'bg-gradient-to-r from-purple-600 to-blue-500 shadow-lg'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <span className="text-xl mr-3">{subjectOption.icon}</span>
                  <span className="font-medium">{subjectOption.label}</span>
                </motion.button>
              ))}
            </div>
            
            {subject && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 text-center"
              >
                <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-500/30 border border-purple-400/30">
                  {subjects.find(s => s.id === subject)?.label || subject}
                </span>
              </motion.div>
            )}
          </motion.div>

       
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 1 }}
            className="bg-white/10 backdrop-blur-md rounded-2xl p-8 shadow-2xl border border-white/20 overflow-hidden relative group"
          >
            
            <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-blue-500/20 rounded-full filter blur-2xl group-hover:bg-blue-400/30 transition-all duration-700"></div>
            
            <div className="flex items-center mb-6">
              <svg className="w-6 h-6 mr-3 text-pink-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3L4 9V21H20V9L12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M16 14C16 15.0609 15.5786 16.0783 14.8284 16.8284C14.0783 17.5786 13.0609 18 12 18C10.9391 18 9.92172 17.5786 9.17157 16.8284C8.42143 16.0783 8 15.0609 8 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <h2 className="text-2xl font-semibold">Select Difficulty</h2>
            </div>
            
            <div className="space-y-3">
              {difficulties.map((diffOption) => (
                <motion.button
                  key={diffOption.id}
                  whileHover={{ scale: 1.02, x: 3 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setDifficulty(diffOption.id)}
                  className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all ${
                    difficulty === diffOption.id
                      ? 'bg-gradient-to-r from-blue-600 to-cyan-500 shadow-lg'
                      : 'bg-white/10 hover:bg-white/20'
                  }`}
                >
                  <span className="font-medium">{diffOption.label}</span>
                  <span className="text-xs opacity-80">{diffOption.description}</span>
                </motion.button>
              ))}
            </div>

            
            <motion.button
              whileHover={subject ? { scale: 1.03, y: -2 } : {}}
              whileTap={subject ? { scale: 0.98 } : {}}
              onHoverStart={() => setIsHovering(true)}
              onHoverEnd={() => setIsHovering(false)}
              onClick={handleStartQuiz}
              disabled={!subject}
              className={`mt-8 w-full px-6 py-4 rounded-xl font-bold text-lg flex items-center justify-center transition-all relative overflow-hidden ${
                subject
                  ? 'bg-gradient-to-r from-pink-600 to-purple-600 hover:from-pink-500 hover:to-purple-500 shadow-lg hover:shadow-xl'
                  : 'bg-gray-600 cursor-not-allowed opacity-60'
              }`}
            >
              {subject ? (
                <>
                  <span>Start {subject.charAt(0).toUpperCase() + subject.slice(1)} Quiz</span>
                  <ArrowRight 
                    className={`ml-2 transition-transform duration-300 ${isHovering ? 'translate-x-1' : ''}`} 
                    size={18} 
                  />
                </>
              ) : (
                'Select a Subject First'
              )}
              
             
              {subject && (
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
                  <motion.div
                    animate={{ 
                      opacity: isHovering ? [0, 1, 0] : 0,
                      scale: isHovering ? [0.5, 1.5] : 0.5
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                    className="absolute w-full h-full bg-white opacity-10 rounded-full"
                  />
                </div>
              )}
            </motion.button>
          </motion.div>
        </div>

      
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.3 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl"
        >
          {[
            { 
              title: 'Adaptive Questions',
              description: 'Questions adjust based on your performance',
              icon: (
                <svg className="w-6 h-6 text-cyan-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 9L12 16L5 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )
            },
            { 
              title: 'Real-time Feedback',
              description: 'Instant insights into your performance',
              icon: (
                <svg className="w-6 h-6 text-pink-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 8V12L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
                </svg>
              )
            },
            { 
              title: 'Progress Tracking',
              description: 'Monitor your improvement over time',
              icon: (
                <svg className="w-6 h-6 text-purple-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22 12H18L15 21L9 3L6 12H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/5 backdrop-blur-sm rounded-xl p-5 border border-white/10 flex flex-col items-center text-center group"
            >
              <div className="p-3 rounded-full bg-white/10 mb-4 group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-colors duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-medium mb-1">{feature.title}</h3>
              <p className="text-sm opacity-80">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

       
        <div className="mt-16 text-sm opacity-60 text-center">
          <p>© {new Date().getFullYear()} Adaptive Quiz Master • Enhance your knowledge journey</p>
        </div>
      </div>
    </div>
  );
}