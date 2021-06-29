import React from 'react'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom'
import '../styles/auth.css';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import GoogleSVG from '../assets/GoogleSVG';
import { setUser } from '../data/actions/userActions';


const Auth = () => {

    const dispatch = useDispatch();

    function initGuest(){
        dispatch(setUser("Guest", "", "", "#", null));
    }


    return (
        <div className="authPage">
            <div className="authBox">
                <div className="authBoxDivisions loginButtonDiv">
                    <button className="googleButton">
                        <span className="loginSVG"><GoogleSVG /></span>
                        <span className="loginText">Sign in with Google</span>
                    </button>
                </div>
                <div className="authBoxDivisions orDiv">
                    <span className="or">_____OR_____</span>
                </div>
                <div className="authBoxDivisions">
                    <AccountBoxRoundedIcon />
                    <Link to="/teams">
                        <span className="guest" onClick={()=>{
                            initGuest();
                        }}>Continue as Guest ...</span>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Auth