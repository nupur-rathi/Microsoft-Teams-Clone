import { ADD_CHAT } from "../../constants";

export const addChat = (type, key, sender, message) => {
    return {
        type: ADD_CHAT,
        payload: {
            type: type,
            key: key,
            sender: sender,
            message: message,
        },
    }
};