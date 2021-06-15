import React from 'react';
import '../styles/header.css'
import Avatar from '@material-ui/core/Avatar';

// Header component for Teams page

const Header = () => {
    return (
        <div class="header">
            {/* search-bar */}
            {/* click-able avatar icon */}
            <button class="headerAvatar">
                {/* <Avatar class="avatarIconHeader" src="/broken-image.jpg" /> */}
            </button>
        </div>
    );
}

export default Header;