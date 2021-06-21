import React from 'react';
import '../../styles/mainBody.css';
import BadgeAvatars from '../common/Avatar';
import BasicButtonGroup from '../common/GroupButtons';
import { useSelector } from 'react-redux';

const MainBodyHeader = ({currentWindow, setWindowState}) => {

    const currSelected = useSelector(state => state.currSelectedReducer);

    return (
        <div className="mainBodyHeader">
            <div className="mainBodyHeaderLeft">
                {currSelected ? <BadgeAvatars name="Nupur Rathi" imgURL={currSelected.imgUrl}/> : <></>}
                <span>{currSelected ? currSelected.name: ""}</span>
            </div>
            <div className="mainBodyHeaderRight">
                <BasicButtonGroup currentWindow={currentWindow} setWindowState={setWindowState}/>
            </div>
        </div>
    );
}

export default MainBodyHeader;