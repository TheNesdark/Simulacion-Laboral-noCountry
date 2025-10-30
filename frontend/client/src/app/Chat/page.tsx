import ChatsList from './components/ChatsList';
import '@/styles/pages/Chats.css';
import Header from '@/components/layout/Header';
import NavBar from '@/components/layout/NavBar';

export default function ChatPage() {
  return (
    <>
      <Header />
      <ChatsList />
      <NavBar />
    </>
  );
}
