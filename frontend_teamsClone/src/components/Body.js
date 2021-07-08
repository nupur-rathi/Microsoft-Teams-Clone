import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import '../styles/body.css';
import LeftNav from './leftnav/LeftNav';
import LeftRail from './leftrail/LeftRail';
import MainBody from './page-content/MainBody';
import CallPopup from './popups/CallPopup';
import InviteLinkPopup from './popups/invitePopup/InviteLinkPopup';

// Body component for Teams page

const Body = () => {

    //show state for invite Link Popup
    const [ show, setShow ] = useState(false);

    //call state from call reducer
    const call = useSelector(state => state.callReducer);

    return (
        <div className="bodyContainer">
            <LeftNav setShow={setShow} />
            <LeftRail />
            <MainBody />
            { call.callReceive ? <CallPopup /> : <></> }
            { show ? <InviteLinkPopup setShow={setShow} /> : <></> }
        </div>
    );
}

export default Body;