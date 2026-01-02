import { useState, useCallback } from 'react';
import type { GameState, Difficulty, Operator, Move } from '../types';
import { generatePuzzle, calculateStars, getClosestToTarget } from '../utils/puzzleGenerator';
import { applyOperation } from '../utils/operations';

interface GameHistory {
  numbers: number[];
  moves: Move[];
}

interface SelectionState {
  firstNumberIndex: number | null;
  operator: Operator | null;
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
  const [selection, setSelection] = useState<SelectionState>({
    firstNumberIndex: null,
    operator: null,
  });

  const selectedNumbers = selection.firstNumberIndex !== null ? [selection.firstNumberIndex] : [];

  const selectNumber = useCallback((index: number) => {
    setSelection(prev => {
      if (prev.firstNumberIndex === null) {
        return { firstNumberIndex: index, operator: null };
      }
      
      if (prev.firstNumberIndex === index) {
        return { firstNumberIndex: null, operator: null };
      }
      
      if (prev.operator === null) {
        return { firstNumberIndex: index, operator: null };
      }
      
      return prev;
    });
  }, []);

  const selectOperator = useCallback((operator: Operator) => {
    if (selection.firstNumberIndex === null) return;
    
    setSelection(prev => ({
      ...prev,
      operator,
    }));
  }, [selection.firstNumberIndex]);

  const applySecondNumber = useCallback((secondIndex: number) => {
    if (selection.firstNumberIndex === null || selection.operator === null) return;
    if (secondIndex === selection.firstNumberIndex) return;

    const idx1 = selection.firstNumberIndex;
    const idx2 = secondIndex;
    const num1 = gameState.numbers[idx1];
    const num2 = gameState.numbers[idx2];
    const operator = selection.operator;

    let result = applyOperation(num1, num2, operator);
    let finalNum1 = num1;
    let finalNum2 = num2;

    if (result === null || result <= 0) {
      result = applyOperation(num2, num1, operator);
      finalNum1 = num2;
      finalNum2 = num1;
    }

    if (result === null || result <= 0) {
      setSelection({ firstNumberIndex: null, operator: null });
      return;
    }

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

    const newNumbers = gameState.numbers
      .map((num, i) => i === idx2 ? result : num)
      .filter((_, i) => i !== idx1);

    const isWon = result === gameState.target;
    const stars = isWon ? 3 : calculateStars(getClosestToTarget(newNumbers, gameState.target), gameState.target);

    setGameState(prev => ({
      ...prev,
      numbers: newNumbers,
      moves: [...prev.moves, newMove],
      isWon,
      stars,
    }));

    setSelection({ firstNumberIndex: null, operator: null });
  }, [selection, gameState]);

  const handleNumberClick = useCallback((index: number) => {
    if (selection.firstNumberIndex !== null && selection.operator !== null && index !== selection.firstNumberIndex) {
      applySecondNumber(index);
    } else {
      selectNumber(index);
    }
  }, [selection, selectNumber, applySecondNumber]);

  const applyOperator = useCallback((operator: Operator) => {
    selectOperator(operator);
  }, [selectOperator]);

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

    setSelection({ firstNumberIndex: null, operator: null });
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

    setSelection({ firstNumberIndex: null, operator: null });
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
    setSelection({ firstNumberIndex: null, operator: null });
  }, [gameState.difficulty]);

  const changeDifficulty = useCallback((difficulty: Difficulty) => {
    newPuzzle(difficulty);
  }, [newPuzzle]);

  return {
    gameState,
    selectedNumbers,
    selectedOperator: selection.operator,
    canUndo: history.length > 0,
    selectNumber: handleNumberClick,
    applyOperator,
    undo,
    reset,
    newPuzzle,
    changeDifficulty,
  };
}
