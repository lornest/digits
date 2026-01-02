import { memo } from 'react';
import './Target.css';

interface TargetProps {
  target: number;
  isReached: boolean;
}

export const Target = memo(function Target({ target, isReached }: TargetProps) {
  return (
    <div className={`target ${isReached ? 'reached' : ''}`}>
      <span className="target-label">Target</span>
      <span className="target-number">{target}</span>
    </div>
  );
});
