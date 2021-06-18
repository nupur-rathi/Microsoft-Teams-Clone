import React from 'react';
import '../../styles/callpopup.css';
import PhoneInTalkRoundedIcon from '@material-ui/icons/PhoneInTalkRounded';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';

const CallPopup = () => {
    return (
        <div className="callPopup">
            <div className="popupName">
                <span className="PopupIncomingCall">Incoming call from...</span>
                <span className="PopupIncomingName">Nupur Rathi</span>
            </div>
            <div className="popupButtonsDiv">
                <button className="popupButtons popupAcceptButton"><PhoneInTalkRoundedIcon fontSize="medium" /></button>
                <button className="popupButtons popupDeclineButton"><CallEndRoundedIcon fontSize="medium" /></button>
            </div>
        </div>
    );
}

export default CallPopup;