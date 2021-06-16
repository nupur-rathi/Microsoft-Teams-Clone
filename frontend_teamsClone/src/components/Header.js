import React from 'react';
import '../styles/header.css'
import BadgeAvatars from './common/Avatar';

// Header component for Teams page

const Header = () => {
    return (
        <div className="header">
            <div className="headerHeading">Microsoft Teams</div>
            {/* search-bar */}
            <button className="headerAvatar">
                <BadgeAvatars name="Nupur Rathi" imgURL='#' />
            </button>
        </div>
    );
}

export default Header;