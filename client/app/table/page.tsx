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
import Link from 'next/link';


const SomePage: NextPage = () => {
  const authContext = useAuth();
  const { isAuthenticated, isRoomOwner, isLoading, login, roomId } = authContext || {};
  const router = useRouter();

  const [cards, setCards] = useState([{ id: 'card_0', placedBy: 'testuser1', userName: 'testuser1' }]);
  const [revealCards, setRevealCards] = useState(false);
  const [votingActive, setVotingActive] = useState(false);
  const [currentStory, setCurrentStory] = useState('Welcome to HPP');
  login();

  useEffect(() => {
    if (isAuthenticated) {
      socket.emit('joinRoom', roomId);
      console.log('tablepage:joinRoom', roomId);
    }
    return () => {
      socket.emit('leaveRoom', roomId);
      console.log('tablepage:leaveRoom', roomId);
    };
  }, [isAuthenticated]);

  if (!isLoading && !isAuthenticated) {
    router.push('/login');
  }

  socket.on('cardsUpdated', (cards: { id: string, placedBy: string, userName: string }[]) => {
    console.log('cardsUpdated', cards);
    setCards(cards);
    router.refresh();
  });

  socket.on('cardsVisible', (reveal: boolean) => {
    console.log('cardsVisible', reveal);
    setRevealCards(reveal);
  });

  socket.on('votingActive', (active: boolean) => {
    console.log('votingActive', active);
    setVotingActive(active);
  });

  socket.on("updateStory", (story: string) => {
    if (isRoomOwner) return;
    console.log('updateStory', story);
    setCurrentStory(story);
  });

  return (
    <div className="flex flex-col gap-4 items-center justify-center h-screen bg-slate-200 relative">
      {(isRoomOwner) ?
        <div className='absolute h-[70%] right-1 w-36 flex flex-col gap-2 rounded-md bg-opacity-50 bg-amber-900 border border-black'>
          <h1 className="text-lg text-center">Einstellungen</h1>

          <Link href="/spectator" target='_blank' className='text-center bg-white rounded-md p-1 border border-black z-10'>
            Präsenz Ansicht
            </Link>

          <QrCode link={`http://192.168.2.176:3000/login?id=${roomId}`} buttonText='QR Code' qrDialogTitle='Join Room' className=' bg-white rounded-md p-1 inset-2 absolut right-2 top-2' />
        </div>
        : null}
      <div className="w-1/2 h-1/2 bg-white shadow-lg border-2 border-gray-300 rounded-2xl overflow-hidden relative">
        {(isRoomOwner) ?
          <>
            <div className='absolute bottom-0 w-full flex justify-evenly'>
              <button
                onClick={() => { socket.emit("revealCards", !revealCards, roomId) }}
                className='bg-white rounded-md p-1 border border-black z-10'>
                {(revealCards) ? "Karten umdrehen" : "Karten zeigen"}
              </button>
              <button
                onClick={() => { socket.emit("toggleVoting", roomId, !votingActive) }}
                className='bg-white rounded-md p-1 border border-black z-10'>
                {(votingActive) ? "Abstimmung beenden" : "Abstimmung starten"}
              </button>
              <button
                onClick={() => { socket.emit("clearCards", roomId) }}
                className='bg-white rounded-md p-1 border border-black z-10'>
                Karten entfernen
              </button>
            </div>
            <input className="text-center border border-black w-[90%] mx-[5%]" type="text" value={currentStory} onChange={(e) => {
              socket.emit("updateStory", roomId, e.target.value);
              setCurrentStory(e.target.value);
            }} />
          </>
          : <p className='bg-none text-center'>{currentStory}</p>
        }
        <Image src={textureImage} alt="Texture" width={4096} height={4096} className="opacity-50" priority />
        <div className='absolute left-7 right-7 top-7 flex flex-wrap justify-between'>
          {/* IDEE mit filter eigene carte ausblenden und separat anzeigen alternativ anderweillig markieren*/}
          {cards.map((item, index) =>
            <div className=''>
              <p className='text-center'>{item.userName || item.placedBy?.slice(0, 6)}</p>
              <Card
                className='mt-0'
                cardName={item.id}
                cardValue={(revealCards) ? cards_default.find((x) => x.cardName === item.id)?.cardValue || "e" : 'PP'}
                isSelected={false}
                key={index}
                scale={198}
              />
            </div>
          )}
        </div>
      </div>
      <CardDeck active={votingActive} cards={cards_default} className='w-fit max-w-full overflow-auto' />
    </div>
  );
};

export default SomePage;