import {SET_USER, SET_USER_ID, SET_USER_NAME, SET_USER_EMAIL, SET_USER_SOCKET, SET_USER_PROFILEURL, SET_IS_GUEST } from "../../constants";

export const setUser = (name, email, id, profileUrl, socket, isGuest) => {
    return {
        type: SET_USER,
        payload: {
            name: name,
            email: email,
            id: id,
            profileUrl: profileUrl,
            socket: socket,
            isGuest: isGuest,
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

export const setIsGuest = (is) => {
    return {
        type: SET_IS_GUEST,
        payload: is,
    }
};