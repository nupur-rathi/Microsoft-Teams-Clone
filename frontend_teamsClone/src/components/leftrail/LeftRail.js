import React from 'react';
import '../../styles/leftRail.css';
import LeftRailListItems from './LeftRailListItems';
import { useSelector } from 'react-redux';
import { Chat, Rooms } from "../../constants";

const LeftRail = () => {

    const classState = useSelector(state => state.classReducer);

    const heading = useSelector(state => state.sideRailReducer);
    const usersListObj = useSelector(state => state.usersListReducer);
    const usersList = (Object.keys(usersListObj).map((key) => usersListObj[key]));
    // const roomsList = [];

    return (
        <div className={classState ? "leftRail leftRail_hide": "leftRail"}>
            <div className="leftRailHeader">
                <span className="leftRailHeading">{heading}</span>
            </div>
            <div className="leftRailBody">
                {(heading === Chat) ? usersList.map(item => <LeftRailListItems key={item.id} users={item}/>) : <></>}
            </div>
        </div>
    );
}

export default LeftRail;