import React from "react";
import Account from "../components/Account";
// import '../css/AccountView.css'

const AccountView = (props) => {
    const { loggedIn, userId,  } = props;
    return (
        <div className="container-flex">
            <Account loggedIn={loggedIn} userId={userId} />
        </div>
    );
};

export default AccountView;