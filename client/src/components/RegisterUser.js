import React, { useState } from "react";
import axios from "axios";
import '../css/pure.css'

const Register = props => {
    const [confirmReg, setConfirmReg] = useState("");
    const [errs, setErrs] = useState({});

    //    using a single state object to hold all data!
    const [ user, setUser ] = useState({
        firstName: "",
        lastName: "", 
        email: "", 
        password: "", 
        confirmPassword: "",
    })

    // using a single function to update the state object
    //    we can use the input's name attribute as the key in to the object
    const handleChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    const register = e => {
        e.preventDefault();

        axios.post("http://localhost:8000/api/user/register", 
        user,             // the user state is already an object with the correct keys and values!
        {
            // this will force the sending of the credentials / cookies so they can be updated
            //    XMLHttpRequest from a different domain cannot set cookie values for their own domain 
            //    unless withCredentials is set to true before making the request
            withCredentials: true,
        })
        .then(res => {
            console.log(res.data);

            // when we successfully created the account, reset state for registration form
            //    We do this if we are NOT navigating automatically away from the page
            setUser({
                firstName: "",
                lastName: "", 
                email: "", 
                password: "", 
                confirmPassword: "",
            })

            setConfirmReg("Thank you for Registering, you can now log in!");
            setErrs({});  // remember to reset errors state if it was successful
        })
        .catch((err) => {
            console.log(err);
            setErrs(err.response.data.errors);
        });
    };

    return (
        <div class="register">
        <div class="pure-form pure-form-aligned">
        <form onSubmit={register} >
            <fieldset>
                <div class="pure-controls">
                    <h2>Register</h2>
                    {
                        confirmReg ? 
                        <h4 style={{color: "green"}}>{confirmReg}</h4>
                        : null
                    }
                </div>
                <div class="pure-control-group">
                    <label className="register-label">User Name:</label>
                    <input id="aligned-name" required=""
                        className="fname-field"
                        type="text"
                        name="firstName"
                        value={user.firstName}
                        onChange={(e) => handleChange(e)}
                    />
                </div>
                <div class="pure-control-group">
                    <label className="register-label">Email:</label>
                    <input id="aligned-email" required=""
                        className="email-field"
                        type="email"
                        name="email"
                        value={user.email}
                        onChange={ handleChange }
                    />
                </div>
                <div class="pure-control-group">
                    <label className="register-label">Password:</label>
                    <input id="aligned-password" required=""
                        className="password-field"
                        type="password"
                        name="password"
                        value={user.password}
                        onChange={ handleChange }
                    />
                </div>
                <div class="pure-control-group">
                <label className="register-label">Confirm:</label>
                <input id="aligned-password" required=""
                    className="password-confirm-field" 
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={ handleChange }
                />
                </div>
                <div className="center" class="pure-controls">
                    <button className="pure-button pure-button-primary" type="submit">Register</button>
                </div>
            </fieldset>
        </form>
    </div>
    </div>
    );
};

export default Register;
