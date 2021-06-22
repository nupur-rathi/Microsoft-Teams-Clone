import React from 'react';
import '../../styles/callWindow.css';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';
import { CHAT } from "../../constants";
import { useDispatch } from 'react-redux';
import { setClass } from '../../data/actions/classReducerActions';
import { setWindowState } from '../../data/actions/windowStateActions';

const CallWindow = () => {

    const dispatch = useDispatch();

    return (
        <div className="callWindow">
            <div className="callLeft">
                <div className="callMain">
                </div>
                <div className="callOptions">
                    <button className="callOptionsButtons callOptionsEndcall" onClick={() => {dispatch(setWindowState(CHAT)); dispatch(setClass(false))}}> 
                        <CallEndRoundedIcon fontSize="medium" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CallWindow;