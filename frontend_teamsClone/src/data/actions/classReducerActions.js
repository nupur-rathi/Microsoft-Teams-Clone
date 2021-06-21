import {SET_CLASS} from "../../constants";

export const setClass = (state) => {
    return {
        type: SET_CLASS,
        payload: state,
    }
};