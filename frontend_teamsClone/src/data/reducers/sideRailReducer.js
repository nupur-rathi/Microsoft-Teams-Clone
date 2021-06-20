import {SETSIDERAIL, CHAT, ROOMS} from "../../constants";

const sideRailReducer = (state = CHAT, action) => {

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