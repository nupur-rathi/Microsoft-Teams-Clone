import { combineReducers } from "redux";
import userReducer from './userReducer';
import sideRailReducer from './sideRailReducer';
import usersListReducer from './usersListReducer';
import currSelectedReducer from './currSelectedReducer';
import classReducer from './setClassReducer';
import callerReducer from './callerReducer';
import windowStateReducer from './windowStateReducer';
import chatReducer from './chatReducer';
import roomsReducer from './roomsReducer';
import callReducer from './callReducer';
import inviteReducer from './inviteReducer';

const allReducers = combineReducers({
    userReducer: userReducer,
    usersListReducer: usersListReducer,
    sideRailReducer: sideRailReducer,
    currSelectedReducer: currSelectedReducer,
    classReducer: classReducer,
    callerReducer: callerReducer,
    windowStateReducer: windowStateReducer,
    chatReducer: chatReducer,
    roomsReducer: roomsReducer,
    callReducer: callReducer,
    inviteReducer: inviteReducer,
});

export default allReducers;