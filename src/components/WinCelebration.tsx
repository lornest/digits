import { memo, useEffect, useState } from 'react';
import './WinCelebration.css';

interface WinCelebrationProps {
  isVisible: boolean;
  stars: number;
  target: number;
  onNewPuzzle: () => void;
}

export const WinCelebration = memo(function WinCelebration({
  isVisible,
  stars,
  target,
  onNewPuzzle,
}: WinCelebrationProps) {
  const [confetti, setConfetti] = useState<{ id: number; left: number; delay: number }[]>([]);

  useEffect(() => {
    if (isVisible && stars === 3) {
      const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.5,
      }));
      setConfetti(particles);
    } else {
      setConfetti([]);
    }
  }, [isVisible, stars]);

  if (!isVisible) return null;

  const getMessage = () => {
    if (stars === 3) return 'Perfect!';
    if (stars === 2) return 'Great job!';
    if (stars === 1) return 'Good effort!';
    return 'Nice try!';
  };

  return (
    <div className="win-celebration">
      <div className="win-modal">
        <h2>{getMessage()}</h2>
        <p className="target-reached">
          {stars === 3 ? `You reached ${target}!` : stars > 0 ? `Close to ${target}!` : `Target was ${target}`}
        </p>
        <div className="win-stars">
          {[1, 2, 3].map((star) => (
            <span
              key={star}
              className={`win-star ${star <= stars ? 'filled' : ''}`}
              style={{ animationDelay: `${(star - 1) * 0.2}s` }}
            >
              ★
            </span>
          ))}
        </div>
        <button className="new-puzzle-button" onClick={onNewPuzzle}>
          New Puzzle
        </button>
      </div>
      {confetti.map((particle) => (
        <div
          key={particle.id}
          className="confetti"
          style={{
            left: `${particle.left}%`,
            animationDelay: `${particle.delay}s`,
            backgroundColor: ['#ffc107', '#28a745', '#17a2b8', '#dc3545', '#6f42c1'][
              particle.id % 5
            ],
          }}
        />
      ))}
    </div>
  );
});
