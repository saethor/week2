const _ = require('lodash');

module.exports = function (injected) {

    return function (history) {
        function processEvent(event) {
        }

        function gameFull(){
            return false;
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
