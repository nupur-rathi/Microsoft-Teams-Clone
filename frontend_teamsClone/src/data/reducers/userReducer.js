import {SETUSER} from "../../constants";

const userInitialState = {};

const userReducer = (state = userInitialState, action) => {

    const {type, payload} = action;

    switch(type) {
        case SETUSER:
            {
                const user = {name: payload.name, id: payload.id, email: payload.email, profileUrl: payload.profileUrl};
                return user;    
            }
        default:
            return state;
}