import { Server } from 'socket.io'
import { ServerState, Room, Card } from './types'

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


const serverState: ServerState = {
    rooms: {}
};

const handleCardSelect = (card: Card, roomId: string) => {
    console.log('handleCardSelect', card, roomId)
    if (serverState.rooms[roomId]) {
        serverState.rooms[roomId].cards.push(card)
        io.to(roomId).emit('cardSelected', card)
    } else return null;
}



io.on('connection', (socket) => {
    console.log('a user connected')

    socket.on('createRoom', (roomId: string, userId: string, roomName?: string) => {
        console.log('createRoom', roomId, userId)
        if (serverState.rooms[roomId]) {
            socket.emit('roomExists', roomId)
        } else {
            serverState.rooms[roomId] = {
                id: roomId,
                name: roomName,
                created: new Date(),
                roomOwner: userId,
                cards: [],
                cardsVisible: false
            }
            socket.emit('roomCreated', roomId)
            socket.join(roomId)
        }
    })

    socket.on('joinRoom', (roomId: string) => {
        console.log('joinRoom', roomId)

        if (!serverState.rooms[roomId]) {
            socket.emit('roomNotFound', roomId)
        } else {
            socket.join(roomId)
            socket.emit('roomJoined', roomId)
        }
    })

    socket.on("placeCard", (cardName: string, roomId: string, userId: string) => {
        console.log('placeCard', cardName, roomId, userId)
        const card: Card = {
            id: cardName,
            placedBy: userId
        }
        handleCardSelect(card, roomId)
    });

    socket.on('leaveRoom', (roomId: string) => {
        console.log('leaveRoom', roomId)
        socket.leave(roomId)
    })


    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

server.listen(port, () => {
    console.log(`listening on *:${port}`)
})
