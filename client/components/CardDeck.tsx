"use client"

import React, { use, useEffect, useState } from 'react';
import Card from './Card';
import { socket } from '@/utils/socket';

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

    const handleCardSelect = (cardName: string) => {
        setSelectedCard(cardName);
    };

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
        socket.emit('placeCard', selectedCard, 'room1', 'user1'); //TODO get room and user from context
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