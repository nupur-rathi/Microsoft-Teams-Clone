import { SET_WINDOW_STATE, CHAT, VIDEOCALL, AUDIOCALL } from "../../constants";

export const setWindowState = (window) => {
    return {
        type: SET_WINDOW_STATE,
        payload: window,
    }
};