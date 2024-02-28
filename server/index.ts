import { Server } from 'socket.io'

const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const port = process.env.SOCKET_IO_PORT || 3001
console.log("env", process.env.SOCKET_IO_PORT);

const io = new Server(server, {
    cors: {
        origin: '*',
    },
})

io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(port, () => {
    console.log(`listening on *:${port}`)
})
