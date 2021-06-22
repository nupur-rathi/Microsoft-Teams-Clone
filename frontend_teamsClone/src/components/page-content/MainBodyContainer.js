import React from 'react';
import '../../styles/mainBody.css';
import VideoWindow from "../video/VideoWindow";
import CallWindow from "../callwindow/CallWindow";
import ChatWindow from "../chatwindow/ChatWindow";
import { useSelector, useReducer } from 'react-redux';

import { CHAT, VIDEOCALL, AUDIOCALL } from '../../constants';


const MainBodyContainer = () => {

    const classState = useSelector(state => state.classReducer);
    const windowState = useSelector(state => state.windowStateReducer);

    function renderWindow()
    {
        if(windowState === CHAT) {
            return (<ChatWindow />);
        }
        else if(windowState === VIDEOCALL) {
            return (<VideoWindow />);
        }
        else if(windowState === AUDIOCALL) {
            return (<CallWindow />);
        }
    }

    return (
        <div className={classState ? "mainBodyContainer mainBodyContainer_expand": "mainBodyContainer"}>
            {renderWindow()}
        </div>
    );
}

export default MainBodyContainer;