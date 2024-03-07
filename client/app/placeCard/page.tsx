"use client";

import socket from '@/utils/socket';
import { useEffect } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from '@/contexts/AuthContext';


export default function Test() {
    const authContext = useAuth();
    const { isAuthenticated, isLoading, login, roomId, userId } = authContext || {};
    const cardId = useSearchParams().get("id");
    const router = useRouter();

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated, 'isLoading', isLoading, 'roomId', roomId, 'userId', userId);
        if (isLoading !== undefined && !isAuthenticated) {
            try {
                login();
            } catch (error) {
                console.error('Login failed! Please ask for the QR Code to login.', error);
            }
        } else if (isAuthenticated && cardId) {
            socket.emit('placeCard', cardId, roomId, userId);
        }
    }, [cardId, isAuthenticated, isLoading, login, roomId, userId]);

    useEffect(() => {
        if (!isLoading)
            router.refresh();
    }, [isLoading, router]);

    if (isLoading) {
        return (
            <div className="mt-24 text-center">
                <h1>Loading...</h1>
            </div>
        );
    } else if (!isAuthenticated) {
        return (
            <div className="mt-24 text-center">
                <h1>Login failed! Please ask for the QR Code to login.</h1>
            </div>
        );
    } else {
        return (
            <div className="mt-24 text-center">
                <h1>Successfully placed card in room {roomId}</h1>
                <h1> You can close this tab now.</h1>
                <h1>To change the card simply place another card on the reader</h1>
            </div>
        );
    }
}