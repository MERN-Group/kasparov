import React from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
// import '../css/Header.css';

const Header = (props) => {
    const { loggedIn, setLoggedIn } = props;
    // console.log("LoggedIn: " + loggedIn);
    const logout = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/user/logout", { 
            // no body required for this request
        }, {
            withCredentials: true,
        })
        .then((res) => {
            console.log(res.data);
            navigate("/logreg");
        })
        .catch(err => {
            console.log(err);
        });
        
    };

    const handleButton = (e) => {
        if ( loggedIn )
        {
            setLoggedIn(false);
            logout(e);
            navigate("/logreg")
        } else {
            navigate("/logreg");
        }
    }

    return (
        <div className="header">
            <div className="home-menu pure-menu pure-menu-horizontal pure-menu-fixed navbar">
                <a className="pure-menu-heading" onClick={ () => navigate("/")} style={{cursor: 'pointer'}}>Kasparov</a>
                <ul className="pure-menu-list">
                    <li className="pure-menu-item pure-menu-selected" style={{cursor: 'pointer'}}><a onClick={ () => navigate("/")} className="pure-menu-link">Home</a></li>
                    <li className="pure-menu-item pure-menu-link" style={{cursor: 'pointer'}}><a onClick={() => navigate("/account")} className="">Account</a></li>
                    <li className="pure-menu-item pure-menu-link" style={{cursor: 'pointer'}}><a onClick={(e) => handleButton(e)} className="pure-menu-link">{loggedIn ? "Logout" : "Login"}</a></li>
                </ul>
            </div>
        </div>
    )
};

export default Header;
