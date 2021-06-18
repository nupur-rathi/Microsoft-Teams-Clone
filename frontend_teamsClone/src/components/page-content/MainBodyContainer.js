import React from 'react';
import '../../styles/mainBody.css';
import VideoWindow from "../video/VideoWindow";
import CallWindow from "../callwindow/CallWindow";

const MainBodyContainer = () => {
    return (
        <div className="mainBodyContainer">
            {/* <VideoWindow /> */}
            <CallWindow />
        </div>
    );
}

export default MainBodyContainer;