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
                <button className="border border-black m-1" onClick={() => router.push(`/table`)}>Go to Room</button>
                <button className="border border-black m-1 " onClick={logout}>Leave Room</button>
            </div>
        );
    }



    const handleJoinRoom = async (roomId: string, uname: string) => {
        setSubmitting(true);
        try {
            await register(roomId, false, uname);
            router.push(`/table`);
        } catch (error) {
            console.error("Failed to join room", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        // user is not in a room. if there is a param_roomId use that else provide a form to join a room providing a room id. have a submit button to trigger and wait for the register function and then redirect to the room (/table)
        <div className="bg-slate-300 p-6 max-w-[40%] self-center m-auto mt-32 rounded-md">
            <h1 className="text-2xl text-center m-2 mb-6">Login Page</h1>
            {param_roomId ? (
                <form className="flex flex-col gap-4 items-center w-full justify-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.target as HTMLFormElement;
                        handleJoinRoom(param_roomId, target.uname.value);
                    }}>
                    <p >Welcome, please input your name: </p>
                    <input className="rounded-md p-1 w-full max-w-96" type="text" name="uname" placeholder="Enter Your Name" />
                    <SubmitButton className='mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full max-w-96 transition ease-in-out duration-150' loading={submitting} text="Join Room" />
                </form>
            ) : (
                <form className="flex flex-col gap-4 items-center w-full justify-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        const target = e.target as HTMLFormElement;
                        handleJoinRoom(target.roomId.value, target.uname.value);
                    }}>
                    <input className="rounded-md p-1 w-full max-w-96" type="text" name="roomId" placeholder="Enter Room ID" />
                    <input className="rounded-md p-1 w-full max-w-96" type="text" name="uname" placeholder="Enter Your Name" />
                    <SubmitButton className='mt-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full max-w-96 transition ease-in-out duration-150' loading={submitting} text="Join Room" />
                </form>
            )}
        </div>
    );
}
 
export default LoginPage;