read -p "select starting column from 1,2,3 : " position

$(node gameInit.js $position)
stat=$(cat gameData.json | grep "status" | cut -f4 -d\")
# cat gameData.json
echo $stat
# while (($status == 'continue'))
# do
#   read direction
#   $(node mineField.js ${position} ${direction})
#   status=$(cat gameData.json | grep "status" | cut -f4 -d\")
#   cat gameData.json
# done

