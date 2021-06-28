import { SET_CALL_ACCEPT, SET_CALL_END, SET_CALL_CANCEL, SET_CALL_DECLINE, SET_CALL_JOIN, SET_CALL_RECEIVE, SET_CALL_SEND } from "../../constants";

const initState = {callSend: false, callJoin: false, callCancel: false, callAccept: false, callDecline: false, classReceive: false, callEnd: false};

const callReducer = (state = initState, action) => {

    const {type, payload} = action;

    switch(type) {
        case SET_CALL_ACCEPT:
            {
                const call = {...state, callAccept: payload}

                return call;
            }
        case SET_CALL_END:
            {
                const call = {...state, callEnd: payload}

                return call;
            }
        case SET_CALL_SEND:
            {
                const call = {...state, callSend: payload}

                return call;
            }
        case SET_CALL_DECLINE:
            {
                const call = {...state, callDecline: payload}

                return call;
            }
        case SET_CALL_RECEIVE:
            {
                const call = {...state, callReceive: payload}

                return call;
            }
        case SET_CALL_JOIN:
            {
                const call = {...state, callJoin: payload}

                return call;
            }
        case SET_CALL_CANCEL:
            {
                const call = {...state, callCancel: payload}

                return call;
            }
        default:
            return state;
    }
}

export default callReducer;