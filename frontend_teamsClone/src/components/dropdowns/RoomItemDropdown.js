import React from 'react'
import "../../styles/leftRail.css";
import { textToClipboard } from '../../utilities';

const RoomItemDropdown = ({ item }) => {

    return (

        <div className="roomDropdown">
            <button className="dropdownButtons">Join</button>
            <button className="dropdownButtons" onClick = { () => textToClipboard(item.roomName) }>copy room-name</button>
            { item.password ? <button className="dropdownButtons" onClick = { () => textToClipboard(item.password) } >copy room-pwd</button> : <></> }
        </div>
    )
}

export default RoomItemDropdown