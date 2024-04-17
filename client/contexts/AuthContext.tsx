"use client"

import socket from '@/utils/socket';
import { useRouter } from 'next/navigation';
import { createContext, use, useContext, useEffect, useState } from 'react';

interface AuthContextProps {
  userId: string | null;
  userName: string | null;
  roomId: string | null;
  isAuthenticated: boolean;
  isRoomOwner: boolean;
  isLoading: boolean;
  login: () => Promise<void>;
  register: (roomId: string, isRoomOwner: boolean, userName: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextProps>(null!);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setLoading] = useState(true);
  const [userId, setUserId] = useState<string | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [isRoomOwner, setRoomOwner] = useState<boolean>(false);
  const [serverRuntimeId, setServerRuntimeId] = useState<string | null>(null);
  const [runtimeId, setRuntimeId] = useState<string | null>(null);

  const router = useRouter();

  socket.on("runtimeId", (id: string) => {
    console.log("LOG:runtimeId - server:", id);
    setServerRuntimeId(id);
  });

  useEffect(() => {
    console.log("LOG:runtimeId - runtimeId changed - server:", serverRuntimeId, "runtime:", runtimeId);
    if (runtimeId && serverRuntimeId && runtimeId !== serverRuntimeId) {
      logout();
      console.error("Logged out due to server restart. Server runtimeId does not match client runtimeId.");
      router.push('/login');
    }
  }, [serverRuntimeId, runtimeId]);

  const login = async () => {
    console.log('authcontext:login');
    try {
      fetch('/api/auth', { method: "GET" })
        .then((res) => res.json())
        .then((data) => {
          setUserId(data.userId);
          setUserName(data.userName);
          setRoomId(data.roomId);
          setRoomOwner(data.isRoomOwner);
          setRuntimeId(data.runtimeId);
          setLoading(false);
        });
    } catch (error) {
      clearData();
      setLoading(false);
      console.error('Login failed', error);
    }
  };

  const register = async (roomId: string, isRoomOwner: boolean, userName: string) => {
    console.log('authcontext:register', roomId, isRoomOwner);
    try {
      fetch('/api/auth', {
        method: "POST",
        body: JSON.stringify({ roomId: roomId, userName: userName, isRoomOwner: isRoomOwner, runtimeId: serverRuntimeId})
      }).then((res) => res.json())
        .then((data) => {
          console.log("test");
          setUserId(data.userId);
          setUserName(data.userName);
          setRoomId(data.roomId);
          setRoomOwner(data.isRoomOwner);
          setRuntimeId(data.runtimeId);
          setLoading(false);
        });
    } catch (error) {
      clearData();
      setLoading(false);
      console.error('Login failed', error);
    }
  }

  const logout = async () => {
    console.log('authcontext:logout');
    setLoading(true);
    clearData();
    try {
      fetch('/api/auth/signout', { method: "DELETE" })
        .then((res) => {
          if (res.status != 200)
            throw new Error(`Status code: ${res.status} ${res.statusText}`);
        });
    } catch (error) {
      console.error('Logout failed', error);
    }
    setLoading(false);
  }

  const clearData = () => {
    setUserId(null);
    setUserName(null);
    setRoomId(null);
    setRoomOwner(false);
    setRuntimeId(null);
  }

  return (
    <AuthContext.Provider value={{
      userId, userName, roomId, isAuthenticated: !!userId,
      isRoomOwner, isLoading, login, register, logout
    }}>
      {children}
    </AuthContext.Provider>
  );


};

// Custom hook to use the auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

