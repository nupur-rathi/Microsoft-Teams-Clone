import {SETUSER} from "../../constants";

export const setUser = (name, email, id, profileUrl) => {
    return {
        type: SETUSER,
        payload: {
            name: name,
            email: email,
            id: id,
            profileUrl: profileUrl,
        }
    }
};