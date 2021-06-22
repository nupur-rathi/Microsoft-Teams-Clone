import React, { useState, useEffect, useRef } from 'react';
import '../../styles/videoWindow.css';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import { CHAT } from "../../constants";
import { useDispatch, useSelector } from 'react-redux';
import { setClass } from '../../data/actions/classReducerActions';
import Peer from 'simple-peer';

const VideoWindow = ({setWindowState}) => {

    const [stream, setStream] = useState(null);
    const [pstream, setPStream] = useState(null);
    const [call, setCall] = useState({});
    const [callaccepted , setCallaccepted] = useState(false);
    const [callended , setCallended] = useState(false);
    const [userMedia, setUserMedia] = useState({ video: true, audio: true });

    const myvideo = useRef();
    const othervid = useRef();
    const connref = useRef();


    const dispatch = useDispatch();
    const {name, id, email, socket, imgUrl} = useSelector(state => state.userReducer);

    useEffect(() => {

        navigator.mediaDevices.getUserMedia(userMedia)
        .then((currentStream) => {
            setStream(currentStream);
            myvideo.current.srcObject = currentStream;
        });

        socket.current.on("calluser", ({from, signal}) => {
            setCall({isreceivedcall: true, from, signal});
        });
    
    }, []);

    // const answercall = () => {

    //     setCallaccepted(true);
    
    //     const peer = new Peer({
    //       initiator: false,
    //       trickle: false,
    //       stream: stream,
    //     });
    
    //     peer.once("signal", data => {
    //       socket.current.emit("answercall", {signal: data, to: call.from})
    //     });
    
    //     peer.once("stream", currStream => {
    //       setPStream(currStream);
    //       othervid.current.srcObject = currStream;
    //     });
    
    //     peer.signal(call.signal);
    
    //     connref.current = peer;
    
    //     socket.current.once("callended", () => {
    //       setPStream(null);
    //       console.log(connref.current);
    //     });
    
    // };
    
    // const callUser = (id) => {
    //     const peer = new Peer({
    //       initiator: true,
    //       trickle: false,
    //       stream: stream,
    //     });
    
    //     peer.once("signal", data => {
    //       socket.current.emit("calluser", {usertocall: id, from: me, signalData: data})
    //     });
    
    //     peer.once("stream", (currStream) => {
    //       setPStream(currStream);
    //       othervid.current.srcObject = currStream;
    //     });
    
    //     socket.once("callaccepted", signal => {
    //       setCallaccepted(true);
    //       peer.signal(signal);
    //     });
    
    //     connref.current = peer;
    
    //     socket.current.once("callended", () => {
    //       setPStream(null);
    //     });
      
    // };

    const leaveCall = () => {

        // setCallended(true);
        // setPStream(null);
        // connref.current.removeAllListeners('close');
        // connref.current.destroy();
        // console.log(connref.current);
        // socket.current.emit("callend");
    }

    return (
        <div className="videoWindow">
            <div className="videoLeft">
                <div className="videoMain">
                    <div className="userVideos">
                        {stream && (<video playsInline muted ref={myvideo} autoPlay className="video" />)}
                    </div>
                    {/* <div className="userVideos">
                    </div> */}
                </div>
                <div className="videoOptions">
                    <button className="videoOptionsButtons videoOptionsEndcall" onClick={() => 
                        { setWindowState(CHAT); leaveCall(); dispatch(setClass(false))}}>
                        <CallEndRoundedIcon fontSize="default" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoWindow;