import { memo } from 'react';
import type { Operator } from '../types';
import './OperatorButton.css';

interface OperatorButtonProps {
  operator: Operator;
  disabled: boolean;
  onClick: () => void;
}

export const OperatorButton = memo(function OperatorButton({
  operator,
  disabled,
  onClick,
}: OperatorButtonProps) {
  return (
    <button
      className="operator-button"
      onClick={onClick}
      disabled={disabled}
      aria-label={`${operator} operator`}
    >
      {operator}
    </button>
  );
});
