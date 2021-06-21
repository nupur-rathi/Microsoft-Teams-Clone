import {SETUSER} from "../../constants";

const userInitialState = {};

// const user = {name: payload.name, id: payload.id, email: payload.email, profileUrl: payload.profileUrl, isLoggedIn: payload.isLoggedIn};


const userReducer = (state = userInitialState, action) => {

    const {type, payload} = action;

    switch(type) {
        case SETUSER:
            {
                const user = {...payload};
                return user;    
            }
        default:
            return state;
    }
}

export default userReducer;