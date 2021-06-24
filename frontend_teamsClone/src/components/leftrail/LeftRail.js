import React, { useState, useEffect } from 'react';
import '../../styles/leftRail.css';
import LeftRailListItems from './LeftRailListItems';
import { useSelector } from 'react-redux';
import { Chat, Rooms } from "../../constants";
import RoomPopup from './RoomPopup';

const LeftRail = () => {

    const classState = useSelector(state => state.classReducer);

    const [cpopupState, setCpopupState] = useState(false);

    const heading = useSelector(state => state.sideRailReducer);
    const usersListObj = useSelector(state => state.usersListReducer);
    const usersList = (Object.keys(usersListObj).map((key) => usersListObj[key]));
    // const roomsList = [];

    useEffect(() => {
        if(heading === Chat)
            setCpopupState(false);
    }, [heading])

    return (
        <div className={classState ? "leftRail leftRail_hide": "leftRail"}>
            <div className="leftRailHeader">
                <span className="leftRailHeading">{heading}</span>
            </div>
            <div className="leftRailBody">
                <div className={(heading === Rooms) ? "leftRailRoomOptions" : "hide"}>
                    <button className="leftRailButtons" onClick={()=>setCpopupState(true)}>Create Room</button>
                    <button className="leftRailButtons">Join Room</button>
                </div>
                <RoomPopup state={cpopupState} setState={setCpopupState}/>
                {(heading === Chat) ? usersList.map(item => <LeftRailListItems key={item.id} users={item}/>) : <></>}
            </div>
        </div>
    );
}

export default LeftRail;