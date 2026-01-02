import { useState, useCallback } from 'react';
import type { GameState, Difficulty, Operator, Move } from '../types';
import { generatePuzzle, calculateStars, getClosestToTarget } from '../utils/puzzleGenerator';
import { applyOperation } from '../utils/operations';

interface GameHistory {
  numbers: number[];
  moves: Move[];
}

export function useGame(initialDifficulty: Difficulty = 'medium') {
  const [gameState, setGameState] = useState<GameState>(() => {
    const puzzle = generatePuzzle(initialDifficulty);
    return {
      numbers: puzzle.startingNumbers,
      target: puzzle.target,
      moves: [],
      difficulty: initialDifficulty,
      isWon: false,
      stars: 0,
    };
  });

  const [history, setHistory] = useState<GameHistory[]>([]);
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);

  const selectNumber = useCallback((index: number) => {
    setSelectedNumbers(prev => {
      if (prev.includes(index)) {
        return prev.filter(i => i !== index);
      }
      if (prev.length < 2) {
        return [...prev, index];
      }
      return [index];
    });
  }, []);

  const applyOperator = useCallback((operator: Operator) => {
    if (selectedNumbers.length !== 2) return;

    const [idx1, idx2] = selectedNumbers;
    const num1 = gameState.numbers[idx1];
    const num2 = gameState.numbers[idx2];

    // Try both orders for non-commutative operations
    let result = applyOperation(num1, num2, operator);
    let finalNum1 = num1;
    let finalNum2 = num2;

    if (result === null || result <= 0) {
      // Try reverse order
      result = applyOperation(num2, num1, operator);
      finalNum1 = num2;
      finalNum2 = num1;
    }

    if (result === null || result <= 0) return;

    // Save current state to history for undo
    setHistory(prev => [...prev, {
      numbers: [...gameState.numbers],
      moves: [...gameState.moves],
    }]);

    const newMove: Move = {
      num1: finalNum1,
      num2: finalNum2,
      operator,
      result,
    };

    // Create new numbers array
    const newNumbers = gameState.numbers.filter((_, i) => i !== idx1 && i !== idx2);
    newNumbers.push(result);

    // Check if won
    const isWon = result === gameState.target;
    const stars = isWon ? 3 : calculateStars(getClosestToTarget(newNumbers, gameState.target), gameState.target);

    setGameState(prev => ({
      ...prev,
      numbers: newNumbers,
      moves: [...prev.moves, newMove],
      isWon,
      stars,
    }));

    setSelectedNumbers([]);
  }, [selectedNumbers, gameState]);

  const undo = useCallback(() => {
    if (history.length === 0) return;

    const previousState = history[history.length - 1];
    setHistory(prev => prev.slice(0, -1));

    setGameState(prev => ({
      ...prev,
      numbers: previousState.numbers,
      moves: previousState.moves,
      isWon: false,
      stars: calculateStars(getClosestToTarget(previousState.numbers, prev.target), prev.target),
    }));

    setSelectedNumbers([]);
  }, [history]);

  const reset = useCallback(() => {
    if (history.length === 0) return;

    const initialState = history[0];
    setHistory([]);

    setGameState(prev => ({
      ...prev,
      numbers: initialState.numbers,
      moves: [],
      isWon: false,
      stars: 0,
    }));

    setSelectedNumbers([]);
  }, [history]);

  const newPuzzle = useCallback((difficulty?: Difficulty) => {
    const diff = difficulty ?? gameState.difficulty;
    const puzzle = generatePuzzle(diff);

    setGameState({
      numbers: puzzle.startingNumbers,
      target: puzzle.target,
      moves: [],
      difficulty: diff,
      isWon: false,
      stars: 0,
    });

    setHistory([]);
    setSelectedNumbers([]);
  }, [gameState.difficulty]);

  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    newPuzzle(difficulty);
  }, [newPuzzle]);

  return {
    gameState,
    selectedNumbers,
    canUndo: history.length > 0,
    selectNumber,
    applyOperator,
    undo,
    reset,
    newPuzzle,
    changeDifficulty,
  };
}
