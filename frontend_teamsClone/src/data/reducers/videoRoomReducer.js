import { SET_VIDEOROOM } from "../../constants";

const videoRoomReducer = (state = {}, action) => {

    const {type, payload} = action;

    switch(type) {
        case SET_VIDEOROOM:
            {
                const newState = {...state, videoRoom: payload};
                return newState;    
            }
        default:
            return state;
    }
}

export default videoRoomReducer;