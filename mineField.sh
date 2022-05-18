read -p "select starting column from 1,2,3 : " position

node gameInit.js $position
cat gameData.json | grep '"status":"continue"' > /dev/null
stat=$?
node gameDisplay.js
while (( $stat == 0 ))
do
  read direction
  node mineField.js ${direction}
  cat gameData.json | grep '"status":"continue"' > /dev/null
  stat=$?
  node gameDisplay.js
done
