import React, { useEffect, useState } from 'react'
import BoardSquare from './BoardSquare'
import { wasMoveValid, setChessTurn, getChessTurn, getValidMove, move } from './Game'
// import * as Chess from 'chess.js'

export default function Board({ board, setTurn, match, socket }) {

    const [, updateState] = useState();
    // const forceUpdate = React.useCallback(() => updateState({}), []);

    socket.on('opponent_moved', match => {
        console.log("Received move from opponent")
        setTurn(match.turn)
        // make the move on the opponent's board
        move(match.from, match.to);
    })

    useEffect(() => {
        
        // console.log(`Initial turn is ${turn}`)
        setTurn(match.turn)
    }, [])

    useEffect(() => {
        if ( wasMoveValid() )
        {
            console.log('Sending move to opponent')
            // console.log(board)
            const { moveFrom, moveTo } = getValidMove()
            match.from = moveFrom;
            match.to = moveTo;
            socket.emit('new_move', match)
        }
    }, [board])

    function getXYPosition(i) {
        const x = i % 8 
        const y = Math.abs(Math.floor(i / 8) - 7)
        return { x, y }
    }

    function isBlack(i) {
        const { x, y } = getXYPosition(i)
        return (x + y) % 2 === 1
    }

    function getPosition(i) {
        const { x, y } = getXYPosition(i)
        const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x]
        return `${letter}${y + 1}`
    }

    console.log(`Turn is ${getChessTurn()}`)
    return (
        <div className="board">
        {board.flat().map((piece, i) => (
            <div key={i} className="square">
                <BoardSquare
                    piece={piece}
                    black={isBlack(i)}
                    position={getPosition(i)}
                />
            </div>
        ))}
        </div>
    )
}
