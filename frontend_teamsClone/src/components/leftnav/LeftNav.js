import React from 'react';
import '../../styles/leftNav.css';
import ChatOutlinedIcon from '@material-ui/icons/ChatOutlined';
import GroupOutlinedIcon from '@material-ui/icons/GroupOutlined';
import AddRoundedIcon from '@material-ui/icons/AddRounded';
import { useDispatch, useSelector } from 'react-redux';
import { setSideRail } from '../../data/actions/sideRailActions';
import { Chat, Rooms } from "../../constants";
import { CHAT, VIDEOCALL, GROUP_VIDEOCALL } from "../../constants";

const LeftNav = ({ setShow }) => {

    const dispatch = useDispatch();

    const windowState = useSelector(state => state.windowStateReducer);

    return (
        <div className="leftNav">
            <button disabled={(windowState === VIDEOCALL || windowState === GROUP_VIDEOCALL) ? true : false} className="leftNavButton" onClick={()=>dispatch(setSideRail(Chat))}>
                <ChatOutlinedIcon />
                <span className="leftNavButtonText">Chat</span>
            </button>
            <button disabled={(windowState === VIDEOCALL || windowState === GROUP_VIDEOCALL) ? true : false} className="leftNavButton" onClick={()=>dispatch(setSideRail(Rooms))}>
                <GroupOutlinedIcon />
                <span className="leftNavButtonText">Rooms</span>
            </button>
            <button  disabled={(windowState === VIDEOCALL || windowState === GROUP_VIDEOCALL) ? true : false} className="leftNavButton" onClick={()=>{setShow(true)}} >
                <AddRoundedIcon/>
                <span className="leftNavButtonText">Invite Link</span>
            </button>
        </div>
    );
}

export default LeftNav;