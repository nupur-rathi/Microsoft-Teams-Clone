import React, { useRef, useState, useEffect } from 'react';
import '../../styles/chatWindow.css';
import { useDispatch, useSelector } from 'react-redux';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import Message from './Message';
import { addChat } from '../../data/actions/chatActions';
import Picker from 'emoji-picker-react';
import CloseIcon from '@material-ui/icons/Close';

const ChatWindow = () => {

    const dispatch = useDispatch();

    //curr messages to show in chat window for the currently selected user or room
    let currMessagesToShow = [];

    const currSelected = useSelector(state => state.currSelectedReducer);
    const user = useSelector(state => state.userReducer);
    const messages = useSelector(state => state.chatReducer);
    const rooms = useSelector(state => state.roomsReducer);

    //reference to the chat window main body
    const chatWindowMainRef = useRef(null);

    //scrolling to bottom on opening new messages or receiving new messages
    useEffect(() => {
        chatWindowMainRef.current?.scroll({ top: chatWindowMainRef.current.scrollHeight, behavior: "smooth"});
    }, [currMessagesToShow]);

    //initializing currently selected messages
    if(currSelected !== null && currSelected.type === "user")
    {
        currMessagesToShow = messages["oto"][currSelected.id];
    }
    else if(currSelected !== null && currSelected.type === "room")
    {
        currMessagesToShow = messages["room"][currSelected.roomName];
    }

    //reference to input field for writing message
    const inputFieldRef = useRef();

    //state to check and set if particular text is a message
    const [isMessage, setIsMessage] = useState(true);

    //sending message function
    const sendMessage = () => {
        const message = inputFieldRef.current.value;
        inputFieldRef.current.value = "";
        if(message === "")
        {
            setIsMessage(false);
        }
        else
        {
            setIsMessage(true);
            if(currSelected.type === "user")
            {
                dispatch(addChat("oto", currSelected.id, user.id, user.name, message)); 
                user.socket.current.emit("sendMessage", {to: currSelected.id, name: user.name, message: message});
            }
            else if(currSelected.type === "room")
            {
                dispatch(addChat("room", currSelected.roomName, user.id, user.name, message)); 
                user.socket.current.emit("sendMessageToRoom", {to: currSelected.roomName, name: user.name, message: message, roomName: currSelected.roomName});
                user.socket.current.emit("sendMessageToVideoRoom", { to: currSelected.roomName, name: user.name, message: message, roomName: currSelected.roomName });
            }   
        }

    };

    //sending emoji
    const onEmojiClick = (event, emojiObject) => {
        inputFieldRef.current.value = `${inputFieldRef.current.value} ${emojiObject.emoji}`;
    };

    //state for emoji window
    const [closeEP, setCloseEP] = useState(true);

    return (
        <div className="chatWindow">
            { !currSelected ? 
            <div className="noChatWindow">
                <img className="noChatImg" src="https://statics.teams.cdn.live.net/hashed/TFL_EmptyState_Chat-45a5af7.svg" />
                <span className="noChatText">Start Chatting</span>
            </div> :
            <div className="yesChatWindow">
                <div className="chatWindowMain" ref={chatWindowMainRef}>
                    {
                        currMessagesToShow && currMessagesToShow.map((item,index) => <Message key={index} item={item} me={user.id}/>)
                    }   
                </div>

                { ((currSelected.type === "room") && !(rooms['joined'].includes(currSelected.roomName))) ?
                <div className="chatWindowBelow">
                    <div className="notJoinedBelow">
                        You cannot send messages to this room. Please join it.
                    </div>
                </div> 
                :
                <>
                <div className="chatWindowBelow">
                    <div className={isMessage ? "hide": "alertOnNoInput"}>
                    Please write a message to send.</div>
                    <input ref={inputFieldRef} className="chatInput" placeholder="Type a new message" onKeyDown={(e)=>{
                        if(e.keyCode === 13)
                        {sendMessage();}
                    }}></input>
                    <div className="chatInputOptions">
                        <div className="chatInputTypes">
                            <button className="chatEmojiButton chatOptionButtons" onClick={()=>{setCloseEP(false);}}>
                                <SentimentSatisfiedOutlinedIcon fontSize="small"/>
                            </button>
                        </div>
                        <button className="chatSendButton chatOptionButtons" onClick={()=>{sendMessage();}}>
                            <SendOutlinedIcon fontSize="small"/>
                        </button>
                    </div>
                </div>
                <div className={closeEP ? "hide" : "emojiPicker"}>
                    <Picker onEmojiClick={onEmojiClick} />
                    <button className="emojiPickerClose" onClick={()=>{setCloseEP(true);}}><CloseIcon fontSize="small"/></button>
                </div>
                </>
                }
            </div>
            }
        </div>
    );
}

export default ChatWindow;