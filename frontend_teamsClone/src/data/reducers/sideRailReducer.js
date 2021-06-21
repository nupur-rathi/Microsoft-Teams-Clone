import {SETSIDERAIL, Chat, Rooms} from "../../constants";

const sideRailReducer = (state = Chat, action) => {

    const {type, payload} = action;

    switch(type) {
        case SETSIDERAIL:
            {
                const newState = payload;
                return newState;    
            }
        default:
            return state;
    }
}

export default sideRailReducer;