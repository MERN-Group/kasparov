import React, { useEffect, useState } from 'react'
import { gameSubject, getChessTurn, initGame, resetGame } from './Game'
import Board from './Board'
import '../../App.css'

const ChessGame = (props) => {
    const { userId, userName, match, socket } = props;
    const [board, setBoard] = useState([])
    const [isGameOver, setIsGameOver] = useState()
    const [result, setResult] = useState()
    const [turn, setTurn] = useState('')

    useEffect(() => {
        initGame();
        const subscribe = gameSubject.subscribe((game) => {
            setBoard(game.board)
            setIsGameOver(game.isGameOver)
            setResult(game.result)
            setTurn(game.turn)
        })
        return () => subscribe.unsubscribe()
    }, [])

    return (
        <>
            <div className="container">
                
                {isGameOver && (
                    <h2 className="vertical-text">
                    GAME OVER
                    <button onClick={resetGame}>
                        <span className="vertical-text"> NEW GAME</span>
                    </button>
                    </h2>
                )}
                
                {/* <h2>{ match.player1.userName === userName ? match.player2.userName : userName }</h2> */}
                <div className="board-container" style={{textAlign: 'center'}}>
                    <h2 style={{marginBottom: '30px', color: 'white'}}>{ getChessTurn() === 'w' && match.player1.color === 'w' ? match.player1.userName : match.player2.userName }'s Turn</h2>
                    <Board  board={board} setBoard={setBoard} 
                            turn={turn} setTurn={setTurn} 
                            match={match} socket={socket}
                            userId={userId} userName={userName}/>
                </div>
                {result && <p className="vertical-text">{result}</p>}
            </div>
        </>
    )
}

export default ChessGame;
