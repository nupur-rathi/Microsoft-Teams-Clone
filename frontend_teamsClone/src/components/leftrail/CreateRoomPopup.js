import React, { useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../styles/leftRail.css';

const CreateRoomPopup = ({state, setState}) => {

    const nameRef = useRef();
    const passwordRef = useRef();
    const publicRef = useRef();
    const privateRef = useRef();

    const [isChecked, setIsChecked] = useState(false);

    const user = useSelector(state => state.userReducer);

    function createRoom()
    {
        if(nameRef.current.value === "")
            alert("room name field empty");
        else if(passwordRef.current && passwordRef.current.value === "")
            alert("password field empty");
        else
        {
            const roomName = nameRef.current.value;
            const password = (passwordRef.current && passwordRef.current.value) ? passwordRef.current.value : null ;
            user.socket.current.emit("joinRoom", 
            {
                roomName: roomName, 
                eventType: "create",
                isPrivate: isChecked,
                password: password,
            });
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
                    <input type="radio" ref={publicRef} id="public" name="room_type" value="public" checked={!isChecked}
                    onChange = {()=> {
                        setIsChecked(false);
                    }}/>
                    <label for="public">Public</label>
                </div>
                <div className="radioButtonDiv">
                    <input type="radio" ref={privateRef} id="private" name="room_type" value="private"  checked={isChecked}
                    onChange = {()=> {
                        setIsChecked(true);
                    }}/>
                    <label for="private">Private</label>
                </div>
                {isChecked ? 
                    <div className="keyInputDiv">
                        <label>Password:</label>
                        <input className="roomNameInputField" type="text" ref={passwordRef}></input>
                    </div> : 
                    <></>
                }
                <div className="roomPopupButtonDiv">
                    <button className="roomPopupButtons"
                    onClick={()=>{
                        createRoom();
                    }}>Done</button>
                    <button className="roomPopupButtons"
                    onClick={()=>{
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

export default CreateRoomPopup;