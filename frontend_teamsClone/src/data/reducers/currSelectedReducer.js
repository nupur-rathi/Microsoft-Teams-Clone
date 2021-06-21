import {SET_CURR_SELECTED} from "../../constants";

const currSelectedReducer = (state = null, action) => {

    const {type, payload} = action;

    switch(type) {
        case SET_CURR_SELECTED:
            {
                const newState = payload;
                return newState;    
            }
        default:
            return state;
    }
}

export default currSelectedReducer;