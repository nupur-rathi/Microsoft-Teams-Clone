import React from 'react'
import '../../styles/videoWindow.css';

const VideoMessage = ({item}) => {

    return (
        <div className="mssgDiv">
            <span className="mssgFrom">{`${item.senderName} :`}</span>
            <span className="mssg">{item.message}</span>
        </div>
    )
    
}

export default VideoMessage;