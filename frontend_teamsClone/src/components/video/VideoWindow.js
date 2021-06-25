import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import '../../styles/videoWindow.css';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import { CHAT } from "../../constants";
import { useDispatch, useSelector } from 'react-redux';
import { setClass } from '../../data/actions/classReducerActions';
import Peer from 'simple-peer';
import { setCaller, setCallAccept } from '../../data/actions/callActions';
import { setWindowState } from '../../data/actions/windowStateActions';
import { setCurrSelected } from '../../data/actions/currSelectedActions';

const VideoWindow = () => {

    const currSelectedUser = useSelector(state => state.currSelectedReducer);
    const caller = useSelector(state => state.callReducer);
    const usersList = useSelector(state => state.usersListReducer);

    const [stream, setStream] = useState(null);
    const [pstream, setPStream] = useState(null);
    const [callended , setCallended] = useState(false);
    const [userMedia, setUserMedia] = useState({ video: true, audio: true });

    const myvideo = useRef();
    const othervid = useRef();
    const connref = useRef();
    const signalRef = useRef();

    const dispatch = useDispatch();
    const {name, id, email, socket, imgUrl} = useSelector(state => state.userReducer);

    useEffect(() => {

        navigator.mediaDevices.getUserMedia(userMedia)
        .then((currentStream) => {
            setStream(currentStream);
            myvideo.current.srcObject = currentStream;
        });
    
    }, []);

    const answerCall = () => {
    
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });
    
        peer.once("signal", data => {
            console.log(data);
            socket.current.emit("answercall", {signal: data, to: caller.id})
        });
    
        peer.once('stream', currStream => {
            setPStream(currStream);
          othervid.current.srcObject = currStream;
          
        });
    
        peer.signal(caller.signal);
    
        connref.current = peer;
    
        socket.current.once("callended", () => {
          setPStream(null);
          console.log(connref.current);
        });
    
    };
    
    const callUser = (pid) => {

        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });
    
        peer.once("signal", data => {
            console.log(data);
            socket.current.emit("calluser", {usertocall: pid, from: id, signalData: data})
        });
    
        peer.once('stream', (currStream) => {
            setPStream(currStream);
          othervid.current.srcObject = currStream;
        });
    
        socket.current.once("callaccepted", signal => {
            dispatch(setCallAccept(true));
            peer.signal(signal);    
        });
    
        connref.current = peer;
    
        socket.current.once("callended", () => {
          setPStream(null);
        });
      
    };
    
    const leaveCall = () => {

        setCallended(true);
        setPStream(null);
        if(connref.current)
        {
            connref.current.removeAllListeners('close');
            connref.current.destroy();
        }
        console.log(connref.current);
        socket.current.emit("callend");
    }

    // useLayoutEffect(() => {
    //    if(!caller.is)
    //    {
    //     const peer = new Peer({
    //         initiator: false,
    //         trickle: false,
    //         stream: stream,
    //       });
      
    //       peer.once("signal", data => {
    //           console.log(data);
    //           socket.current.emit("answercall", {signal: data, to: caller.id})
    //       });
      
    //       peer.once('stream', currStream => {
    //           setPStream(currStream);
    //         othervid.current.srcObject = currStream;
            
    //       });
      
    //       peer.signal(caller.signal);
      
    //       connref.current = peer;
      
    //       socket.current.once("callended", () => {
    //         setPStream(null);
    //         console.log(connref.current);
    //       });
    //    }
    // }, []);

    return (
        <div className="videoWindow">
            <div className="videoLeft">
                <div className="videoMain">
                    <div className="userVideos">
                        {stream && (<video playsInline muted ref={myvideo} autoPlay className="video" />)}
                    </div>
                    <div className="userVideos">
                        {pstream && <video playsInline muted={false} ref={othervid} autoPlay className="video" />}
                    </div>
                </div>
                <div>
                    {
                        caller.is ?
                        <button className= {caller.callAccept ? "CandAButton_hide": "CandAButton"}
                        onClick={()=>
                        {
                            callUser(currSelectedUser.id);
                        }}>
                        Call</button> :
                        <button className= {caller.callAccept ? "CandAButton_hide": "CandAButton"}
                        onClick={()=>
                        {
                            answerCall();
                            dispatch(setCallAccept(true));
                        }}>
                        Answer</button>
                    }
                </div>
                <div className="videoOptions">
                    <button className="videoOptionsButtons videoOptionsEndcall" onClick={() => 
                        { dispatch(setWindowState(CHAT)); leaveCall(); dispatch(setClass(false))}}>
                        <CallEndRoundedIcon fontSize="default" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoWindow;