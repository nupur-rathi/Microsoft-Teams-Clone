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
const inviteLinks = [];

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
    res.send("Server side");
});

io.on('connection', (socket) => {
    
    socket.emit('myid', socket.id);

    socket.on('disconnect', () => {
        io.emit('deleteUser', socket.id);
        delete users[socket.id];
        console.log(`${socket.id} got disconnected`);
        socket.broadcast.emit("callended");  
    });

    socket.on('addUser', (user)=>{
        console.log(user);
        users[user.id] = {name: user.name, email: user.email, id: user.id, imgUrl: user.imgUrl, selected: false, type: "user", isGuest: user.isGuest};
        socket.broadcast.emit('addUser', users[user.id]);
        socket.emit('initUsers', users);
        socket.emit('initRooms', roomsObj);
    });

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
            if(!rooms.get(roomName))
            {
                socket.emit("notExists");
                return;    
            }
            if(roomName in users)
            {
                socket.emit("cannotJoin");
                return;
            }
            else if((rooms.get(roomName)).has(sid))
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
        console.log(roomsObj);
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
        socket.join(videoRoom);
        const usersInRoom = rooms.get(videoRoom);
        let roomUsers = [...usersInRoom];
        roomUsers = roomUsers.filter(id => id !== socket.id);
        socket.emit("usersInVideoRoom", roomUsers);
    });

    socket.on("sendSignal", payload => {
        io.to(payload.userToSignal).emit("userJoinedVideo", {signal: payload.signal, callerID: payload.callerID});
    });

    socket.on("returnSignal", payload => {
        io.to(payload.callerID).emit("receiveReturnedSignal", {signal: payload.signal, id: socket.id});
    });
    
    socket.on("leaveVideoRoom", videoRoom => {
        socket.leave(videoRoom);
    });

});

server.listen(port, () => { console.log(`listening on port ${port}`) });