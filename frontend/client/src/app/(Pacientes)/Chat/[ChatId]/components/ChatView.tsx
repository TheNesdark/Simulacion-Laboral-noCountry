"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function ChatView() {
  const params = useParams();
  const router = useRouter();
  const chatId = Number(params.ChatId); // TODO: remove
  const chats = [
    {
      id: 1,
      name: "Dr. Franco Pérez",
      lastMessage: "Jajaja no. Decimelo!",
      avatar:
        "/assets/example-photos/5ef94050e148473f0ee5e20406467ee1b7041d3f.png",
      time: "Ahora",
    },
    {
      id: 2,
      name: "Dra. Valeria Gómez",
      lastMessage: "Ahora llamo",
      avatar:
        "/assets/example-photos/fadbb3fb1c636000b153327245aafd5c73dccc90.png",
      time: "15:30",
    },
    {
      id: 3,
      name: "Dr. Tomás Ferreyra",
      lastMessage: "Lo recibo ya está en mi sistema.",
      avatar:
        "/assets/example-photos/621ef3ee9611b5f0007a8ab27a9018a04fb2cc39.png",
      time: "13:26",
    },
  ];

  const data = chats.find((i) => i.id === chatId);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "hola doctor",
      time: "12:30",
      sender: "me",
    },
    {
      id: 2,
      text: "Hola, ¿cómo está?",
      time: "12:31",
      sender: "user",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const handleSend = () => {
    if (newMessage.trim() === "") return;
    const newMsg = {
      id: Date.now(),
      text: newMessage,
      time: new Date().toLocaleDateString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      sender: "me",
    };
    setMessages([...messages, newMsg]);
    setNewMessage("");
  };
  return (
    <div className="h-screen bg-gray-100 relative">
      {/* header */}
      <div className="fixed top-0 left-0 right-0 flex items-center justify-between p-3 bg-sky-200 text-black shadow-md z-10">
        <div className="flex items-center gap-2">
          <button
            className="rounded-full cursor-pointer"
            onClick={() => router.back()}
          >
            <svg width={22} height={22}>
              <use href={`/assets/icons/back-icon.svg`} />
            </svg>
          </button>
          <Image
            src={data?.avatar || "/assets/Login.png"}
            alt="perfil"
            width={50}
            height={50}
            priority
            fetchPriority="high"
            loading="eager"
            className="rounded-full"
          />
          <h2 className="font-semibold">Dr. López</h2>
        </div>
        <div className="flex gap-2">
          <button className="text-[#00579b]">☐</button>
          <button className="text-3xl hover:bg-[#00579b] rounded-full">
            ⋮
          </button>
        </div>
      </div>
      {/* message */}
      <div className="pt-16 px-3 overflow-y-auto h-full">
        <div className="flex justify-center text-gray-500 text-sm">Hoy</div>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex mt-1 ${msg.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`relative max-w-[75%] px-3 py-4 rounded-2xl text-sm shadow-sm break-words ${
                msg.sender === "me"
                  ? "bg-[#00579b] text-white rounded-br-none"
                  : "bg-white text-gray-800 border rounded-bl-none"
              }`}
            >
              <span className="text-justify">{msg.text}</span>
              <span className="flex bottom-1 justify-end text-[10px] opacity-80">
                {msg.time}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="fixed bottom-0 left-0 right-0 flex items-center gap-2 p-3 bg-white z-10">
        <input
          type="text"
          placeholder="Escribe al Dr."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 px-3 py-2 rounded-xl border border-gray-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
        />
        <button
          onClick={handleSend}
          className="p-2 bg-[#00579b] text-white rounded-full hover:bg-[#0c73c2] transition cursor-pointer"
        >
          ➤
        </button>
      </div>
    </div>
  );
}
