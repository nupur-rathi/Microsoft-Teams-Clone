import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import "../../styles/leftRail.css";
import { textToClipboard } from '../../utilities';
import { deleteRoomFromJoined } from '../../data/actions/roomsActions';

//dropdown component with options as join, un-join, copy roomname and room pwd for roomItem

const RoomItemDropdown = ({ item }) => {

    const rooms = useSelector(state => state.roomsReducer);
    const user = useSelector(state => state.userReducer);
    const [state, setState] = useState(() => { return (rooms['joined'].includes(item.roomName)) } );

    const dispatch = useDispatch();

    //function on clicking join room
    function joinRoom(){
        setState(true);
        user.socket.current.emit("joinRoom", {roomName: item.roomName, eventType: "join", isPrivate: null, password: item.password});
    }

    //function on un-joining a room
    function leaveRoom(){
        setState(false);
        user.socket.current.emit("leaveRoom", item.roomName);
        dispatch(deleteRoomFromJoined(item.roomName));
    }

    return (

        <div className="roomDropdown">
            { state ? 
            <button className="dropdownButtons" onClick={ leaveRoom }>un-join</button> :
            <button className="dropdownButtons" onClick={ joinRoom }>Join</button> }
            <button className="dropdownButtons" onClick = { () => textToClipboard(item.roomName) }>copy room-name</button>
            { item.password ? <button className="dropdownButtons" onClick = { () => textToClipboard(item.password) } >copy room-pwd</button> : <></> }
        </div>
    )
}

export default RoomItemDropdown