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
import { CHAT } from "../../constants";
import { setClass } from '../../data/actions/classReducerActions';
import { setCallJoin,setCallCancel, setCallDecline, setCallAccept, setCallReceive, setCallEnd, setCallSend } from '../../data/actions/callActions';
import { setWindowState } from '../../data/actions/windowStateActions';
import PhoneEnabledRoundedIcon from '@material-ui/icons/PhoneEnabledRounded';
import PhoneDisabledRoundedIcon from '@material-ui/icons/PhoneDisabledRounded';
import { streamRef } from '../../pages/Teams';

const GroupVideoWindow = () => {

    const dispatch = useDispatch();

    const user = useSelector(state => state.userReducer);

    const [stream, setStream] = useState(null);
    const [micState, setMicState] = useState(true);
    const [camState, setCamState] = useState(true);

    const myVideoRef = useRef();

    useEffect(() => {

        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
        .then((currentStream) => {
            setStream(currentStream);
            myVideoRef.current.srcObject = currentStream;
            streamRef.current = currentStream;
        });
        
        return (() => {
            
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
        setCamState(true);
        setMicState(true);
        stream.getTracks().forEach(track => track.stop());
    }

    function cancelCall(){
        dispatch(setWindowState(CHAT));
        dispatch(setClass(false));
        setCamState(true);
        setMicState(true);
        stream.getTracks().forEach(track => track.stop());
    }

    return (
        <div className="videoWindow">
            <div className="videoLeft">
                <div className="videoMain">
                    <VideoFrame who="me" stream={stream} videoRef={myVideoRef} name={user.name}/>
                </div>
                
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
                    <button className= "CandAButton">Continue</button>
                </div> 
            </div>
        </div>
    );
}

export default GroupVideoWindow;