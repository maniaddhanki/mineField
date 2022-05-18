read -p "select starting column from 1,2,3 : " position

node src/gameInit.js $position
cat src/gameData.json | grep '"status":"continue"' > /dev/null
stat=$?
node src/gameDisplay.js
while (( $stat == 0 ))
do
  read direction
  node src/mineField.js ${direction}
  cat src/gameData.json | grep '"status":"continue"' > /dev/null
  stat=$?
  node src/gameDisplay.js
done
