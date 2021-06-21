import React from 'react';
import '../../styles/leftRail.css';
import LeftRailListItems from './LeftRailListItems';
import { useSelector } from 'react-redux';
import { Chat, Rooms } from "../../constants";

const userlist = [{imgUrl: '#', name: 'Nupur Rathi', id: 'abc', selected: true}, {imgUrl: '#', name: 'Arpit Rathi', id: 'def', selected: false}];

const LeftRail = () => {

    const heading = useSelector(state => state.sideRailReducer);

    return (
        <div className="leftRail">
            <div className="leftRailHeader">
                <span className="leftRailHeading">{heading}</span>
            </div>
            <div className="leftRailBody">
                {userlist.map(item => <LeftRailListItems key={item.id} users={item}/>)}
            </div>
        </div>
    );
}

export default LeftRail;