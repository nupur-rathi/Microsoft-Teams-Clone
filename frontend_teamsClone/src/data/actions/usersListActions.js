import {SETSELECTED} from "../../constants";

export const setSelected = (id, state) => {
    return {
        type: SETSELECTED,
        payload: {
            id: id,
            state: state,
        },
    }
};