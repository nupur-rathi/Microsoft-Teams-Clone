const express = require("express");
const app = express();
const server = require("http").Server(app);
const cors = require("cors");

app.use(cors());

const io = require("socket.io")(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});

users = {};
const roomsObj = {};

// inviteLinks is a array containing all the roomnames of all the rooms created
const inviteLinks = [];

// people = { 'roomName': [list of people currently in this room and having a videocall], ... }
const people = {};

//people = { 'socket.id': ture or false, .....}
const busy = {};

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server side");
});

io.on('connection', (socket) => {
    
    socket.emit('myid', socket.id);

    socket.on('disconnect', () => {
        socket.broadcast.emit("callEnded");
        io.emit('deleteUser', socket.id);

        for (const key in people) {
            people[key] = people[key].filter(id => id !== socket.id);
            people[key].forEach(item => io.to(item).emit("userLeft", socket.id));
        }

        for (const key in roomsObj) {
            roomsObj[key]['users'] = (roomsObj[key]['users']).filter(id => id !== socket.id);
        }
        
        delete users[socket.id];
        delete busy[socket.id];
        console.log(`${socket.id} got disconnected`);  
    });

    socket.on('addUser', (user)=>{
        users[user.id] = {name: user.name, email: user.email, id: user.id, imgUrl: user.imgUrl, selected: false, type: "user", isGuest: user.isGuest};
        socket.broadcast.emit('addUser', users[user.id]);
        socket.emit('initUsers', users);
        socket.emit('initRooms', roomsObj);
    });

    socket.on("setBusy", state => {
        busy[socket.id] = state;
    })

    socket.on("checkBusy", (userID, cb) => {
        if(busy[userID] === true)
            cb(true);
        else
            cb(false);
    })

    const sid = socket.id;

    // ----------------------------------
    // video calling oto code

    socket.on("callUser", ({userToCall, from, signalData}) => {
        io.to(userToCall).emit("receiveCall", {signal: signalData, from});
    });

    socket.on("answerCall", (data) => {
        io.to(data.to).emit("callAccepted", data.signal);
    });

    socket.on("callEnd", (to) => {
        io.to(to).emit("callEnded");
    });

    socket.on("callEndBefore", (to) => {
        io.to(to).emit("callEndedBefore");
    });

    socket.on("callDecline", (to)=>{
        io.to(to).emit("callDeclined");
    });

    // -------------------------------------------

    // chat oto code

    socket.on("sendMessage", ({to, name, message}) => {
        io.to(to).emit("receiveMessage", {from: sid, name: name, message: message});
    });
    
    // chat room

    socket.on("sendMessageToRoom", ({to, name, message, roomName}) => {
        io.to(to).emit("receiveMessageToRoom", {from: sid, name: name, message: message, roomName: roomName});
    });    

    // -----------------------------------------

    // join and create room code

    const rooms = io.sockets.adapter.rooms;

    socket.on("joinRoom", ({roomName, eventType, isPrivate, password}) => {

        if(eventType === 'create')
        {
            if(rooms.has(roomName))
            {
                socket.emit("roomExists");
                return;
            }
            roomsObj[roomName] = {roomName: roomName, password: password, users: [sid], isPrivate: isPrivate, type: "room", selected: false};
            io.emit("addRoom", roomsObj[roomName]);
        }
        else if(eventType === 'join')
        {
            if(!(roomName in roomsObj))
            {
                socket.emit("notExists");
                return;    
            }
            if(roomName in users)
            {
                socket.emit("cannotJoin");
                return;
            }
            else if(roomsObj[roomName]['users'].includes(sid))
            {
                socket.emit("alreadyJoined");
                return;
            }
            else if(roomsObj[roomName].isPrivate && roomsObj[roomName].password !== password)
            {
                socket.emit("wrongPassword");
                return;
            }
            roomsObj[roomName].users.push(sid);
            io.emit("addUserToRoom", {userID: sid, roomName: roomName});
        }
        socket.join(roomName);  
        socket.emit("roomJoined", roomName);
    });
    
    // -----------------------------------------

    //invites and group calls

    socket.on("addLink", (link, cb) => {
        inviteLinks.push(link);
    });

    socket.on("isLinkPresent", (link, cb) => {
        if(inviteLinks.includes(link))
            cb(true);
        else
            cb(false);
    });

    socket.on("joinVideoRoom", videoRoom => {
        if(videoRoom in people)
        {
            (people[videoRoom]).push(socket.id);
        }
        else
        {
            people[videoRoom] = [ (socket.id) ];    
        }
        let roomUsers = people[videoRoom];
        roomUsers = roomUsers.filter(id => id !== socket.id);
        socket.emit("usersInVideoRoom", {roomUsers, users});
    });

    socket.on("sendSignal", payload => {
        io.to(payload.userToSignal).emit("userJoinedVideo", {signal: payload.signal, callerID: payload.callerID, name: users[payload.callerID].name});
    });

    socket.on("returnSignal", payload => {
        io.to(payload.callerID).emit("receiveReturnedSignal", {signal: payload.signal, id: socket.id});
    });
    
    socket.on("leaveVideoRoom", videoRoom => {
        if( videoRoom in people)
        {
            people[videoRoom] = people[videoRoom].filter(id => id !== socket.id);
            people[videoRoom].forEach(item => io.to(item).emit("userLeft", socket.id));
        }
    });

    socket.on("leaveRoom", room => {
        socket.leave(room);
        roomsObj[room]['users'] = (roomsObj[room]['users']).filter(id => id !== socket.id);
    });

    socket.on("sendMessageToVideoRoom", ({to, name, message, roomName}) => {
        if(inviteLinks.includes(roomName));
            io.to(to).emit("receiveMessageToVideoRoom", {from: sid, name: name, message: message, roomName: roomName});
    });

});

server.listen(port, () => { console.log(`listening on port ${port}`) });