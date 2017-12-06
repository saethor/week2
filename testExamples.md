# Test Examples
## Join game command
### Test joining a full game 
__Given__ a game was created by TheGuy and Gummi had joined the game, __when__ Gunni tries to join the game __then__ a FullGameJoinAttempted event should be dispatched.

## Place move command
### Test placing the first move
__Given__ a game was created by TheGuy and Gummi had joined the game, __when__ the first move is placed __then__ a MovePlaced event should be dispatched.

### Test placing a move in an already occupied square
__Given__ a game was created by TheGuy and Gummi had joined the game, and a move has been placed. __When__ a move is placed on an already occupied square __then__ a IllegalMove event should be dispatched.

