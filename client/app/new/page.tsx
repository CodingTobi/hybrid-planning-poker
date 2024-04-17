
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
    const [ownerName, setOwnerName] = useState('');
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
            await register(newRoomId, true, ownerName);
        } catch (error) {
            console.error('register failed, try again later', error);
            return;
        }
        console.log('createRoomC', newRoomId, userId, roomName, ownerName);

    }

    useEffect(() => {
        console.log('useEffect1', submitting, isAuthenticated);
        if (submitting && isAuthenticated) {
            console.log('createRoomC', "newRoomId", userId, ownerName, roomName);
            socket.emit('createRoom', roomId, userId, roomName);
            router.push('/table');
            setSubmitting(false);
        }
    }), [submitting, isAuthenticated];


    if (!isAuthenticated) {
        return (
            <div className="bg-slate-300 p-6 max-w-lg mx-auto my-32 rounded-md shadow-lg">
                <h1 className="text-xl text-center mb-6">Create a new room</h1>
                <form className="space-y-4" onSubmit={createRoom}>
                    <div className='w-full'>
                        <label htmlFor="roomName" className="block text-sm font-medium text-gray-700">Room Name</label>
                        <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="text" id="roomName" name="roomName" value={roomName} onChange={(ev) => setRoomName(ev.currentTarget.value)} />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="ownerName" className="block text-sm font-medium text-gray-700">Owner Name</label>
                        <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="text" id="ownerName" name="ownerName" value={ownerName} onChange={(ev) => setOwnerName(ev.currentTarget.value)} />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="roomDescription" className="block text-sm font-medium text-gray-700">Room Description (optional)</label>
                        <input className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" type="text" id="roomDescription" name="roomDescription" value={roomDescription} onChange={(ev) => setRoomDescription(ev.currentTarget.value)} />
                    </div>
                    <div>
                        <SubmitButton text="Create Room" loading={submitting} className='mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition ease-in-out duration-150' />
                    </div>
                </form>
            </div>
        );
    } else if (submitting) {
        return (
            <div className="m-auto mt-32 text-center">
                <h1>Creating Room...</h1>
                <h1>you will soon be redirected.</h1>
            </div>
        );

    } else { //TODO leave room button
        return (
            <div className="m-auto mt-32 text-center">
                <h1>you already in room</h1>
            </div>
        );
    }

}

export default NewRoom;