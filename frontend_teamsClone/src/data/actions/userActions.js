import {SET_USER, SET_USER_ID, SET_USER_NAME, SET_USER_EMAIL, SET_USER_SOCKET, SET_USER_PROFILEURL} from "../../constants";

export const setUser = (name, email, id, profileUrl, socket) => {
    return {
        type: SET_USER,
        payload: {
            name: name,
            email: email,
            id: id,
            profileUrl: profileUrl,
            socket: socket,
        }
    }
};

export const setUserID = (id) => {
    return {
        type: SET_USER_ID,
        payload: id,
    }
};

export const setUserName = (name) => {
    return {
        type: SET_USER_NAME,
        payload: name,
    }
};

export const setUserEmail = (email) => {
    return {
        type: SET_USER_EMAIL,
        payload: email,
    }
};

export const setUserProfileurl = (url) => {
    return {
        type: SET_USER_PROFILEURL,
        payload: url,
    }
};

export const setUserSocket = (socket) => {
    return {
        type: SET_USER_SOCKET,
        payload: socket,
    }
};