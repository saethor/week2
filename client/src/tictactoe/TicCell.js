import React from 'react';

export default function (injected) {
    const eventRouter = injected('eventRouter');
    const commandPort = injected('commandPort');
    const generateUUID = injected('generateUUID');

    class TictactoeMessage extends React.Component {
        constructor() {
            super();
            this.state = {
                move:{

                },
                disabled: false
            }
        }
        componentWillMount(){
            this.unsubscribe = eventRouter.on('MovePlaced', (moveEvent)=>{
            //    Key logic goes here. Remember---the cell gets all move events, not only its own.
                let move = moveEvent.move;
                let x = move.xy.x;
                let y = move.xy.y;
                let coordinates = this.props.coordinates;
                if (coordinates.x === x && coordinates.y === y) {
                    this.setState((prevState, props) => {
                        return { move }
                    });
                }
            })
            this.unsubscribeGameWon = eventRouter.on('GameWon', (gameWon) => {
                let state = this.state;
                state['disabled'] = true;                
                this.setState(state);
            });
        }
        componentWillUnmount(){
            this.unsubscribe();
            this.unsubscribeGameWon();
        }
        placeMove(coordinates){
            if (this.state.disabled) {
                return function(){};
            }
            return ()=>{
                let cmdId = generateUUID();
                commandPort.routeMessage({
                    commandId:cmdId,
                    type:"PlaceMove",
                    gameId:this.props.gameId,
                    move:{
                        xy:coordinates,
                        side:this.props.mySide
                    }
                });
            }
        }
        render() {
            return <div ref="ticCell" className="ticcell" onClick={this.placeMove(this.props.coordinates)}>
                {this.state.move.side}
            </div>
        }
    }
    return TictactoeMessage;
}
