import React from 'react';
import '../styles/body.css';
import LeftNav from './leftnav/LeftNav';
import LeftRail from './leftrail/LeftRail';

// Body component for Teams page

const Body = () => {
    return (
        <div className="bodyContainer">
            <LeftNav />
            <LeftRail />
            {/* chat, call, video-nav */}
        </div>
    );
}

export default Body;