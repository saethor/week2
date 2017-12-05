let should = require('should');
let _ = require('lodash');

let TictactoeState = require('./tictactoe-state')(inject({}));

let tictactoe = require('./tictactoe-game')(inject({
    TictactoeState
}));

let createEvent = {
    gameId:"123987",
    type: "GameCreated",
    user: {
        userName: "TheGuy"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};

let joinEvent = {
    gameId:"123987",
    type: "GameJoined",
    user: {
        userName: "Gummi"
    },
    name: "TheFirstGame",
    timeStamp: "2014-12-02T11:29:29"
};


describe('create game command', function() {


    let given, when, then;

    beforeEach(function(){
        given=undefined;
        when=undefined;
        then=undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function(actualEvents){
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game created event', function(){

        given = [];
        when =
            {
                id:"123987",
                type: "CreateGame",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            };
        then = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            }
        ];

    })
});


describe('join game command', function () {


    let given, when, then;

    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });

    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });


    it('should emit game joined event...', function () {

        given = [{
            type: "GameCreated",
            user: {
                userName: "TheGuy"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:29:29"
        }
        ];
        when =
            {
                type: "JoinGame",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            };
        then = [
            {
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            }
        ];

    });

    it('should emit FullGameJoinAttempted event when game full', function () {
        given = [
            {
                type: "GameCreated",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            },
            {
                type: "JoinGame",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            }
        ];
        when = {
            type: "JoinGame",
            user: {
                userName: "Gunni"
            },
            name: "TheFirstGame",
            timeStamp: "2014-12-02T11:30:29"
        };
        then = [
            {
                type: "FullGameJoinAttempted",
                user: {
                    userName: "Gunni"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:30:29",
            }
        ]
    });
});

describe('Place move command', function() {

    let given, when, then;
    
    beforeEach(function () {
        given = undefined;
        when = undefined;
        then = undefined;
    });
    
    afterEach(function () {
        tictactoe(given).executeCommand(when, function (actualEvents) {
            should(JSON.stringify(actualEvents)).be.exactly(JSON.stringify(then));
        });
    });

    it('should emit MovePlaced on first game move', function() {

        given = [
            createEvent,
            joinEvent
        ]
        when = {
            type: "PlaceMove",
            user: {
                userName: "Gunni"
            },
            name: "TheFirstGame",
            cord: {
                x: 1,
                y: 2
            },
            side: "X",
            timeStamp: "2014-12-02T11:30:29", 
        };
        then = [
            {
                type: "MovePlaced",
                user: {
                    userName: "Gunni"
                },
                name: "TheFirstGame",
                cord: {
                    x: 1,
                    y: 2
                },
                side: "X",
                timeStamp: "2014-12-02T11:30:29"
            }
        ];
    });

    it('Should emit Illegal move when square is already occupied', function() {
        given = [
            createEvent,
            joinEvent,
            {
                gameId:"123987",
                type: "MovePlaced",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                cord: {
                    x: 1,
                    y: 2
                },
                side: "X",
                timeStamp: "2014-12-02T11:30:29"
            }
        ];
        when = {
            gameId:"123987",
            type: "PlaceMove",
            user: {
                userName: "Gummi"
            },
            name: "TheFirstGame",
            cord: {
                x: 1,
                y: 2
            },
            side: "O",
            timeStamp: "2014-12-02T11:32:29", 
        };
        then = [
            {
                gameId:"123987",
                type: "IllegalMove",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                cord: {
                    x: 1,
                    y: 2
                },
                timeStamp: "2014-12-02T11:32:29"
            }
        ];
    })
})