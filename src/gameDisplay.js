const { getData } = require('./mineFieldLib.js');

const createTable = ({ field }) =>
  field.reverse().map(row => row.join(' | ')).join('\n');

const pointLocation =
  gameData => createTable(gameData).replace(gameData.position, '📍');

const generateReport = () => {
  const gameData = getData('src/gameData.json');
  return pointLocation(gameData).concat('\n', gameData.message);
};

exports.generateReport = generateReport;
