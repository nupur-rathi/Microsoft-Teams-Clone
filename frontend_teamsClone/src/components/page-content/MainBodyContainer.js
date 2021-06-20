import React from 'react';
import '../../styles/mainBody.css';
import VideoWindow from "../video/VideoWindow";
import CallWindow from "../callwindow/CallWindow";
import ChatWindow from "../chatwindow/ChatWindow";

import { CHAT, VIDEOCALL, AUDIOCALL } from '../../constants';


const MainBodyContainer = ({currentWindow}) => {

    function renderWindow()
    {
        if(currentWindow === CHAT) {
            return (<ChatWindow />);
        }
        else if(currentWindow === VIDEOCALL) {
            return (<VideoWindow />);
        }
        else if(currentWindow === AUDIOCALL) {
            return (<CallWindow />);
        }
    }
    return (
        <div className="mainBodyContainer">
            {renderWindow()}
        </div>
    );
}

export default MainBodyContainer;