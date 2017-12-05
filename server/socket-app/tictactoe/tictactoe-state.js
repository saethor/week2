const _ = require('lodash');

module.exports = function (injected) {

    return function (history) {
        let gamefull = false;
        
        function processEvent(event) {
            if (event.type === "GameJoined"){
                gamefull = true;
            }
        }

        function gameFull(){
            return gamefull;
        }

        function processEvents(history) {
            _.each(history, processEvent);
        }

        processEvents(history);

        return {
            gameFull: gameFull,
            processEvents: processEvents,
        }
    };
};
