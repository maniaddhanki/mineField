const fs = require('fs');
const { exit } = require('process');

const { safePath, columns, destination } = JSON.parse(fs.readFileSync('map.json', 'utf-8'));

const validMoves = ['f', 'b', 'l', 'r'];

const isValidMove = move => validMoves.includes(move);

const forward = position => position + columns;

const backward = position => position - columns;

const left = position => position - 1;

const right = position => position + 1;

const moves = { f: forward, b: backward, l: left, r: right };

const isSafe = (position, safePath) => safePath.includes(position);

const isWon = position => position === destination;

const makeAMove = function (position, direction, moves, safePath) {
  if (!isValidMove(direction)) {
    console.log(direction, 'is invalid try again 🤷🤷');
    exit(1);
  }
  const nextPosition = moves[direction](position);
  if (!isSafe(nextPosition, safePath)) {
    console.log('you landed on a mine 😵😵');
    exit(1);
  }
  if (isWon(nextPosition)) {
    console.log('YOU WON 🥳🥳');
    exit(2);
  }
  return nextPosition;
};

const [positon, direction] = process.argv.slice(2);

console.log(makeAMove(+positon, direction, moves, safePath));
