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
        delete users[socket.id];
        console.log(`${socket.id} got disconnected`);
        socket.broadcast.emit("callended");
        io.emit('adduser', users);
    })

    const sid = socket.id;

    users[sid] = {id: sid};
    io.emit('adduser', users);

    socket.on("calluser", ({usertocall, from, signalData}) => {
        io.to(usertocall).emit("calluser", {signal: signalData, from});
    });

    socket.on("answercall", (data) => {
        io.to(data.to).emit("callaccepted", data.signal);
    });

    socket.on("callend", (from) => 
        socket.broadcast.emit("callended")
    );

});

server.listen(port, () => { console.log(`listening on port ${port}`) });