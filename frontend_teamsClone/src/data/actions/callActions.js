import { SET_CALLER, SET_CALL_ACCEPT } from "../../constants";

export const setCaller = (obj) => {
    return {
        type: SET_CALLER,
        payload: {
            is: obj.is,
            name: obj.name,
            id: obj.id,
            signal: obj.signal,
            callAccept: obj.callAccept,
        }
    }
};

export const setCallAccept = (state) => {
    return {
        type: SET_CALL_ACCEPT,
        payload: state,
    }
};