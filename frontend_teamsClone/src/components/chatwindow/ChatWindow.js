import React from 'react';
import '../../styles/chatWindow.css';
import { useSelector } from 'react-redux';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import SentimentSatisfiedOutlinedIcon from '@material-ui/icons/SentimentSatisfiedOutlined';
import AttachmentOutlinedIcon from '@material-ui/icons/AttachmentOutlined';

const ChatWindow = () => {

    const currSelected = useSelector(state => state.currSelectedReducer);

    return (
        <div className="chatWindow">
            { !currSelected ? 
            <div className="noChatWindow">
                <img className="noChatImg" src="https://statics.teams.cdn.live.net/hashed/TFL_EmptyState_Chat-45a5af7.svg" />
                <span className="noChatText">Start Chatting</span>
            </div> :
            <div className="yesChatWindow">
                <div className="chatWindowMain">
                    <div className="messageDiv myMessageDiv">
                        <div className="messages myMessage">
                            <span className="messageFrom">You:</span>
                            <span className="message">biuhokhlijpopojppppppppppppppppp</span>
                        </div>
                    </div>
                    <div className="messageDiv otherMessageDiv">
                        <div className="messages otherMessage">
                            <span className="messageFrom">hjiyg</span>
                            <span className="message">uhuhjjjjjjjjjjjjjjjjjjjjjjjjjj</span>
                        </div>
                    </div>
                </div>
                <div className="chatWindowBelow">
                    <input className="chatInput" placeholder="Type a new message"></input>
                    <div className="chatInputOptions">
                        <div className="chatInputTypes">
                            <button className="chatEmojiButton chatOptionButtons">
                                <SentimentSatisfiedOutlinedIcon fontSize="small"/>
                            </button>
                            <button className="chatEmojiButton chatOptionButtons">
                                <AttachmentOutlinedIcon fontSize="small"/>
                            </button>
                        </div>
                        <button className="chatSendButton chatOptionButtons">
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