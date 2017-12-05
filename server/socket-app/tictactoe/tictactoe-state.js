const _ = require('lodash');

module.exports = function (injected) {

    return function (history) {
        let gamefull = false;
        let board = [[undefined, undefined, undefined], [undefined, undefined, undefined], [undefined, undefined, undefined]];
        let player = false;
        let gameover = false;
        let moves = 9;

        function processEvent(event) {
            if (event.type === "GameJoined"){
                gamefull = true;
            }
            if (event.type === "MovePlaced") {
                board[event.cord.y][event.cord.x] = event.side;
                player = !player;
                moves--;                
            }
        }

        function gameFull(){
            return gamefull;
        }

        function illegalMove(x, y) {
            return board[y][x] !== undefined;
        }

        function playerTurn(side){
            return (player && side === "O") || (!player && side === "X");
        }

        function gameWon(){
            for (var i = 0; i < 3; ++i){
                if (board[i][0] == board[i][1] && board[i][0] == board[i][2] && board[i][0] !== undefined){
                    return true;
                }
                if (board[0][i] == board[1][i] && board[0][i] == board[2][i] && board[0][i] !== undefined){
                    return true;
                }
            }
            if (board[0][0] == board[1][1] && board[0][0] == board[2][2] && board[0][0] !== undefined){
                return true;
            }
            if (board[0][2] == board[1][1] && board[0][2] == board[2][0] && board[0][2] !== undefined){
                return true;
            }    
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        processEvents(history);

        return {
            gameFull: gameFull,
            illegalMove: illegalMove,
            playerTurn: playerTurn,
            gameWon: gameWon,
            processEvents: processEvents,
        }
    };
};
