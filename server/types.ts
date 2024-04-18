export interface Card {
    id: string;
    placedBy: string;
    userName: string;
}

export interface Room {
    id: string;
    name?: string;
    created: Date;
    roomOwner: string;
    roomOwnerName: string;
    cards: Card[];
    cardsVisible: boolean;
    votingActive: boolean;
}

export interface ServerState {
    rooms: { [roomId: string]: Room };
}