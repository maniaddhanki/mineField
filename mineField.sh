read -p "select starting column from 1,2,3 : " position

node src/gameInit.js $position 'init'
cat src/gameData.json | grep '"status":"continue"' > /dev/null
exitCode=$?

while (( $exitCode == 0 ))
do
  read direction
  node src/gameInit.js ${direction}
  cat src/gameData.json | grep '"status":"continue"' > /dev/null
  exitCode=$?
done
