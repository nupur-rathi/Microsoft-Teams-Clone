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

    const sid = socket.id;

    users[sid] = {name: sid, id: sid, imgUrl: "#", selected: false, type: "user"};
    socket.emit('initUsers', users);
    socket.broadcast.emit('addUser', users[sid]);

    // ----------------------------------
    // video calling oto code

    socket.on("calluser", ({usertocall, from, signalData}) => {
        console.log(usertocall);
        io.to(usertocall).emit("calluser", {signal: signalData, from});
    });

    socket.on("answercall", (data) => {
        console.log(data);
        io.to(data.to).emit("callaccepted", data.signal);
    });

    socket.on("callend", (from) => 
        socket.broadcast.emit("callended")
    );

    // -------------------------------------------

    // chat oto code

    socket.on("sendMessage", ({to, message}) => {
        io.to(to).emit("receiveMessage", {from: sid, message: message});
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
            roomsObj[roomName] = {password: password, users: [sid], isPrivate: isPrivate};
            console.log(roomsObj);
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
        }
        socket.join(roomName);  
        console.log(roomsObj);
        socket.emit("roomJoined", roomName);
    });
    
    // -----------------------------------------

});

server.listen(port, () => { console.log(`listening on port ${port}`) });