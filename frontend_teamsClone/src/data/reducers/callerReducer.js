import { SET_CALLER } from "../../constants";

//call = {is: , from: , to: , signal: }

const callerReducer = (state = null, action) => {

    const {type, payload} = action;

    switch(type) {
        case SET_CALLER:
            {
                return payload;    
            }
        default:
            return state;
    }
}

export default callerReducer;