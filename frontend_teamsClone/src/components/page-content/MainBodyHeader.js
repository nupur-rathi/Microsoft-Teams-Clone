import React from 'react';
import '../../styles/mainBody.css';
import BadgeAvatars from '../common/Avatar';
import BasicButtonGroup from '../common/GroupButtons';
import { useSelector, useDispatch } from 'react-redux';

const MainBodyHeader = () => {

    const classState = useSelector(state => state.classReducer);

    const currSelected = useSelector(state => state.currSelectedReducer);

    return (
        <div className={classState ? "mainBodyHeader mainBodyHeader_hide": "mainBodyHeader"}>
            <div className="mainBodyHeaderLeft">
                {currSelected ? <BadgeAvatars name={currSelected.name} imgURL={currSelected.imgUrl}/> : <></>}
                <span>{currSelected ? currSelected.name: ""}</span>
            </div>
            <div className="mainBodyHeaderRight">
                {currSelected ? <BasicButtonGroup /> : <></>}
            </div>
        </div>
    );
}

export default MainBodyHeader;