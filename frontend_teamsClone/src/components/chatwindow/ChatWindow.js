import React, { useRef } from 'react';
import '../../styles/chatWindow.css';
import { useDispatch, useSelector } from 'react-redux';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';
import Message from './Message';
import { addChat } from '../../data/actions/chatActions';

const ChatWindow = () => {

    const dispatch = useDispatch();

    let currMessagesToShow = [];

    const currSelected = useSelector(state => state.currSelectedReducer);
    const user = useSelector(state => state.userReducer);
    const messages = useSelector(state => state.chatReducer);

    if(currSelected !== null && currSelected.type === "user")
    {
        currMessagesToShow = messages["oto"][currSelected.id];
    }

    const inputFieldRef = useRef();

    const sendMessage = () => {

        const message = inputFieldRef.current.value;
        inputFieldRef.current.value = "";
        if(message == "")
        {

        }
        else
        {
            if(currSelected.type === "user")
            {
                dispatch(addChat("oto", currSelected.id, user.id, message)); 
                user.socket.current.emit("sendMessage", {to: currSelected.id, message: message});
            }   
        }

    };

    return (
        <div className="chatWindow">
            { !currSelected ? 
            <div className="noChatWindow">
                <img className="noChatImg" src="https://statics.teams.cdn.live.net/hashed/TFL_EmptyState_Chat-45a5af7.svg" />
                <span className="noChatText">Start Chatting</span>
            </div> :
            <div className="yesChatWindow">
                <div className="chatWindowMain">
                    {
                        currMessagesToShow && currMessagesToShow.map((item,index) => <Message key={index} item={item} me={user.id}/>)
                    }   
                </div>
                <div className="chatWindowBelow">
                    {/* <div className={isMessage ? "hide": "alertOnNoInput"}>
                    Please write a message to send.</div> */}
                    <input ref={inputFieldRef} className="chatInput" placeholder="Type a new message"></input>
                    <div className="chatInputOptions">
                        <div className="chatInputTypes">
                            <button className="chatEmojiButton chatOptionButtons">
                                <SentimentSatisfiedOutlinedIcon fontSize="small"/>
                            </button>
                            <button className="chatEmojiButton chatOptionButtons">
                                <AttachmentOutlinedIcon fontSize="small"/>
                            </button>
                        </div>
                        <button className="chatSendButton chatOptionButtons" onClick={()=>{sendMessage();}}>
                            <SendOutlinedIcon fontSize="small"/>
                        </button>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}

export default ChatWindow;