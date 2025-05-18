"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';


interface Question {
  id: number | string;
  text: string;
  options: string[];
  correctAnswer: string;
}

export function QuestionCard({
  question,
  selectedOption,
  onSelect,
  showFeedback,
  isCorrect,
}: {
  question: Question;
  selectedOption: string | null;
  onSelect: (option: string) => void;
  showFeedback: boolean;
  isCorrect: boolean;
}) {
  const [shuffledOptions, setShuffledOptions] = useState<string[]>([]);

  useEffect(() => {
    const options = [...question.options];
    for (let i = options.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [options[i], options[j]] = [options[j], options[i]];
    }
    setShuffledOptions(options);
  }, [question]);

  const getOptionVariant = (option: string) => {
    if (!showFeedback) {
      return option === selectedOption ? 'selected' : 'default';
    }

    if (option === question.correctAnswer) return 'correct';
    if (option === selectedOption && !isCorrect) return 'incorrect';
    return 'default';
  };

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 shadow-2xl border border-white/20">
      <div className="mb-6">
        <span className="text-sm font-medium text-purple-300">
          Question {question.id}
        </span>
        <h2 className="text-2xl font-bold mt-1">{question.text}</h2>
      </div>

      <div className="space-y-3">
        {shuffledOptions.map((option, index) => (
          <OptionButton
            key={index}
            option={option}
            variant={getOptionVariant(option)}
            onClick={() => onSelect(option)}
            disabled={showFeedback}
          />
        ))}
      </div>
    </div>
  );
}

function OptionButton({
  option,
  variant,
  onClick,
  disabled,
}: {
  option: string;
  variant: 'default' | 'selected' | 'correct' | 'incorrect';
  onClick: () => void;
  disabled: boolean;
}) {
  const variants = {
    default: 'bg-white/5 hover:bg-white/10 border-white/10',
    selected: 'bg-purple-500/30 border-purple-400/50',
    correct: 'bg-green-500/30 border-green-400/50',
    incorrect: 'bg-red-500/30 border-red-400/50',
  };

  return (
    <motion.button
      whileHover={!disabled ? { scale: 1.02 } : {}}
      whileTap={!disabled ? { scale: 0.98 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`w-full text-left p-4 rounded-xl border transition-all ${variants[variant]} ${disabled ? 'cursor-default' : 'cursor-pointer'}`}
    >
      {option}
    </motion.button>
  );
}