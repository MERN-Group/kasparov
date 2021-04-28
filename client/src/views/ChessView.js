import React from "react";
import Chess from '../components/chess/Chess'

const ChessView = (props) => {
    // const { loggedIn, setLoggedIn, setUserId, roomId } = props;
    return (
        <div>
            <Chess props={props}></Chess>
        </div>
    );
};

export default ChessView;