import React from 'react';
import '../styles/leftNav.css';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';

const LeftNav = () => {
    return (
        <div className="leftNav">
            <button className="leftNavButton">
                <ChatOutlinedIcon />
                <span className="leftNavButtonText">Chat</span>
            </button>
            <button className="leftNavButton">
                <GroupOutlinedIcon />
                <span className="leftNavButtonText">Rooms</span>
            </button>
        </div>
    );
}

export default LeftNav;