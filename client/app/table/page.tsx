"use client";
import type { NextPage } from 'next';
import Image from 'next/image';
import textureImage from '@/public/plywood_diff_4k.jpg';
import Card from '@/components/Card';
import socket from '@/utils/socket';
import { useEffect, useState } from 'react';

const cardPossibilities = [
  { cardName: 'card_0', cardValue: '0' },
  { cardName: 'card_1', cardValue: '1' },
  { cardName: 'card_2', cardValue: '2' },
  { cardName: 'card_3', cardValue: '3' },
  { cardName: 'card_5', cardValue: '5' },
  { cardName: 'card_8', cardValue: '8' },
  { cardName: 'card_13', cardValue: '13' },
  { cardName: 'card_20', cardValue: '20' },
  { cardName: 'card_40', cardValue: '40' },
  { cardName: 'card_100', cardValue: '100' },
  { cardName: 'card_inf', cardValue: '♾️' },
  { cardName: 'card_pause', cardValue: '☕' },
  { cardName: 'card_unkn', cardValue: '❓' },
];



const SomePage: NextPage = () => {

  const [cards, setCards] = useState([{ id: 'card_0', placedBy: 'testuser1' }]);

  useEffect(() => { //temp for testing TODO remove
    socket.emit('joinRoom', 'room1');

    return () => {
      socket.emit('leaveRoom', 'room1');
    };
  }, []);



  socket.on('cardsUpdated', (cards: { id: string, placedBy: string }[]) => {
    console.log('cardsUpdated', cards);
    setCards(cards);
  });

  return (
    <div className="flex items-center justify-center h-screen bg-slate-200">
      <div className="w-1/2 h-1/2 bg-white shadow-lg border-2 border-gray-300 rounded-2xl overflow-hidden relative">
        <Image src={textureImage} alt="Texture" width={4096} height={4096} className="opacity-50" priority />
        <div className='absolute left-7 right-7 top-7 flex justify-between'>
          {/* IDEE mit filter eigene carte ausblenden und separat anzeigen alternativ anderweillig markieren*/}
          {cards.map((item, index) =>
            <Card cardName={item.id} cardValue={cardPossibilities.find((x) => x.cardName === item.id)?.cardValue || "."} isSelected={false} key={index} />
          )}
        </div>
      </div>
    </div>
  );
};

export default SomePage;