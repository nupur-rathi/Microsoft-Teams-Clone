import { ADD_CHAT } from "../../constants";

const initialState = {
    'oto': {},
    'room': {},
};

const chatReducer = (state = initialState, action) => {

    const {type, payload} = action;

    switch(type) {
        case ADD_CHAT:
            {
                const chat = {...state};
                if(payload.key in chat[payload.type])
                    (chat[payload.type][payload.key]).push({sender: payload.sender, senderName: payload.senderName, message: payload.message});
                else
                    chat[payload.type][payload.key] = [{sender: payload.sender, senderName: payload.senderName, message: payload.message}];

                return chat;
            }
        default:
            return state;
    }
}

export default chatReducer;

// {
// 	oto:{
	
// 		key: [{sender:, message:},{}],
	
// 	},

// 	rooms:{
	
// 	},

// }