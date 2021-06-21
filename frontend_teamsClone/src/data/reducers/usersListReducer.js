import {ADDUSER, DELETEUSER, SETSELECTED} from "../../constants";

const usersListInitialState = {'abc': {imgUrl: '#', name: 'Nupur Rathi', id: 'abc', selected: false}, 'def': {imgUrl: '#', name: 'Arpit Rathi', id: 'def', selected: false}};

const usersListReducer = (state = usersListInitialState , action) => {

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