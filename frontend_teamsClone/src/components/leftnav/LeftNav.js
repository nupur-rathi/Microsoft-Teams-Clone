import React from 'react';
import '../../styles/leftNav.css';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import { useDispatch } from 'react-redux';
import { setSideRail } from '../../data/actions/sideRailActions';
import { Chat, Rooms } from "../../constants";

const LeftNav = () => {

    const dispatch = useDispatch();

    return (
        <div className="leftNav">
            <button className="leftNavButton" onClick={()=>dispatch(setSideRail(Chat))}>
                <ChatOutlinedIcon />
                <span className="leftNavButtonText">Chat</span>
            </button>
            <button className="leftNavButton" onClick={()=>dispatch(setSideRail(Rooms))}>
                <GroupOutlinedIcon />
                <span className="leftNavButtonText">Rooms</span>
            </button>
        </div>
    );
}

export default LeftNav;