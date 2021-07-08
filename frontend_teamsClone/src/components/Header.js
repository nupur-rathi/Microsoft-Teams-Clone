import React, { useState } from 'react';
import '../styles/header.css'
import BadgeAvatars from './common/Avatar';
import { useSelector } from 'react-redux';
import UserInfoDropdown from './dropdowns/UserInfoDropdown';

// Header component for Teams page

const Header = () => {

    //user state from user reducer
    const {name, email, profileUrl} = useSelector(state => state.userReducer);

    //open state for userInfoDropdown
    const [ open, setOpen ] = useState(false);

    return (
        <div className="header">
            <div className="headerHeading">Microsoft Teams</div>
            <button className="headerAvatar" onClick={ () => setOpen(!open) }>
                <BadgeAvatars name={name} imgURL={profileUrl} />
            </button>
            { open && <UserInfoDropdown name={name} email={email}/> }
        </div>
    );
}

export default Header;