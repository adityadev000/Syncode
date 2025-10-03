const { Server } = require("socket.io");

const {
    handleJoinRoom , 
    handleLeaveRoom

} = require('../socketController/Room') ; 

require("dotenv").config();


module.exports = function setUpSocketIo(server){
    const io = new Server(server, {
        cors: {
        origin: process.env.FRONTEND_URL,
        credentials: true,
        methods: ["GET", "POST"],
        },
    });

    io.on('connection' , (socket) => {
        console.log("User Connected To Socket IO Web Socket");

        //connect_To_Room event emit from frontend 
        socket.on('connect_To_Room',(data) => {
            handleJoinRoom(data,socket);
        })

        socket.on('disconnect_from_room',(data) => {
            handleLeaveRoom(data,socket);
        })
        
        socket.on('disconnect', () => {
            console.log("Socket disconnected:", socket.id);
        });



    }) ; 
} ;