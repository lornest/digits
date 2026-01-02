# Digits(ish)

A web-based clone of the discontinued NYT Digits game.

## Game Rules

- You're given 6 starting numbers and 1 target number
- Combine any two numbers using +, −, ×, ÷ to create a new number
- The result replaces the numbers used, leaving you with 5, then 4, etc.
- Goal: reach the target exactly (or get as close as possible)
- Division only allowed if result is a whole number

## Stars

- ⭐ Within 25 of target
- ⭐⭐ Within 10 of target  
- ⭐⭐⭐ Exact match

## How to Play

1. Select a number
2. Select an operator (+, −, ×, ÷)
3. Select a second number
4. The result appears in place of the second number
5. Repeat until you reach the target!

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deploy

Deployed to Cloudflare Workers at [digits.lornest.dev](https://digits.lornest.dev)

```bash
npm run deploy
```

## Tech Stack

- React 19
- TypeScript
- Vite
- Cloudflare Workers
