import React from 'react';
import '../../styles/mainBody.css';
import VideoWindow from "../video/VideoWindow";
import ChatWindow from "../chatwindow/ChatWindow";
import GroupVideoWindow from '../video/GroupVideoWindow';
import { useSelector } from 'react-redux';
import { CHAT, VIDEOCALL, GROUP_VIDEOCALL } from '../../constants';


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
        else if(windowState === GROUP_VIDEOCALL) {
            return (<GroupVideoWindow />);
        }
    }

    return (
        <div className={classState ? "mainBodyContainer mainBodyContainer_expand": "mainBodyContainer"}>
            {renderWindow()}
        </div>
    );
}

export default MainBodyContainer;