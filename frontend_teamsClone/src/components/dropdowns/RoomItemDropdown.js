import React from 'react'
import "../../styles/leftRail.css";

const RoomItemDropdown = () => {

    return (

        <div className="roomDropdown">
            <button className="dropdownButtons">Join</button>
            <button className="dropdownButtons">copy room-name</button>
            <button className="dropdownButtons">copy room-pwd</button>
        </div>
    )
}

export default RoomItemDropdown