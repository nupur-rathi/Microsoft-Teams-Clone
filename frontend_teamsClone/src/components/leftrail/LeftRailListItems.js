import React from 'react';
import '../../styles/leftRail.css';
import BadgeAvatars from '../common/Avatar';
import { setCurrSelected } from '../../data/actions/currSelectedActions';
import { setSelected } from '../../data/actions/usersListActions';
import { useDispatch, useSelector } from 'react-redux';

const LeftRailListItems = ({ users }) => {

    const {name, imgUrl, id, selected} = users;
    const curr = useSelector(state => state.currSelectedReducer);

    const dispatch = useDispatch();

    return (
        <div className={selected ? "leftRailListItems leftRailListItems_selected" : "leftRailListItems"} onClick={()=>{
            dispatch(setSelected(id, true));
            if(curr != null)
            {    dispatch(setSelected(curr.id, false));}
            dispatch(setCurrSelected(users));
            }}>
            <BadgeAvatars name={name} imgURL={imgUrl}/>
            <span className="leftRail_ListItem_Name">{name ? name : id}</span>
        </div>        
    );
}

export default LeftRailListItems;