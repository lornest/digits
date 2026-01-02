import { memo } from 'react';
import type { Move } from '../types';
import './MoveHistory.css';

interface MoveHistoryProps {
  moves: Move[];
}

export const MoveHistory = memo(function MoveHistory({ moves }: MoveHistoryProps) {
  if (moves.length === 0) {
    return (
      <div className="move-history empty">
        <p>Select two numbers and an operator to begin</p>
      </div>
    );
  }

  return (
    <div className="move-history">
      <h3>Moves</h3>
      <ul className="moves-list">
        {moves.map((move, index) => (
          <li key={index} className="move-item">
            <span className="move-number">{index + 1}.</span>
            <span className="move-equation">
              {move.num1} {move.operator} {move.num2} = {move.result}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
});
