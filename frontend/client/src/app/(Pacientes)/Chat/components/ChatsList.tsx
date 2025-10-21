"use client";

import { useRouter } from "next/navigation";

export default function ChatsList() {
  const router = useRouter();
  const chats = [
    {
      id: 1,
      name: "Dr. Franco Pérez",
      lastMessage: "Jajaja no. Decimelo!",
      avatar:
        "assets/example-photos/5ef94050e148473f0ee5e20406467ee1b7041d3f.png",
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

  const handleChatClick = (chatId: number) => {
    router.push(`/Chat/${chatId}`);
  };

  return (
    <section className="chats-list">
      <ul>
        {chats.map((chat) => (
          <li key={chat.id} onClick={() => handleChatClick(chat.id)}>
            <div className="chat-item">
              <div className="chat-info">
                <img
                  src={chat.avatar}
                  alt={chat.name}
                  onError={(e) => {
                    e.currentTarget.src = "https://via.placeholder.com/48";
                  }}
                />
                <div className="chat-details">
                  <h3>{chat.name}</h3>
                  <p>{chat.lastMessage}</p>
                </div>
              </div>
              <span className="chat-time">{chat.time}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
