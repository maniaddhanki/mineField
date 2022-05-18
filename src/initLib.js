const fs = require('fs');

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

const isSafe = ({ position, safePath }) => safePath.includes(position);

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

const initGame = function (position) {
  const gameField = getData('src/map.json');
  gameField.position = position;
  gameField.field = createfield(gameField);
  writeData('src/gameData.json', firstRound(gameField));
};

exports.getData = getData;
exports.writeData = writeData;
exports.upDate = upDate;
exports.initGame = initGame;
