import React, { useState, useRef, useEffect } from 'react';
import '../../styles/videoWindow.css';

const GroupVideoFrame = (props) => {

    // const {peerID, peer, peerName} = props.peer;
    const [stream, setStream] = useState(null);
    const videoRef = useRef();

    useEffect(() => {
            props.peer.on("stream", (currStream) => {
            console.log(currStream);
            console.log(currStream.getVideoTracks());
            setStream(currStream);
            videoRef.current.srcObject = currStream;
        });

    }, []);

    return (
        <div className="userVideos">
            {stream && (<video playsInline ref={videoRef} autoPlay={true} className="video" />)}
            <span className="userVideoName">peerName</span>
        </div>
    )
}

export default GroupVideoFrame;
