import { ADD_INVITE } from "../../constants";

export const addInvite = (invite) => {
    return {
        type: ADD_INVITE,
        payload: invite,
    }
};