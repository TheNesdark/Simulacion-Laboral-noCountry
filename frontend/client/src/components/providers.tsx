'use client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import AuthProvider from '@/context/AuthContext';
import { ChatProvider } from '@/context/ChatContext';

export default function Providers({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ChatProvider>
          {children}
        </ChatProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
