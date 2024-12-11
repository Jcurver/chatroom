import { useEffect, useState } from 'react';
import { Chat } from '@/entities/chat/model/types';
import { chatApi } from '@/shared/api/chat';
import { ChatListItem } from './ui/chat-list-item';
import { CreateChatButton } from '@/features/create-chat/ui/create-chat-button';

export function ChatList() {
  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    const chats = await chatApi.getChats();
    setChats(chats);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Chats</h1>
        <CreateChatButton />
      </div>

      <div className="space-y-4">
        {chats.map((chat) => (
          <ChatListItem key={chat.id} chat={chat} />
        ))}
      </div>
    </div>
  );
}
