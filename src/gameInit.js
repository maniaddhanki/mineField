const initGame = require('./mineFieldLib.js').initGame;

const [position] = process.argv.slice(2);

initGame(+position);
