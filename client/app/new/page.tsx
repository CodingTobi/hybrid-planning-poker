
"use client";

import socket from '@/utils/socket';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from '@/contexts/AuthContext';
import { nanoid } from 'nanoid';
import SubmitButton from '@/components/SubmitButton';

const NewRoom = () => {
    const authContext = useAuth();
    const { isAuthenticated, isLoading, roomId, userId, register, login } = authContext || {};
    const router = useRouter();

    const [roomName, setRoomName] = useState('');
    const [roomDescription, setRoomDescription] = useState('');
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated, 'isLoading', isLoading, 'roomId', roomId, 'userId', userId);
        login();
    }), [];



    const createRoom = async (ev: React.FormEvent<HTMLFormElement>) => {
        ev.preventDefault();
        console.log('createRoom', roomName);
        setSubmitting(true);
        const newRoomId = nanoid();
        try {
            await register(newRoomId, true);
        } catch (error) {
            console.error('register failed, try again later', error);
            return;
        }
        console.log('createRoomC', newRoomId, userId, roomName);

    }

    useEffect(() => {
        console.log('useEffect1', submitting, isAuthenticated);
        if (submitting && isAuthenticated) {
            console.log('createRoomC', "newRoomId", userId, roomName);
            socket.emit('createRoom', roomId, userId, roomName);
            router.push('/placeCard'); // todo fix
            setSubmitting(false);
        }
    }), [submitting, isAuthenticated];


    if (!isAuthenticated) {
        return (
            <div>
                <h1>isAuthenticated: {isAuthenticated}, isLoading: {isLoading} </h1>
                <h1>Create a new room</h1>
                <form onSubmit={createRoom}>
                    <div>
                        <label htmlFor="roomName">Room Name</label>
                        <input type="text" id="roomName" name="roomName" value={roomName} onChange={(ev) => setRoomName(ev.currentTarget.value)} />
                    </div>
                    <div>
                        <label htmlFor="roomDescription">unused Room Description</label>
                        <input type="text" id="roomDescription" name="roomDescription" value={roomDescription} onChange={(ev) => setRoomDescription(ev.currentTarget.value)} />
                    </div>
                    <div>
                        <SubmitButton text="Create Room" loading={submitting} className='bg-red-600 p-2 rounded-full overflow-hidden w-[8rem]'/>
                    </div>
                </form>
            </div>
        );
    } else if (submitting) {
        return (
            <div className="mt-24 text-center">
                <h1>Creating Room...</h1>
                <h1>you will soon be redirected.</h1>
            </div>
        );

    } else {
        return (
            <div className="mt-24 text-center">
                <h1>you already in room</h1>
            </div>
        );
    }

}

export default NewRoom;