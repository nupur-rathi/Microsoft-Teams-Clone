import React, { useRef } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/leftRail.css';

const JoinRoomPopup = ({state, setState}) => {

    //references to input fields for room name and password
    const nameRef = useRef();
    const passwordRef = useRef();
    const user = useSelector(state => state.userReducer);

    //join room function
    function joinRoom()
    {
        if(nameRef.current.value === "")
            alert("room name field empty");
        else
        {
            const roomName = nameRef.current.value;
            const password = passwordRef.current.value;
            user.socket.current.emit("joinRoom", {roomName:roomName, eventType: "join", isPrivate: null, password: password});
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
                <div className="keyInputDiv">
                    <label>Password:</label>
                    <input className="roomNameInputField" type="text" ref={passwordRef}></input>
                </div>
                <div className="roomPopupButtonDiv">
                    <button className="roomPopupButtons"
                    onClick={()=>{
                        joinRoom();
                    }}>Join</button>
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

export default JoinRoomPopup;