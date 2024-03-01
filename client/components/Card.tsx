import { on } from 'events';
import React from 'react';

interface CardProps {
    cardName: string;
    cardValue: string;
    isSelected: boolean;
    onSelect?: () => void;
}

const Card: React.FC<CardProps> = ({ cardName, cardValue, isSelected, onSelect }) => {

    return (
        <div
            tabIndex={-1}
            className={`card_item ${cardName} relative h-[100px] w-[66px] shrink-0 overflow-hidden p-4 m-2 border border-black rounded-md shadow-md cursor-pointer transition-all ${isSelected ? 'translate-y-0 bg-slate-400' : 'translate-y-3 bg-white'
                } hover:scale-105`}
            onClick={onSelect}
        >
            <div className="absolute top-0 left-0 p-1 text-sm">{cardValue}</div>
            <div className="absolute top-0 right-0 p-1 text-sm">{cardValue}</div>
            <div className="absolute bottom-0 left-0 p-1 text-sm">{cardValue}</div>
            <div className="absolute bottom-0 right-0 p-1 text-sm">{cardValue}</div>
            <div className="flex justify-center items-center h-full text-3xl">
                {cardValue}
            </div>
        </div>
    );
};

export default Card;