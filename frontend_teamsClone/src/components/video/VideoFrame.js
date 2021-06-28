import React from 'react'
import '../../styles/videoWindow.css';

function VideoFrame({ who, stream, videoRef }) {

    return (
        <div className="userVideos">
            {stream && (<video playsInline muted={ who==='me' ? true : false} ref={videoRef} autoPlay className="video" />)}
        </div>
    )
}

export default VideoFrame
