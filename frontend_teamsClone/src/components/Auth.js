import React from 'react'
import '../styles/auth.css';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';

const Auth = () => {
    return (
        <div className="authPage">
            <div className="authBox">
                <div className="authBoxDivisions loginButtonDiv">
                    <button className="googleButton">
                        <span className="loginSVG"><img className="googleSVG" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/1200px-Google_%22G%22_Logo.svg.png"/></span>
                        <span className="loginText">Sign in with Google</span>
                    </button>
                </div>
                <div className="authBoxDivisions orDiv">
                    <span className="or">_____OR_____</span>
                </div>
                <div className="authBoxDivisions">
                    <AccountBoxRoundedIcon />
                    <span className="guest">Continue as Guest ...</span>
                </div>
            </div>
        </div>
    )
}

export default Auth