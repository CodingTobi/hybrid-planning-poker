export interface Card {
    id: string;
    placedBy: string;
}

export interface Room {
    id: string;
    name?: string;
    created: Date;
    roomOwner: string;
    cards: Card[];
    cardsVisible: boolean;
}

export interface ServerState {
    rooms: { [roomId: string]: Room };
}