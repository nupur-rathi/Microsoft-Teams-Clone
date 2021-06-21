import {SET_CURR_SELECTED} from "../../constants";

export const setCurrSelected = (currSelected) => {
    return {
        type: SET_CURR_SELECTED,
        payload: currSelected,
    }
};