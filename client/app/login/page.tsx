"use client";

import { useAuth } from "@/contexts/AuthContext";
import SubmitButton from '@/components/SubmitButton';
import { useState, useEffect, use } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const LoginPage = () => {
    const router = useRouter();
    const authContext = useAuth();
    const { isAuthenticated, isLoading, roomId, userId, register, login, logout } = authContext || {};
    const param_roomId = useSearchParams().get("id");

    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        console.log('isAuthenticated', isAuthenticated, 'isLoading', isLoading, 'roomId', roomId, 'userId', userId);
        login();
    }, [login]);

    useEffect(() => {
    }, [isAuthenticated]);

    if (isAuthenticated) {
        // user is already in a room. provide buttons to go to the room or to leave the room
        return (
            <div>
                <h1>You are already in a room</h1>
                <button className="border border-black m-1" onClick={() => router.push(`/room/${roomId}`)}>Go to Room</button>
                <button className="border border-black m-1 " onClick={logout}>Leave Room</button>
            </div>
        );
    } 



    const handleJoinRoom = async (roomId: string) => {
        setSubmitting(true);
        try {
            await register(roomId, false);
            router.push(`/room/${roomId}`);
        } catch (error) {
            console.error("Failed to join room", error);
        } finally {
            setSubmitting(false);
        }
    };

    return ( 
        // user is not in a room. if there is a param_roomId use that else provide a form to join a room providing a room id. have a submit button to trigger and wait for the register function and then redirect to the room (/table)
        <div>
            <h1>Login Page</h1>
            {param_roomId ? (
                <>
                <p>Welcome, you can join the room {roomId} by clicking the button below</p>
                <button className="border border-black " onClick={() => handleJoinRoom(param_roomId)}>Join Room</button>
                </>
            ) : (
                <form onSubmit={(e) => {
                    e.preventDefault();
                    const target = e.target as HTMLFormElement;
                    handleJoinRoom(target.roomId.value);
                }}>
                    <input type="text" name="roomId" placeholder="Enter Room ID" />
                    <SubmitButton loading={submitting} text="Join Room"  />
                </form>
            )}
        </div>
     );
}
 
export default LoginPage;