import { SET_CALL_ACCEPT, SET_CALL_END, SET_CALL_CANCEL, SET_CALL_DECLINE, SET_CALL_JOIN, SET_CALL_RECEIVE, SET_CALL_SEND } from "../../constants";

export const setCallAccept= (state) => {
    return {
        type: SET_CALL_ACCEPT,
        payload: state,
    }
};

export const setCallDecline= (state) => {
    return {
        type: SET_CALL_DECLINE,
        payload: state,
    }
};

export const setCallEnd= (state) => {
    return {
        type: SET_CALL_END,
        payload: state,
    }
};

export const setCallSend= (state) => {
    return {
        type: SET_CALL_SEND,
        payload: state,
    }
};

export const setCallCancel= (state) => {
    return {
        type: SET_CALL_CANCEL,
        payload: state,
    }
};

export const setCallJoin= (state) => {
    return {
        type: SET_CALL_JOIN,
        payload: state,
    }
};

export const setCallReceive= (state) => {
    return {
        type: SET_CALL_RECEIVE,
        payload: state,
    }
};