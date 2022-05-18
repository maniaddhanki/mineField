const fs = require('fs');
const { getData, writeData, upDate } = require('./initLib.js');

const validMoves = ['f', 'b', 'l', 'r'];

const isValidMove = move => validMoves.includes(move);

const forward = ({ position, columns }) => position + columns;

const backward = ({ position, columns }) => position - columns;

const left = ({ position }) => position - 1;

const right = ({ position }) => position + 1;

const moves = { f: forward, b: backward, l: left, r: right };

const isSafe = ({ position, safePath }) => safePath.includes(position);

const isWon = ({ position, destination }) => position === destination;

const makeAMove = function (gameData, direction) {
  if (!isValidMove(direction)) {
    return upDate(gameData, 'invalid move', 'stop');
  }
  gameData.position = moves[direction](gameData);

  if (!isSafe(gameData)) {
    return upDate(gameData, 'You landed on a mine', 'stop');
  }
  if (isWon(gameData)) {
    return upDate(gameData, 'YOU WON', 'stop');
  }
  return gameData;
};

const main = function (direction) {
  const gameData = getData('src/gameData.json');
  writeData('src/gameData.json', makeAMove(gameData, direction));
};

const [direction] = process.argv.slice(2);

main(direction);
