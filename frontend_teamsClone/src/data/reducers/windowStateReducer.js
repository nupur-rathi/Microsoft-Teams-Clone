import { SET_WINDOW_STATE, CHAT, VIDEOCALL, AUDIOCALL } from "../../constants";

const windowStateReducer = (state = CHAT, action) => {

    const {type, payload} = action;

    switch(type) {
        case SET_WINDOW_STATE:
            {
                return payload;    
            }
        default:
            return state;
    }
}

export default windowStateReducer;