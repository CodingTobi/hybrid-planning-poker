import { on } from 'events';
import React from 'react';

interface CardProps {
    cardName: string;
    cardValue: string;
    isSelected: boolean;
    className?: string;
    scale?: number;
    onSelect?: () => void;
}

const Card: React.FC<CardProps> = ({ cardName, cardValue, isSelected, className, scale, onSelect }) => {

    return (
        <div
            tabIndex={-1}
            className={`card_item ${cardName} relative w-[66px] aspect-card shrink-0 scale-[${scale || 100}%] overflow-hidden p-4 m-2 border border-black rounded-md shadow-md cursor-pointer transition-all ${isSelected ? 'translate-y-0 bg-slate-400' : 'translate-y-3 bg-white'
                } hover:scale-[${Math.round((scale || 100) * 1.05)}%] ${className}`}
            onClick={onSelect}
        >
            <div className="absolute top-0 left-0 p-1 text-sm">{cardValue}</div>
            <div className="absolute top-0 right-0 p-1 text-sm">{cardValue}</div>
            <div className="absolute bottom-0 left-0 p-1 text-sm">{cardValue}</div>
            <div className="absolute bottom-0 right-0 p-1 text-sm">{cardValue}</div>
            <div className="flex justify-center items-center h-full text-4xl">
                {cardValue}
            </div>
        </div>
    );
};

export default Card;