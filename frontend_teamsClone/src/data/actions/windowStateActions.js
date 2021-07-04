import { SET_WINDOW_STATE, CHAT, VIDEOCALL, GROUP_VIDEOCALL } from "../../constants";

export const setWindowState = (window) => {
    return {
        type: SET_WINDOW_STATE,
        payload: window,
    }
};