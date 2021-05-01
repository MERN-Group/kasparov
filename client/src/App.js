import { useState, useEffect } from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import AccountView from './views/AccountView';
import LogReg from './views/LogReg';
import ChessView from './views/ChessView';
import MatchFinderView from './views/MatchFinderView'
import io from 'socket.io-client';
// import './css/App.css';

function App() {
    const [socket] = useState(() => io(':8000'));
    const NotFound = () => {
        return (
            <h1 style={{ textAlign: "center", color: "red", marginTop: "500px" }}>Sorry, but your route was not found</h1>
        )
    };

    useEffect(() => {
        return () => socket.disconnect(true);
    }, [])
    
    const [ match, setMatch ] = useState({});
    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userId, setUserId ] = useState("");
    const [ userName, setUserName ] = useState("");

    return (
        <div className="App">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} socket={socket} /> 
            <Router>
                <LogReg path="/logreg" loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserId={setUserId} setUserName={setUserName}/>
                <MatchFinderView path="/" setMatch={setMatch} socket={socket} loggedIn={loggedIn} userId={userId} userName={userName}/>
                <ChessView path={`/match/${match.roomId}`} match={match} socket={socket} userId={userId} userName={userName}/>
                {/* account page for editing account */}
                <AccountView path="/account" loggedIn={loggedIn} userId={userId}/>    
                <NotFound default />
            </Router>
        </div>
    );
}

export default App;
