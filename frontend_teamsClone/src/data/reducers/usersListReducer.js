import {ADD_USER, DELETE_USER, INIT_USERS, SETSELECTED} from "../../constants";

const usersListInitialState = {};

const usersListReducer = (state = usersListInitialState , action) => {

    const {type, payload} = action;

    switch(type) {
        case INIT_USERS:
            {
                const usersList = {...payload};

                return usersList;   
            }
        case ADD_USER:
            {
                const newUser = {...payload};
                const key = payload.id;
                const usersList = {...state};
                usersList[key] = newUser;
                
                return usersList;   
            }
        case DELETE_USER:
            {
                const usersList = {...state};
                delete usersList[payload];
                
                return usersList;    
            }
        case SETSELECTED:
            {
                const usersList = {...state};
                usersList[payload.id] = {...state[payload.id], selected: payload.state};

                return usersList;
            }    
        
        default:
            return state;
    }
}

export default usersListReducer;