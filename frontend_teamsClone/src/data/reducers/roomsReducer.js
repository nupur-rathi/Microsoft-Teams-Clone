import { INIT_ROOMS, ADD_ROOM, ADD_USER_TO_ROOM, ADD_ROOM_TO_JOINED } from "../../constants";

const roomsReducer = (state = {}, action) => {

    const {type, payload} = action;

    switch(type) {
        case INIT_ROOMS:
            {
                const rooms = {};
                rooms['rooms'] = {...payload};
                rooms['joined'] = [];

                console.log(rooms);
                return rooms;    
            }
        case ADD_ROOM:
            {
                const rooms = {...state};
                rooms['rooms'][payload.roomName] = {...payload};

                console.log(rooms);
                return rooms;
            }
        case ADD_USER_TO_ROOM:
            {
                const rooms = {...state};
                rooms['rooms'][payload.roomName]['users'].push(payload.userID);

                console.log(rooms);
                return rooms;
            }
        case ADD_ROOM_TO_JOINED:
            {
                const rooms = {...state};
                rooms['joined'].push(payload);

                console.log(rooms);
                return rooms;
            }
        default:
            return state;
    }
}

export default roomsReducer;