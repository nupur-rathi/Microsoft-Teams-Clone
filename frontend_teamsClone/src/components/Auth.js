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

    //initializing user info on authentication
    function initializeUser({name, email, id, imgUrl, socket, isGuest}){
        dispatch(setUser(name, email, id, imgUrl, socket, isGuest));
        log.onAuthentication();
        history.push('/teams');
    }

    //google authentication
    function googleAuth(){
        return firebase
        .auth()
        .signInWithPopup(googleProvider)
        .then((res) => {
            const {displayName, email, photoURL} = res.user;
            initializeUser({name: displayName, email: email, id: "", imgUrl: photoURL, socket: null, isGuest: false});
        })
        .catch((err) => {
            return err;
        });
    }

    const authentication = async () => {
        await googleAuth();    
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