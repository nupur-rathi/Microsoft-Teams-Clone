import { combineReducers } from "redux";
import userReducer from './userReducer';
import sideRailReducer from './sideRailReducer';
import usersListReducer from './usersListReducer';
import currSelectedReducer from './currSelectedReducer';
import classReducer from './setClassReducer';
import callReducer from './callReducer';
import windowStateReducer from './windowStateReducer';

const allReducers = combineReducers({
    userReducer: userReducer,
    usersListReducer: usersListReducer,
    sideRailReducer: sideRailReducer,
    currSelectedReducer: currSelectedReducer,
    classReducer: classReducer,
    callReducer: callReducer,
    windowStateReducer: windowStateReducer,
});

export default allReducers;