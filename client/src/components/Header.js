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
            navigate("/");
        })
        .catch(err => {
            console.log(err);
        });
    };

    const handleButton = (e) => {
        if ( loggedIn )
        {
            logout(e);
            setLoggedIn(false);
        } else {
            navigate("/logreg");
        }
    }

    return (
            <div class="header">
    <div class="home-menu pure-menu pure-menu-horizontal pure-menu-fixed navbar">
        <a class="pure-menu-heading" href="">Kasparov</a>

        <ul class="pure-menu-list">
            <li class="pure-menu-item pure-menu-selected"><a onClick={ () => navigate("/")} class="pure-menu-link">Home</a></li>
            <li class="pure-menu-item"><a onClick={() => navigate("/account")} class="pure-menu-link">Account</a></li>
            <li class="pure-menu-item"><a onClick={(e) => handleButton(e)} class="pure-menu-link">{loggedIn ? "Logout" : "Login"}</a></li>
        </ul>
    </div>
</div>
    )
};

export default Header;
