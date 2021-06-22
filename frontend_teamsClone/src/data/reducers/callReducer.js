import { SET_CALLER } from "../../constants";

const callReducer = (state = null, action) => {

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

export default callReducer;