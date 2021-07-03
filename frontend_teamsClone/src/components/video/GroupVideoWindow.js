import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Peer from 'simple-peer';
import '../../styles/videoWindow.css';
import VideoFrame from './VideoFrame';
import GroupVideoFrame from './GroupVideoFrame';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import SendOutlinedIcon from '@material-ui/icons/SendOutlined';
import VideocamRoundedIcon from '@material-ui/icons/VideocamRounded';
import MicRoundedIcon from '@material-ui/icons/MicRounded';
import MicOffRoundedIcon from '@material-ui/icons/MicOffRounded';
import VideocamOffRoundedIcon from '@material-ui/icons/VideocamOffRounded';
import { CHAT } from "../../constants";
import { setClass } from '../../data/actions/classReducerActions';
import { setCallJoin,setCallCancel, setCallDecline, setCallAccept, setCallReceive, setCallEnd, setCallSend } from '../../data/actions/callActions';
import { setWindowState } from '../../data/actions/windowStateActions';
import PhoneEnabledRoundedIcon from '@material-ui/icons/PhoneEnabledRounded';
import PhoneDisabledRoundedIcon from '@material-ui/icons/PhoneDisabledRounded';
import { streamRef } from '../../pages/Teams';
import { Socket } from 'socket.io-client';
import { setVideoRoom } from '../../data/actions/videoRoomActions';
import Message from '../chatwindow/Message';
import VideoMessage from './VideoMessage';

const GroupVideoWindow = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer);
    const call = useSelector(state => state.callReducer);
    const videoRoom = useSelector(state => state.videoRoomReducer);

    const [stream, setStream] = useState(null);
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);
    const [peers, setPeers] = useState([]);
    const [peerNames, setPeerNames] = useState({});

    const myVideoRef = useRef();
    const peersRef = useRef([]);

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setStream(currentStream);
            myVideoRef.current.srcObject = currentStream;
            streamRef.current = currentStream;
        });

        user.socket.current.on("usersInVideoRoom", users => {
            const peers = [];
            users.forEach(userID => {
                const peer = createPeer(userID, user.id, streamRef);
                peersRef.current.push({
                    peerID: userID,
                    peer,
                });
                peers.push(peer);
            });
            setPeers(peers);
        });

        user.socket.current.on("userJoinedVideo", payload =>{
            const peer = addPeer(payload.signal, payload.callerID, streamRef);
            peersRef.current.push({
                peerID: payload.callerID,
                peer,
            });
            const pid = payload.callerID;
            setPeers(users => [...users, peer]);
        });

        user.socket.current.on("receiveReturnedSignal", payload => {
            const item = peersRef.current.find(p => p.peerID === payload.id);
            item.peer.signal(payload.signal);
        });
    
    }, []);

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
        setCamState(true);
        setMicState(true);
        stream.getTracks().forEach(track => track.stop());
        user.socket.current.emit("leaveVideoRoom", videoRoom['videoRoom']);
        dispatch(setVideoRoom(null));
    }

    function cancelCall(){
        dispatch(setWindowState(CHAT));
        dispatch(setClass(false));
        dispatch(setCallJoin(false));
        setCamState(true);
        setMicState(true);
        stream.getTracks().forEach(track => track.stop());
        dispatch(setVideoRoom(null));
    }

    function createPeer(userToSignal, callerID, stream){
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream.current,
        });

        peer.on("signal", signal => {
            user.socket.current.emit("sendSignal", {userToSignal, callerID, signal});
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream){

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream.current,
        });

        peer.on("signal", signal => {
            user.socket.current.emit("returnSignal", {signal, callerID});
        });

        peer.signal(incomingSignal);

        return peer;
    }

    function joinCall(){
        dispatch(setCallJoin(true));
        user.socket.current.emit("joinVideoRoom", videoRoom['videoRoom']);
        
    }

    return (
        <div className="videoWindow">
            <div className="videoLeft">
                <div className="videoMain">
                    <VideoFrame who="me" stream={stream} videoRef={myVideoRef} name={user.name}/>
                    {peers.map((peer, index) => {
                        return (
                            <GroupVideoFrame key={index} peer={peer}/>
                        );
                    })}
                </div>
                 
                {call.callJoin ?

                <div className="videoOptions">
                    <button className="videoOptionsButtons videoOptionsEndcall" onClick={() => 
                        {  leaveCall(); }}>
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
                </div> :

                <div className="beforeCallOptions">
                    <button className="beforeCallOptionsButtons " onClick={() => 
                        { muteMic() }}>
                        {micState ? <MicRoundedIcon fontSize="default" /> : <MicOffRoundedIcon fontSize="default" /> }
                    </button>
                    <button className="beforeCallOptionsButtons" onClick={() => 
                        { muteCam() }}>
                        {camState ? <VideocamRoundedIcon fontSize="default" /> : <VideocamOffRoundedIcon fontSize="default" /> }
                    </button>
                    <button className= "cancelButton CandAButton" onClick={()=>{
                        cancelCall();    
                    }}>
                        Cancel
                    </button>
                    <button className= "CandAButton" onClick={()=>{joinCall()}}>Continue</button>
                </div> 
                }
            </div>

            <div className="videoRight">
                <div className="videoRightHeader">Chat</div>
                <div className="videoRightBody">
                </div>
                <div className="videoRightBelow">
                    <input className="videoInput"></input>
                    <button className="videoChatSend"><SendOutlinedIcon fontSize="small"/></button>
                </div>
            </div>
        </div>
    );
}

export default GroupVideoWindow;