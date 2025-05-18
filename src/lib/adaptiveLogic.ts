type Difficulty = 'easy' | 'medium' | 'hard';
type UserAnswer = { isCorrect: boolean; timeTaken: number };

export function getNextDifficulty(
  currentDifficulty: Difficulty,
  userAnswers: UserAnswer[],
  streakLength: number = 3
): Difficulty {
 
  const lastThree = userAnswers.slice(-3);
  const correctCount = lastThree.filter(a => a.isCorrect).length;
  const avgTime = lastThree.reduce((sum, a) => sum + a.timeTaken, 0) / (lastThree.length || 1);

  // Adaptive logic
  if (lastThree.length >= streakLength) {
    if (correctCount === streakLength && avgTime < 15) {
      
      return increaseDifficulty(currentDifficulty);
    } else if (correctCount === 0) {
     
      return decreaseDifficulty(currentDifficulty);
    }
  }

  
  return currentDifficulty;
}

function increaseDifficulty(d: Difficulty): Difficulty {
  return d === 'easy' ? 'medium' : d === 'medium' ? 'hard' : 'hard';
}

function decreaseDifficulty(d: Difficulty): Difficulty {
  return d === 'hard' ? 'medium' : d === 'medium' ? 'easy' : 'easy';
}