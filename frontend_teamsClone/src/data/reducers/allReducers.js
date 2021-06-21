import { combineReducers } from "redux";
import userReducer from './userReducer';
import sideRailReducer from './sideRailReducer';
import usersListReducer from './usersListReducer';
import currSelectedReducer from './currSelectedReducer';
import classReducer from './setClassReducer';

const allReducers = combineReducers({
    userReducer: userReducer,
    usersListReducer: usersListReducer,
    sideRailReducer: sideRailReducer,
    currSelectedReducer: currSelectedReducer,
    classReducer: classReducer,
});

export default allReducers;