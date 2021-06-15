import React from 'react';
import '../styles/header.css'
import Avatar from '@material-ui/core/Avatar';

// Header component for Teams page

const Header = () => {
    return (
        <div class="header">
            <div class="headerHeading">Microsoft Teams</div>
            {/* search-bar */}
            <button class="headerAvatar">
                <Avatar alt="Nupur Rathi" src="#" />
            </button>
        </div>
    );
}

export default Header;