import React from 'react';
import '../../styles/callWindow.css';
import CallEndRoundedIcon from '@material-ui/icons/CallEndRounded';

const CallWindow = () => {
    return (
        <div className="callWindow">
            <div className="callLeft">
                <div className="callMain">
                </div>
                <div className="callOptions">
                    <button className="callOptionsButtons callOptionsEndcall">
                        <CallEndRoundedIcon fontSize="medium" />
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CallWindow;