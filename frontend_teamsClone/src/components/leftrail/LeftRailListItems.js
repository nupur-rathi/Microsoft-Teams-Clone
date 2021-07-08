import React from 'react';
import '../../styles/leftRail.css';
import BadgeAvatars from '../common/Avatar';
import { setCurrSelected } from '../../data/actions/currSelectedActions';
import { setSelected } from '../../data/actions/usersListActions';
import { setRSelected } from '../../data/actions/roomsActions';
import { useDispatch, useSelector } from 'react-redux';

const LeftRailListItems = ({ users }) => {

    //user to show item
    const {name, imgUrl, id, selected} = users;
    const curr = useSelector(state => state.currSelectedReducer);
    const usersList = useSelector(state => state.usersListReducer);

    const dispatch = useDispatch();
    const me = useSelector(state => state.userReducer);
    const roomsList = useSelector(state => state.roomsReducer);

    //function on selecting any user
    function selecting(){
        if(curr != null)
        {   
            if(curr.type === 'user' && curr.id in usersList && curr.id !== users.id){ 
                dispatch(setSelected(curr.id, false));}
            else if(curr.type === 'room' && curr.roomName in roomsList['rooms']){ 
                dispatch(setRSelected(curr.roomName, false));}

        }
            dispatch(setSelected(id, true));
            dispatch(setCurrSelected(users));
    }

    if(users.id !== me.id)
    {
        return (
            <div className={selected ? "leftRailListItems leftRailListItems_selected" : "leftRailListItems"} onClick={()=>{
                    selecting();
                }}>
                <BadgeAvatars name={name} imgURL={imgUrl}/>
                <span className="leftRail_ListItem_Name">{name ? name : id}</span>
            </div>        
        );
    }
    else
    {
        return <></>;
    }
}

export default LeftRailListItems;