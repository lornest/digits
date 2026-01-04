import type { Difficulty, Move, Operator, Puzzle } from '../types';
import { applyOperation } from './operations';

const OPERATORS: Operator[] = ['+', '-', '×', '÷'];

// Reverse operations for puzzle generation
function reverseOperation(result: number, operand: number, op: Operator): number | null {
  switch (op) {
    case '+':
      return result - operand;
    case '-':
      return result + operand;
    case '×': {
      if (operand === 0) return null;
      const divResult = result / operand;
      return Number.isInteger(divResult) ? divResult : null;
    }
    case '÷':
      return result * operand;
    default:
      return null;
  }
}

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

interface DifficultyConfig {
  targetRange: [number, number];
  steps: number;
  smallPool: number[];  // Numbers 1-9 (top row)
  largePool: number[];  // Numbers 10-25 (bottom row)
}

const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: {
    targetRange: [40, 100],
    steps: 3,
    smallPool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    largePool: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  },
  medium: {
    targetRange: [100, 300],
    steps: 4,
    smallPool: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    largePool: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  },
  hard: {
    targetRange: [200, 500],
    steps: 5,
    smallPool: [2, 3, 4, 5, 6, 7, 8, 9],  // Exclude 1 from hard mode
    largePool: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25],
  },
};

export function generatePuzzle(difficulty: Difficulty): Puzzle {
  const config = DIFFICULTY_CONFIG[difficulty];
  const maxAttempts = 100;

  for (let attempt = 0; attempt < maxAttempts; attempt++) {
    const result = tryGeneratePuzzle(config, difficulty);
    if (result) {
      return result;
    }
  }

  // Fallback to a simple known-solvable puzzle
  return generateFallbackPuzzle(difficulty);
}

function isSmallNumber(n: number): boolean {
  return n >= 1 && n <= 9;
}

function isLargeNumber(n: number): boolean {
  return n >= 10 && n <= 25;
}

function pickRandomFromPool(pool: number[], exclude: number[] = []): number {
  const available = pool.filter(n => !exclude.includes(n));
  if (available.length === 0) return pool[getRandomInt(0, pool.length - 1)];
  return available[getRandomInt(0, available.length - 1)];
}

function tryGeneratePuzzle(config: DifficultyConfig, difficulty: Difficulty): Puzzle | null {
  const target = getRandomInt(config.targetRange[0], config.targetRange[1]);
  const solution: Move[] = [];
  const allPools = shuffle([...config.smallPool, ...config.largePool]);

  const currentNumbers = [target];

  for (let step = 0; step < config.steps; step++) {
    const numIndex = getRandomInt(0, currentNumbers.length - 1);
    const numToSplit = currentNumbers[numIndex];

    const validOps = shuffle([...OPERATORS]);
    let found = false;

    for (const op of validOps) {
      const operandCandidates = shuffle([...allPools]);

      for (const operand of operandCandidates) {
        const newNum = reverseOperation(numToSplit, operand, op);

        if (newNum !== null && newNum > 0 && newNum <= 999 && Number.isInteger(newNum)) {
          const forwardResult = applyOperation(newNum, operand, op);
          if (forwardResult === numToSplit) {
            currentNumbers.splice(numIndex, 1, newNum, operand);

            solution.unshift({
              num1: newNum,
              num2: operand,
              operator: op,
              result: numToSplit,
            });

            found = true;
            break;
          }
        }
      }

      if (found) break;
    }

    if (!found) {
      return null;
    }
  }

  const generated = currentNumbers.slice(0, 6);
  const smallNumbers = generated.filter(isSmallNumber);
  const largeNumbers = generated.filter(isLargeNumber);
  const otherNumbers = generated.filter(n => !isSmallNumber(n) && !isLargeNumber(n));

  if (otherNumbers.length > 0) {
    return null;
  }

  const finalSmall: number[] = [...smallNumbers];
  const finalLarge: number[] = [...largeNumbers];

  while (finalSmall.length < 3) {
    finalSmall.push(pickRandomFromPool(config.smallPool, finalSmall));
  }

  while (finalLarge.length < 3) {
    finalLarge.push(pickRandomFromPool(config.largePool, finalLarge));
  }

  if (finalSmall.length > 3 || finalLarge.length > 3) {
    return null;
  }

  const countOfOnes = finalSmall.filter(n => n === 1).length;
  if (countOfOnes > 1) {
    return null;
  }

  const startingNumbers = [
    ...finalSmall.sort((a, b) => a - b),
    ...finalLarge.sort((a, b) => a - b),
  ];

  return {
    startingNumbers,
    target,
    difficulty,
    solution,
  };
}

function generateFallbackPuzzle(difficulty: Difficulty): Puzzle {
  const fallbacks: Record<Difficulty, Puzzle> = {
    easy: {
      startingNumbers: [2, 3, 7, 10, 14, 20],
      target: 42,
      difficulty: 'easy',
      solution: [
        { num1: 20, num2: 14, operator: '-', result: 6 },
        { num1: 7, num2: 6, operator: '×', result: 42 },
      ],
    },
    medium: {
      startingNumbers: [3, 5, 7, 11, 13, 20],
      target: 156,
      difficulty: 'medium',
      solution: [
        { num1: 7, num2: 5, operator: '+', result: 12 },
        { num1: 13, num2: 12, operator: '×', result: 156 },
      ],
    },
    hard: {
      startingNumbers: [2, 4, 9, 12, 18, 25],
      target: 324,
      difficulty: 'hard',
      solution: [
        { num1: 25, num2: 2, operator: '+', result: 27 },
        { num1: 12, num2: 27, operator: '×', result: 324 },
      ],
    },
  };

  return fallbacks[difficulty];
}

export function calculateStars(current: number, target: number): number {
  const diff = Math.abs(current - target);
  if (diff === 0) return 3;
  if (diff <= 10) return 2;
  if (diff <= 25) return 1;
  return 0;
}

export function getClosestToTarget(numbers: (number | null)[], target: number): number {
  const validNumbers = numbers.filter((n): n is number => n !== null);
  return validNumbers.reduce((closest, num) => {
    return Math.abs(num - target) < Math.abs(closest - target) ? num : closest;
  }, validNumbers[0]);
}
