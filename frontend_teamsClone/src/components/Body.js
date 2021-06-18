import React from 'react';
import '../styles/body.css';
import LeftNav from './leftnav/LeftNav';
import LeftRail from './leftrail/LeftRail';
import MainBody from './page-content/MainBody';
import CallPopup from './popups/CallPopup';

// Body component for Teams page

const Body = () => {
    return (
        <div className="bodyContainer">
            <LeftNav />
            <LeftRail />
            <MainBody />
            <CallPopup />
        </div>
    );
}

export default Body;