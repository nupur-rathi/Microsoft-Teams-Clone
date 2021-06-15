import React from 'react';
import '../styles/header.css'
import Avatar from '@material-ui/core/Avatar';

// Header component for Teams page

const Header = () => {
    return (
        <div className="header">
            <div className="headerHeading">Microsoft Teams</div>
            {/* search-bar */}
            <button className="headerAvatar">
                <Avatar alt="Nupur Rathi" src="#" />
            </button>
        </div>
    );
}

export default Header;