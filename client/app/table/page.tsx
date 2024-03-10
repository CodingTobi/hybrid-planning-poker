"use client";
import type { NextPage } from 'next';
import Image from 'next/image';
import textureImage from '@/public/plywood_diff_4k.jpg';
import Card from '@/components/Card';
import socket from '@/utils/socket';
import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import QrCode from '@/components/QrCode';
import { cards_default } from '@/utils/cardDecks';
import CardDeck from '@/components/CardDeck';
import { useRouter } from 'next/navigation';


const SomePage: NextPage = () => {
  const authContext = useAuth();
  const { isAuthenticated, isLoading, login, roomId, userId } = authContext || {};
  const router = useRouter();

  const [cards, setCards] = useState([{ id: 'card_0', placedBy: 'testuser1' }]);
  login();

  useEffect(() => { 
    if (isAuthenticated) {
      socket.emit('joinRoom', roomId);
      console.log('joinRoom', roomId);
    }
    return () => {
      socket.emit('leaveRoom', roomId);
    };
  }, [isAuthenticated]);

  if (!isLoading && !isAuthenticated) {
    router.push('/login');
  }

  socket.on('cardsUpdated', (cards: { id: string, placedBy: string }[]) => {
    console.log('cardsUpdated', cards);
    setCards(cards);
    router.refresh();
  });

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-slate-200 relative">
      <QrCode link={`http://192.168.2.159:3000/login?id=${roomId}`} buttonText='QR' qrDialogTitle='Join Room' className=' bg-white rounded-md p-1 inset-2 absolut right-2 top-2' />
      <div className="w-1/2 h-1/2 bg-white shadow-lg border-2 border-gray-300 rounded-2xl overflow-hidden relative">
        <Image src={textureImage} alt="Texture" width={4096} height={4096} className="opacity-50" priority />
        <div className='absolute left-7 right-7 top-7 flex justify-between'>
          {/* IDEE mit filter eigene carte ausblenden und separat anzeigen alternativ anderweillig markieren*/}
          {cards.map((item, index) =>
            <Card
              cardName={item.id}
              cardValue={cards_default.find((x) => x.cardName === item.id)?.cardValue || "e"}
              isSelected={false}
              key={index}
              scale={198}
            />
          )}
        </div>
      </div>
      <CardDeck cards={cards_default} className='w-screen overflow-auto' />
    </div>
  );
};

export default SomePage;