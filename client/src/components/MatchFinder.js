import { navigate } from "@reach/router";
import React, { useEffect, useState } from "react";
import loadingGif from './loading.gif'

const MatchFinder = (props) => {
    const { loggedIn, userId, socket, userName, setMatch } = props;
    const [ user, setUser ] = useState({});
    const [ findingMatch, setFindingMatch ] = useState(false);

    socket.on(`${socket.id}`, match => {
        if ( socket.matchFound == false )
        {
            socket.matchFound = true;
            console.log('Received match from server')
            console.log(match)
            if ( match.player1.userId == userId )
                console.log("I am player 1")
            else
                console.log("I am player 2")
            socket.emit('new_game', match);
            setMatch(match);
            navigate(`/match/${match.roomId}`)
        }
    })

    const handleFindMatch = () => {
        // send user to server to queue up
        socket.emit(`${socket.id}_server`, user )
        setFindingMatch(true);
        // navigate('/match')
    }

    useEffect(() => {
        if ( loggedIn == false ) {
            navigate("/logreg")
        }
        socket.matchFound = false;
        console.log(`Listening on ${socket.id}`)
        setUser({
            userId: userId,
            socket_id: socket.id,
            userName: userName
        })
    }, [])

    return (
        <div className="match-finder">
            { loggedIn ? 
                findingMatch == false ? 
                    <>
                        <h2>Find a match!</h2>
                        <button className="pure-button pure-button-primary" onClick={handleFindMatch}>Find match</button>
                    </>
                    :
                    <>
                        <h2 style={{marginBottom: '30px'}}>Searching...</h2>
                        <img src={loadingGif} style={{width: '100px'}}></img>
                    </>
                :
                null
            }
        </div>
    );
};

export default MatchFinder;