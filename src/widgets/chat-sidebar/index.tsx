import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChatListItem } from '@/shared/model/chat';
import { chatApi } from '@/shared/api/chat';
import { ChatListItem as ChatItem } from './ui/chat-list-item';
import { CreateChatButton } from '@/features/create-chat/ui/create-chat-button';

export function ChatSidebar() {
  const [chats, setChats] = useState<ChatListItem[]>([]);
  const { chatId } = useParams<{ chatId: string }>();
  const navigate = useNavigate();

  // 채팅 목록 업데이트를 위한 이벤트 리스너
  useEffect(() => {
    const handleChatUpdate = () => {
      loadChats();
    };
    window.addEventListener('chat-updated', handleChatUpdate);
    return () => window.removeEventListener('chat-updated', handleChatUpdate);
  }, []);

  useEffect(() => {
    loadChats();
  }, []);

  const loadChats = async () => {
    try {
      const chats = await chatApi.getChats();
      setChats(chats);
    } catch (error) {
      console.error('Failed to load chats:', error);
    }
  };

  const handleNewChat = () => {
    // 현재 선택된 채팅 비활성화를 위해 홈으로 이동
    navigate('/');
  };

  return (
    <div className="w-80 bg-gray-50 border-r h-full flex flex-col">
      <div className="p-4 border-b">
        <CreateChatButton onClick={handleNewChat} className="w-full" />
      </div>

      <div className="flex-1 overflow-y-auto">
        {chats.map((chat) => (
          <ChatItem key={chat.chat_id} chat={chat} isSelected={chat.chat_id === chatId} />
        ))}
      </div>
    </div>
  );
}
