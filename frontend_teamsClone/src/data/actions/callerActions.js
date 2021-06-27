import { SET_CALLER } from "../../constants";

export const setCaller = (obj) => {
    return {
        type: SET_CALLER,
        payload: obj,
    }
};