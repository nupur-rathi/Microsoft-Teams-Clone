import React from 'react'
import '../../styles/videoWindow.css';

function VideoFrame({ who, stream, videoRef, name }) {

    return (
        <div className="userVideos">
            {stream && (<video playsInline muted={ who==='me' ? true : false} ref={videoRef} autoPlay className="video" />)}
            <span className="userVideoName">{name}</span>
        </div>
    )
}

export default VideoFrame
