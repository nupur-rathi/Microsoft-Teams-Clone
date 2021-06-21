import { combineReducers } from "redux";
import userReducer from './userReducer';
import sideRailReducer from './sideRailReducer';
import usersListReducer from './usersListReducer';
import currSelectedReducer from './currSelectedReducer';

const allReducers = combineReducers({
    userReducer: userReducer,
    usersListReducer: usersListReducer,
    sideRailReducer: sideRailReducer,
    currSelectedReducer: currSelectedReducer,
});

export default allReducers;