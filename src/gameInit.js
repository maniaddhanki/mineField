const initGame = require('./initLib.js').initGame;

const [position] = process.argv.slice(2);

initGame(+position);
