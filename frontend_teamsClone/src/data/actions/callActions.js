import { SET_CALLER } from "../../constants";

export const setCaller = (obj) => {
    return {
        type: SET_CALLER,
        payload: {
            is: obj.is,
            name: obj.name,
            id: obj.id,
            signal: obj.signal,
        }
    }
};