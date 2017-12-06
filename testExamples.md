# Test Examples
## Join game command
### Test joining a full game 
__Given__ a game was created by TheGuy and Gummi had joined the game, __when__ Gunni tries to join the game __then__ a FullGameJoinAttempted event should be dispatched.

## Place move command
### Test placing the first move
__Given__ a game was created by TheGuy and Gummi had joined the game, __when__ the first move is placed __then__ a MovePlaced event should be dispatched.

### Test placing a move in an already occupied square
__Given__ a game was created by TheGuy and Gummi had joined the game, and a move has been placed. __When__ a move is placed on an already occupied square __then__ an IllegalMove event should be dispatched.

### Test placing a move when it is not your turn
__Given__ a game was created by TheGuy and Gummi had joined the game, __when__ Gummi tries to place a move __then__ a NotYourMove event should be dispatched.

### Test when a game is won with a vertical row
__Given__ a game was created by TheGuy and Gummi had joined the game, and both players have placed two moves each in a vertical line. __When__ TheGuy places a move in the last vertical slot __then__ two events are emitted, MovePlaced and GameWon.

### Test when a game is won with a horizontal row
__Given__ a game was created by TheGuy and Gummi had joined the game, and both players have placed two moves each in a horizontal line. __When__ TheGuy places a move in the last horizontal slot __then__ two events are emitted, MovePlaced and GameWon.

