import React from 'react';
import '../../styles/leftRail.css';
import LeftRailListItems from './LeftRailListItems';

const heading ='Chat';
const userlist = [{imgUrl: '#', name: 'Nupur Rathi', id: 'abc', selected: true}, {imgUrl: '#', name: 'Arpit Rathi', id: 'def', selected: false}];

const LeftRail = () => {
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