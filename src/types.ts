export type Operator = '+' | '-' | '×' | '÷';

export interface Move {
  num1: number;
  num2: number;
  operator: Operator;
  result: number;
}

export interface GameState {
  numbers: (number | null)[];
  target: number;
  moves: Move[];
  difficulty: Difficulty;
  isWon: boolean;
  isGameOver: boolean;
  stars: number;
}

export type Difficulty = 'easy' | 'medium' | 'hard';

export interface Puzzle {
  startingNumbers: number[];
  target: number;
  difficulty: Difficulty;
  solution: Move[];
}
