import React from "react";
import MatchFinder from "../components/MatchFinder";

const MatchFinderView = (props) => {
    return (
        <div>
            <MatchFinder setMatch={props.setMatch} socket={props.socket} loggedIn={props.loggedIn} 
                        userId={props.userId} userName={props.userName}
            />
        </div>
    );
};

export default MatchFinderView;