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
    case '×':
      if (operand === 0) return null;
      const divResult = result / operand;
      return Number.isInteger(divResult) ? divResult : null;
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
  operandRange: [number, number];
  steps: number;
  smallNumbers: number[];
}

const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  easy: {
    targetRange: [20, 100],
    operandRange: [1, 10],
    steps: 3,
    smallNumbers: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
  },
  medium: {
    targetRange: [100, 300],
    operandRange: [2, 15],
    steps: 4,
    smallNumbers: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15],
  },
  hard: {
    targetRange: [200, 500],
    operandRange: [3, 25],
    steps: 5,
    smallNumbers: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 15, 20, 25],
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

function tryGeneratePuzzle(config: DifficultyConfig, difficulty: Difficulty): Puzzle | null {
  const target = getRandomInt(config.targetRange[0], config.targetRange[1]);
  const numbers: number[] = [];
  const solution: Move[] = [];

  // Start with target and work backwards
  let currentNumbers = [target];

  for (let step = 0; step < config.steps; step++) {
    // Pick a number to "split"
    const numIndex = getRandomInt(0, currentNumbers.length - 1);
    const numToSplit = currentNumbers[numIndex];

    // Try to find a valid reverse operation
    const validOps = shuffle([...OPERATORS]);
    let found = false;

    for (const op of validOps) {
      // Generate an operand
      const operandCandidates = shuffle([...config.smallNumbers]);

      for (const operand of operandCandidates) {
        const newNum = reverseOperation(numToSplit, operand, op);

        if (newNum !== null && newNum > 0 && newNum <= 999 && Number.isInteger(newNum)) {
          // Verify forward operation works
          const forwardResult = applyOperation(newNum, operand, op);
          if (forwardResult === numToSplit) {
            // Valid split found
            currentNumbers.splice(numIndex, 1, newNum, operand);

            // Record the forward move (for solution)
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
      return null; // Failed to generate this puzzle
    }
  }

  // Add some random small numbers to get to 6 total
  while (currentNumbers.length < 6) {
    const smallNum = config.smallNumbers[getRandomInt(0, config.smallNumbers.length - 1)];
    currentNumbers.push(smallNum);
  }

  // Limit to 6 numbers and shuffle
  numbers.push(...shuffle(currentNumbers.slice(0, 6)));

  return {
    startingNumbers: numbers,
    target,
    difficulty,
    solution,
  };
}

function generateFallbackPuzzle(difficulty: Difficulty): Puzzle {
  // Pre-made puzzles for each difficulty
  const fallbacks: Record<Difficulty, Puzzle> = {
    easy: {
      startingNumbers: [2, 3, 5, 7, 10, 4],
      target: 42,
      difficulty: 'easy',
      solution: [
        { num1: 7, num2: 5, operator: '+', result: 12 },
        { num1: 12, num2: 3, operator: '×', result: 36 },
        { num1: 36, num2: 4, operator: '+', result: 40 },
        { num1: 40, num2: 2, operator: '+', result: 42 },
      ],
    },
    medium: {
      startingNumbers: [3, 7, 11, 15, 20, 5],
      target: 156,
      difficulty: 'medium',
      solution: [
        { num1: 15, num2: 5, operator: '-', result: 10 },
        { num1: 11, num2: 10, operator: '+', result: 21 },
        { num1: 21, num2: 7, operator: '×', result: 147 },
        { num1: 147, num2: 3, operator: '+', result: 150 },
      ],
    },
    hard: {
      startingNumbers: [4, 7, 11, 13, 19, 25],
      target: 324,
      difficulty: 'hard',
      solution: [
        { num1: 25, num2: 11, operator: '+', result: 36 },
        { num1: 36, num2: 4, operator: '÷', result: 9 },
        { num1: 9, num2: 7, operator: '+', result: 16 },
        { num1: 19, num2: 13, operator: '+', result: 32 },
        { num1: 16, num2: 32, operator: '×', result: 512 },
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

export function getClosestToTarget(numbers: number[], target: number): number {
  return numbers.reduce((closest, num) => {
    return Math.abs(num - target) < Math.abs(closest - target) ? num : closest;
  }, numbers[0]);
}
