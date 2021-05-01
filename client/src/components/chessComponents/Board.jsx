import React, { useEffect, useState } from 'react'
import BoardSquare from './BoardSquare'
import { wasMoveValid, setChessTurn, getChessTurn, getValidMove, move } from './Game'
// import * as Chess from 'chess.js'

export default function Board({ board, setBoard, turn, setTurn, match, socket, userId, userName}) {

    const [currBoard, setCurrBoard] = useState([])
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [ playerMovedPiece, setPlayerMovedPiece ] = useState(false);
    const [ opponentMoved, setOpponentMoved ] = useState(false);

    socket.on('opponent_moved', match => {
        setTurn(match.turn)
        // setChessTurn(match.turn)
        move(match.from, match.to);

        console.log("got move from opponent")
        // console.log(match.board)
        // setBoard(match.board)
    })

    useEffect(() => {
        
        // console.log(`Initial turn is ${turn}`)
        setChessTurn(match.turn)
        setTurn(match.turn)
    }, [])

    useEffect(() => {
        if ( wasMoveValid() )
        {
            console.log('sending move to opponent')
            // console.log(board)
            match.board = board;
            match.turn = getChessTurn()
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
