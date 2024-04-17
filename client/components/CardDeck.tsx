"use client"

import React, { use, useEffect, useState } from 'react';
import Card from './Card';
import { socket } from '@/utils/socket';
import { useAuth } from '@/contexts/AuthContext';

interface CardData {
    cardName: string;
    cardValue: string;
}

interface CardDeckProps {
    className?: string;
    cards: CardData[];
}

const CardDeck: React.FC<CardDeckProps> = ({ cards, className }) => {
    const [selectedCard, setSelectedCard] = useState<string | null>(null);
    const authContext = useAuth();
    const { isAuthenticated, isLoading, login, roomId, userId, userName } = authContext || {};

    const handleCardSelect = (cardName: string) => {
        setSelectedCard(cardName);
    };

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated, 'isLoading', isLoading, 'roomId', roomId, 'userId', userId, 'userName', userName);
        if (!isAuthenticated) {
            try {
                login();
            } catch (error) {
                console.error('Login failed! Please ask for the QR Code to login.', error);
            }
        }
    }, []);

    const handleKeyDown = (event: React.KeyboardEvent) => {
        const items: HTMLElement[] = Array.from(document.querySelectorAll('.item'));
        // const selectedCardIndex = document.getElementById(`.${selectedCard}`);
        // console.log('selectedCardIndex', selectedCardIndex);

        if (document.activeElement) {
            const activeElementIndex = items.indexOf(document.activeElement as HTMLElement);
            if (activeElementIndex === -1) {

            }

            if (event.key === 'ArrowLeft') {
                console.log('ArrowLeft', activeElementIndex);
                items[activeElementIndex - 1]?.focus();
                event.preventDefault();
            } else if (event.key === 'ArrowRight') {
                items[activeElementIndex + 1]?.focus();
                event.preventDefault();
            }
        }


    };

    useEffect(() => {
        //TODO was passiert bei reload? soll karte ausgewählt bleiben?
        if (roomId && userId ) {
            socket.emit('placeCard', selectedCard, roomId, userId, userName); //TODO get room and user from context
        } else {
            console.error('No roomId found');
        }
    }, [selectedCard]);

    return (
        <div tabIndex={0} onKeyDown={handleKeyDown} className={`flex justify-start items-center overflow-auto p-2 ${className}`}>
            {cards.map((card, index) => (
                <Card
                    key={index}
                    cardName={card.cardName}
                    cardValue={card.cardValue}
                    isSelected={selectedCard === card.cardName}
                    onSelect={() => handleCardSelect(card.cardName)}
                />
            ))}
        </div>
    );
};

export default CardDeck;