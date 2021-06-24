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

    socket.on("joinRoom", roomName => {
        socket.join(roomName);
        socket.emit("roomJoined", roomName);
    });

    socket.on("printRooms", roomName => {
        console.log(io.sockets.adapter.rooms);
    });
    

    // -----------------------------------------

});

server.listen(port, () => { console.log(`listening on port ${port}`) });