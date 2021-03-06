import React, { useState, useRef, useEffect } from 'react';
import '../../styles/videoWindow.css';

const GroupVideoFrame = ({peer, name}) => {

    //peer stream state
    const [stream, setStream] = useState(null);
    //peer videoFrame ref
    const videoRef = useRef();

    useEffect(() => {
            peer.once("stream", (currStream) => {
            setStream(currStream);
            videoRef.current.srcObject = currStream;
        });

    }, []);

    if(stream && peer)
    {
        return (
            <div className="userVideos">
                {stream && (<video playsInline ref={videoRef} autoPlay={true} className="video" />)}
                <span className="userVideoName">{name}</span>
            </div>
        )
    }
    else
    {
        return <></>;
    }
}

export default GroupVideoFrame;
