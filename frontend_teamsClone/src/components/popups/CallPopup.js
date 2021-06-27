import React, {useEffect} from 'react';
import '../../styles/callpopup.css';
import PhoneInTalkRoundedIcon from '@material-ui/icons/PhoneInTalkRounded';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
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

    const dispatch = useDispatch();

    useEffect(() => {
        

        return (() => {
        });

    }, []);

    return (
        <div className={(call.callReceive) ? "callPopup" : "callPopup_hide"}>
            <div className="popupName">
                <span className="PopupIncomingCall">Incoming call from...</span>
                <span className="PopupIncomingName">
                    {(caller !== null ) ? caller.from : ""}
                </span>
            </div>
            <div className="popupButtonsDiv">
                <button className="popupButtons popupAcceptButton"
                onClick={()=>{
                    dispatch(setWindowState(VIDEOCALL));
                    dispatch(setClass(true));
                    dispatch(setCallAccept(true));
                    dispatch(setCallReceive(false));
                    }}>
                    <PhoneInTalkRoundedIcon fontSize="default" />
                </button>
                <button className="popupButtons popupDeclineButton"><CallEndRoundedIcon fontSize="default" /></button>
            </div>
        </div>
    );
}

export default CallPopup;