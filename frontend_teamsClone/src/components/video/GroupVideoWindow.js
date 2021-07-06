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
import ChatRoundedIcon from '@material-ui/icons/ChatRounded';
import PeopleRoundedIcon from '@material-ui/icons/PeopleRounded';
import CloseRoundedIcon from '@material-ui/icons/CloseRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { CHAT } from "../../constants";
import { addChat } from '../../data/actions/chatActions';
import { setClass } from '../../data/actions/classReducerActions';
import { setCallBusy, setCallJoin, setCallCancel, setCallDecline, setCallAccept, setCallReceive, setCallEnd, setCallSend } from '../../data/actions/callActions';
import { setWindowState } from '../../data/actions/windowStateActions';
import { streamRef } from '../../pages/Teams';
import { Socket } from 'socket.io-client';
import { setVideoRoom } from '../../data/actions/videoRoomActions';
import VideoMessage from './VideoMessage';
import { PEOPLES, VIDEOCHAT_HEAD } from '../../messageConstants';
import { constraints } from '../../utilities';

const GroupVideoWindow = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer);
    const call = useSelector(state => state.callReducer);
    const videoRoom = useSelector(state => state.videoRoomReducer);

    const [stream, setStream] = useState(null);
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);
    const [peers, setPeers] = useState([]);
    const [pl, setPl] = useState([]);
    const [chats, setChats] = useState([]);
    const [peoples, setPeoples] = useState(false);
    const [videochat, setVideochat] = useState(false);

    const myVideoRef = useRef();
    const peersRef = useRef([]);
    const inputRef = useRef();

    useEffect(() => {

        dispatch(setCallBusy(true));

        navigator.mediaDevices.getUserMedia({ video: constraints, audio: true })
            .then((currentStream) => {
                setStream(currentStream);
                myVideoRef.current.srcObject = currentStream;
                streamRef.current = currentStream;
            });

        user.socket.current.once("usersInVideoRoom", ({ roomUsers, users }) => {
            const peersList = [];
            const list = [];
            roomUsers.forEach(userID => {
                const peer = createPeer(userID, user.id, streamRef);
                peersRef.current.push({
                    peerID: userID,
                    peer,
                });
                const username = (users[userID]).name;
                const obj = { peerID: userID, peerName: username, peer };
                peersList.push(obj);
                list.push(userID);
            });
            setPeers(peersList);
            setPl(list);
        });

        user.socket.current.on("userJoinedVideo", payload => {
            const peer = addPeer(payload.signal, payload.callerID, streamRef);
            peersRef.current.push({
                peerID: payload.callerID,
                peer,
            });
            const pid = payload.callerID;
            const obj = { peerID: payload.callerID, peerName: payload.name, peer };
            setPeers(peerObj => [...peerObj, obj]);
            setPl(i => [...i, payload.callerID]);
        });

        user.socket.current.on("receiveReturnedSignal", payload => {
            const item = peersRef.current.find(p => p.peerID === payload.id);
            item.peer.signal(payload.signal);
        });

        user.socket.current.on("receiveMessageToVideoRoom", chatObj => {
            setChats(chat => [...chat, chatObj]);
        });

        return (() => {
            user.socket.current.off("usersInVideoRoom");
            user.socket.current.off("receiveMessageToVideoRoom");
            user.socket.current.off("receiveReturnedSignal");
            user.socket.current.off("userJoinedVideo");
            user.socket.current.off("userLeft");
            dispatch(setCallBusy(false));
        });

    }, []);

    useEffect(()=>{

        user.socket.current.on("userLeft", sid => {
            let temp = [];
            pl.forEach(item => {
                if(item !== sid)
                {
                    temp.push(item);
                }
            });
            setPl(temp);
        });

        return (() => {
            user.socket.current.off("userLeft");
        });

    }, [pl]);

    function muteMic() {
        stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
        setMicState(!micState);
    }

    function muteCam() {
        stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
        setCamState(!camState);
    }

    function leaveCall() {

        dispatch(setWindowState(CHAT));
        dispatch(setClass(false));
        dispatch(setCallJoin(false));
        setCamState(true);
        setMicState(true);
        stream.getTracks().forEach(track => track.stop());
        peersRef.current.forEach(element => element.peer.destroy());         
        user.socket.current.emit("leaveVideoRoom", videoRoom['videoRoom']);
        dispatch(setVideoRoom(null));
    }

    function cancelCall() {
        dispatch(setWindowState(CHAT));
        dispatch(setClass(false));
        dispatch(setCallJoin(false));
        setCamState(true);
        setMicState(true);
        stream.getTracks().forEach(track => track.stop());
        dispatch(setVideoRoom(null));
    }

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream.current,
        });

        peer.once("signal", signal => {
            user.socket.current.emit("sendSignal", { userToSignal, callerID, signal });
        });

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {

        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream.current,
        });

        peer.once("signal", signal => {
            user.socket.current.emit("returnSignal", { signal, callerID });
        });

        peer.signal(incomingSignal);

        return peer;
    }

    function joinCall() {
        user.socket.current.emit("joinVideoRoom", videoRoom['videoRoom']);
        dispatch(setCallJoin(true));
    }

    function sendMessage() {

        const message = inputRef.current.value;
        inputRef.current.value = "";
        if (message === "") {
            alert("empty field...");
        }
        else {
            user.socket.current.emit("sendMessageToVideoRoom", { to: videoRoom['videoRoom'], name: user.name, message: message, roomName: videoRoom['videoRoom'] });
            user.socket.current.emit("sendMessageToRoom", {to: videoRoom['videoRoom'], name: user.name, message: message, roomName: videoRoom['videoRoom']});
            dispatch(addChat("room", videoRoom['videoRoom'], user.id, user.name, message)); 
        }

    }

    function onVideoChat(){
        setVideochat(true);
        setPeoples(false);
    }

    function onPeoples(){
        setVideochat(false);
        setPeoples(true);
    }

    function closeSideBar(){
        setVideochat(false);
        setPeoples(false);
    }

    return (
        <div className="videoWindow">
            <div className={(videochat || peoples) ? "videoLeft videoLeft_Small": "videoLeft"}>
                <div className="videoMain">
                    <VideoFrame who="me" stream={stream} videoRef={myVideoRef} name="You" />
                    {peers.map((peerObj, index) => {
                        if(pl.includes(peerObj.peerID))
                        {
                            return (
                                <GroupVideoFrame key={index} peer={peerObj.peer} name={peerObj.peerName} />
                            );
                        }
                    })}
                </div>

                {call.callJoin ?

                    <div className="videoOptions">
                        <Tooltip title="Leave Call">
                            <button className="videoOptionsButtons videoOptionsEndcall" onClick={() => { leaveCall(); }}>
                                <CallEndRoundedIcon fontSize="default" />
                            </button>
                        </Tooltip>
                        <Tooltip title="Show everyone">
                            <button className="videoOptionsButtons" onClick={ onPeoples }>
                                <PeopleRoundedIcon fontSize="small"/>
                            </button>
                        </Tooltip>
                        <Tooltip title="Chat with everyone">
                            <button className="videoOptionsButtons" onClick={ onVideoChat }>
                                <ChatRoundedIcon fontSize="small"/>
                            </button>
                        </Tooltip>
                        <Tooltip title={ micState ? "Turn off Mic" : "Turn on Mic" }>
                            <button className="videoOptionsButtons" onClick={ muteMic }>
                                {micState ? <MicRoundedIcon fontSize="default" /> : <MicOffRoundedIcon fontSize="default" />}
                            </button>
                        </Tooltip>
                        <Tooltip title={ camState ? "Turn off camera" : "Turn on camera" }>
                            <button className="videoOptionsButtons" onClick={ muteCam }>
                                {camState ? <VideocamRoundedIcon fontSize="default" /> : <VideocamOffRoundedIcon fontSize="default" />}
                            </button>
                        </Tooltip>     
                    </div> :

                    <div className="beforeCallOptions">
                        <Tooltip title={ micState ? "Turn off Mic" : "Turn on Mic" }>
                            <button className="beforeCallOptionsButtons " onClick={() => { muteMic() }}>
                                {micState ? <MicRoundedIcon fontSize="default" /> : <MicOffRoundedIcon fontSize="default" />}
                            </button>
                        </Tooltip>
                        <Tooltip title={ camState ? "Turn off camera" : "Turn on camera" }>
                            <button className="beforeCallOptionsButtons" onClick={() => { muteCam() }}>
                                {camState ? <VideocamRoundedIcon fontSize="default" /> : <VideocamOffRoundedIcon fontSize="default" />}
                            </button>
                        </Tooltip>
                        <Tooltip title="cancel call">
                            <button className="cancelButton CandAButton" onClick={() => {
                                cancelCall();
                            }}>
                                Cancel
                            </button>
                        </Tooltip>
                        <Tooltip title="Join call">
                            <button className="CandAButton" onClick={() => { joinCall() }}>Join Now</button>
                        </Tooltip>
                    </div>
                }
            </div>
            
            { (videochat || peoples) ? 
                <div className="videoRight">
                    <div className="videoRightHeader">
                        <span>{ videochat ? VIDEOCHAT_HEAD : PEOPLES }</span>
                        <button className="closeButtonVideoRight" onClick={ closeSideBar }><CloseRoundedIcon fontSize="small" /></button>    
                    </div>
                    { videochat ? 
                        <>
                            <div className="videoRightBody">
                                {chats.map((item, index) => <VideoMessage key={index} item={item} />)}
                            </div>
                            <div className="videoRightBelow">
                                <input className="videoInput" ref={inputRef} onKeyDown={(e) => {
                                    if (e.keyCode === 13) { sendMessage(); }
                                }}></input>
                                <button className="videoChatSend" onClick={ sendMessage }><SendOutlinedIcon fontSize="small" /></button>
                            </div>
                        </> :
                        <ul>
                            {peers.map((peerObj, index) => { 
                                if(pl.includes(peerObj.peerID))
                                {
                                    return (<li className="peopleItem">{peerObj.peerName}</li>)
                                }})
                            }
                        </ul> 
                    }
                </div>
            :
                <></>
            }
        </div>
    );
}

export default GroupVideoWindow;