import React, { useEffect, useState } from 'react'
import BoardSquare from './BoardSquare'
import { wasMoveValid } from './Game'


export default function Board({ board, turn, match, socket, userId, userName}) {

    const [currBoard, setCurrBoard] = useState([])
    const [, updateState] = useState();
    const forceUpdate = React.useCallback(() => updateState({}), []);
    const [ onMount, setOnMount ] = useState(true);
    const [ ogBoard, setOGBoard ] = useState(board);

    function nyquil(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
    
    async function sleep() {
        await nyquil(2000);
        
        // Sleep in loop
        for (let i = 0; i < 5; i++) {
            if (i === 3)
            await nyquil(2000);
        }
    }

    socket.on('opponent_moved', match => {
        turn = match.turn
        console.log("got move from opponent")
        setCurrBoard(match.board.flat().reverse())
    })

    useEffect(() => {
        turn = match.turn;


            
    }, [])

    useEffect(() => {
        sleep();
        // }  
        setCurrBoard(
            turn === 'w' ? board.flat() : board.flat().reverse()
        )
        // setCurrBoard(board.flat());
    }, [board,turn])

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
        const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x]
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
