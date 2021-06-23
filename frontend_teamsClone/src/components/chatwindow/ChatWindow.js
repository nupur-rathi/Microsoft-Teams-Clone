import React from 'react';
import '../../styles/chatWindow.css';

const ChatWindow = () => {
    return (
        <div className="chatWindow">
            <div className="noChatWindow">
                <img src="https://statics.teams.cdn.live.net/hashed/TFL_EmptyState_Chat-45a5af7.svg" />
            </div>
        </div>
    );
}

export default ChatWindow;