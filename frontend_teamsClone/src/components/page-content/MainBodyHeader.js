import React from 'react';
import '../../styles/mainBody.css';
import BadgeAvatars from '../common/Avatar';
import BasicButtonGroup from '../common/GroupButtons';

const MainBodyHeader = () => {
    return (
        <div className="mainBodyHeader">
            <div className="mainBodyHeaderLeft">
                <BadgeAvatars name="Nupur Rathi" imgURL='#' />
                <span>Nupur Rathi</span>
            </div>
            <div className="mainBodyHeaderRight">
                <BasicButtonGroup />
            </div>
        </div>
    );
}

export default MainBodyHeader;