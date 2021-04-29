import React from "react";
import ChessGame from '../components/chessComponents/ChessGame'

const ChessView = (props) => {
    const { userId, userName, match, socket } = props;
    
    return (
        <div>
            <ChessGame match={match} socket={socket} userId={userId} userName={userName}/>
        </div>
    );
};

export default ChessView;