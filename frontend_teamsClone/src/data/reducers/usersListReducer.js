import {ADDUSER, DELETEUSER} from "../../constants";

const usersListReducer = (state = {}, action) => {

    const {type, payload} = action;

    switch(type) {
        case ADDUSER:
            {
                const newUser = {...payload};
                const key = payload.id;
                const usersList = {...state};
                usersList[key] = newUser;
                
                return usersList;   
            }
        case DELETEUSER:
            {
                const usersList = {...state};
                delete usersList[payload];
                
                return usersList;    
            }
        default:
            return state;
    }
}

export default usersListReducer;