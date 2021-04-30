import React, { useState, useEffect } from 'react';
import { navigate } from '@reach/router';
import axios from 'axios';
// import '../css/Account.css';

const Account = (props) => {
    const { loggedIn, userId } = props;

    const [ userName, setUserName ] = useState("");
    const [ email, setEmail ] = useState("");

    // const [ errs, setErrs ] = useState({});

    const submitHandler = (e) => {
        e.preventDefault();

        axios.put("http://localhost:8000/api/user/" + userId, {
            userName: userName,
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
                    setUserName(res.data.userName);
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
                <div className="account-info">
                    <form onSubmit={submitHandler}>
                        <h2 style={{marginTop: '50px'}}className="account-h2">Account Info</h2>
                        <div>
                            <label>User Name: </label>
                            <input className="userName-field" style={{marginTop: '50px'}} type="text"
                                name="userName"
                                value={userName}
                                onChange={ (e) => setUserName( e.target.value ) }
                            />
                        </div>
                        <div>
                            <label>Email: </label>
                            <input className="email-field" type="text"
                                name="email"
                                value={email}
                                onChange={ (e) => setEmail( e.target.value ) }
                            />
                        </div>
                        <div>
                            <button className="update-btn" type="submit">Update Info</button>
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
