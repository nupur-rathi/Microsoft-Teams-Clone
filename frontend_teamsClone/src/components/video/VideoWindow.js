import React from 'react';
import '../../styles/videoWindow.css';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import { CHAT } from "../../constants";
import { useDispatch } from 'react-redux';
import { setClass } from '../../data/actions/classReducerActions';

const VideoWindow = ({setWindowState}) => {

    const dispatch = useDispatch();

    return (
        <div className="videoWindow">
            <div className="videoLeft">
                <div className="videoMain">
                    <div className="userVideos"></div>
                    <div className="userVideos"></div>
                    {/* <div className="userVideos"></div>
                    <div className="userVideos"></div> */}
                </div>
                <div className="videoOptions">
                    <button className="videoOptionsButtons videoOptionsEndcall" onClick={() => {setWindowState(CHAT); dispatch(setClass(false))}}>
                        <CallEndRoundedIcon fontSize="medium" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default VideoWindow;