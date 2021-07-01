import { SET_VIDEOROOM } from "../../constants";

export const setVideoRoom = (room) => {
    return {
        type: SET_VIDEOROOM,
        payload: room,
    }
};