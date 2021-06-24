import React, { useState, useEffect } from 'react';
import '../../styles/leftRail.css';
import LeftRailListItems from './LeftRailListItems';
import { useSelector } from 'react-redux';
import { Chat, Rooms } from "../../constants";
import CreateRoomPopup from './CreateRoomPopup';
import JoinRoomPopup from './JoinRoomPopup';
import PublicRooms from './PublicRooms';
import PrivateRooms from './PrivateRooms';

const LeftRail = () => {

    const classState = useSelector(state => state.classReducer);

    const [cpopupState, setCpopupState] = useState(false);
    const [jpopupState, setJpopupState] = useState(false);

    const heading = useSelector(state => state.sideRailReducer);
    const usersListObj = useSelector(state => state.usersListReducer);
    const usersList = (Object.keys(usersListObj).map((key) => usersListObj[key]));
    // const roomsList = [];

    useEffect(() => {
        if(heading === Chat)
            setCpopupState(false);
            setJpopupState(false);
    }, [heading])

    return (
        <div className={classState ? "leftRail leftRail_hide": "leftRail"}>
            <div className="leftRailHeader">
                <span className="leftRailHeading">{heading}</span>
            </div>
            <div className="leftRailBody">
                <div className={(heading === Rooms) ? "leftRailRoomOptions" : "hide"}>
                    <button className="leftRailButtons" onClick={()=>
                        {
                            setCpopupState(true);
                            setJpopupState(false);
                        }}>Create Room</button>
                    <button className="leftRailButtons" onClick={()=>
                        {
                            setJpopupState(true);
                            setCpopupState(false);
                        }}>Join Room</button>
                </div>
                <CreateRoomPopup state={cpopupState} setState={setCpopupState}/>
                <JoinRoomPopup state={jpopupState} setState={setJpopupState}/>
                {
                    (heading === Chat) ? 
                    usersList.map(item => <LeftRailListItems key={item.id} users={item}/>) : 
                    (
                        <>
                            <PublicRooms />
                            <PrivateRooms />
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default LeftRail;