"use client"

import { Chat } from "@/types"
import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { listenUserChats } from "@/services/firebase";

interface ChatContextType {
    chats: Chat[];
    selectedChatId: string | null;
    setSelectedChatId: (id: string | null) => void;
}

const ChatContext = createContext<ChatContextType>({
    chats: [],
    selectedChatId: null,
    setSelectedChatId: () => { }
});

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();
    const [chats, setChats] = useState<Chat[]>([]);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    useEffect(() => {
        if (!user?.uid) return;
        const unsubscribe = listenUserChats(user.uid, setChats);
        return () => unsubscribe();
    }, [user?.uid]);

    return (
        <ChatContext.Provider value={{ chats, selectedChatId, setSelectedChatId }}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChat = () => useContext(ChatContext);