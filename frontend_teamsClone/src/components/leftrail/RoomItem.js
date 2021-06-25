import React from 'react';
import '../../styles/leftRail.css';
import { setCurrSelected } from '../../data/actions/currSelectedActions';
import { setRSelected } from '../../data/actions/roomsActions';
import { setSelected } from '../../data/actions/usersListActions';
import { useDispatch, useSelector } from 'react-redux';
import GroupIcon from '@material-ui/icons/Group';
import { Public, Private } from "../../constants";

const RoomItem = ({ item, type }) => {

    const curr = useSelector(state => state.currSelectedReducer);
    const roomsList = useSelector(state => state.roomsReducer);
    const usersList = useSelector(state => state.usersListReducer);

    console.log(item.isPrivate, type);

    const dispatch = useDispatch();

    if((item.isPrivate && type === Private && roomsList['joined'].includes(item.roomName)) || (!item.isPrivate && type === Public))
    {
        return (
            <div className={item.selected ? "leftRailListItems leftRailListItems_selected" : "leftRailListItems"} onClick={()=>{
                dispatch(setSelected(item.roomName, true));
                if(curr != null)
                {   
                    if(curr.type === 'user' && curr.id in usersList){ 
                        dispatch(setSelected(curr.id, false));}
                    else if(curr.type === 'room' && curr.roomName in roomsList['rooms']){ 
                        dispatch(setRSelected(curr.roomName, false));}
                    
                }
                    dispatch(setCurrSelected(item));
                }}>
                <GroupIcon />
                <span className="leftRail_ListItem_Name">{item.roomName}</span>
            </div>        
        );
    }
        else
        {
            return <></>
        }
    
}

export default RoomItem;