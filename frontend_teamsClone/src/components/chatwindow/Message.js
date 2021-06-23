import React from 'react';
import { useSelector } from 'react-redux';
import '../../styles/chatWindow.css';

const Message = ({item, me}) => {
    //return according to the message sender
    if(item.sender === me)
    {
        return (
            <div className="messageDiv myMessageDiv">
                <div className="messages myMessage">
                    <span className="messageFrom">{`You :`}</span>
                    <span className="message">{item.message}</span>
                </div>
            </div>
        );
    }
    else
    {
        return(
            <div className="messageDiv otherMessageDiv">
                <div className="messages otherMessage">
                    <span className="messageFrom">{`${item.sender} :`}</span>
                    <span className="message">{item.message}</span>
                </div>
            </div>
        );
    }

}

export default Message;