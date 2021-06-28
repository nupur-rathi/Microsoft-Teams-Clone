import React from 'react';
import '../../styles/leftRail.css';
import { setCurrSelected } from '../../data/actions/currSelectedActions';
import { setRSelected } from '../../data/actions/roomsActions';
import { setSelected } from '../../data/actions/usersListActions';
import { useDispatch, useSelector } from 'react-redux';
import { Public, Private } from "../../constants";
import { Avatar } from '@material-ui/core';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

const RoomItem = ({ item, type }) => {

    const curr = useSelector(state => state.currSelectedReducer);
    const roomsList = useSelector(state => state.roomsReducer);
    const usersList = useSelector(state => state.usersListReducer);

    console.log(item.isPrivate, type);

    const dispatch = useDispatch();

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
                <button className="roomItemButton"><MoreHorizIcon fontSize="small"/></button>
            </div>        
        );
    }
        else
        {
            return <></>
        }
    
}

export default RoomItem;