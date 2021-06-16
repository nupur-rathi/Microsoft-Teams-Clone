import React from 'react';
import '../../styles/leftRail.css';
import BadgeAvatars from '../common/Avatar';

const LeftRailListItems = ({ users }) => {

    const {name, imgUrl, id, selected} = users;

    return (
        <div className={selected ? "leftRailListItems leftRailListItems_selected" : "leftRailListItems"}>
            <BadgeAvatars name={name} imgURL={imgUrl}/>
            <span className="leftRail_ListItem_Name">{name ? name : id}</span>
        </div>        
    );
}

export default LeftRailListItems;