import { memo } from 'react';
import './NumberTile.css';

interface NumberTileProps {
  number: number | null;
  isSelected: boolean;
  isNew: boolean;
  onClick: () => void;
}

export const NumberTile = memo(function NumberTile({
  number,
  isSelected,
  isNew,
  onClick,
}: NumberTileProps) {
  if (number === null) {
    return (
      <div className="number-tile empty" aria-hidden="true" />
    );
  }

  return (
    <button
      className={`number-tile ${isSelected ? 'selected' : ''} ${isNew ? 'new' : ''}`}
      onClick={onClick}
      aria-pressed={isSelected}
      aria-label={`Number ${number}`}
    >
      {number}
    </button>
  );
});
