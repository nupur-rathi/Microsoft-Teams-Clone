import { SET_CALLER, SET_CALL_ACCEPT } from "../../constants";

const callReducer = (state = null, action) => {

    const {type, payload} = action;

    switch(type) {
        case SET_CALLER:
            {
                return payload;    
            }
        case SET_CALL_ACCEPT:
            {
                const call = {...state, callAccept: payload}

                return call;
            }
        default:
            return state;
    }
}

export default callReducer;