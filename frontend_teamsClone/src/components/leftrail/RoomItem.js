import React, { useState } from 'react';
import '../../styles/leftRail.css';
import { setCurrSelected } from '../../data/actions/currSelectedActions';
import { setRSelected } from '../../data/actions/roomsActions';
import { setSelected } from '../../data/actions/usersListActions';
import { useDispatch, useSelector } from 'react-redux';
import { Public, Private } from "../../constants";
import { Avatar } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import RoomItemDropdown from '../dropdowns/RoomItemDropdown';

const RoomItem = ({ item, type }) => {

    const curr = useSelector(state => state.currSelectedReducer);
    const roomsList = useSelector(state => state.roomsReducer);
    const usersList = useSelector(state => state.usersListReducer);

    console.log(item.isPrivate, type);

    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    function selectingRoom(){
        if(roomsList.joined.includes(item.roomName))
        {  
            if(curr != null)
            {   
                if(curr.type === 'user' && curr.id in usersList){ 
                    dispatch(setSelected(curr.id, false));}
                else if(curr.type === 'room' && curr.roomName in roomsList['rooms']){ 
                    dispatch(setRSelected(curr.roomName, false));}
                
            }
                dispatch(setCurrSelected(item));
                dispatch(setRSelected(item.roomName, true));
        }
        else
        {
            alert("You have not joined this room.")
        }
    }

    if((item.isPrivate && type === Private && roomsList['joined'].includes(item.roomName)) || (!item.isPrivate && type === Public))
    {
        return (
            <div className={item.selected ? "leftRailListItems leftRailListItems_selected roomItem" : "leftRailListItems roomItem"} 
            onClick={()=>{
                    selectingRoom();
                }}>
                <Avatar variant="square" alt={item.roomName} src="#"/>
                <span className="leftRail_ListItem_Name">{item.roomName}</span>
                <button className="roomItemButton" onClick={ () => setShow(!show) }><MoreHorizIcon fontSize="small"/></button>
                { show ? <RoomItemDropdown item={item} /> : <></> }
            </div>        
        );
    }
        else
        {
            return <></>
        }
    
}

export default RoomItem;