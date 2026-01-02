import { useState, useEffect } from 'react';
import { useGame } from '../hooks/useGame';
import type { Operator } from '../types';
import { NumberTile } from './NumberTile';
import { OperatorButton } from './OperatorButton';
import { Target } from './Target';
import { MoveHistory } from './MoveHistory';
import { DifficultySelector } from './DifficultySelector';
import { Stars } from './Stars';
import { WinCelebration } from './WinCelebration';
import './Game.css';

const OPERATORS: Operator[] = ['+', '-', '×', '÷'];

export function Game() {
  const {
    gameState,
    selectedNumbers,
    selectedOperator,
    canUndo,
    selectNumber,
    applyOperator,
    undo,
    reset,
    newPuzzle,
    changeDifficulty,
  } = useGame('medium');

  const [newNumberIndex, setNewNumberIndex] = useState<number | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  // Track new numbers for animation
  useEffect(() => {
    if (gameState.moves.length > 0) {
      setNewNumberIndex(gameState.numbers.length - 1);
      const timer = setTimeout(() => setNewNumberIndex(null), 400);
      return () => clearTimeout(timer);
    }
  }, [gameState.moves.length, gameState.numbers.length]);

  useEffect(() => {
    if (gameState.isGameOver) {
      const timer = setTimeout(() => setShowCelebration(true), 600);
      return () => clearTimeout(timer);
    } else {
      setShowCelebration(false);
    }
  }, [gameState.isGameOver]);

  const handleNewPuzzle = () => {
    setShowCelebration(false);
    newPuzzle();
  };

  return (
    <div className="game">
      <header className="game-header">
        <h1>Digits(ish)</h1>
        <DifficultySelector
          current={gameState.difficulty}
          onChange={changeDifficulty}
        />
      </header>

      <main className="game-main">
        <div className="target-section">
          <Target target={gameState.target} isReached={gameState.isWon} />
          <Stars count={gameState.stars} isWon={gameState.isWon} />
        </div>

        <div className="numbers-grid">
          {gameState.numbers.map((num, index) => (
            <NumberTile
              key={`${num}-${index}-${gameState.moves.length}`}
              number={num}
              isSelected={selectedNumbers.includes(index)}
              isNew={index === newNumberIndex}
              onClick={() => selectNumber(index)}
            />
          ))}
        </div>

        <div className="operators-row">
          {OPERATORS.map((op) => (
            <OperatorButton
              key={op}
              operator={op}
              disabled={selectedNumbers.length === 0}
              isSelected={selectedOperator === op}
              onClick={() => applyOperator(op)}
            />
          ))}
        </div>

        <div className="controls-row">
          <button
            className="control-button"
            onClick={undo}
            disabled={!canUndo}
          >
            Undo
          </button>
          <button
            className="control-button"
            onClick={reset}
            disabled={!canUndo}
          >
            Reset
          </button>
          <button
            className="control-button primary"
            onClick={() => newPuzzle()}
          >
            New Puzzle
          </button>
        </div>

        <MoveHistory moves={gameState.moves} />
      </main>

      <WinCelebration
        isVisible={showCelebration}
        stars={gameState.stars}
        target={gameState.target}
        onNewPuzzle={handleNewPuzzle}
      />
    </div>
  );
}
