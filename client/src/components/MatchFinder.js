import { navigate } from "@reach/router";
import React from "react";

const MatchFinder = (props) => {
    const { loggedIn, userId, userName } = props;

    const handleFindMatch = () => {
        // send userId to server

        navigate('/match')
    }

    return (
        <div className="match-finder">
            <h2>Find a match!</h2>
            <button className="pure-button pure-button-primary" onClick={handleFindMatch}>Find match</button>
        </div>
    );
};

export default MatchFinder;