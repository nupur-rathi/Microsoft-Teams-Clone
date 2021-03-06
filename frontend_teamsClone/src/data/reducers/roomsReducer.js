import { INIT_ROOMS, ADD_ROOM, ADD_USER_TO_ROOM, ADD_ROOM_TO_JOINED, SETRSELECTED, DELETE_ROOM_FROM_JOINED } from "../../constants";

const initState = {'rooms': {}, 'joined': []}

const roomsReducer = (state = initState, action) => {

    const {type, payload} = action;

    switch(type) {
        case INIT_ROOMS:
            {
                const rooms = {};
                rooms['rooms'] = {...payload};
                rooms['joined'] = [];

                return rooms;    
            }
        case ADD_ROOM:
            {
                const rooms = {...state};
                rooms['rooms'][payload.roomName] = {...payload};

                return rooms;
            }
        case ADD_USER_TO_ROOM:
            {
                const rooms = {...state};
                rooms['rooms'][payload.roomName]['users'].push(payload.userID);

                return rooms;
            }
        case ADD_ROOM_TO_JOINED:
            {
                const rooms = {...state};
                rooms['joined'].push(payload);
                
                return rooms;
            }
        case DELETE_ROOM_FROM_JOINED:
            {
                const rooms = {...state};
                rooms['joined'] = rooms['joined'].filter(room => room !== payload);
                return rooms;
            }
        case SETRSELECTED:
            {
                const roomsList = {...state};
                (roomsList['rooms'][payload.roomName]).selected = payload.state;

                return roomsList;
            }
        default:
            return state;
    }
}

export default roomsReducer;