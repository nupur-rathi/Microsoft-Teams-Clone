import {SET_CLASS} from "../../constants";

const classReducer = (state = false, action) => {

    const {type, payload} = action;

    switch(type) {
        case SET_CLASS:
            {
                return payload;    
            }
        default:
            return state;
    }
}

export default classReducer;