import React, { useState, useRef, useEffect } from 'react';
import '../../styles/videoWindow.css';

const GroupVideoFrame = ({peer, name}) => {

    // const {peerID, peer, peerName} = props.peer;
    const [stream, setStream] = useState(null);
    const videoRef = useRef();

    useEffect(() => {
            peer.on("stream", (currStream) => {
            setStream(currStream);
            videoRef.current.srcObject = currStream;
        });

    }, []);

    return (
        <div className="userVideos">
            {stream && (<video playsInline ref={videoRef} autoPlay={true} className="video" />)}
            <span className="userVideoName">{name}</span>
        </div>
    )
}

export default GroupVideoFrame;
