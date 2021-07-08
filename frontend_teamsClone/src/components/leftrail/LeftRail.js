import React, { useState, useEffect, useRef } from 'react';
import '../../styles/leftRail.css';
import LeftRailListItems from './LeftRailListItems';
import { useSelector } from 'react-redux';
import { Chat, Rooms, Public, Private } from "../../constants";
import CreateRoomPopup from './CreateRoomPopup';
import JoinRoomPopup from './JoinRoomPopup';
import RoomItem from './RoomItem';

const LeftRail = () => {

    const classState = useSelector(state => state.classReducer);

    //show state for create and join room popups
    const [cpopupState, setCpopupState] = useState(false);
    const [jpopupState, setJpopupState] = useState(false);

    const heading = useSelector(state => state.sideRailReducer);
    const usersListObj = useSelector(state => state.usersListReducer);
    const usersList = (Object.keys(usersListObj).map((key) => usersListObj[key]));
    const roomsListObj = useSelector(state => state.roomsReducer);
    const roomsList = (Object.keys(roomsListObj['rooms']).map((key) => roomsListObj['rooms'][key]));
    
    const selectRoomTypeRef = useRef();

    //state for public or private room list to show
    const [roomType, setRoomType] = useState(Public);

    useEffect(() => {
        if(heading === Chat)
            setCpopupState(false);
            setJpopupState(false);
    }, [heading]);

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
                            <div className="selectDiv">
                                <select className="selectBox" ref={selectRoomTypeRef} onChange={()=>{
                                    setRoomType(selectRoomTypeRef.current.value)
                                }
                                }>
                                    <option className="roomTypeOption" value={Public}>{Public}</option>
                                    <option className="roomTypeOption" value={Private}>{Private}</option>
                                </select>
                            </div>

                            {roomsList.map(item => <RoomItem key={item.roomName} item={item} type={roomType}/>)}
                            
                        </>
                    )
                }
            </div>
        </div>
    );
}

export default LeftRail;