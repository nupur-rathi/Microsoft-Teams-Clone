import React, { useRef } from 'react';
import '../../styles/leftRail.css';

const RoomPopup = ({state, setState}) => {

    const nameRef = useRef();

    function createRoom()
    {
        if(nameRef.current.value === "")
            alert("room name field empty");
        else
        {
            console.log(nameRef.current.value);
            setState(false);
        }
    }

    if(state === true)
    {
        return (
            <div className="createRoomPopup">
                <div className="roomNameInput">
                    <label>Room Name:</label>
                    <input className="roomNameInputField" type="text" ref={nameRef}></input>
                </div>
                <div className="radioButtonDiv">
                    <input type="radio" id="public" name="room_type" value="public"/>
                    <label for="public">Public</label>
                </div>
                <div className="radioButtonDiv">
                    <input type="radio" id="private" name="room_type" value="private"/>
                    <label for="private">Private</label>
                </div>
                <div className="roomPopupButtonDiv">
                    <button className="roomPopupButtons"
                    onClick={()=>{
                        createRoom();
                    }}>Done</button>
                    <button className="roomPopupButtons"
                    onClick={()=>{
                        nameRef.current.value = "";
                        setState(false);
                    }}>Cancel</button>
                </div>
            </div>
        )
    }

    else
    {
        return <></>
    }

}

export default RoomPopup;