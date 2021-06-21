import React from 'react';
import '../../styles/mainBody.css';
import VideoWindow from "../video/VideoWindow";
import CallWindow from "../callwindow/CallWindow";
import ChatWindow from "../chatwindow/ChatWindow";

import { CHAT, VIDEOCALL, AUDIOCALL } from '../../constants';


const MainBodyContainer = ({currentWindow, setWindowState}) => {

    function renderWindow()
    {
        if(currentWindow === CHAT) {
            return (<ChatWindow setWindowState={setWindowState} />);
        }
        else if(currentWindow === VIDEOCALL) {
            return (<VideoWindow setWindowState={setWindowState} />);
        }
        else if(currentWindow === AUDIOCALL) {
            return (<CallWindow setWindowState={setWindowState} />);
        }
    }
    return (
        <div className="mainBodyContainer">
            {renderWindow()}
        </div>
    );
}

export default MainBodyContainer;