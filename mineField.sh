read -p "select starting column from 1,2,3 : " position

# position=$(node gameInit.js ${position})
while (($? == 0))
do
  echo you are at $position 
  read direction
  position=$(node mineField.js ${position} ${direction})
done
echo $position
