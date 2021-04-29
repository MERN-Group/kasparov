import React, { useEffect, useState } from 'react'
import BoardSquare from './BoardSquare'



export default function Board({ board, turn, match, socket, userId, userName, }) {

    const [currBoard, setCurrBoard] = useState([])
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);

    socket.on('opponent_moved', newBoard => {
        console.log(newBoard)
        
        updateBoard(newBoard);
        forceUpdate()
    })

    function updateBoard(newBoard){
        // inform the other player when a move is made
        match.board = newBoard
        socket.emit('new_move', match)
        setCurrBoard(newBoard);
    }

    useEffect(() => {
        if ( match.player2.userId == userId )
            setCurrBoard(board.flat().reverse())
        else
            setCurrBoard(board.flat())

        // setCurrBoard(
        // turn === 'w' ? board.flat() : board.flat().reverse()
        // )
        
    }, [board, turn])

    function getXYPosition(i) {
        const x = turn === 'w' ? i % 8 : Math.abs((i % 8) - 7)
        const y =
        turn === 'w'
            ? Math.abs(Math.floor(i / 8) - 7)
            : Math.floor(i / 8)
        return { x, y }
    }

    function isBlack(i) {
        const { x, y } = getXYPosition(i)
        return (x + y) % 2 === 1
    }

    function getPosition(i) {
        const { x, y } = getXYPosition(i)
        const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][
        x
        ]
        return `${letter}${y + 1}`
    }
    return (
        <div className="board">
        {currBoard.map((piece, i) => (
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
