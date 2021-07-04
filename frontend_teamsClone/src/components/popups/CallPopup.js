import React, {useEffect} from 'react';
import '../../styles/callpopup.css';
import PhoneInTalkRoundedIcon from '@material-ui/icons/PhoneInTalkRounded';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import Tooltip from '@material-ui/core/Tooltip';
import { useDispatch, useSelector } from 'react-redux';
import { setCallAccept, setCallDecline, setCallReceive } from "../../data/actions/callActions";
import { setWindowState } from "../../data/actions/windowStateActions";
import { VIDEOCALL } from '../../constants';
import { setClass } from '../../data/actions/classReducerActions';
import { setCaller } from '../../data/actions/callerActions';

const CallPopup = () => {

    const me = useSelector(state => state.userReducer);
    const caller = useSelector(state => state.callerReducer);
    const call = useSelector(state => state.callReducer); 
    const usersList = useSelector(state => state.usersListReducer);

    const dispatch = useDispatch();

    useEffect(() => {

        var audio = new Audio('microsoft-teams-call-sound-effect.mp3');
        audio.play();

        return (() => {
            audio.pause();
            audio.currentTime = 0;
        }); 

    }, []);

    function callAccept(){
        dispatch(setWindowState(VIDEOCALL));
        dispatch(setClass(true));
        dispatch(setCallAccept(true));
        dispatch(setCallReceive(false));
    }

    function callDecline(){
        dispatch(setCallReceive(false));
        me.socket.current.emit("callDecline", caller.from);
    }

    return (
        <div className={(call.callReceive) ? "callPopup" : "callPopup_hide"}>
            <div className="popupName">
                <span className="PopupIncomingCall">Incoming call from...</span>
                <span className="PopupIncomingName">
                    {(caller !== null ) ? usersList[caller.from].name : ""}
                </span>
            </div>
            <div className="popupButtonsDiv">
                <Tooltip title="answer call">
                    <button className="popupButtons popupAcceptButton"
                    onClick={()=>{
                            callAccept();
                        }}>
                        <PhoneInTalkRoundedIcon fontSize="default" />
                    </button>
                </Tooltip>
                <Tooltip title="decline call">
                    <button className="popupButtons popupDeclineButton"
                    onClick={()=>{
                        callDecline();    
                    }}>
                        <CallEndRoundedIcon fontSize="default" />
                    </button>
                </Tooltip>
            </div>
        </div>
    );
}

export default CallPopup;