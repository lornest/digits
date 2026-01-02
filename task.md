Build a web-based clone of the NYT Digits game.
Game Rules:

Player is given 6 starting numbers and 1 target number (1-999)
Combine any two numbers using +, −, ×, ÷ to create a new number
The result replaces those two numbers, leaving you with 5, then 4, etc.
Goal: reach the target exactly (or get as close as possible)
Division only allowed if result is a whole number
Stars awarded: ⭐ (within 25), ⭐⭐ (within 10), ⭐⭐⭐ (exact)

Requirements:

Single-page React app (no backend needed)
Clean, mobile-friendly UI similar to NYT games aesthetic
Click two numbers + an operator to combine them
Undo button to reverse moves
"New Puzzle" generates a solvable puzzle
Show move history
Animate number combinations
Celebrate wins appropriately

Puzzle Generation:

Work backwards: start from target, apply random operations to generate starting numbers
Ensure puzzle is solvable
Difficulty levels: Easy (small numbers), Medium, Hard (larger numbers, more steps)

When complete:

Game fully playable in browser
All operations working correctly
Undo/reset functional
At least 3 difficulty levels
Responsive design
Output: <promise>COMPLETE</promise>


