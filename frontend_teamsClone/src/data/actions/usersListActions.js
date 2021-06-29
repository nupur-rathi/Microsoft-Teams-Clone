import {SETSELECTED, ADD_USER, INIT_USERS, DELETE_USER} from "../../constants";

export const setSelected = (id, state) => {
    return {
        type: SETSELECTED,
        payload: {
            id: id,
            state: state,
        },
    }
};

export const addUser = ({name, id, imgUrl, email, isGuest}, selected) => {
    return {
        type: ADD_USER,
        payload: {
            name: name,
            id: id,
            imgUrl: imgUrl,
            selected: selected,
            type: 'user',
            email: email,
            isGuest: isGuest,
        },
    }
};

export const deleteUser = (id) => {
    return {
        type: DELETE_USER,
        payload: id,
    }
};

export const initUsers = (users) => {

    console.log(users);

    return {
        type: INIT_USERS,
        payload: users,
    }
};