let should = require('should');
let _ = require('lodash');

let TictactoeState = require('./tictactoe-state')(inject({}));

let tictactoe = require('./tictactoe-game')(inject({
    TictactoeState
}));

// API to run tests
function game(){
    let me = {
        history: [],
        created: (user) => {
            me.history.push({
                type: "GameCreated",
                user: {
                    userName: user
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'X'
            });

            return me;
        },
        joined: (user) => {
            me.history.push({
                type: "GameJoined",
                user: {
                    userName: "Gummi"
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
                side:'O'
            });

            return me;
        },
        placed: (user, side, x, y) => {
            me.history.push({
                type: "MovePlaced",
                user: {
                    userName: user
                },
                name: "TheFirstGame",
                cord: {
                    x: x,
                    y: y
                },
                side: side,
                timeStamp: "2014-12-02T11:29:29"
            });

            return me;
        },
        fullGameJoinAttempted: (user) => {
            me.history.push({
                type: "FullGameJoinAttempted",
                user: {
                    userName: user
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29",
            });

            return me;
        },
        illegalMove: (user, x, y) => {
            me.history.push({
                type: "IllegalMove",
                user: {
                    userName: user
                },
                name: "TheFirstGame",
                cord: {
                    x: x,
                    y: y
                },
                timeStamp: "2014-12-02T11:29:29"
            });

            return me;
        },
        notYourMove: (user) => {
            me.history.push({
                type: "NotYourMove",
                user: {
                    userName: user
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            });

            return me;
        },
        winner: (user, side) => {
            me.history.push({
                type:"GameWon",
                user: {
                    userName: user
                },
                name: "TheFirstGame",
                side: side,
                timeStamp: "2014-12-02T11:29:29"
            });

            return me;
        },
        draw: () => {
            me.history.push({
                type:"GameDraw",
                user: {
                    userName: "TheGuy"
                },
                name: "TheFirstGame",
                side: "X",
                timeStamp: "2014-12-02T11:29:29"
            });

            return me;
        },
        events: () => {
            return me.history;
        },
        createGame: (user) => {
            return {
                id:"123987",
                type: "CreateGame",
                user: {
                    userName: user
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            }   
        },
        joinGame: (user) => {
            return {
                id:"123987",
                type: "JoinGame",
                user: {
                    userName: user
                },
                name: "TheFirstGame",
                timeStamp: "2014-12-02T11:29:29"
            }
        },
        placeMove: (user, side, x, y) => {
            return {
                id: "123987",
                type: "PlaceMove",
                user: {
                    userName: user
                },
                name: "TheFirstGame",
                cord: {
                    x: x,
                    y: y
                },
                side: side,
                timeStamp: "2014-12-02T11:29:29", 
            }
        }
    }

    return me;
}

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
        given = game().events();
        when = game().createGame("TheGuy");
        then = game().created("TheGuy").events();
    });
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
        given = game().created("TheGuy").events();
        when = game().joinGame("Gummi");
        then = game().joined("Gummi").events();
    });

    it('should emit FullGameJoinAttempted event when game full', function () {
        given = game().created("TheGuy").joined("Gummi").events();
        when = game().joinGame("Gunni");
        then = game().fullGameJoinAttempted("Gunni").events();
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
        given = game().created("TheGuy").joined("Gummi").events();
        when = game().placeMove("TheGuy", "X", 1, 2);
        then = game().placed("TheGuy", "X", 1, 2).events();
    });

    it('Should emit Illegal move when square is already occupied', function() {
        given = game().created("TheGuy").joined("Gummi").placed("TheGuy", "X", 1, 2).events();
        when = game().placeMove("Gummi", "O", 1, 2);
        then = game().illegalMove("Gummi", 1, 2).events();
    });

    it('Should emit Illegal move a move is placed out of bounds', function() {
        given = game().created("TheGuy").joined("Gummi").events();
        when = game().placeMove("TheGuy", "X", -1, 2);
        then = game().illegalMove("TheGuy", -1, 2).events();
    });

    it('Should emit not your move when attempting to move out of turn', function() {
        given = game().created("TheGuy").joined("Gummi").events();
        when = game().placeMove("Gummi", "O", 1, 2);
        then = game().notYourMove("Gummi").events();
    });

    it("It should emit gameWon when game is won vertically", function(){
        given = game()
               .created("TheGuy")
               .joined("Gummi")
               .placed("TheGuy", "X", 0, 0)
               .placed("Gummi", "O", 1, 1)
               .placed("TheGuy", "X", 0, 1)
               .placed("Gummi", "O", 1, 0)
               .events();
        when = game().placeMove("TheGuy", "X", 0, 2);
        then = game().placed("TheGuy", "X", 0, 2).winner("TheGuy", "X").events();
    });

    it("It should emit gameWon when game is won horizontally", function(){
        given = game()
               .created("TheGuy")
               .joined("Gummi")
               .placed("TheGuy", "X", 0, 0)
               .placed("Gummi", "O", 1, 1)
               .placed("TheGuy", "X", 1, 0)
               .placed("Gummi", "O", 0, 1)
               .events();
        when = game().placeMove("TheGuy", "X", 2, 0);
        then = game().placed("TheGuy", "X", 2, 0).winner("TheGuy", "X").events();
    });

    it("It should emit gameWon when game is won diagonally", function(){
        given = game()
               .created("TheGuy")
               .joined("Gummi")
               .placed("TheGuy", "X", 0, 0)
               .placed("Gummi", "O", 1, 0)
               .placed("TheGuy", "X", 1, 1)
               .placed("Gummi", "O", 0, 1)
               .events();
        when = game().placeMove("TheGuy", "X", 2, 2);
        then = game().placed("TheGuy", "X", 2, 2).winner("TheGuy", "X").events();
    });

    it("It should emit gameWon when game is won reverse diagonally", function(){
        given = game()
               .created("TheGuy")
               .joined("Gummi")
               .placed("TheGuy", "X", 0, 2)
               .placed("Gummi", "O", 1, 0)
               .placed("TheGuy", "X", 1, 1)
               .placed("Gummi", "O", 0, 1)
               .events();
        when = game().placeMove("TheGuy", "X", 2, 0);
        then = game().placed("TheGuy", "X", 2, 0).winner("TheGuy", "X").events();
    });

    it("It should emit gameWon if won on last move", function(){
        given = game()
               .created("TheGuy")
               .joined("Gummi")
               .placed("TheGuy", "X", 0, 0)
               .placed("Gummi", "O", 0, 1)
               .placed("TheGuy", "X", 0, 2)
               .placed("Gummi", "O", 1, 0)
               .placed("TheGuy", "X", 1, 1)
               .placed("Gummi", "O", 1, 2)
               .placed("TheGuy", "X", 2, 1)
               .placed("Gummi", "O", 2, 0)
               .events();
        when = game().placeMove("TheGuy", "X", 2, 2);
        then = game().placed("TheGuy", "X", 2, 2).winner("TheGuy", "X").events();
    });

    it("It should emit gameDraw if game is draw", function(){
        given = game()
               .created("TheGuy")
               .joined("Gummi")
               .placed("TheGuy", "X", 0, 0)
               .placed("Gummi", "O", 1, 0)
               .placed("TheGuy", "X", 2, 0)
               .placed("Gummi", "O", 0, 1)
               .placed("TheGuy", "X", 1, 1)
               .placed("Gummi", "O", 0, 2)
               .placed("TheGuy", "X", 2, 1)
               .placed("Gummi", "O", 2, 2)
               .events();
        when = game().placeMove("TheGuy", "X", 1, 2);
        then = game().placed("TheGuy", "X", 1, 2).draw().events();
    });
})