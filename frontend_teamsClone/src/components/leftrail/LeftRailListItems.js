import React from 'react';
import '../../styles/leftRail.css';
import BadgeAvatars from '../common/Avatar';
import { setCurrSelected } from '../../data/actions/currSelectedActions';
import { setSelected } from '../../data/actions/usersListActions';
import { setRSelected } from '../../data/actions/roomsActions';
import { useDispatch, useSelector } from 'react-redux';

const LeftRailListItems = ({ users }) => {

    const {name, imgUrl, id, selected, type} = users;
    const curr = useSelector(state => state.currSelectedReducer);
    const usersList = useSelector(state => state.usersListReducer);

    const dispatch = useDispatch();
    const me = useSelector(state => state.userReducer);
    const roomsList = useSelector(state => state.usersListReducer);

    if(users.id !== me.id)
    {
        return (
            <div className={selected ? "leftRailListItems leftRailListItems_selected" : "leftRailListItems"} onClick={()=>{
                dispatch(setSelected(id, true));
                if(curr != null)
                {   
                    if(curr.type === 'user' && curr.id in usersList){ 
                        dispatch(setSelected(curr.id, false));}
                    else if(curr.type === 'room' && curr.roomName in roomsList['rooms']){ 
                        dispatch(setRSelected(curr.roomName, false));}

                }
                    dispatch(setCurrSelected(users));
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