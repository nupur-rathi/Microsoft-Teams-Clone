import React from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom'
import firebase from '../config/firebase-config';
import '../styles/auth.css';
import AccountBoxRoundedIcon from '@material-ui/icons/AccountBoxRounded';
import GoogleSVG from '../assets/GoogleSVG';
import { setUser } from '../data/actions/userActions';



const Auth = ({ log }) => {

    const dispatch = useDispatch();
    const history = useHistory();

    const googleProvider = new firebase.auth.GoogleAuthProvider();

    function initializeUser({name, email, id, imgUrl, socket, isGuest}){
        log.onAuthentication();
        dispatch(setUser(name, email, id, imgUrl, socket, isGuest));
        history.push('/teams');
    }

    function googleAuth(){
        return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((res) => {
            return res.user;
        })
        .catch((err) => {
            return err;
        });
    }

    const authentication = async () => {
        const res = await googleAuth();
        const {displayName, email, photoURL} = res;
        initializeUser({name: displayName, email: email, id: "", imgUrl: photoURL, socket: null, isGuest: false});
    };

    return (
        <div className="authPage">
            <div className="authBox">
                <div className="authBoxDivisions loginButtonDiv">
                    <button className="googleButton" onClick={()=>{authentication();}}>
                        <span className="loginSVG"><GoogleSVG /></span>
                        <span className="loginText">Sign in with Google</span>
                    </button>
                </div>
                <div className="authBoxDivisions orDiv">
                    <span className="or">_____OR_____</span>
                </div>
                <div className="authBoxDivisions">
                    <AccountBoxRoundedIcon />
                    <span className="guest" onClick={()=>{
                        initializeUser({name:"Guest", email: "", id: "", imgUrl :"#", socket: null, isGuest: true});
                    }}>Continue as Guest ...</span>
                </div>
            </div>
        </div>
    )
}

export default Auth