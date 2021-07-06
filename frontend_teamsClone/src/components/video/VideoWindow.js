import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Peer from 'simple-peer';
import '../../styles/videoWindow.css';
import VideoFrame from './VideoFrame';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { CHAT } from "../../constants";
import { setClass } from '../../data/actions/classReducerActions';
import { setCallBusy, setCallJoin,setCallCancel, setCallDecline, setCallAccept, setCallReceive, setCallEnd, setCallSend } from '../../data/actions/callActions';
import { setWindowState } from '../../data/actions/windowStateActions';
import PhoneEnabledRoundedIcon from '@material-ui/icons/PhoneEnabledRounded';
import PhoneDisabledRoundedIcon from '@material-ui/icons/PhoneDisabledRounded';
import { streamRef } from '../../pages/Teams';

const VideoWindow = () => {

    const dispatch = useDispatch();

    const currSelectedUser = useSelector(state => state.currSelectedReducer);
    const call = useSelector(state => state.callReducer);
    const caller = useSelector(state => state.callerReducer);
    const user = useSelector(state => state.userReducer);
    const usersList = useSelector(state => state.usersListReducer);

    const [stream, setStream] = useState(null);
    const [pstream, setPStream] = useState(null);
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);

    const myVideoRef = useRef();
    const peerVideoRef = useRef();
    const connectionRef = useRef();

    useEffect(() => {

        dispatch(setCallBusy(true));

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setStream(currentStream);
            myVideoRef.current.srcObject = currentStream;
            streamRef.current = currentStream;
        });
        
        return (() => {
            if(connectionRef.current)
            {
                connectionRef.current.removeAllListeners('close');
                connectionRef.current.destroy();
            }
            user.socket.current.off("callAccepted");
            user.socket.current.off("callEnded");
            user.socket.current.off("callDeclined");
            dispatch(setCallBusy(false));
        });
    
    }, []);

    const answerCall = () => {
    
        dispatch(setCallJoin(true));
        
        const peer = new Peer({
          initiator: false,
          trickle: false,
          stream: stream,
        });
    
        peer.once("signal", data => {
            user.socket.current.emit("answerCall", {signal: data, to: caller.from});
        });
    
        peer.once('stream', currStream => {
            setPStream(currStream);
            peerVideoRef.current.srcObject = currStream;
        });
    
        peer.signal(caller.signal);
    
        connectionRef.current = peer;

        user.socket.current.once("callEnded", () => {
            dispatch(setWindowState(CHAT));
            dispatch(setClass(false));
            dispatch(setCallJoin(false));
            dispatch(setCallAccept(false));
            dispatch(setCallDecline(false));
            dispatch(setCallReceive(false));
            dispatch(setCallEnd(false));
            dispatch(setCallSend(false));
            dispatch(setCallCancel(false));
            setPStream(null);
            setCamState(true);
            setMicState(true);
            console.log(stream);
            stream.getTracks().forEach(track => track.stop());
            if(connectionRef.current)
            {
                connectionRef.current.removeAllListeners('close');
                connectionRef.current.destroy();
            }
            alert("call ended");
        });
    
    };
    
    const callUser = (pid) => {

        const peer = new Peer({
          initiator: true,
          trickle: false,
          stream: stream,
        });
    
        peer.once("signal", data => {
            user.socket.current.emit("callUser", {userToCall: pid, from: user.id, signalData: data});
        });
    
        peer.once('stream', (currStream) => {
            setPStream(currStream);
            peerVideoRef.current.srcObject = currStream;
        });
    
        user.socket.current.once("callAccepted", signal => {
            dispatch(setCallAccept(true));
            dispatch(setCallSend(false));
            peer.signal(signal);    
        });
    
        connectionRef.current = peer;
    
        user.socket.current.once("callEnded", () => {
            dispatch(setWindowState(CHAT));
            dispatch(setClass(false));
            dispatch(setCallJoin(false));
            dispatch(setCallAccept(false));
            dispatch(setCallDecline(false));
            dispatch(setCallReceive(false));
            dispatch(setCallEnd(false));
            dispatch(setCallSend(false));
            dispatch(setCallCancel(false));
            setPStream(null);
            setCamState(true);
            setMicState(true);
            stream.getTracks().forEach(track => track.stop());
            if(connectionRef.current)
            {
                connectionRef.current.removeAllListeners('close');
                connectionRef.current.destroy();
            }
            alert("call ended");
        });

        user.socket.current.once("callDeclined", () => {
            dispatch(setWindowState(CHAT));
            dispatch(setClass(false));
            dispatch(setCallJoin(false));
            dispatch(setCallAccept(false));
            dispatch(setCallDecline(false));
            dispatch(setCallReceive(false));
            dispatch(setCallEnd(false));
            dispatch(setCallSend(false));
            dispatch(setCallCancel(false));
            setPStream(null);
            setCamState(true);
            setMicState(true);
            stream.getTracks().forEach(track => track.stop());
            if(connectionRef.current)
            {
                connectionRef.current.removeAllListeners('close');
                connectionRef.current.destroy();
            }
            alert("call declined");
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
    
    function leaveCall(){

        dispatch(setWindowState(CHAT));
        dispatch(setClass(false));
        dispatch(setCallJoin(false));
        dispatch(setCallAccept(false));
        dispatch(setCallDecline(false));
        dispatch(setCallReceive(false));
        dispatch(setCallEnd(false));
        dispatch(setCallSend(false));
        dispatch(setCallCancel(false));
        setPStream(null);
        setCamState(true);
        setMicState(true);
        stream.getTracks().forEach(track => track.stop());
        if(connectionRef.current)
        {
            connectionRef.current.removeAllListeners('close');
            connectionRef.current.destroy();
        }
        if(caller.is)
        {
            if(call.callAccept === false)
                user.socket.current.emit("callEndBefore", caller.to);
            else
                user.socket.current.emit("callEnd", caller.to);
        }
        else
        {
            user.socket.current.emit("callEnd", caller.from);
        }
    }

    function cancelCall(){
        if(caller.is)
        {
            dispatch(setWindowState(CHAT));
            dispatch(setClass(false));
            dispatch(setCallJoin(false));
            dispatch(setCallAccept(false));
            dispatch(setCallDecline(false));
            dispatch(setCallReceive(false));
            dispatch(setCallEnd(false));
            dispatch(setCallSend(false));
            dispatch(setCallCancel(false));
            setPStream(null);
            setCamState(true);
            setMicState(true);
            if(stream)
                stream.getTracks().forEach(track => track.stop());
        }
        else
        {
            leaveCall();
        }
    }

    function sendCall()
    {
        callUser(currSelectedUser.id); 
        dispatch(setCallJoin(true));
        dispatch(setCallSend(true));
        setTimeout(()=>{
            dispatch(setCallSend(false));
        }, 2500);
    }

    return (
        <div className="videoWindow">
            <div className="videoLeft">
                <div className="videoMain">
                    <VideoFrame who="me" stream={stream} videoRef={myVideoRef} name="You"/>
                    {(pstream && caller.to in usersList) && 
                    <VideoFrame who="other" stream={pstream} videoRef={peerVideoRef} name={(caller.from === user.id) ? usersList[caller.to].name : usersList[caller.from].name}/>
                    }
                </div>
                
                {call.callJoin ? 
                <>
                <div className="videoOptions">
                    <Tooltip title="Leave Call">  
                        <button className="videoOptionsButtons videoOptionsEndcall" onClick={() => 
                            {  leaveCall(); }}>
                            <CallEndRoundedIcon fontSize="default" />
                        </button>
                    </Tooltip>
                    <Tooltip title={ micState ? "Turn off Mic" : "Turn on Mic" }>
                        <button className="videoOptionsButtons" onClick={() => 
                            { muteMic() }}>
                            {micState ? <MicRoundedIcon fontSize="default" /> : <MicOffRoundedIcon fontSize="default" /> }
                        </button>
                    </Tooltip>
                    <Tooltip title={ camState ? "Turn off camera" : "Turn on camera" }>
                        <button className="videoOptionsButtons" onClick={() => 
                            { muteCam() }}>
                            {camState ? <VideocamRoundedIcon fontSize="default" /> : <VideocamOffRoundedIcon fontSize="default" /> }
                        </button>
                    </Tooltip>
                </div> 
                <div className="videoWindowText">
                    {call.callSend ? `call send...` : ``}
                </div>
                </>
                    :
                <div className="beforeCallOptions">
                    <Tooltip title={ micState ? "Turn off Mic" : "Turn on Mic" }>
                        <button className="beforeCallOptionsButtons " onClick={() => 
                            { muteMic() }}>
                            {micState ? <MicRoundedIcon fontSize="default" /> : <MicOffRoundedIcon fontSize="default" /> }
                        </button>
                    </Tooltip>
                    <Tooltip title={ camState ? "Turn off camera" : "Turn on camera" }>
                        <button className="beforeCallOptionsButtons" onClick={() => 
                            { muteCam() }}>
                            {camState ? <VideocamRoundedIcon fontSize="default" /> : <VideocamOffRoundedIcon fontSize="default" /> }
                        </button>
                    </Tooltip>
                    <Tooltip title="cancel call">
                        <button className= "cancelButton CandAButton" onClick={()=>{
                            cancelCall();    
                        }}>
                            Cancel
                        </button>
                    </Tooltip>
                    
                {
                    caller.is ?
                    <Tooltip title={`Call ${currSelectedUser.name}`}>
                        <button className= "CandAButton"
                        onClick={()=>
                        {
                            sendCall(); 
                        }}>
                        <PhoneEnabledRoundedIcon />
                        </button>
                    </Tooltip>
                    :
                    <Tooltip title="Join Call">
                        <button className= "CandAButton"
                        onClick={()=>
                        {
                            answerCall();
                        }}>
                        Join
                        </button>
                    </Tooltip>
                }
                </div> }
            </div>
        </div>
    );
}

export default VideoWindow;