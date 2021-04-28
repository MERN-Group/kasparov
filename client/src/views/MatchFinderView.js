import React from "react";
import MatchFinder from "../components/MatchFinder";

const MatchFinderView = (props) => {
    // const { loggedIn, setLoggedIn, setUserId, roomId } = props;
    return (
        <div>
            <MatchFinder props={props}/>
        </div>
    );
};

export default MatchFinderView;