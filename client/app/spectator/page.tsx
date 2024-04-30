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
import { useRouter } from 'next/navigation';
import "./style.css";

const SpectatorPage: NextPage = () => {
    const authContext = useAuth();
    const { isAuthenticated, isRoomOwner, isLoading, login, roomId } = authContext || {};
    const router = useRouter();

    const [cards, setCards] = useState([{ id: 'card_0', placedBy: 'testuser1', userName: 'testuser1' }]);
    const [revealCards, setRevealCards] = useState(false);
    const [currentStory, setCurrentStory] = useState('Wecome to HPP');
    login();

    useEffect(() => {
        if (isAuthenticated) {
            socket.emit('joinRoom', roomId);
        }
        return () => {
            socket.emit('leaveRoom', roomId);
        };
    }, [isAuthenticated, roomId]);

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push('/login');
        }
    }, [isLoading, isAuthenticated, router]);

    useEffect(() => {
        socket.on('cardsUpdated', (updatedCards: { id: string, placedBy: string, userName: string }[]) => {
            setCards(updatedCards);
        });

        socket.on('cardsVisible', (reveal: boolean) => {
            setRevealCards(reveal);
        });

        return () => {
            socket.off('cardsUpdated');
            socket.off('cardsVisible');
        };
    }, [router]);

    socket.on("updateStory", (story: string) => {
        console.log('updateStory', story);
        setCurrentStory(story);
    });

    return ( //TODO fix hardcoded link
        <div className="flex flex-col items-center justify-center w-full h-screen bg-slate-200 p-14 relative overflow-hidden">
            <QrCode link={`http://192.168.2.176:3000/login?id=${roomId}`} buttonText='QR' qrDialogTitle='Join Room' className='bg-white rounded-md p-1 absolute right-2 top-2' />
            <p className='text-4xl text-center p-3'>{currentStory}</p>
            <div className="w-full h-full bg-white shadow-lg border-2 border-gray-300 rounded-2xl overflow-hidden relative">
                <Image src={textureImage} alt="Texture" layout="fill" objectFit="cover" className="opacity-50" priority />
                <div className='absolute inset-8 flex flex-wrap justify-start items-start gap-8'>
                    {cards.map((card, index) => (
                        <div key={index} className=''>
                            <p className='text-center text-2xl pb-1'>{card.userName || card.placedBy.slice(0, 6)}</p>
                            <Card
                                className='scale-150'
                                cardName={card.id}
                                cardValue={revealCards ? cards_default.find((cardDef) => cardDef.cardName === card.id)?.cardValue || "e" : 'PP'}
                                isSelected={false}
                                key={index}
                                scale={198}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SpectatorPage;