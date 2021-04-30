import React from "react";
import LoginUser from "../components/LoginUser";
import RegisterUser from "../components/RegisterUser"

const LogReg = (props) => {
    const { loggedIn, setLoggedIn, setUserId, userName, setUserName } = props;
    return (
        <div className="signin">
            <LoginUser loggedIn={loggedIn} setLoggedIn={setLoggedIn} setUserId={setUserId} userName={userName} setUserName={setUserName}/>
            <RegisterUser loggedIn={loggedIn} setUserId={setUserId}/>
        </div>
    );
};

export default LogReg;