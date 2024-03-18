import { Server } from 'socket.io'
import { ServerState, Room, Card } from './types'
import { v4 as uuidv4 } from 'uuid'

const express = require('express')
const http = require('http')
const app = express()
const server = http.createServer(app)
const port = 3001
const runtimeId = uuidv4(); // for debugging purposes and to check if the server has restarted

const io = new Server(server, {
    cors: {
        origin: '*',
    },
})
console.log("LOG: server started \n'-> runtimeId:", runtimeId)

let serverState: ServerState = {
    rooms: {}
};

serverState.rooms['room1'] = {
    cards: [] // Initialize the 'cards' array if it is undefined
} as unknown as Room;

const handleCardSelect = (card: Card, roomId: string) => {
    if (serverState.rooms[roomId]) {
        const existingCardIndex = serverState.rooms[roomId].cards.findIndex(c => c.placedBy === card.placedBy)
        if (existingCardIndex !== -1) {
            // user already placed a card, update it
            if (card.id === serverState.rooms[roomId].cards[existingCardIndex].id) return; // existing card is the same as new, do nothing
            if (card.id === null || card.id === '') {
                // remove the card from the list
                serverState.rooms[roomId].cards.splice(existingCardIndex, 1);
                console.debug('DBG:handleCardSelect - card removed - roomId:', roomId, "card:", card);
            } else {
                // update the card
                serverState.rooms[roomId].cards[existingCardIndex] = card;
                console.debug('DBG:handleCardSelect - card updated - roomId:', roomId, "card:", card);
            }
        } else {
            // user has not placed a card yet, add it
            if (card.id === null || card.id === '') return; // no card to add
            serverState.rooms[roomId].cards.push(card);
            console.debug('DBG:handleCardSelect - card added - roomId:', roomId, "card:", card);
        }
        io.to(roomId).emit('cardsUpdated', serverState.rooms[roomId].cards);
        console.log('LOG:handleCardSelect - card placed - roomId:', roomId, "card:", card);
        return;
    } 
    console.error('ERR:handleCardSelect - room not found - roomId:', roomId);
}


io.on('connection', (socket) => {
    console.debug('VEB: a user connected')
    socket.emit('runtimeId', runtimeId);

    socket.on('createRoom', (roomId: string, userId: string, roomName?: string) => {
        console.log('LOG:createRoom - roomId:', roomId, "userId:", userId)
        if (serverState.rooms[roomId]) {
            socket.emit('roomExists', roomId);
            console.error('ERR:createRoom - roomExists roomId:', roomId);
        } else {
            serverState.rooms[roomId] = {
                id: roomId,
                name: roomName,
                created: new Date(),
                roomOwner: userId,
                cards: [],
                cardsVisible: false
            }
            socket.emit('roomCreated', roomId);
            socket.join(roomId);
        }
    })

    socket.on('joinRoom', (roomId: string) => {
        if (!serverState.rooms[roomId]) {
            socket.emit('roomNotFound', roomId) 
            console.debug('DBG:joinRoom - roomNotFound roomId:', roomId)
        } else {
            socket.join(roomId)
            socket.emit('roomJoined', roomId)
            io.to(roomId).emit('cardsUpdated', serverState.rooms[roomId].cards);
            console.debug('DBG:joinRoom - roomJoined roomId:', roomId)
        }
    })

// TODO save runtimeId in token and check if it matches 
// (when server restarts placing a card will not work anymore because the room does not exist anymore)
    socket.on("placeCard", (cardName: string, roomId: string, userId: string) => {
        console.debug('DBG:placeCard - cardName:', cardName, "roomId:", roomId, "userId:", userId)
        const card: Card = {
            id: cardName,
            placedBy: userId
        }
        handleCardSelect(card, roomId)
    });

    socket.on('revealCards', (reveal: boolean, roomId: string) => {
        console.debug('DBG:revealCards - roomId:', roomId)
        if (serverState.rooms[roomId]) {
            serverState.rooms[roomId].cardsVisible = reveal;
            io.to(roomId).emit('cardsVisible', serverState.rooms[roomId].cardsVisible);
        } else {
            console.error('ERR:revealCards - room not found - roomId:', roomId);
        }
    })

    socket.on('leaveRoom', (roomId: string) => {
        console.log('leaveRoom', roomId)
        socket.leave(roomId)
    })


    socket.on('disconnect', () => {
        console.debug('VEB: user disconnected')
    })
})

server.listen(port, () => {
    console.log(`LOG: listening on *:${port}`)
})
