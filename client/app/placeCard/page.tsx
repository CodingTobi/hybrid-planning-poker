"use client";

import socket from '@/utils/socket';
import { useEffect } from 'react';
import { useSearchParams } from "next/navigation";


export default function Test() {
    const cardId = useSearchParams().get("id");

    useEffect(() => {
        if (cardId) {
            socket.emit('placeCard', cardId, 'room1', 'user1');
        }
    }, [cardId]);

    return (
        <div className="bg-slate-400 h-screen">
            <h1>Hybrid Planning Poker</h1>
            <p>A hybrid planning poker app for remote teams</p>
        </div>
    );
}