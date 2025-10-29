'use client';

import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/context/ChatContext';
import { getUserInfo } from '@/services/firebase';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ChatListItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
}

export default function ChatsList() {
  const { chats, setSelectedChatId } = useChat();
  const { user, userData } = useAuth();
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const router = useRouter();

  console.log(chats, 'chats')
  console.log(user, 'users')
  console.log(chatList, 'chatList')

  useEffect(() => {
    if (!user) return;
    const fetchChats = async () => {
      const list: ChatListItem[] = [];
      for (const chat of chats) {
        const otherId = chat.participants.find((id) => id !== user?.uid);
        if (!otherId) continue;

        const otherInfo = await getUserInfo(otherId);
        list.push({
          id: chat.id,
          name: otherInfo?.name || "Usuario",
          avatar: otherInfo?.avatarUrl || "https://via.placeholder.com/48",
          lastMessage: chat.lastMessage || "",
          time: chat.lastMessageAt?.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "",
        });
      }
      setChatList(list);
    };
    if (chats.length) fetchChats();
  }, [chats]);


  const handleChatClick = (chatId: string) => {
    setSelectedChatId(chatId);
    router.push(`/Chat/${chatId}`);
  };

  return (
    <section className='chats-list'>
      <ul>
        {chatList.map(chat => (
          <li key={chat.id} onClick={() => handleChatClick(chat.id)}>
            <div className='chat-item'>
              <div className='chat-info'>
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  onError={e => {
                    e.currentTarget.src = 'https://via.placeholder.com/48';
                  }}
                />
                <div className='chat-details'>
                  <h3>{chat.name}</h3>
                  <p>{chat.lastMessage}</p>
                </div>
              </div>
              <span className='chat-time'>{chat.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
