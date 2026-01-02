import { memo } from 'react';
import './Stars.css';

interface StarsProps {
  count: number;
  isWon: boolean;
}

export const Stars = memo(function Stars({ count, isWon }: StarsProps) {
  return (
    <div className={`stars ${isWon ? 'won' : ''}`}>
      {[1, 2, 3].map((star) => (
        <span
          key={star}
          className={`star ${star <= count ? 'filled' : ''}`}
          style={{ animationDelay: `${(star - 1) * 0.15}s` }}
        >
          ★
        </span>
      ))}
    </div>
  );
});
