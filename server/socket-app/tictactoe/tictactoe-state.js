const _ = require('lodash');

module.exports = function (injected) {

    return function (history) {
        let gamefull = false;
        let board = [[false, false, false], [false, false,false], [false, false, false]];
        let player = false;

        function processEvent(event) {
            if (event.type === "GameJoined"){
                gamefull = true;
            }
            if (event.type === "MovePlaced") {
                board[event.cord.y][event.cord.x] = true;
                player = !player;
            }
        }

        function gameFull(){
            return gamefull;
        }

        function illegalMove(x, y) {
            return board[y][x];
        }

        function playerTurn(side){
            return (player && side === "O") || (!player && side === "X");
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        processEvents(history);

        return {
            gameFull: gameFull,
            illegalMove: illegalMove,
            playerTurn: playerTurn,
            processEvents: processEvents,
        }
    };
};
