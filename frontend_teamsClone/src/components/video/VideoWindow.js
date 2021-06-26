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
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';

const VideoWindow = () => {

    const currSelectedUser = useSelector(state => state.currSelectedReducer);
    const caller = useSelector(state => state.callReducer);
    const usersList = useSelector(state => state.usersListReducer);

    const [stream, setStream] = useState(null);
    const [pstream, setPStream] = useState(null);
    const [callended , setCallended] = useState(false);
    const [userMedia, setUserMedia] = useState({ video: true, audio: true });
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);

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

    function muteMic() {
        stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
        setMicState(!micState);
    }

    function muteCam() {
        stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
        setCamState(!camState);
    }
    
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
                    <button className="videoOptionsButtons" onClick={() => 
                        { muteMic() }}>
                        {micState ? <MicRoundedIcon fontSize="default" /> : <MicOffRoundedIcon fontSize="default" /> }
                    </button>
                    <button className="videoOptionsButtons" onClick={() => 
                        { muteCam() }}>
                        {camState ? <VideocamRoundedIcon fontSize="default" /> : <VideocamOffRoundedIcon fontSize="default" /> }
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoWindow;