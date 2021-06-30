import React, { useState } from 'react';
import '../styles/body.css';
import LeftNav from './leftnav/LeftNav';
import LeftRail from './leftrail/LeftRail';
import MainBody from './page-content/MainBody';
import CallPopup from './popups/CallPopup';
import InviteLinkPopup from './popups/invitePopup/InviteLinkPopup';

// Body component for Teams page

const Body = () => {

    const [ show, setShow ] = useState(false);

    return (
        <div className="bodyContainer">
            <LeftNav setShow={setShow} />
            <LeftRail />
            <MainBody />
            <CallPopup />
            { show ? <InviteLinkPopup setShow={setShow} /> : <></> }
        </div>
    );
}

export default Body;