import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
// import '../css/Account.css';

const Account = (props) => {
    const { loggedIn, userId } = props;
    const [ username, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");
    // const [ errs, setErrs ] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put("http://localhost:8000/api/user/" + userId, {
            username: username,
            email: email,
        })
        .then((res) => {
            if(res.data.errors) {
                console.log(res.data.errors);
                // setErrs(res.data.errors);
            }
            else {
                // console.log(res.data)
                navigate("/");
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }

    useEffect(() => {
        if ( !loggedIn )
            navigate("/logreg")
        else
        {
            axios.get("http://localhost:8000/api/user/" + userId)
            .then((res) => {
                // console.log('here')
                if(res.data.errors) {
                    console.log(res.data.errors);
                }
                else {
                    setUserName(res.data.username);
                    setEmail(res.data.email);
                }
            })
            .catch((err) => {
                console.log("Error:" + err);
            })
        }
    }, [  ]);

    return (
        <div className="account">
        {
            // check if we are logged in or not
            loggedIn ? 
                // we are logged in so display our data
                <div class="pure-form pure-form-aligned">
                    <form onSubmit={submitHandler}>
                        <h2 className="account-h2">Account Info</h2>
                        <div className="pure-control-group">
                            <label>User Name: </label>
                            <input  type="text"
                                name="username"
                                value={username}
                                onChange={ (e) => setUserName( e.target.value ) }
                            />
                        </div>
                        <div className="pure-control-group">
                            <label>Email: </label>
                            <input  type="text"
                                name="email"
                                value={email}
                                onChange={ (e) => setEmail( e.target.value ) }
                            />
                        </div>
                        <div className="pure-controls">
                            <button className="pure-button pure-button-primary" type="submit">Update Info</button>
                        </div>
                    </form>
                </div>
            // display nothing if not logged in
            :
            null
        }
        </div>
        
    )
};

export default Account;
