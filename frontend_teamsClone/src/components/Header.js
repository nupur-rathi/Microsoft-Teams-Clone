import React from 'react';
import '../styles/header.css'
import BadgeAvatars from './common/Avatar';
import { useSelector } from 'react-redux';

// Header component for Teams page

const Header = () => {

    const {name, email, id, profileUrl} = useSelector(state => state.userReducer);

    return (
        <div className="header">
            <div className="headerHeading">Microsoft Teams</div>
            {/* search-bar */}
            <button className="headerAvatar">
                <BadgeAvatars name={name} imgURL={profileUrl} />
            </button>
        </div>
    );
}

export default Header;