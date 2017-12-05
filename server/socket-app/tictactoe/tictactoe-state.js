const _ = require('lodash');

module.exports = function (injected) {

    return function (history) {
        let gamefull = false;
        let illegalmove = false;
        let board = [[false, false, false], [false, false,false], [false, false, false]];

        function processEvent(event) {
            if (event.type === "GameJoined"){
                gamefull = true;
            }
            if (event.type === "MovePlaced") {
                if (!board[event.cord.y][event.cord.x]) {
                    illegalmove = true;
                    board[event.cord.y][event.cord.x] = true;
                }
            }
        }

        function gameFull(){
            return gamefull;
        }

        function illegalMove() {
            return illegalmove;
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        processEvents(history);

        return {
            gameFull: gameFull,
            illegalMove: illegalMove,
            processEvents: processEvents,
        }
    };
};
