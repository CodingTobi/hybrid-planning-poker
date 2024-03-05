"use client"

import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const testReg = () => {
    const authContext = useAuth();
    const { isAuthenticated, isLoading, register, login, roomId, userId } = authContext || {};
    console.log('isAuthenticated', isAuthenticated, 'isLoading', isLoading, 'roomId', roomId, 'userId', userId);

    useEffect(() => {

        if (isLoading === undefined || !isAuthenticated) {
            try {
                register("room1", false);
            } catch (error) {
                console.error('Register failed! Please ask for the QR Code to register.', error);
            }
        }
    }, [isAuthenticated, isLoading, register, roomId, userId]);

    if (isAuthenticated) {
        return (
            <div>
                <h1>Successfully registered in room {roomId}</h1>
                <p>You are now ready to participate in planning. Please leave your phone unlocked for the recognition to work.</p>
            </div>
        );
    } else {
        return (
            <div>
                <h1>Test Register - waiting for Authentification</h1>
            </div>
        );
    }
}

export default testReg;