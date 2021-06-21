import React from 'react';
import '../../styles/videoWindow.css';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import { CHAT } from "../../constants";

const VideoWindow = ({setWindowState}) => {
    return (
        <div className="videoWindow">
            <div className="videoLeft">
                <div className="videoMain">
                    <div className="userVideos"></div>
                    <div className="userVideos"></div>
                    {/* <div className="userVideos"></div>
                    <div className="userVideos"></div> */}
                </div>
                <div className="videoOptions">
                    <button className="videoOptionsButtons videoOptionsEndcall" onClick={() => setWindowState(CHAT)}>
                        <CallEndRoundedIcon fontSize="medium" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoWindow;