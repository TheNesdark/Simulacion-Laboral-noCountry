'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { BackIcon, CallIcon } from '@/components/icons';
import { useAuth } from '@/context/AuthContext';
import { Message } from '@/types';
import { getUserInfo, listenMessages, sendMessage } from '@/services/firebase';

export default function ChatView() {
  const { user } = useAuth();
  const params = useParams();
  const router = useRouter();
  const chatId = params?.ChatId as string;

  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');

  if (!user) return null;

  useEffect(() => {
    if (!chatId) return;
    const unsub = listenMessages(chatId, setMessages);
    return () => unsub();
  }, [chatId]);

  useEffect(() => {
    const fetchOtherUser = async () => {
      const participants = chatId.split("_");
      const otherId = participants.find((id) => id !== user.uid);
      if (otherId) {
        const data = await getUserInfo(otherId);
        setOtherUser(data);
      }
    };
    fetchOtherUser();
  }, [chatId, user?.uid]);

  const handleSend = async () => {
    if (newMessage.trim() === '') return;
    await sendMessage(chatId, user.uid, newMessage);
    setNewMessage('');
  };
  return (
    <div className='h-screen bg-gray-100 relative'>
      {/* header */}
      <div className='sticky top-0 left-0 right-0 flex items-center justify-between p-3 bg-sky-200 text-black shadow-md z-10'>
        <div className='flex items-center gap-2'>
          <button
            className='rounded-full cursor-pointer'
            onClick={() => router.back()}
          >
            <BackIcon width={20} height={21} />
          </button>
          <Image
            src={otherUser?.photoURL || '/assets/Login.png'}
            alt='perfil'
            width={50}
            height={50}
            priority
            fetchPriority='high'
            loading='eager'
            className='rounded-full'
          />
          <h2 className='font-semibold'>{otherUser ? `${otherUser.nombres} ${otherUser.apellidos}` : "Usuario"}</h2>
        </div>
        <div className='flex gap-2'>
          <button className='text-[#00579b]'>
            <CallIcon width={30} height={30} />
          </button>
          <button className='text-3xl hover:bg-[#00579b] rounded-full w-8'>
            ⋮
          </button>
        </div>
      </div>
      {/* message */}
      <div className='pt-6 px-3 overflow-y-auto h-full'>
        <div className='flex justify-center text-gray-500 text-sm'>Hoy</div>
        {messages.map(msg => (
          <div
            key={msg.id}
            className={`flex mt-1 ${msg.senderId === user.uid ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`relative max-w-[75%] px-3 py-4 rounded-2xl text-sm shadow-sm break-words ${msg.senderId === user.uid
                  ? 'bg-[#00579b] text-white rounded-br-none'
                  : 'bg-white text-gray-800 border rounded-bl-none'
                }`}
            >
              <span className='text-justify'>{msg.text}</span>
              <span className='flex bottom-1 justify-end text-[10px] opacity-80'>
                {msg.createdAt?.toDate().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className='fixed bottom-0 left-0 right-0 flex items-center gap-2 p-3 bg-white z-10'>
        <input
          type='text'
          placeholder='Escribe al Dr.'
          value={newMessage}
          onChange={e => setNewMessage(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          className='flex-1 px-3 py-2 rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500'
        />
        <button
          onClick={handleSend}
          className='p-2 bg-[#00579b] text-white rounded-full hover:bg-[#0c73c2] transition cursor-pointer'
        >
          ➤
        </button>
      </div>
    </div>
  );
}
