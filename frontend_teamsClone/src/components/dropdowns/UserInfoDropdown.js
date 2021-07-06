import React from 'react'
import { useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import '../../styles/header.css'
import { LOGOUT } from '../../messageConstants'

const UserInfoDropdown = ({ name, email }) => {

    const history = useHistory();

    const user = useSelector(state => state.userReducer);

    function onLogout(){
        user.socket.current.disconnect();
        history.push("/");
        window.location.reload();
    }

    return (
        <div className="userInfoDropdown">
            <div className="userInfo">
                <span className="userName">{name}</span>
                { (email !== "") && <span className="userEmail">{ email }</span> }
            </div>
            <div className="logoutDiv">
                <button className="logoutButton" onClick={ onLogout }>
                    { LOGOUT }
                </button>
            </div>
        </div>
    )
}

export default UserInfoDropdown