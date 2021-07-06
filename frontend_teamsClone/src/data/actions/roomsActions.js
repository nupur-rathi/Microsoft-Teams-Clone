import { INIT_ROOMS, ADD_ROOM, ADD_USER_TO_ROOM, ADD_ROOM_TO_JOINED, DELETE_ROOM_FROM_JOINED, SETRSELECTED } from "../../constants";

export const initRooms = (roomsObj) => {
    return {
        type: INIT_ROOMS,
        payload: roomsObj,
    }
};

export const addRoom = (room) => {
    return {
        type: ADD_ROOM,
        payload: room,
    }
};

export const addUserToRoom = (userID, roomName) => {
    return {
        type: ADD_USER_TO_ROOM,
        payload: {
            userID: userID,
            roomName: roomName,
        }
    }
};

export const addRoomToJoined = (roomName) => {
    return {
        type: ADD_ROOM_TO_JOINED,
        payload: roomName,
    }
};

export const deleteRoomFromJoined = (roomName) => {
    return {
        type: DELETE_ROOM_FROM_JOINED,
        payload: roomName,
    }
};

export const setRSelected = (roomName, state) => {
    return {
        type: SETRSELECTED,
        payload: {
            roomName: roomName,
            state: state,
        },
    }
};