import { memo } from 'react';
import type { Operator } from '../types';
import './OperatorButton.css';

interface OperatorButtonProps {
  operator: Operator;
  disabled: boolean;
  isSelected: boolean;
  onClick: () => void;
}

export const OperatorButton = memo(function OperatorButton({
  operator,
  disabled,
  isSelected,
  onClick,
}: OperatorButtonProps) {
  return (
    <button
      className={`operator-button ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={`${operator} operator`}
      aria-pressed={isSelected}
    >
      {operator}
    </button>
  );
});
