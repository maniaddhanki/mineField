const { getData } = require('./initLib.js');
const gameData = getData('src/gameData.json');

const createTable = ({ field }) => field.reverse().map(row => row.join(' | ')).join('\n');

const pointLocation = gameData => createTable(gameData).replace(gameData.position, '📍');

console.log(pointLocation(gameData));
