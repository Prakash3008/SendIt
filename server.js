require('dotenv').config();
const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
var io = require('socket.io').listen(server);
const path = require("path");

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    
    socket.on("join room", vroomID => {
        if (users[vroomID]) {
            const length = users[vroomID].length;
            if (length === 10) {
                socket.emit("room full");
                return;
            }
            users[vroomID].push(socket.id);
        } else {
            users[vroomID] = [socket.id];
        }
        socketToRoom[socket.id] = vroomID;
        const usersInThisRoom = users[vroomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const vroomID = socketToRoom[socket.id];
        let room = users[vroomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[vroomID] = room;
        }
        socket.broadcast.emit('user left', socket.id);
    });

});

if(process.env.NODE_ENV === 'production'){

    app.use(express.static('sendit/build'));
    app.get(' * ', (req,res) =>{
        res.sendFile(path.join(__dirname, 'sendit/build' , 'index.html'));
    });
}

const port = process.env.PORT || 8000;
server.listen(port, () => console.log(
    `Server is running on port ${port}` 
));
