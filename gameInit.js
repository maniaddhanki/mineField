const { exit } = require('process');
const { safePath, columns } = require('./map.json');

const generateFirstRow = function (columns) {
  const firstRow = [];
  for (let cell = 1; cell <= columns; cell++) {
    firstRow.push(cell);
  }
  return firstRow;
};

const isValidStart = position => generateFirstRow(columns).includes(position);

const isSafe = position => safePath.includes(position);

const firstRound = function (position) {
  if (!isValidStart(position)) {
    console.log('invalid input');
    exit(1);
  }
  if (!isSafe(position)) {
    console.log('you landed on a mine 😵😵');
    exit(2);
  }
  return position;
};

const position = process.argv.slice[2];

console.log(firstRound(position));
