import {SET_USER, SET_USER_ID, SET_USER_NAME, SET_USER_EMAIL, SET_USER_SOCKET, SET_USER_PROFILEURL, SET_IS_GUEST } from "../../constants";

const userInitialState = {};

const userReducer = (state = userInitialState, action) => {

    const {type, payload} = action;

    switch(type) {
        case SET_USER:
            {
                const user = {...payload};
                return user;    
            }
        case SET_USER_NAME:
            {
                const user = {...state, name: payload};
                return user;    
            }
        case SET_USER_ID:
            {
                const user = {...state, id: payload};
                return user;    
            }
        case SET_USER_EMAIL:
            {
                const user = {...state, email: payload};
                return user;    
            }
        case SET_USER_PROFILEURL:
            {
                const user = {...state, profileUrl: payload};
                return user;    
            }
        case SET_USER_SOCKET:
            {
                const user = {...state, socket: payload};
                return user;    
            }
        case SET_IS_GUEST:
            {
                const user = {...state, isGuest: payload};
                return user;    
            }
        default:
            return state;
    }
}

export default userReducer;