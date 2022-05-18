const fs = require('fs');

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

const nNumbers = function (start, count) {
  const numbers = [];
  for (let counter = 0; counter < count; counter++) {
    numbers.push(start + counter);
  }
  return numbers;
};

const generateARow = function (rowNumber, columns) {
  const start = ((rowNumber - 1) * columns) + 1;
  return nNumbers(start, columns);
};

const createfield = function ({ rows, columns }) {
  const allRows = nNumbers(1, rows);
  return allRows.map(rowNumber => generateARow(rowNumber, columns));
};

const isValidStart = ({ position, columns }) => {
  const start = 1;
  return generateARow(start, columns).includes(position);
};

const upDate = function (gameField, message, status) {
  const gameData = { ...gameField };
  gameData.message = message;
  gameData.status = status;
  return gameData;
};

const firstRound = function (gameField) {
  if (!isValidStart(gameField)) {
    return upDate(gameField, 'invalid input', 'stop');
  }
  if (!isSafe(gameField)) {
    return upDate(gameField, 'You landed on a mine', 'stop');
  }
  return upDate(gameField, 'you are at ' + gameField.position, 'continue');
};

const initGame = function (position) {
  const gameField = getData('src/map.json');
  gameField.position = position;
  gameField.field = createfield(gameField);
  writeData('src/gameData.json', firstRound(gameField));
};

const getData = function (path) {
  try {
    return JSON.parse(fs.readFileSync(path, 'utf-8'));
  } catch (error) {
    throw 'file not found';
  }
};

const writeData = function (path, content) {
  try {
    fs.writeFileSync(path, JSON.stringify(content), 'utf-8');
  } catch (error) {
    throw 'could not write to file';
  }
};

const main = function (direction) {
  const gameData = getData('src/gameData.json');
  writeData('src/gameData.json', makeAMove(gameData, direction));
};

exports.main = main;
exports.initGame = initGame;
