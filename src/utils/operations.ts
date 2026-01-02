import type { Operator } from '../types';

export function applyOperation(a: number, b: number, op: Operator): number | null {
  switch (op) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '×':
      return a * b;
    case '÷':
      // Division only allowed if result is a whole number
      if (b === 0) return null;
      const result = a / b;
      return Number.isInteger(result) ? result : null;
    default:
      return null;
  }
}

export function getOperatorSymbol(op: Operator): string {
  return op;
}

export function isValidOperation(a: number, b: number, op: Operator): boolean {
  const result = applyOperation(a, b, op);
  return result !== null && result > 0;
}
