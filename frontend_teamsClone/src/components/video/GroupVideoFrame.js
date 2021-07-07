import React, { useState, useRef, useEffect } from 'react';
import '../../styles/videoWindow.css';

const GroupVideoFrame = ({peer, name}) => {

    const [stream, setStream] = useState(null);
    const videoRef = useRef();
    const count = useRef(0);

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
