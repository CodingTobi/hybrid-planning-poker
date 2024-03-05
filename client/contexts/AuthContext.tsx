"use client"

import { createContext, useContext, useState } from 'react';

interface AuthContextProps {
  userId: string | null;
  roomId: string | null;
  isAuthenticated: boolean;
  isRoomOwner: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  register: (roomId: string, isRoomOwner: boolean) => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRoomOwner, setRoomOwner] = useState<boolean>(false);


  const login = async () => {
    console.log('authcontext:login');
    try {
      fetch('/api/auth', { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          setUserId(data.userId);
          setRoomId(data.roomId);
          setRoomOwner(data.isRoomOwner); 
          setLoading(false);
        });
    } catch (error) {
      clearData();
      setLoading(false);
      console.error('Login failed', error);
    }
  };

  const register = async (roomId: string, isRoomOwner: boolean) => {
    console.log('authcontext:register', roomId, isRoomOwner);
    try {
      fetch('/api/auth', {
        method: "POST",
        body: JSON.stringify({ roomId: roomId, isRoomOwner: isRoomOwner})
      }).then((res) => res.json())
        .then((data) => {
          setUserId(data.userId);
          setRoomId(data.roomId);
          setRoomOwner(data.isRoomOwner);
          setLoading(false);
        });
    } catch (error) {
      clearData();
      setLoading(false);
      console.error('Login failed', error);
    }
  }
  const clearData = () => {
    setUserId(null);
    setRoomId(null);
    setRoomOwner(false);
  }

  return (
    <AuthContext.Provider value={{ 
        userId, roomId, isAuthenticated: !!userId,
        isRoomOwner, isLoading, login, register
    }}>
      {children}
    </AuthContext.Provider>
  );


};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

