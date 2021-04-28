import { useState } from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import AccountView from './views/AccountView';
import LogReg from './views/LogReg';
// import './css/App.css';

function App() {
    const NotFound = () => {
        return (
            <h1 style={{ textAlign: "center", color: "red" }}>Sorry, but your route was not found</h1>
        )
    };

    const [ loggedIn, setLoggedIn ] = useState(false);
    const [ userId, setUserId ] = useState("");

    return (
        <div className="App">
            <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} /> 
            <Router>
                {/* default login/register page */}
                <LogReg path="/logreg" loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserId={setUserId}/>


                {/* account page for editing account */}
                {/* <AccountView path="/account" loggedIn={loggedIn} userId={userId}/>     */}
                <NotFound default />
            </Router>
        </div>
    );
}

export default App;
