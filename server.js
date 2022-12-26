const express = require('express')
const path = require('path')
const http = require('http')
const Socketio = require('socket.io')
const { Socket } = require('engine.io')
const qs = require('qs')
const formatMessage = require('./utils/messages')
const { userJoin, getCurrentUser ,userLeave,getRoomUsers } = require('./utils/users')


const app = express()
const server = http.createServer(app)
const io = Socketio(server)

app.use(express.static(path.join(__dirname, 'public')))
const adminName = 'Admin'

io.on('connection', socket => {
    // console.log('New Ws Connection.....')
    socket.on('joinRoom', ({ username, room }) => {
        let user = userJoin(socket.id, username, room)
        socket.join(room)
        socket.emit('message', formatMessage(adminName, 'Welcome to ChatRoom!'))
        socket.broadcast.to(room).emit("message", formatMessage(adminName, `${username} has joined the chat`));

        io.to(room).emit("roomUsers" , {
            room:room, 
            user:getRoomUsers(room)
        })
    })

    socket.on("chatMessage", (msg) => {
        let user = getCurrentUser(socket.id);
        io.to(user.room).emit("message", formatMessage(user.username, msg));
    });

    socket.on('disconnect', () => {
        let user = userLeave(socket.id)
        // console.log('disconneted:-',user.room)
        if(user){
            io.to(user.room).emit('message', formatMessage(adminName, `${user.username} has left a chat`))
            io.to(user.room).emit("roomUsers" , {
                room:user.room, 
                user:getRoomUsers(user.room)
            })
        }
        
    })
})



server.listen(process.env.PORT || 3000, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});