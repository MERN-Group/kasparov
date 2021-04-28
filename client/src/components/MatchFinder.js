import { navigate } from "@reach/router";
import React, { useEffect, useState } from "react";

const MatchFinder = (props) => {
    const { loggedIn, userId, userName } = props;

    const handleFindMatch = () => {
        // send userId to server

        navigate('/match')
    }

    useEffect(() => {
        if ( loggedIn == false ) {
            navigate("/logreg")
        }
    }, [])

    return (
        <div className="match-finder">
            { loggedIn ? 
                <>
                    <h2>Find a match!</h2>
                    <button className="pure-button pure-button-primary" onClick={handleFindMatch}>Find match</button>
                </>
                :
                null
            }
        </div>
    );
};

export default MatchFinder;