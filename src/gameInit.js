const { initGame, main } = require('./mineField.js');
const { generateReport } = require('./gameDisplay.js');

const [gameInput, instruction] = process.argv.slice(2);

const runGame = function (gameInput, instruction) {
  if (instruction) {
    initGame(+gameInput);
    return generateReport();
  }
  main(gameInput);
  return generateReport();
};

console.log(runGame(gameInput, instruction));
