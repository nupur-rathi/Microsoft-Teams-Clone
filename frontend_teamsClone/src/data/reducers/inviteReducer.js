import { ADD_INVITE } from "../../constants";

const inviteReducer = (state = [], action) => {

    const {type, payload} = action;

    switch(type) {
        case ADD_INVITE:
            {
                const newState = [...state];
                newState.push(payload);
                return newState;    
            }
        default:
            return state;
    }
}

export default inviteReducer;