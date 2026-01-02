import { memo } from 'react';
import type { Difficulty } from '../types';
import './DifficultySelector.css';

interface DifficultySelectorProps {
  current: Difficulty;
  onChange: (difficulty: Difficulty) => void;
}

const DIFFICULTIES: { value: Difficulty; label: string }[] = [
  { value: 'easy', label: 'Easy' },
  { value: 'medium', label: 'Medium' },
  { value: 'hard', label: 'Hard' },
];

export const DifficultySelector = memo(function DifficultySelector({
  current,
  onChange,
}: DifficultySelectorProps) {
  return (
    <div className="difficulty-selector">
      {DIFFICULTIES.map(({ value, label }) => (
        <button
          key={value}
          className={`difficulty-button ${current === value ? 'active' : ''}`}
          onClick={() => onChange(value)}
          aria-pressed={current === value}
        >
          {label}
        </button>
      ))}
    </div>
  );
});
