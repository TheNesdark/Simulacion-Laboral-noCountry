'use client';

import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/context/ChatContext';
import { getUserInfo, getMedicoUsers, getPacienteUsers } from '@/services/firebase';
import { createChatIfNotExists } from '@/services/firebase/chatService';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Avatar from '@/components/ui/Avatar';

interface ChatListItem {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
}

export default function ChatsList() {
  const { chats, setSelectedChatId } = useChat();
  const { user, userData, role } = useAuth();
  const [chatList, setChatList] = useState<ChatListItem[]>([]);
  const [showDoctors, setShowDoctors] = useState(false);
  const [doctors, setDoctors] = useState<any[]>([]);
  const router = useRouter();



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
          name: `${otherInfo?.nombres || ''} ${otherInfo?.apellidos || ''}`.trim() || "Usuario",
          avatar: otherInfo?.photoURL || "",
          lastMessage: chat.lastMessage || "",
          time: chat.lastMessageAt?.toDate().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) || "",
        });
      }
      setChatList(list);
    };
    if (chats.length) fetchChats();
  }, [chats, user]);

  const handleNewChat = async () => {
    try {
      let usersList;
      if (role === 'medico') {
        usersList = await getPacienteUsers();
      } else {
        usersList = await getMedicoUsers();
      }
      setDoctors(usersList);
      setShowDoctors(true);
    } catch (error) {
      console.error('Error al cargar usuarios:', error);
      alert('Error al cargar la lista de usuarios');
    }
  };

  const handleDoctorSelect = async (medicoUid: string) => {
    if (!medicoUid || !user) {
      alert('No se puede iniciar chat con este médico');
      return;
    }
    try {
      const chatId = await createChatIfNotExists(user.uid, medicoUid);
      setSelectedChatId(chatId);
      setShowDoctors(false);
      router.push(`/Chat/${chatId}`);
    } catch (error) {
      console.error('Error al crear chat:', error);
      alert('Error al iniciar conversación');
    }
  };


  const handleChatClick = (chatId: string) => {
    setSelectedChatId(chatId);
    router.push(`/Chat/${chatId}`);
  };

  if (!user) {
    return (
      <section className='chats-list'>
        <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando...</p>
      </section>
    );
  }



  if (showDoctors) {
    const title = role === 'medico' ? 'Selecciona un paciente' : 'Selecciona un médico';
    return (
      <>
        <section className='chats-list'>
          <div style={{ padding: '1rem', borderBottom: '1px solid #ddd', display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button onClick={() => setShowDoctors(false)} style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}>←</button>
            <h2 style={{ margin: 0 }}>{title}</h2>
          </div>
          <ul>
            {doctors.map(doctor => (
              <li key={doctor.uid} onClick={() => handleDoctorSelect(doctor.uid)} style={{ cursor: 'pointer' }}>
                <div className='chat-item'>
                  <div className='chat-info'>
                    <Avatar 
                      src={doctor.photoURL}
                      alt={`${doctor.nombres} ${doctor.apellidos}`}
                      size={48}
                      fallbackText={`${doctor.nombres} ${doctor.apellidos}`}
                    />
                    <div className='chat-details'>
                      <h3>{role === 'medico' ? '' : 'Dr. '}{doctor.nombres} {doctor.apellidos}</h3>
                      <p>{doctor.email}</p>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </>
    );
  }

  if (chatList.length === 0) {
    return (
      <>
        <section className='chats-list'>
          <p style={{ textAlign: 'center', padding: '2rem' }}>No tienes conversaciones aún</p>
        </section>
        <button
          onClick={handleNewChat}
          style={{
            position: 'fixed',
            bottom: '80px',
            right: '20px',
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            backgroundColor: '#03acf2',
            color: 'white',
            border: 'none',
            fontSize: '30px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
            zIndex: 1000,
          }}
        >
          +
        </button>
      </>
    );
  }

  return (
    <>
      <section className='chats-list'>
        <ul>
          {chatList.map(chat => (
            <li key={chat.id} onClick={() => handleChatClick(chat.id)}>
              <div className='chat-item'>
                <div className='chat-info'>
                  <Avatar
                    src={chat.avatar}
                    alt={chat.name}
                    size={48}
                    fallbackText={chat.name}
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
      <button
        onClick={handleNewChat}
        style={{
          position: 'fixed',
          bottom: '80px',
          right: '20px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#03acf2',
          color: 'white',
          border: 'none',
          fontSize: '30px',
          cursor: 'pointer',
          boxShadow: '0 4px 8px rgba(0,0,0,0.3)',
          zIndex: 1000,
        }}
      >
        +
      </button>
    </>
  );
}
