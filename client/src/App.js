import { useState } from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import AccountView from './views/AccountView';
import LogReg from './views/LogReg';
import ChessGame from './views/ChessGame';
import MatchFinderView from './views/MatchFinderView'
// import './css/App.css';

function App() {
    const NotFound = () => {
        return (
            <h1 style={{ textAlign: "center", color: "red", marginTop: "500px" }}>Sorry, but your route was not found</h1>
        )
    };

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userId, setUserId ] = useState("");
    const [ roomId, setRoomId ] = useState("");
    const [ userName, setUserName ] = useState("");
    // let style = {marginTop: }
    return (
        <div className="App">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> 
            <Router>
                {/* default login/register page */}
                <LogReg path="/logreg" loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserId={setUserId}/>
                <MatchFinderView path="/" loggedIn={loggedIn} userId={userId}/>
                <ChessGame /*path={`/room/${roomId}`}*/ path="/match" loggedIn={loggedIn} userId={userId}/>
                
                {/* account page for editing account */}
                {/* <AccountView path="/account" loggedIn={loggedIn} userId={userId}/>     */}
                <NotFound default />
            </Router>
        </div>
    );
}

export default App;
